import useSWR from "swr";
import { Contribution } from "@/types";
import { fetchAllContributions, UseGitHubContributionsResult } from "./github";

// Re-export getUniqueProjects for components that need it
export { getUniqueProjects } from "./github";

// Custom hook to fetch GitHub contributions with caching via SWR
const useGitHubContributions = (): UseGitHubContributionsResult => {
  const { data, error, isLoading } = useSWR<Contribution[]>(
    "github-contributions",
    fetchAllContributions,
    {
      // Cache for 10 minutes
      dedupingInterval: 600000,
      // Revalidate every 10 minutes
      refreshInterval: 600000,
      // Don't revalidate on focus to save API calls
      revalidateOnFocus: false,
      // Retry 2 times on error
      errorRetryCount: 2,
      // Keep previous data while revalidating
      keepPreviousData: true,
    }
  );

  return {
    contributions: data || [],
    isLoading,
    isError: !!error,
  };
};

export default useGitHubContributions;
