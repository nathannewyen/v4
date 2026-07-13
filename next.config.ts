import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// Initialize PWA with configuration
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Disable in development to avoid caching issues
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Disable source maps in production to protect code from being copied
  productionBrowserSourceMaps: false,
  // Optimize barrel imports for heavier packages so unused exports are tree-shaken
  experimental: {
    optimizePackageImports: ["swr", "@spacing-ui/core"],
  },
  // Allow external images from GitHub for organization avatars
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  // Empty turbopack config to allow both turbopack and webpack plugins
  turbopack: {},
  // Proxy the agent's endpoints to the standalone agent app so the terminal
  // in the hero can call them same-origin (no CORS setup needed).
  async rewrites() {
    return [
      {
        source: "/api/analyze",
        destination: "https://agent.newyen.dev/api/analyze",
      },
      {
        source: "/api/chat",
        destination: "https://agent.newyen.dev/api/chat",
      },
    ];
  },
  // Security headers for production
  async headers() {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' + 'unsafe-eval' needed for Next.js runtime and framer-motion.
      // Vercel Analytics loads from va.vercel-scripts.com.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://github.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.github.com https://agent.newyen.dev https://vitals.vercel-analytics.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
