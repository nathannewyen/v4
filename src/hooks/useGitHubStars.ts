import { useState, useEffect } from "react";
import { Project } from "@/types";

// Format star count to human-readable format (e.g., 120000 -> "120k")
const formatStarCount = (starCount: number): string => {
  if (starCount >= 1000) {
    return `${(starCount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return starCount.toString();
};

// Custom hook to fetch GitHub star counts for projects
// Takes initial projects with fallback star counts and returns updated projects with live data
const useGitHubStars = (initialProjects: Project[]): Project[] => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    const fetchStars = async () => {
      const updatedProjects = await Promise.all(
        initialProjects.map(async (project) => {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${project.repo}`
            );
            if (response.ok) {
              const data = await response.json();
              const formattedStars = formatStarCount(data.stargazers_count);
              return { ...project, stars: formattedStars };
            }
          } catch (error) {
            console.error(`Failed to fetch stars for ${project.repo}:`, error);
          }
          // Return original project with fallback stars if fetch fails
          return project;
        })
      );
      setProjects(updatedProjects);
    };

    fetchStars();
  }, [initialProjects]);

  return projects;
};

export default useGitHubStars;
