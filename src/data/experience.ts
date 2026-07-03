import { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "JPMorgan Chase",
    url: "https://www.jpmorganchase.com/",
    location: "Atlanta, GA",
    roles: [
      {
        title: "Software Engineer III",
        period: "March 2023 — June 2026",
        summary:
          "Built the React/TypeScript frontend for the Chase card platform (customer browsing + marketer tooling, 10+ card products), and worked in Java/Spring Boot on the backend rewards engine (promotions, offers, points logic).",
      },
    ],
  },
  {
    company: "Hawk Ridge Systems",
    url: "https://hawkridgesys.com/",
    location: "Remote",
    roles: [
      {
        title: "Software Engineer",
        period: "January 2020 — February 2023",
        summary:
          "Owned the React/TypeScript frontend for an enterprise ecommerce platform selling 3D scanning and 3D printing hardware (100–200 SKUs) — checkout, search, and the internal component library.",
      },
    ],
  },
];
