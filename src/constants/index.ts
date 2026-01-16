// Barrel export - Re-exports all constants for backward compatibility
// Import from specific files for better code organization:
//   - colors.ts: COLORS, PROJECT_COLORS, DEFAULT_PROJECT_COLORS, GITHUB_COLORS
//   - contributions.ts: STATUS_CONFIG, CONTRIBUTION_SOURCES, CONTRIBUTION_STATUSES
//   - config.ts: NAVIGATION_SECTIONS, SOCIAL_LINKS, SPACING, animation/API constants

export { COLORS, PROJECT_COLORS, DEFAULT_PROJECT_COLORS, GITHUB_COLORS } from "./colors";

export { STATUS_CONFIG, CONTRIBUTION_SOURCES, CONTRIBUTION_STATUSES } from "./contributions";

export {
  NAVIGATION_SECTIONS,
  SOCIAL_LINKS,
  SPACING,
  ANIMATION_DELAY_MS,
  HEATMAP_CELL_ANIMATION_DELAY,
  DESCRIPTION_MAX_LENGTH,
  PR_DETAILS_FETCH_LIMIT,
  COMMITS_PER_PAGE,
  ITEMS_PER_PAGE,
} from "./config";
