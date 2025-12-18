import useSWR from "swr";
import { Contribution } from "@/types";
import { fetchAllContributions, UseGitHubContributionsResult } from "./github";
import { contributionSwrConfig } from "@/lib/swrConfig";

// Re-export getUniqueProjects for components that need it
export { getUniqueProjects } from "./github";

// Custom hook to fetch GitHub contributions with caching via SWR
// Uses contribution-specific config with longer cache duration (10 min vs 5 min)
const useGitHubContributions = (): UseGitHubContributionsResult => {
  const { data, error, isLoading } = useSWR<Contribution[]>(
    "github-contributions",
    fetchAllContributions,
    contributionSwrConfig
  );

  return {
    contributions: data || [],
    isLoading,
    isError: !!error,
  };
};

export default useGitHubContributions;
