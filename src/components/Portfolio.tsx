"use client";

import { useState, useEffect } from "react";

// Project type definition for open source contributions
interface Project {
  name: string;
  repo: string;
  description: string;
  tags: string[];
  url: string;
  stars: string;
}

// Portfolio component - main landing page with hero, experience, projects, and contact sections
const Portfolio = () => {
  // Track which navigation section is currently active
  const [activeSection, setActiveSection] = useState("intro");
  // Track if the page has finished loading for animation purposes
  const [isLoaded, setIsLoaded] = useState(false);
  // Store project data with dynamically fetched star counts
  const [projects, setProjects] = useState<Project[]>([
    {
      name: "React Native",
      repo: "facebook/react-native",
      description: "A framework for building native applications using React. Build mobile apps for iOS and Android.",
      tags: ["React", "Mobile", "JavaScript"],
      url: "https://github.com/facebook/react-native",
      stars: "120k",
    },
    {
      name: "Kubernetes",
      repo: "kubernetes/kubernetes",
      description: "Production-grade container orchestration. Automate deployment, scaling, and management of containerized applications.",
      tags: ["Go", "Containers", "Cloud"],
      url: "https://github.com/kubernetes/kubernetes",
      stars: "112k",
    },
    {
      name: "Go",
      repo: "golang/go",
      description: "The Go programming language. An open source programming language that makes it easy to build simple, reliable, and efficient software.",
      tags: ["Go", "Programming Language", "Systems"],
      url: "https://github.com/golang/go",
      stars: "125k",
    },
    {
      name: "LangChain",
      repo: "langchain-ai/langchain",
      description: "Build context-aware reasoning applications. A framework for developing applications powered by large language models.",
      tags: ["Python", "AI", "LLMs"],
      url: "https://github.com/langchain-ai/langchain",
      stars: "100k",
    },
  ]);

  // Fetch star counts from GitHub API on component mount
  useEffect(() => {
    const fetchStars = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${project.repo}`);
            if (response.ok) {
              const data = await response.json();
              const starCount = data.stargazers_count;
              // Format star count (e.g., 120000 -> "120k")
              const formattedStars = starCount >= 1000
                ? `${(starCount / 1000).toFixed(1).replace(/\.0$/, '')}k`
                : starCount.toString();
              return { ...project, stars: formattedStars };
            }
          } catch (error) {
            console.error(`Failed to fetch stars for ${project.repo}:`, error);
          }
          return project;
        })
      );
      setProjects(updatedProjects);
    };

    fetchStars();
  }, []);

  // Set loaded state to true after component mounts to trigger entrance animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Work experience data - contains company info and roles held at each company
  const experience = [
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

  // Scroll to a section and update the active navigation state
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Navigation section names for consistent usage
  const navigationSections = ["intro", "experience", "projects"] as const;

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a2e] selection:bg-[#1a1a2e] selection:text-white font-mono">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1a1a2e] focus:text-white"
      >
        Skip to main content
      </a>

      {/* Navigation - Fixed header with section links */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="px-16 py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <a
              href="#"
              className="text-base font-black tracking-tight text-white"
              style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
            >
              NHAN.NGUYEN
            </a>
            <div className="flex gap-10" role="navigation" aria-label="Main navigation">
              {navigationSections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  aria-current={activeSection === section ? "page" : undefined}
                  className={`text-base font-bold tracking-wide uppercase transition-all duration-200 ${
                    activeSection === section
                      ? "text-white underline underline-offset-4 decoration-2"
                      : "text-white hover:underline hover:underline-offset-4 hover:decoration-2"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main id="main" className="relative">
        {/* Hero Section - Introduction with name, title, and social links */}
        <section id="intro" className="min-h-screen flex items-center px-16">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="flex items-center justify-between">
              {/* Left Content - Name, title, description, and social links */}
              <div
                className={`max-w-xl transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* Name */}
                <h1 className="font-display text-6xl md:text-8xl leading-none mb-6 text-[#1A2234]">
                  NHAN
                  <br />
                  NGUYEN
                </h1>

                {/* Thick underline decoration */}
                <div className="w-full max-w-lg h-2 bg-[#1a1a2e] mb-8" />

                {/* Title */}
                <p className="font-mono-custom text-sm mb-6 uppercase text-xl md:text-2xl text-[#1A2234] font-medium">
                  Software Engineer @ JPMorgan Chase
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-[#1A2234] font-medium mb-8">
                  AI/ML/Engineer. Interested in AI agents, drones, rockets, and software development.
                </p>

                {/* Social Links - X/Twitter and GitHub */}
                <div className="flex items-center gap-4">
                  <a
                    href="https://x.com/nathannewyenn"
                    className="group flex items-center gap-2 px-4 py-2.5 border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-xs font-bold tracking-wider">
                      X / TWITTER
                    </span>
                  </a>
                  <a
                    href="https://github.com/nathannewyen"
                    className="group flex items-center gap-2 px-4 py-2.5 bg-[#1a1a2e] text-white hover:bg-[#2a2a4e] transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-xs font-bold tracking-wider">
                      GITHUB
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Side - Decorative overlapping boxes (hidden from screen readers) */}
              <div
                className={`hidden lg:block relative w-[520px] h-[400px] transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                aria-hidden="true"
              >
                {/* OSS Box - Bottom left, in front */}
                <div className="absolute bottom-0 -left-40 w-48 h-48 md:w-64 md:h-64 bg-[#CBD5E1] border-4 border-[#1A2234] flex items-center justify-center z-20">
                  <span className="font-display text-3xl text-[#1A2234]">
                    OSS
                  </span>
                </div>
                {/* AI Box - Top right, behind OSS */}
                <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#E2E8F0] border-4 border-[#1A2234] flex items-center justify-center z-10">
                  <span className="font-display text-3xl text-[#1A2234]">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll indicator - Animated bouncing arrow */}
            <div
              className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <svg
                className="w-6 h-6 text-[#1a1a2e] animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Experience Section - Work history with companies and roles */}
        <section id="experience" className="py-32 px-16 bg-white">
          <div className="max-w-[1440px] mx-auto">
            {/* Section heading with thick bottom border */}
            <h2 className="text-5xl md:text-6xl font-bold mb-12 border-b-8 border-[#1A2234] pb-4 inline-block">
              EXPERIENCE
            </h2>

            <div className="space-y-16">
              {experience.map((job, jobIndex) => (
                <div
                  key={jobIndex}
                  className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${jobIndex * 100}ms` }}
                >
                  {/* Company with left border and square marker */}
                  <div className="relative border-l-8 border-[#1A2234] pl-8">
                    {/* Square marker at top of border */}
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-[#1A2234]" />

                    {/* Company name and location */}
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                      <a
                        href={job.url}
                        className="text-3xl font-bold text-[#1A2234] underline underline-offset-4 decoration-2"
                      >
                        {job.company}
                      </a>
                      <span className="text-xl text-[#888] mt-2 md:mt-0">
                        {job.location}
                      </span>
                    </div>

                    {/* Roles */}
                    <div>
                      {job.roles.map((role, roleIndex) => (
                        <div key={roleIndex}>
                          {/* Gray divider line between roles */}
                          {roleIndex > 0 && (
                            <div className="border-t border-[#e0e0e0] my-6" />
                          )}
                          {/* Role title and period on same line */}
                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                            <h3 className="text-xl font-bold text-[#1A2234]">
                              {role.title}
                            </h3>
                            <span className="text-lg text-[#888]">
                              {role.period}
                            </span>
                          </div>
                          <p className="text-lg text-[#1A2234] leading-relaxed mt-3">
                            {role.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section - Open source projects grid */}
        <section id="projects" className="py-32 px-16 bg-[#f5f5f5]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 border-b-8 border-[#1A2234] pb-4 inline-block">
              OPEN SOURCE
            </h2>
            <h3 className="text-3xl font-bold mb-8 border-l-4 border-[#1A2234] pl-4 text-[#1A2234]">
              LIBRARIES I&apos;VE CONTRIBUTED TO
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, projectIndex) => (
                <div
                  key={projectIndex}
                  className={`p-6 bg-white border-4 border-[#1a1a2e] transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${projectIndex * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-xl text-[#1a1a2e]">
                      {project.name}
                    </h3>
                    <span className="flex items-center gap-1 px-3 py-1 bg-[#1a1a2e] text-white text-sm">
                      <span>★</span>
                      {project.stars}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[#666] mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-[#e8e8e8] text-[#555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a2e] hover:underline"
                  >
                    VIEW PROJECT
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

            {/* More Open Source Projects box */}
            <div className="mt-16 p-8 border-4 border-[#1A2234]">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                MORE OPEN SOURCE PROJECTS
              </h3>
              <p className="text-lg text-[#1A2234] mb-6">
                Check out my GitHub for more open source projects, tutorials, and resources.
              </p>
              <a
                href="https://github.com/nathannewyen"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white font-bold hover:bg-[#2a2a4e] transition-colors"
              >
                VIEW GITHUB
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Connect Section - Contact links in single line */}
        <section className="py-16 px-16 bg-white border-t-4 border-[#1A2234]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              CONNECT
            </h2>
            <div className="flex flex-wrap items-center gap-10">
              {/* GitHub link with icon */}
              <a
                href="https://github.com/nathannewyen"
                className="flex items-center gap-3 text-lg text-[#1a1a2e] hover:underline transition-colors"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>github.com/nathannewyen</span>
              </a>
              {/* X/Twitter link with icon */}
              <a
                href="https://x.com/nathannewyenn"
                className="flex items-center gap-3 text-lg text-[#1a1a2e] hover:underline transition-colors"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>x.com/nathannewyenn</span>
              </a>
              {/* Email link with icon */}
              <a
                href="mailto:nhan13574@gmail.com"
                className="flex items-center gap-3 text-lg text-[#1a1a2e] hover:underline transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>nhan13574 (at) gmail.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer - Copyright notice with dark background */}
        <footer className="py-10 px-16 bg-[#1a1a2e]">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-base text-white text-center tracking-wider">
              © 2025 NHAN NGUYEN. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
