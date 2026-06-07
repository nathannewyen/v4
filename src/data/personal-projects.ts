import { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
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
