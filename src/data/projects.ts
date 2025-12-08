import { Project } from "@/types";

// Initial project data with fallback star counts
// Star counts are updated dynamically from GitHub API on client
export const initialProjects: Project[] = [
  {
    name: "React Native",
    repo: "facebook/react-native",
    description:
      "A framework for building native applications using React. Build mobile apps for iOS and Android.",
    tags: ["React", "Mobile", "JavaScript"],
    url: "https://github.com/facebook/react-native",
    stars: "120k",
  },
  {
    name: "Kubernetes",
    repo: "kubernetes/kubernetes",
    description:
      "Production-grade container orchestration. Automate deployment, scaling, and management of containerized applications.",
    tags: ["Go", "Containers", "Cloud"],
    url: "https://github.com/kubernetes/kubernetes",
    stars: "112k",
  },
  {
    name: "Go",
    repo: "golang/go",
    description:
      "The Go programming language. An open source programming language that makes it easy to build simple, reliable, and efficient software.",
    tags: ["Go", "Programming Language", "Systems"],
    url: "https://github.com/golang/go",
    stars: "125k",
  },
  {
    name: "LangChain",
    repo: "langchain-ai/langchain",
    description:
      "Build context-aware reasoning applications. A framework for developing applications powered by large language models.",
    tags: ["Python", "AI", "LLMs"],
    url: "https://github.com/langchain-ai/langchain",
    stars: "100k",
  },
];
