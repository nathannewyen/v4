import type { Metadata } from "next";
import ContributionsShowcase from "@/components/ContributionsShowcase";

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "Open Source Contributions | Nhan Nguyen",
  description:
    "View my open source contributions to React Native, Kubernetes, Go, and LangChain. Pull requests, commits, and code changes to major open source projects.",
  openGraph: {
    title: "Open Source Contributions | Nhan Nguyen",
    description:
      "View my open source contributions to React Native, Kubernetes, Go, and LangChain.",
    url: "https://nathan-v4.vercel.app/contributions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Contributions | Nhan Nguyen",
    description:
      "View my open source contributions to React Native, Kubernetes, Go, and LangChain.",
  },
};

// Contributions page - displays open source contributions showcase
export default function ContributionsPage() {
  return <ContributionsShowcase />;
}
