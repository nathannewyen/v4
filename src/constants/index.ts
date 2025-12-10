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
  linkedin: "https://www.linkedin.com/in/nhannguyen3112/",
  email: "nhan13574@gmail.com",
} as const;

// Spacing constants for consistent padding/margins
export const SPACING = {
  sectionPadding: "py-16 md:py-32",
  containerPadding: "px-4 md:px-16",
  maxWidth: "max-w-[1440px]",
} as const;

// Project metadata for contributions showcase
export const PROJECT_COLORS = {
  "React Native": {
    primary: "#61DAFB",
    background: "bg-[#61DAFB]/10",
    text: "text-[#61DAFB]",
    border: "border-[#61DAFB]/30",
  },
  Kubernetes: {
    primary: "#326CE5",
    background: "bg-[#326CE5]/10",
    text: "text-[#326CE5]",
    border: "border-[#326CE5]/30",
  },
  Go: {
    primary: "#00ADD8",
    background: "bg-[#00ADD8]/10",
    text: "text-[#00ADD8]",
    border: "border-[#00ADD8]/30",
  },
  LangChain: {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  LangChainJS: {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  LangGraph: {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  "LangGraph JS": {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  "LangChain Docs": {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  LangServe: {
    primary: "#1C3C3C",
    background: "bg-[#1C3C3C]/10 dark:bg-[#2dd4bf]/10",
    text: "text-[#1C3C3C] dark:text-[#2dd4bf]",
    border: "border-[#1C3C3C]/30 dark:border-[#2dd4bf]/30",
  },
  Stylelint: {
    primary: "#263238",
    background: "bg-[#263238]/10 dark:bg-[#78909C]/10",
    text: "text-[#263238] dark:text-[#78909C]",
    border: "border-[#263238]/30 dark:border-[#78909C]/30",
  },
  Flutter: {
    primary: "#02569B",
    background: "bg-[#02569B]/10",
    text: "text-[#02569B]",
    border: "border-[#02569B]/30",
  },
} as const;

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

// Animation timing
export const ANIMATION_DELAY_MS = 50;
