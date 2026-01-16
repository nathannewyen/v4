// Application Configuration - Layout, navigation, API settings, and timing

import { siteConfig } from "@/config/site";

// Navigation section names - used for nav links and scroll targets
export const NAVIGATION_SECTIONS = ["intro", "experience", "projects"] as const;

// Social links - derived from site config for backward compatibility
// Primary source of truth is src/config/site.ts
export const SOCIAL_LINKS = {
  github: siteConfig.social.github.url,
  twitter: siteConfig.social.twitter.url,
  linkedin: siteConfig.social.linkedin.url,
  email: siteConfig.social.email.address,
} as const;

// Spacing constants for consistent padding/margins
export const SPACING = {
  sectionPadding: "py-16 md:py-32",
  containerPadding: "px-4 md:px-16",
  maxWidth: "max-w-[1440px]",
} as const;

// Animation timing
export const ANIMATION_DELAY_MS = 50;
export const HEATMAP_CELL_ANIMATION_DELAY = 5;

// API configuration
export const DESCRIPTION_MAX_LENGTH = 200;
export const PR_DETAILS_FETCH_LIMIT = 15;
export const COMMITS_PER_PAGE = 50;

// Pagination
export const ITEMS_PER_PAGE = 10;
