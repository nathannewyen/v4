import { Contribution } from "@/types";
import { DESCRIPTION_MAX_LENGTH, PR_DETAILS_FETCH_LIMIT, COMMITS_PER_PAGE } from "@/constants";
import { isoToLocalDate, extractDateFromISO } from "@/lib/dateUtils";
import { GitHubPR, GitHubSearchResponse, GitHubCommit } from "./types";
import { GITHUB_USERNAME, GERRIT_API_ROUTE, OWN_REPOS_TO_INCLUDE } from "./constants";
import { getRepoFromUrl, getRepoDisplayName } from "./utils";

// Build authorization headers for GitHub API requests
const buildHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  return headers;
};

// Fetch ALL PRs by the user across all GitHub repos (excluding own repos)
export const fetchAllGitHubPRs = async (token?: string): Promise<Contribution[]> => {
  const headers = buildHeaders(token);

  // Search for ALL PRs by this user (no repo filter)
  const searchUrl = `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&sort=created&order=desc&per_page=100`;

  const response = await fetch(searchUrl, { headers });

  if (!response.ok) {
    if (response.status === 403) {
      console.warn("GitHub API rate limit reached");
      return [];
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubSearchResponse = await response.json();

  // Transform GitHub PRs to Contribution format
  // Filter out PRs to user's own repos (only show open source contributions)
  const contributions: Contribution[] = data.items
    .filter((pr) => {
      const repo = getRepoFromUrl(pr.repository_url);
      const repoOwner = repo.split("/")[0].toLowerCase();
      // Exclude repos owned by the user
      return repoOwner !== GITHUB_USERNAME.toLowerCase();
    })
    .map((pr) => {
      const repo = getRepoFromUrl(pr.repository_url);
      const repoName = getRepoDisplayName(repo);

      // Determine status based on PR state and merge status
      let status: "merged" | "open" | "closed" = "open";
      if (pr.pull_request?.merged_at) {
        status = "merged";
      } else if (pr.state === "closed") {
        status = "closed";
      }

      return {
        id: `gh-${repo}-${pr.number}`,
        repo: repo,
        repoName: repoName,
        type: "pr" as const,
        title: pr.title,
        description: pr.body?.slice(0, DESCRIPTION_MAX_LENGTH) || "No description provided.",
        url: pr.html_url,
        // Convert UTC timestamp to local date to match GitHub's heatmap behavior
        date: isoToLocalDate(pr.created_at),
        // Store merged_at if merged, otherwise updated_at for "Last Updated" sorting
        updatedAt: pr.pull_request?.merged_at
          ? isoToLocalDate(pr.pull_request.merged_at)
          : isoToLocalDate(pr.updated_at),
        status: status,
        additions: 0,
        deletions: 0,
        files: [],
        source: "github" as const,
      };
    });

  return contributions;
};

// Fetch detailed PR info including files changed and line counts
export const fetchPRDetails = async (
  contribution: Contribution,
  token?: string
): Promise<Contribution> => {
  const headers = buildHeaders(token);

  // Extract PR number from URL
  const prNumber = contribution.url.split("/").pop();
  const detailsUrl = `https://api.github.com/repos/${contribution.repo}/pulls/${prNumber}`;

  try {
    const response = await fetch(detailsUrl, { headers });

    if (!response.ok) {
      return contribution;
    }

    const prData = await response.json();

    return {
      ...contribution,
      additions: prData.additions || 0,
      deletions: prData.deletions || 0,
      files: (prData.changed_files || 0) > 0 ? [`${prData.changed_files} files`] : [],
    };
  } catch {
    return contribution;
  }
};

// Fetch contributions from Gerrit via our API route (bypasses CORS)
export const fetchGerritContributions = async (): Promise<Contribution[]> => {
  try {
    const response = await fetch(GERRIT_API_ROUTE);

    if (!response.ok) {
      console.warn(`Gerrit API error: ${response.status}`);
      return [];
    }

    const contributions: Contribution[] = await response.json();
    return contributions;
  } catch (error) {
    console.warn("Failed to fetch Gerrit contributions:", error);
    return [];
  }
};

// Fetch commits from own repos (like gitcraft)
export const fetchOwnRepoCommits = async (token?: string): Promise<Contribution[]> => {
  const headers = buildHeaders(token);
  const allCommits: Contribution[] = [];

  // Fetch commits from each repo in OWN_REPOS_TO_INCLUDE
  for (const repo of OWN_REPOS_TO_INCLUDE) {
    try {
      const commitsUrl = `https://api.github.com/repos/${repo}/commits?per_page=${COMMITS_PER_PAGE}`;
      const response = await fetch(commitsUrl, { headers });

      if (!response.ok) {
        console.warn(`Failed to fetch commits from ${repo}: ${response.status}`);
        continue;
      }

      const commits: GitHubCommit[] = await response.json();
      const repoName = getRepoDisplayName(repo);

      // Transform commits to Contribution format
      const contributions: Contribution[] = commits.map((commit) => {
        const commitDate = extractDateFromISO(commit.commit.author.date);
        return {
          id: `commit-${repo}-${commit.sha.slice(0, 7)}`,
          repo: repo,
          repoName: repoName,
          type: "commit" as const,
          title: commit.commit.message.split("\n")[0], // First line of commit message
          description: commit.commit.message
            .split("\n")
            .slice(1)
            .join("\n")
            .trim()
            .slice(0, DESCRIPTION_MAX_LENGTH),
          url: commit.html_url,
          date: commitDate,
          // For commits, updatedAt is same as date (commits don't have separate update time)
          updatedAt: commitDate,
          status: "merged" as const, // Commits are always "merged"
          additions: commit.stats?.additions || 0,
          deletions: commit.stats?.deletions || 0,
          files: [],
          source: "github" as const,
        };
      });

      allCommits.push(...contributions);
    } catch (error) {
      console.warn(`Error fetching commits from ${repo}:`, error);
    }
  }

  return allCommits;
};

// Main fetcher function for SWR - combines all contribution sources
export const fetchAllContributions = async (): Promise<Contribution[]> => {
  // Get GitHub token from environment variable (optional)
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // Fetch ALL PRs from GitHub (no hardcoded repos)
  const githubPromise = fetchAllGitHubPRs(token);

  // Fetch contributions from Gerrit via API route
  const gerritPromise = fetchGerritContributions();

  // Fetch commits from own repos (like gitcraft)
  const ownRepoCommitsPromise = fetchOwnRepoCommits(token);

  // Wait for all fetches to complete
  const [githubContributions, gerritContributions, ownRepoCommits] = await Promise.all([
    githubPromise,
    gerritPromise,
    ownRepoCommitsPromise,
  ]);

  // Combine all contributions
  let allContributions = [...githubContributions, ...gerritContributions, ...ownRepoCommits];

  // Fetch details for GitHub PRs (line counts, files)
  // Only fetch details for first N PRs to avoid rate limits
  const detailPromises = githubContributions
    .slice(0, PR_DETAILS_FETCH_LIMIT)
    .map((c) => fetchPRDetails(c, token));
  const detailedContributions = await Promise.all(detailPromises);

  // Merge detailed info back into GitHub contributions (PRs only, not commits)
  allContributions = allContributions.map((c) => {
    if (c.source === "github" && c.type === "pr") {
      const detailed = detailedContributions.find((d) => d.id === c.id);
      if (detailed) {
        return detailed;
      }
    }
    return c;
  });

  // Sort by date (newest first)
  allContributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allContributions;
};
