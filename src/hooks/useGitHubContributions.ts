import useSWR from "swr";
import { Contribution } from "@/types";

// GitHub username to fetch contributions for
const GITHUB_USERNAME = "nathannewyen";

// API route for Gerrit contributions (server-side to bypass CORS)
const GERRIT_API_ROUTE = "/api/gerrit";

// Map repo full names to display names for known projects
// New repos will automatically use the repo name as display name
const REPO_DISPLAY_NAMES: Record<string, string> = {
  "facebook/react-native": "React Native",
  "kubernetes/kubernetes": "Kubernetes",
  "langchain-ai/langchain": "LangChain",
  "langchain-ai/langchainjs": "LangChainJS",
  "langchain-ai/langgraph": "LangGraph",
  "langchain-ai/langgraph-js": "LangGraph JS",
  "langchain-ai/langchain-docs": "LangChain Docs",
  "langchain-ai/langserve": "LangServe",
  "stylelint/stylelint": "Stylelint",
  "flutter/flutter": "Flutter",
  "flutter/engine": "Flutter Engine",
  "golang/go": "Go",
};

// GitHub API response types
interface GitHubPR {
  id: number;
  number: number;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
  state: string;
  repository_url: string;
  pull_request?: {
    merged_at: string | null;
  };
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubPR[];
}

// Helper to extract repo name from repository_url
const getRepoFromUrl = (repositoryUrl: string): string => {
  // Format: https://api.github.com/repos/owner/repo
  const parts = repositoryUrl.split("/");
  return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

// Helper to get display name for a repo
const getRepoDisplayName = (repo: string): string => {
  return REPO_DISPLAY_NAMES[repo] || repo.split("/")[1];
};

// Fetch ALL PRs by the user across all GitHub repos (excluding own repos)
const fetchAllGitHubPRs = async (token?: string): Promise<Contribution[]> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

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

  // Transform GitHub PRs to our Contribution format
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
        description: pr.body?.slice(0, 200) || "No description provided.",
        url: pr.html_url,
        date: pr.created_at.split("T")[0],
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
const fetchPRDetails = async (
  contribution: Contribution,
  token?: string
): Promise<Contribution> => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

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
const fetchGerritContributions = async (): Promise<Contribution[]> => {
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

// Main fetcher function for SWR
const fetchAllContributions = async (): Promise<Contribution[]> => {
  // Get GitHub token from environment variable (optional)
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // Fetch ALL PRs from GitHub (no hardcoded repos)
  const githubPromise = fetchAllGitHubPRs(token);

  // Fetch contributions from Gerrit via API route
  const gerritPromise = fetchGerritContributions();

  // Wait for all fetches to complete
  const [githubContributions, gerritContributions] = await Promise.all([
    githubPromise,
    gerritPromise,
  ]);

  // Combine all contributions
  let allContributions = [...githubContributions, ...gerritContributions];

  // Fetch details for GitHub PRs (line counts, files)
  // Only fetch details for first 15 GitHub PRs to avoid rate limits
  const detailPromises = githubContributions.slice(0, 15).map((c) => fetchPRDetails(c, token));
  const detailedContributions = await Promise.all(detailPromises);

  // Merge detailed info back into GitHub contributions
  allContributions = allContributions.map((c) => {
    if (c.source === "github") {
      const detailed = detailedContributions.find((d) => d.id === c.id);
      return detailed || c;
    }
    return c;
  });

  // Sort by date (newest first)
  allContributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allContributions;
};

// Hook return type
interface UseGitHubContributionsResult {
  contributions: Contribution[];
  isLoading: boolean;
  isError: boolean;
}

// Custom hook to fetch GitHub contributions with caching
const useGitHubContributions = (): UseGitHubContributionsResult => {
  const { data, error, isLoading } = useSWR<Contribution[]>(
    "github-contributions",
    fetchAllContributions,
    {
      // Cache for 10 minutes
      dedupingInterval: 600000,
      // Revalidate every 10 minutes
      refreshInterval: 600000,
      // Don't revalidate on focus to save API calls
      revalidateOnFocus: false,
      // Retry 2 times on error
      errorRetryCount: 2,
      // Keep previous data while revalidating
      keepPreviousData: true,
    }
  );

  return {
    contributions: data || [],
    isLoading,
    isError: !!error,
  };
};

export default useGitHubContributions;

// Export helper to get unique projects from contributions
// Get unique projects for filter dropdown - returns full repo paths (e.g., "langchain-ai/langchain")
export const getUniqueProjects = (contributionsList: Contribution[]): string[] => {
  return [...new Set(contributionsList.map((c) => c.repo))];
};
