// Type definitions for the portfolio

import { CONTRIBUTION_SOURCES, CONTRIBUTION_STATUSES } from "@/constants";

// Filter source type derived from CONTRIBUTION_SOURCES constant
export type FilterSource = (typeof CONTRIBUTION_SOURCES)[number];

// Filter status type derived from CONTRIBUTION_STATUSES constant
export type StatusFilter = (typeof CONTRIBUTION_STATUSES)[number];

// Sort order type for contribution list
// newest/oldest sort by creation date, updated sorts by merged_at or updated_at
export type SortOrder = "newest" | "oldest" | "updated";

// Project type definition for open source contributions
export interface Project {
  name: string;
  repo: string;
  description: string;
  tags: string[];
  url: string;
  stars: string;
}

// Role type definition for job positions within a company
export interface Role {
  title: string;
  period: string;
  description: string;
}

// Experience type definition for work history entries
export interface Experience {
  company: string;
  url: string;
  location: string;
  roles: Role[];
}

// Contribution type definition for open source contributions showcase
export interface Contribution {
  id: string;
  repo: string;
  repoName: string;
  type: "pr" | "commit" | "issue";
  title: string;
  description: string;
  url: string;
  date: string;
  // For "Last Updated" sorting - stores merged_at if merged, otherwise updated_at
  updatedAt?: string;
  status: "merged" | "open" | "closed";
  additions: number;
  deletions: number;
  files: string[];
  source: "github" | "gerrit";
}
