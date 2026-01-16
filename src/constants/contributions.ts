// Contribution Page Constants - Status labels, filter options, and styling

// Contribution status configuration - unified config for labels, colors, and icon styles
export const STATUS_CONFIG = {
  merged: {
    label: "Merged",
    color: "text-purple-600 dark:text-purple-400",
    iconColor: "text-purple-600",
  },
  open: {
    label: "In Review",
    color: "text-green-600 dark:text-green-400",
    iconColor: "text-green-600",
  },
  closed: {
    label: "Closed",
    color: "text-red-600 dark:text-red-400",
    iconColor: "text-red-600",
  },
} as const;

// Contribution sources for filter dropdown
export const CONTRIBUTION_SOURCES = ["all", "github", "gerrit"] as const;

// Contribution statuses for filter dropdown
export const CONTRIBUTION_STATUSES = ["all", "merged", "open", "closed"] as const;
