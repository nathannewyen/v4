import { PersonalProject } from "@/types";

export const personalProjects: PersonalProject[] = [
  {
    name: "Nopala AI — Conversational Language Coach",
    liveUrl: "https://nopala-web.vercel.app/",
    caseStudyUrl: "/projects/nopala",
    tagline:
      "A conversational AI language coach — practice speaking through realistic dialogue scenarios with real-time feedback and coaching that adapts to your level.",
  },
  {
    name: "studio-agent — Visual AI Agent Builder",
    url: "https://github.com/nathannewyen/studio-agent",
    liveUrl: "https://agent-studio-ui-chi.vercel.app/",
    tagline:
      "A visual studio for composing AI agents — chain models, tools, and prompts together in a node-based UI.",
  },
  {
    name: "@spacing-ui/core — Headless React UI Primitives",
    url: "https://github.com/nathannewyen/space-ui",
    liveUrl: "https://space-ui-docs.vercel.app/",
    tagline:
      "An open-source React component library of headless, accessible UI primitives — published to npm and consumed by this portfolio. Bring your own styles; the library handles ARIA, focus, and keyboard interaction.",
    techStack: ["React 19", "TypeScript", "tsup", "Vitest", "ESM + CJS"],
    features: [
      "Fully accessible Select with arrow keys, Home/End, typeahead, and Esc/Tab focus return",
      "Compound API (Select.Trigger / Content / Option) with render-prop children for full styling control",
      "Dual ESM + CJS output, tree-shakable, zero runtime dependencies beyond React",
    ],
  },
  {
    name: "the-beuter-design-ecommerce-platform — Ecommerce Storefront",
    url: "https://github.com/nathannewyen/the-beuter-design-ecommerce-platform",
    liveUrl: "https://the-beuter-design-ecommerce-platfor.vercel.app/",
    tagline:
      "An ecommerce frontend in Next.js 16, React 19, and Tailwind v4 — using the BEUTER® brand system as a forcing function to ship a real DTC storefront end to end.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Zustand"],
  },
];
