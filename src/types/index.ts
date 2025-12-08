// Type definitions for the portfolio

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
  status: "merged" | "open" | "closed";
  additions: number;
  deletions: number;
  files: string[];
  source: "github" | "gerrit";
}
