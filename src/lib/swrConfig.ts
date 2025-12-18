// Centralized SWR configuration for consistent caching behavior across all hooks
// This reduces duplication and makes it easy to adjust caching strategy globally

import { SWRConfiguration } from "swr";

// Cache duration in milliseconds
const FIVE_MINUTES_MS = 300000;
const TEN_MINUTES_MS = 600000;

// Standard SWR config for external API calls (GitHub, Stack Exchange)
// Uses 5-minute cache to respect API rate limits
export const standardSwrConfig: SWRConfiguration = {
  // Dedupe requests within 5 minutes to prevent duplicate API calls
  dedupingInterval: FIVE_MINUTES_MS,
  // Revalidate data every 5 minutes to keep it fresh
  refreshInterval: FIVE_MINUTES_MS,
  // Don't revalidate on window focus to reduce API calls
  revalidateOnFocus: false,
  // Retry failed requests up to 3 times with exponential backoff
  errorRetryCount: 3,
};

// Extended SWR config for contribution data (larger dataset, less frequent updates)
// Uses 10-minute cache since contribution data changes less frequently
export const contributionSwrConfig: SWRConfiguration = {
  // Dedupe requests within 10 minutes
  dedupingInterval: TEN_MINUTES_MS,
  // Revalidate every 10 minutes
  refreshInterval: TEN_MINUTES_MS,
  // Don't revalidate on window focus to save API calls
  revalidateOnFocus: false,
  // Fewer retries since this fetches from multiple sources
  errorRetryCount: 2,
  // Keep previous data visible while revalidating for smoother UX
  keepPreviousData: true,
};
