// GitHub username to fetch contributions for
// Configurable via environment variable for easy forking
export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "nathannewyen";

// API route for Gerrit contributions (server-side to bypass CORS)
export const GERRIT_API_ROUTE = "/api/gerrit";

// Own repos to include commits from (empty - only show OSS contributions)
export const OWN_REPOS_TO_INCLUDE: string[] = [];

// Map organization names to display names for grouping in filters
// All repos under these orgs will be grouped together (e.g., langchain-ai/* → "LangChain")
export const ORG_DISPLAY_NAMES: Record<string, string> = {
  "langchain-ai": "LangChain",
  golang: "Go",
};

// Map specific repo full names to display names
// Used for repos that need custom names different from their org grouping
// Falls back to repo name if not specified
export const REPO_DISPLAY_NAMES: Record<string, string> = {
  "facebook/react-native": "React Native",
  "kubernetes/kubernetes": "Kubernetes",
  "stylelint/stylelint": "Stylelint",
  "flutter/flutter": "Flutter",
  "flutter/engine": "Flutter Engine",
};
