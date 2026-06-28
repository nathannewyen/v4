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
        projects: [
          {
            name: "Card Product Launch — internal catalog tool for marketing",
            descriptions: [
              "Built the React/TypeScript frontend for the consumer card catalog used by 500+ marketing users across 10+ card product lines, using Redux-Saga and TanStack Query/Table for a data-dense UI.",
              "Built a shared design token and animation system that translated Figma prototypes into pixel-accurate React views, eliminating per-team style drift across all card surfaces.",
              "Engineered virtualized table rendering and memoization patterns to keep the catalog responsive at scale, supporting smooth concurrent interactions for the 500+ user marketing base.",
            ],
          },
          {
            name: "Rewards Earning — credit card points & rewards",
            descriptions: [
              "Built and shipped the customer-facing rewards UI in React/TypeScript across JPMC's consumer card portfolio, surfacing points earning, reward-tier progression, and rewards history with Redux-Saga managing async flows and complex client state.",
              "Built internal configuration tooling for marketing and operations to set up new offers end to end (offer setup screens, earning-rule definitions, merchant list management), using React/TypeScript and TanStack Query/Table for data-dense admin surfaces.",
              "Built reusable React/TypeScript primitives (data tables, form controls, modals, dropdowns, notifications) and shared hooks for data fetching, auth, and common workflows, adopted across multiple internal banking applications to reduce duplication and accelerate feature delivery.",
              "Migrated legacy class components to functional components with hooks and TypeScript incrementally, extracting business logic into custom hooks and adopting RTK Query for newer features to standardize data fetching and reduce Redux boilerplate.",
              "Established frontend testing conventions with Jest, React Testing Library, and MSW for API mocking, introducing shared test utilities and behavior-focused patterns that improved reliability and reduced production regressions.",
            ],
          },
        ],
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
        descriptions: [
          "Owned frontend development for the e-commerce platform selling 3D scanning and 3D printing hardware to enterprise customers, building reusable React/TypeScript components and product/catalog pages across 100–200 SKUs.",
          "Built customer-facing checkout flows with multi-step forms, address validation, and payment processing, owning end-to-end UX from cart to order confirmation.",
          "Implemented search, filter, and faceted navigation across the 100–200 SKU catalog, tuning both the React UI and underlying PostgreSQL query patterns for fast results on large filter combinations.",
          "Expanded the internal UI library with reusable dashboard widgets, file upload components, permission-aware navigation, and shared form components, partnering with design for consistency and flexibility across business teams.",
        ],
      },
    ],
  },
  {
    company: "Amazon",
    url: "https://www.amazon.com/",
    location: "Remote",
    roles: [
      {
        title: "Software Engineer Intern",
        period: "June 2019 — September 2019",
        descriptions: [
          "Provisioned AWS infrastructure (EC2, S3, IAM, VPC) and deployed cloud-native applications across production environments.",
          "Built internal monitoring and troubleshooting utilities to surface runtime behavior, logs, and infrastructure health metrics.",
        ],
      },
    ],
  },
];
