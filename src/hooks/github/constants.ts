// GitHub username to fetch contributions for
// Configurable via environment variable for easy forking
export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "nathannewyen";

// API route for Gerrit contributions (server-side to bypass CORS)
export const GERRIT_API_ROUTE = "/api/gerrit";

// Own repos to include commits from (empty - only show OSS contributions)
export const OWN_REPOS_TO_INCLUDE: string[] = [];

// Map repo full names to display names for known projects
// New repos will automatically use the repo name as display name
export const REPO_DISPLAY_NAMES: Record<string, string> = {
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
