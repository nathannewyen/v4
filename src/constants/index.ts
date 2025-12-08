// Shared constants for consistent styling and configuration

// Color palette - standardized colors used throughout the portfolio
export const COLORS = {
  // Primary dark navy used for navbar, borders, text
  primary: "#1A2234",
  // Light background color
  background: "#f5f5f5",
  // Muted text color for secondary information
  muted: "#888",
  // Role title color
  roleTitle: "#4A5568",
  // Tag background color
  tagBackground: "#e8e8e8",
  // Tag text color
  tagText: "#555",
  // Description text color
  descriptionText: "#666",
  // Decorative box colors
  ossBoxBackground: "#CBD5E1",
  aiBoxBackground: "#E2E8F0",
} as const;

// Navigation section names - used for nav links and scroll targets
export const NAVIGATION_SECTIONS = ["intro", "experience", "projects"] as const;

// Social links - centralized URLs for easy updates
export const SOCIAL_LINKS = {
  github: "https://github.com/nathannewyen",
  twitter: "https://x.com/nathannewyenn",
  email: "nhan13574@gmail.com",
} as const;
