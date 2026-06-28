import { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
  {
    name: "The Beuter Design — Ecommerce Platform",
    url: "https://github.com/nathannewyen/the-beuter-design-ecommerce-platform",
    caseStudyUrl: "/projects/the-beuter-design",
    tagline:
      "An ecommerce frontend in Next.js 16, React 19, and Tailwind v4 — using the BEUTER® brand system as a forcing function to ship a real DTC storefront end to end.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Zustand"],
    screenshots: [
      { src: "/projects/beuter/home.jpg", alt: "Beuter homepage with campaign hero" },
      { src: "/projects/beuter/shop.jpg", alt: "Beuter shop listing with category sidebar" },
      { src: "/projects/beuter/product.jpg", alt: "Beuter product detail page" },
    ],
  },
  {
    name: "Grably — Mobile Ordering for Food Distribution",
    url: "https://github.com/nathannewyen/grably-mobile-ui",
    tagline:
      "Cross-platform mobile app in React Native + TypeScript connecting food distributors with their customers — catalog, ordering, and real-time order tracking.",
    techStack: ["React Native", "TypeScript", "Python", "PostgreSQL", "AWS"],
    screenshots: [
      {
        src: "/projects/grably/workflow.jpg",
        alt: "Grably catalog screen with promotions and reorder suggestions",
      },
      {
        src: "/projects/grably/payments-plaid.jpg",
        alt: "Grably payments screen with Plaid integration and overdue invoices",
      },
      {
        src: "/projects/grably/order-agent.jpg",
        alt: "GrablyAI order agent parsing a delivery request into line items",
      },
    ],
  },
];
