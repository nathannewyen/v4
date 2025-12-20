import { Contribution } from "@/types";
import { REPO_DISPLAY_NAMES, ORG_DISPLAY_NAMES } from "./constants";

// Extract repo path (owner/repo) from GitHub API repository URL
// Format: https://api.github.com/repos/owner/repo
export const getRepoFromUrl = (repositoryUrl: string): string => {
  const urlParts = repositoryUrl.split("/");
  const owner = urlParts[urlParts.length - 2];
  const repo = urlParts[urlParts.length - 1];
  return `${owner}/${repo}`;
};

// Get human-readable display name for a repository
// Priority: 1) Specific repo mapping, 2) Org-based grouping, 3) Repo name fallback
export const getRepoDisplayName = (repo: string): string => {
  // If it's already a display name (no slash), return as-is
  if (!repo.includes("/")) {
    return repo;
  }

  // Check for specific repo mapping first
  const repoDisplayName = REPO_DISPLAY_NAMES[repo];
  if (repoDisplayName) {
    return repoDisplayName;
  }

  // Check for org-based grouping (e.g., langchain-ai/* → "LangChain")
  const org = repo.split("/")[0];
  const orgDisplayName = ORG_DISPLAY_NAMES[org];
  if (orgDisplayName) {
    return orgDisplayName;
  }

  // Fallback to repo name (second part of path)
  return repo.split("/")[1];
};

// Reverse lookup: get an org name from a display name
// Used to fetch avatars for grouped projects
const displayNameToOrg: Record<string, string> = Object.fromEntries(
  Object.entries(ORG_DISPLAY_NAMES).map(([org, displayName]) => [displayName, org])
);

// Get GitHub avatar URL for a project (works with both repo paths and display names)
export const getProjectAvatarUrl = (project: string): string | null => {
  // If it's a repo path (contains "/"), extract org directly
  if (project.includes("/")) {
    return `https://github.com/${project.split("/")[0]}.png`;
  }

  // Check if it's a grouped display name (like "LangChain" → "langchain-ai")
  const org = displayNameToOrg[project];
  if (org) {
    return `https://github.com/${org}.png`;
  }

  // No avatar available for this display name
  return null;
};

// Get unique projects from a list of contributions
// Returns one representative repo path per display name group
// Used for the project filter dropdown (maintains repo path for avatar lookup)
export const getUniqueProjects = (contributionsList: Contribution[]): string[] => {
  const displayNameToRepo = new Map<string, string>();

  // Keep first repo encountered for each display name
  for (const contribution of contributionsList) {
    const displayName = getRepoDisplayName(contribution.repo);
    if (!displayNameToRepo.has(displayName)) {
      displayNameToRepo.set(displayName, contribution.repo);
    }
  }

  // Return repo paths (one per display name group)
  return Array.from(displayNameToRepo.values());
};

// Check if a repo matches a selected project filter
// Compares by display name to handle grouped projects
// e.g., selecting "langchain-ai/langchain" matches "langchain-ai/langgraph" (both display as "LangChain")
export const repoMatchesProject = (repo: string, selectedProject: string): boolean => {
  return getRepoDisplayName(repo) === getRepoDisplayName(selectedProject);
};
