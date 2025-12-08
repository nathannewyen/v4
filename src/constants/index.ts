// Design System - Centralized design tokens for consistent styling
// All color values should reference these constants

export const COLORS = {
  // === LIGHT MODE ===
  light: {
    // Backgrounds
    bgPrimary: "#f5f5f5", // Main page background (Hero, Projects)
    bgSecondary: "white", // Alternating sections (Experience, Connect)
    bgNavbar: "#1A2234", // Navbar background
    bgCard: "white", // Card backgrounds

    // Text
    textPrimary: "#1A2234", // Primary text, headings
    textSecondary: "#666", // Descriptions, body text
    textMuted: "#888", // Muted text (locations, periods)
    textTag: "#555", // Tag text

    // Borders
    borderPrimary: "#1A2234", // Primary borders
    borderSecondary: "#e0e0e0", // Dividers, subtle borders

    // Decorative
    tagBg: "#e8e8e8", // Tag backgrounds
    boxOss: "#CBD5E1", // OSS decorative box
    boxAi: "#E2E8F0", // AI decorative box
  },

  // === DARK MODE ===
  dark: {
    // Backgrounds
    bgPrimary: "#0a0a0f", // Main page background (Hero, Projects)
    bgSecondary: "#12121a", // Alternating sections (Experience, Connect)
    bgNavbar: "#15151f", // Navbar background
    bgCard: "#15151f", // Card backgrounds

    // Text
    textPrimary: "white", // Primary text, headings
    textSecondary: "#a0a0a0", // Descriptions, body text
    textMuted: "#777", // Muted text (locations, periods)
    textTag: "#aaa", // Tag text

    // Borders
    borderPrimary: "white", // Primary borders
    borderSecondary: "#3a3a4e", // Dividers, subtle borders

    // Decorative
    tagBg: "#2a2a3e", // Tag backgrounds
    boxOss: "#2a2a3e", // OSS decorative box
    boxAi: "#1a1a2e", // AI decorative box
  },
} as const;

// Navigation section names - used for nav links and scroll targets
export const NAVIGATION_SECTIONS = ["intro", "experience", "projects"] as const;

// Social links - centralized URLs for easy updates
export const SOCIAL_LINKS = {
  github: "https://github.com/nathannewyen",
  twitter: "https://x.com/nathannewyenn",
  email: "nhan13574@gmail.com",
} as const;

// Spacing constants for consistent padding/margins
export const SPACING = {
  sectionPadding: "py-16 md:py-32",
  containerPadding: "px-4 md:px-16",
  maxWidth: "max-w-[1440px]",
} as const;
