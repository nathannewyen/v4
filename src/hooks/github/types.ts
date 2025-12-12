import { Contribution } from "@/types";

// GitHub Pull Request response from search API
export interface GitHubPR {
  id: number;
  number: number;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  state: string;
  repository_url: string;
  pull_request?: {
    merged_at: string | null;
  };
}

// GitHub search API response wrapper
export interface GitHubSearchResponse {
  total_count: number;
  items: GitHubPR[];
}

// GitHub commit API response
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
  };
}

// Hook return type for useGitHubContributions
export interface UseGitHubContributionsResult {
  contributions: Contribution[];
  isLoading: boolean;
  isError: boolean;
}
