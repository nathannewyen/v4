import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
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

// Metadata for SEO and browser tab
export const metadata: Metadata = {
  title: "Nathan Nguyen | Portfolio",
  description: "Personal portfolio website",
};

// Root layout component - wraps all pages with fonts and global styles
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
