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
  // Empty turbopack config to allow both turbopack and webpack plugins
  turbopack: {},
  // Security headers for production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
