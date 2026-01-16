// Color System - All color-related constants for consistent styling
// Includes design system colors, GitHub theme colors, and project-specific colors

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

// Project metadata colors for contributions showcase
// Maps repository names to their brand colors
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

// Default colors for repositories not in PROJECT_COLORS
export const DEFAULT_PROJECT_COLORS = {
  primary: "#6B7280",
  background: "bg-gray-500/10",
  text: "text-gray-600 dark:text-gray-400",
  border: "border-gray-500/30",
} as const;

// GitHub UI colors - exact colors from GitHub's design system
export const GITHUB_COLORS = {
  // Card and container backgrounds
  cardBg: {
    light: "white",
    dark: "#161b22",
  },
  // Border colors
  border: {
    light: "#d0d7de",
    dark: "#30363d",
  },
  // Interactive border colors for hover states
  borderHover: {
    light: "#0969da",
    dark: "#58a6ff",
  },
  // Text colors
  text: {
    primary: {
      light: "#24292f",
      dark: "#c9d1d9",
    },
    muted: {
      light: "#57606a",
      dark: "#8b949e",
    },
  },
  // Tooltip colors
  tooltip: {
    bg: "#24292f",
    text: "white",
  },
  // GitHub button colors (for link button in filters)
  button: {
    light: {
      bg: "#24292f",
      bgHover: "#32383f",
    },
    dark: {
      bg: "#f0f6fc",
      bgHover: "#d0d7de",
    },
  },
  // Heatmap intensity colors - matches GitHub's contribution graph
  heatmap: {
    light: {
      empty: "#ebedf0",
      level1: "#9be9a8",
      level2: "#40c463",
      level3: "#30a14e",
      level4: "#216e39",
    },
    dark: {
      empty: "#161b22",
      level1: "#0e4429",
      level2: "#006d32",
      level3: "#26a641",
      level4: "#39d353",
    },
  },
} as const;
