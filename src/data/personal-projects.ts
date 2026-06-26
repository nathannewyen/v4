import { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
  {
    name: "The Beuter Design — Ecommerce Platform",
    url: "https://github.com/nathannewyen/the-beuter-design-ecommerce-platform",
    tagline:
      "Portfolio replica of the BEUTER® webstore — a Next.js 16 / React 19 / Tailwind v4 study project showcasing ecommerce UI/UX under a restrained brand system.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Zustand",
      "Framer Motion",
      "next-intl",
      "Storybook",
      "Playwright",
    ],
    features: [
      "Fixed left-sidebar navigation with full-bleed campaign hero carousel and reveal-on-scroll editorial sections.",
      "Server-rendered webstore (/shop) with category sidebar (Collections / Tops / Bottoms / Accessories) and URL-driven filters.",
      "SSG product detail pages with image gallery, size picker, and add-to-cart flow.",
      "Persistent cart and wishlist powered by Zustand with localStorage persistence and an SSR-safe storage shim.",
      "EN/VN internationalization via next-intl, cookie-persisted, with full translation coverage across nav, footer, and content.",
      "Storybook component docs, Playwright e2e journeys, and a GitHub Actions CI pipeline (lint · typecheck · build · Storybook · Playwright).",
    ],
    descriptions: [
      "Built a production-grade ecommerce frontend in Next.js 16 (App Router, Turbopack) with React 19 and Tailwind v4, modeling a real fashion-brand storefront end to end.",
      "Designed a fixed-sidebar layout system, persistent cart drawer, and editorial campaign pages backed by seeded data and brand-token theming via Tailwind's `@theme inline`.",
      "Implemented EN/VN locale switching with next-intl, persisting locale via cookie and rendering translated server components and metadata.",
      "Shipped a full quality pipeline — Storybook component docs, Playwright e2e tests (home, shop, cart, locale), and CI on every push.",
    ],
    screenshots: [
      { src: "/projects/beuter/home.jpg", alt: "Beuter homepage with campaign hero" },
      { src: "/projects/beuter/shop.jpg", alt: "Beuter shop listing with category sidebar" },
      { src: "/projects/beuter/product.jpg", alt: "Beuter product detail page" },
      { src: "/projects/beuter/wishlist.jpg", alt: "Beuter wishlist page" },
      { src: "/projects/beuter/about.jpg", alt: "Beuter about page" },
    ],
  },
  {
    name: "Grably (Github)",
    url: "https://github.com/nathannewyen/grably-mobile-ui",
    descriptions: [
      "Built Grably, a cross-platform mobile app in React Native and TypeScript, connecting food distributors with their customers — browse a distributor's catalog, place orders, and check out in-app.",
      "Implemented real-time in-app order tracking so customers can follow an order from purchase through fulfillment.",
      "Built the backend in Python with a polyglot data layer — PostgreSQL for relational data and DynamoDB for high-throughput, flexible access patterns.",
      "Containerized services with Docker and deployed on AWS ECS (EC2-backed), with CloudWatch for logging, metrics, and health monitoring.",
      "Wrote unit tests around core ordering and checkout logic to keep releases stable; designed and shipped the full product end to end as a solo founder.",
      "Shipped the full product end to end as a solo founder, accelerating delivery with an AI-assisted development workflow.",
    ],
  },
];
