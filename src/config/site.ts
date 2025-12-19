// =============================================================================
// SITE CONFIGURATION
// =============================================================================
// This is the main configuration file for your portfolio.
// Update the values below to customize the site with your own information.
// =============================================================================

export const siteConfig = {
  // -------------------------------------------------------------------------
  // PERSONAL INFORMATION
  // -------------------------------------------------------------------------
  // Your name displayed on the hero section (will be split into two lines)
  name: {
    first: "NHAN",
    last: "NGUYEN",
  },

  // Your professional title (displayed below your name)
  title: "Software Engineer @ JPMorgan Chase",

  // Short bio or tagline describing yourself
  bio: "AI/ML/Engineer. Interested in AI agents, drones, rockets, and software development.",

  // Path to your resume PDF (place the file in the /public folder)
  resumePath: "/resume.pdf",

  // -------------------------------------------------------------------------
  // SOCIAL LINKS
  // -------------------------------------------------------------------------
  // Add your social media URLs and display names
  social: {
    github: {
      url: "https://github.com/nathannewyen",
      displayName: "github.com/nathannewyen",
    },
    twitter: {
      url: "https://x.com/nathannewyenn",
      displayName: "x.com/nathannewyenn",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/nhannguyen3112/",
      displayName: "linkedin.com/nhannguyen3112",
    },
    notes: {
      url: "https://notes.newyen.dev",
      displayName: "notes.newyen.dev",
    },
    email: {
      address: "nhan13574@gmail.com",
      // Display format with (at) to reduce spam scraping
      displayName: "nhan13574 (at) gmail.com",
    },
  },

  // -------------------------------------------------------------------------
  // SEO & METADATA
  // -------------------------------------------------------------------------
  // Site title for browser tab and SEO
  siteTitle: "Nhan Nguyen - Software Engineer",

  // Site description for SEO
  siteDescription:
    "Software Engineer specializing in AI/ML, open source contributions, and full-stack development.",

  // Base URL of your deployed site (used for SEO and social sharing)
  siteUrl: "https://newyen.dev",
} as const;

// Type exports for TypeScript support
export type SiteConfig = typeof siteConfig;
