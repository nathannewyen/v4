import { Experience } from "@/types";

// Work experience data - contains company info and roles held at each company
export const experience: Experience[] = [
  {
    company: "JPMorgan Chase",
    url: "https://www.jpmorganchase.com/",
    location: "Atlanta, GA",
    roles: [
      {
        title: "Mid-Senior Software Engineer",
        period: "March 2024 – Present",
        descriptions: [
          "Lead developer architecting enterprise card product platforms serving internal operations, building data-driven dashboards with React and TypeScript.",
          "Own end-to-end feature delivery across frontend and Spring Boot APIs, designing scalable PostgreSQL schemas for card lifecycle management and inventory systems.",
        ],
      },
      {
        title: "Software Engineer II",
        period: "March 2023 – March 2024",
        descriptions: [
          "Designed and shipped production REST APIs powering card operations infrastructure, establishing containerized deployment patterns with Docker.",
          "Drove database performance improvements and schema optimization, directly impacting system reliability for high-throughput financial workflows.",
          "Collaborated with cross-functional teams to migrate legacy monolith services to microservices architecture, reducing deployment times and improving fault isolation.",
        ],
      },
    ],
  },
  {
    company: "Grably",
    url: "https://getgrably.com/",
    location: "Remote",
    roles: [
      {
        title: "Founder",
        period: "May 2023 – Present",
        descriptions: [
          "Founded and architected a B2B wholesale platform from zero to production, owning full-stack development across Go microservices, FastAPI, and React/TypeScript frontends.",
          "Designed multi-tenant data models, built real-time order management systems, and integrated payment and notification pipelines serving restaurant wholesale operations.",
        ],
      },
    ],
  },
];
