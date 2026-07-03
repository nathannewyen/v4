import { Project } from "@/types";

// Initial project data with fallback star counts
// Star counts are updated dynamically from GitHub API on client
export const initialProjects: Project[] = [
  {
    name: "React",
    repo: "facebook/react",
    description:
      "The library for web and native user interfaces. Build declarative, component-based UIs with a rich ecosystem.",
    tags: ["React", "JavaScript", "UI"],
    url: "https://github.com/facebook/react",
    stars: "230k",
  },
  {
    name: "Redux",
    repo: "reduxjs/redux",
    description:
      "A predictable state container for JavaScript apps. Centralize application state and logic to enable powerful debugging.",
    tags: ["React", "State Management", "JavaScript"],
    url: "https://github.com/reduxjs/redux",
    stars: "60k",
  },
  {
    name: "Expo",
    repo: "expo/expo",
    description:
      "An open-source platform for making universal native apps with React. Build one JavaScript/TypeScript project that runs on Android, iOS, and the web.",
    tags: ["React Native", "TypeScript", "Mobile"],
    url: "https://github.com/expo/expo",
    stars: "35k",
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
