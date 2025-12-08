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
