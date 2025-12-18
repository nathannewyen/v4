import useSWR from "swr";
import { Project } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { standardSwrConfig } from "@/lib/swrConfig";

// GitHub API response type for repository data
interface GitHubRepoResponse {
  stargazers_count: number;
}

// Return type for useGitHubStars hook
interface UseGitHubStarsResult {
  projects: Project[];
  isLoading: boolean;
}

// Format star count to human-readable format (e.g., 120000 -> "120k")
const formatStarCount = (starCount: number): string => {
  if (starCount >= 1000) {
    return `${(starCount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return starCount.toString();
};

// Custom hook to fetch GitHub star counts for projects using SWR
// Provides caching, deduplication, and offline support
// Cache duration: 5 minutes (respects GitHub API rate limits of 60/hour)
const useGitHubStars = (initialProjects: Project[]): UseGitHubStarsResult => {
  // Create a stable cache key from all repo names
  const repoNames = initialProjects.map((project) => project.repo).join(",");

  // Fetch GitHub star counts using centralized SWR config for consistent caching
  const { data, isLoading } = useSWR<GitHubRepoResponse[]>(
    repoNames ? `github-stars:${repoNames}` : null,
    async () => {
      // Fetch all repos in parallel for better performance
      const responses = await Promise.all(
        initialProjects.map((project) =>
          fetcher<GitHubRepoResponse>(`https://api.github.com/repos/${project.repo}`)
        )
      );
      return responses;
    },
    standardSwrConfig
  );

  // Merge fetched star counts with initial project data
  const projectsWithStars: Project[] = initialProjects.map((project, index) => {
    if (data && data[index]) {
      const formattedStars = formatStarCount(data[index].stargazers_count);
      return { ...project, stars: formattedStars };
    }
    // Return original project with fallback stars if fetch fails
    return project;
  });

  return {
    projects: projectsWithStars,
    isLoading,
  };
};

export default useGitHubStars;
