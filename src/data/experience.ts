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
        description:
          "Build internal card product dashboards with React, TypeScript, and Redux, integrating Spring Boot APIs and PostgreSQL for card design, metadata, and inventory workflows.",
      },
      {
        title: "Software Engineer II",
        period: "March 2023 – March 2024",
        description:
          "Design and ship REST APIs and schemas, containerize services with Docker, and tune Postgres performance to support reliable, performant production systems.",
      },
    ],
  },
  {
    company: "Grably",
    url: "https://grably.com",
    location: "Remote",
    roles: [
      {
        title: "Founder",
        period: "May 2023 – Present",
        description:
          "Founded and built a B2B ordering platform for restaurant wholesale, owning product, backend, and frontend using Go, FastAPI, React, and TypeScript. Modeled order and customer data in SQL/NoSQL, integrated third-party APIs for auth, notifications, and payment-like workflows, and exposed REST/GraphQL APIs for web and mobile clients.",
      },
    ],
  },
  {
    company: "Hawk Ridge System",
    url: "https://hawkridgesys.com/",
    location: "Remote",
    roles: [
      {
        title: "Software Engineer",
        period: "March 2022 – February 2023",
        description:
          "Developed end-to-end reporting workflows with Flask, PostgreSQL, React, and TypeScript, combining GraphQL and REST APIs for interactive dashboards. Deployed and maintained AWS infrastructure (RDS, EC2, S3) to improve reliability, performance, and reporting automation.",
      },
    ],
  },
  {
    company: "Collaborative Mind",
    url: "https://collaborativemind.com/",
    location: "Remote",
    roles: [
      {
        title: "Software Engineer",
        period: "February 2020 – March 2022",
        description:
          "Built a hotel management portal with React and Node.js backed by PostgreSQL and GraphQL for bookings, payments, and confirmations. Reduced check-in errors and improved API latency using better validation and Redis caching.",
      },
    ],
  },
];
