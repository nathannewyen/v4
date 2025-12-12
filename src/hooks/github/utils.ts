import { Contribution } from "@/types";
import { REPO_DISPLAY_NAMES } from "./constants";

// Extract repo path (owner/repo) from GitHub API repository URL
// Format: https://api.github.com/repos/owner/repo
export const getRepoFromUrl = (repositoryUrl: string): string => {
  const urlParts = repositoryUrl.split("/");
  const owner = urlParts[urlParts.length - 2];
  const repo = urlParts[urlParts.length - 1];
  return `${owner}/${repo}`;
};

// Get human-readable display name for a repository
// Falls back to repo name (second part of path) if not in REPO_DISPLAY_NAMES
export const getRepoDisplayName = (repo: string): string => {
  const displayName = REPO_DISPLAY_NAMES[repo];
  if (displayName) {
    return displayName;
  }
  return repo.split("/")[1];
};

// Get unique project repo paths from a list of contributions
// Used for the project filter dropdown
export const getUniqueProjects = (contributionsList: Contribution[]): string[] => {
  return [...new Set(contributionsList.map((c) => c.repo))];
};
