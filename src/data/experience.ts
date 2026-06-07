import { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "JPMorgan Chase",
    url: "https://www.jpmorganchase.com/",
    location: "Atlanta, GA",
    roles: [
      {
        title: "Software Engineer III",
        period: "March 2023 — March 2026",
        projects: [
          {
            name: "Card Product Launch — internal catalog tool for marketing",
            descriptions: [
              "Built an internal Card Product Launch platform a single source of truth for every JPMorgan Chase consumer card where marketing teams search card designs, view metadata, and manage inventory using React, TypeScript, Redux/Redux-Saga for state and side-effect handling, and TanStack Query/Table for data fetching and a fast, data-dense UI.",
              "Translated Figma prototypes into pixel-accurate React views, implementing shared design tokens, animations, and styling for consistent UX.",
              "Designed and built Java/Spring Boot REST APIs and PostgreSQL schemas to serve card data and power inventory management.",
              "Provisioned and integrated the supporting AWS stack (EC2, RDS, S3, Lambda), wiring event-driven Lambda jobs and managed databases into the application.",
              "Containerized Spring Boot services with Docker and wired them into CI/CD pipelines (Jenkins/CircleCI) so local, CI, and production environments shared identical runtime behavior.",
            ],
          },
          {
            name: "Rewards Earning — credit card points & rewards",
            descriptions: [
              "Built points-earning and rewards systems for JPMorgan Chase credit cards, implementing earning rules, point accrual, and reward-tier logic end to end across React/TypeScript frontends (Redux/Redux-Saga for complex client state and async flows) and Spring Boot services backed by PostgreSQL.",
              "Shipped changes through automated CI/CD pipelines with Docker-based builds, and collaborated with upstream/downstream teams to define API contracts and resolve cross-service integration issues.",
              "Owned the full code-to-production workflow: pushed feature branches that triggered automated builds and test suites on the team's CI test platform, reviewed pass/fail results, and verified deployments through Jenkins pipelines across environments.",
              "Packaged Spring Boot services into Docker images promoted through the CI/CD pipeline, keeping local, CI, and production environments consistent and cutting environment-drift issues.",
              "Diagnosed and resolved build and deployment failures across the pipeline, using Jenkins logs and the CI test platform to catch regressions before they reached production.",
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
          "Worked as a full-stack engineer on the company's e-commerce platform selling 3D scanning and 3D printing hardware, owning features across both the React/TypeScript frontend and the Node.js backend.",
          "Built reusable React/TypeScript components and product/catalog pages for the storefront, managing application state and asynchronous data flows with Redux and Redux-Saga.",
          "Designed GraphQL APIs and optimized PostgreSQL queries for reporting, data aggregation, filtering, and analytics use cases.",
          "Designed Node.js REST APIs and modeled data across MongoDB and PostgreSQL to handle product catalog, orders, and reporting workflows.",
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
          "Designed and provisioned cloud infrastructure on AWS (EC2, S3, IAM, VPC), translating architecture plans into deployable environments.",
          "Built internal monitoring and troubleshooting utilities to analyze runtime behavior, application logs, and infrastructure health metrics across services.",
          "Developed and deployed cloud-native applications, integrating AWS services to support scalable, production-grade workflows.",
          "Worked in Agile development workflows, contributing to sprint planning, implementation, testing, and deployment activities across cloud-native projects.",
        ],
      },
    ],
  },
];
