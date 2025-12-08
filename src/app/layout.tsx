import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
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

// Metadata for SEO, social sharing, and browser tab
export const metadata: Metadata = {
  title: "Nhan Nguyen | Software Engineer",
  description: "Full-stack software engineer at JPMorgan Chase. Interested in AI agents, drones, rockets, and software development. Contributor to React Native, Kubernetes, Go, and LangChain.",
  keywords: ["software engineer", "AI", "ML", "React", "TypeScript", "Go", "Kubernetes", "React Native", "LangChain", "JPMorgan Chase"],
  authors: [{ name: "Nhan Nguyen", url: "https://github.com/nathannewyen" }],
  creator: "Nhan Nguyen",
  openGraph: {
    title: "Nhan Nguyen | Software Engineer",
    description: "Full-stack software engineer at JPMorgan Chase. Interested in AI agents, drones, rockets, and software development.",
    url: "https://nathan-v4.vercel.app",
    siteName: "Nhan Nguyen Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhan Nguyen | Software Engineer",
    description: "Full-stack software engineer at JPMorgan Chase. Interested in AI agents, drones, rockets, and software development.",
    creator: "@nathannewyenn",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://nathan-v4.vercel.app"),
};

// Root layout component - wraps all pages with fonts and global styles
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
