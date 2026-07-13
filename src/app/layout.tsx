import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

// Inter font for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Space Mono font for monospace elements
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Viewport configuration for PWA
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A2234" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Metadata for SEO, social sharing, PWA, and browser tab
export const metadata: Metadata = {
  title: "Nhan Nguyen | Software Engineer",
  description:
    "Interested in UI/UX, AI agents, drones, rockets, and software development. Contributor to React, Redux, Expo, and LangChain.",
  keywords: [
    "software engineer",
    "UI/UX",
    "AI",
    "React",
    "Redux",
    "Expo",
    "TypeScript",
    "Next.js",
    "LangChain",
  ],
  authors: [{ name: "Nhan Nguyen", url: "https://github.com/nathannewyen" }],
  creator: "Nhan Nguyen",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nhan Nguyen",
  },
  openGraph: {
    title: "Nhan Nguyen | Software Engineer",
    description: "Interested in UI/UX, AI agents, drones, rockets, and software development.",
    url: "https://newyen.dev",
    siteName: "Nhan Nguyen Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhan Nguyen | Software Engineer",
    description: "Interested in UI/UX, AI agents, drones, rockets, and software development.",
    creator: "@nathannewyenn",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "9IWr-bceEU9CEWHYL_ttTxwSK4rxv7SBdT5C-Qr1XCA",
  },
  metadataBase: new URL("https://newyen.dev"),
};

// JSON-LD structured data for SEO - helps Google understand this is a professional portfolio
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nhan Nguyen",
  jobTitle: "Software Engineer",
  url: "https://newyen.dev",
  sameAs: [
    "https://github.com/nathannewyen",
    "https://x.com/nathannewyenn",
    "https://linkedin.com/in/nhannguyen3112",
  ],
  knowsAbout: ["React", "Redux", "TypeScript", "Next.js", "Expo", "AI", "LangChain"],
};

// Root layout component - wraps all pages with fonts and global styles
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
