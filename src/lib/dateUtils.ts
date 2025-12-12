// Date utility functions for consistent date handling across the application

/**
 * Format a date string for display (e.g., "Dec 11, 2025")
 * Uses noon time to prevent timezone day shift issues
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Convert an ISO timestamp to local date string (YYYY-MM-DD)
 * Used to match GitHub's heatmap behavior (shows dates in user's local timezone)
 */
export const isoToLocalDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString("en-CA");
};

/**
 * Extract date from ISO string by splitting on "T"
 * Note: This returns UTC date, not local date
 */
export const extractDateFromISO = (isoString: string): string => {
  return isoString.split("T")[0];
};

/**
 * Generate a date key (YYYY-MM-DD) for a given date object
 * Uses local timezone
 */
export const getLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
