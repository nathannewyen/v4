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
          "Built the React/TypeScript frontend for the consumer card catalog (500+ marketing users, 10+ card products) and the customer-facing rewards UI across JPMC's consumer card portfolio.",
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
