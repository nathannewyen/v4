"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { experience } from "@/data/experience";
import { initialProjects } from "@/data/projects";
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from "@/constants";
import {
  GitHubIcon,
  XIcon,
  EmailIcon,
  ExternalLinkIcon,
  ChevronDownIcon,
} from "@/components/icons";

// Portfolio component - main landing page with hero, experience, projects, and contact sections
const Portfolio = () => {
  // Track which navigation section is currently active
  const [activeSection, setActiveSection] = useState("intro");
  // Track if the page has finished loading for animation purposes
  const [isLoaded, setIsLoaded] = useState(false);
  // Store project data with dynamically fetched star counts
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Fetch star counts from GitHub API on component mount
  useEffect(() => {
    const fetchStars = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${project.repo}`
            );
            if (response.ok) {
              const data = await response.json();
              const starCount = data.stargazers_count;
              // Format star count (e.g., 120000 -> "120k")
              const formattedStars =
                starCount >= 1000
                  ? `${(starCount / 1000).toFixed(1).replace(/\.0$/, "")}k`
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

  // Scroll to a section and update the active navigation state
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1A2234] selection:bg-[#1A2234] selection:text-white font-mono">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1A2234] focus:text-white"
      >
        Skip to main content
      </a>

      {/* Navigation - Fixed header with section links */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1A2234] transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="px-4 md:px-16 py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <a
              href="#"
              className="text-sm md:text-base font-black tracking-tight text-white shrink-0"
              style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
            >
              NHAN.NGUYEN
            </a>
            <div
              className="flex gap-4 md:gap-10"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAVIGATION_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  aria-current={activeSection === section ? "page" : undefined}
                  className={`text-xs md:text-base font-bold tracking-wide uppercase transition-all duration-200 ${
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
        <section id="intro" className="min-h-screen flex items-center px-4 md:px-16">
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
                <div className="w-full max-w-lg h-2 bg-[#1A2234] mb-8" />

                {/* Title */}
                <p className="font-mono-custom text-sm mb-6 uppercase text-xl md:text-2xl text-[#1A2234] font-medium">
                  Software Engineer @ JPMorgan Chase
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-[#1A2234] font-medium mb-8">
                  AI/ML/Engineer. Interested in AI agents, drones, rockets, and
                  software development.
                </p>

                {/* Social Links - X/Twitter and GitHub */}
                <div className="flex items-center gap-4">
                  <a
                    href={SOCIAL_LINKS.twitter}
                    className="group flex items-center gap-2 px-4 py-2.5 border-2 border-[#1A2234] text-[#1A2234] hover:bg-[#1A2234] hover:text-white transition-all duration-200"
                  >
                    <XIcon />
                    <span className="text-xs font-bold tracking-wider">
                      X / TWITTER
                    </span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-[#1A2234] text-white hover:bg-[#2a2a4e] transition-all duration-200"
                  >
                    <GitHubIcon />
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
                  <span className="font-display text-3xl text-[#1A2234]">OSS</span>
                </div>
                {/* AI Box - Top right, behind OSS */}
                <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#E2E8F0] border-4 border-[#1A2234] flex items-center justify-center z-10">
                  <span className="font-display text-3xl text-[#1A2234]">AI</span>
                </div>
              </div>
            </div>

            {/* Scroll indicator - Animated bouncing arrow */}
            <div
              className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <ChevronDownIcon className="w-6 h-6 text-[#1A2234] animate-bounce" />
            </div>
          </div>
        </section>

        {/* Experience Section - Work history with companies and roles */}
        <section id="experience" className="py-16 md:py-32 px-4 md:px-16 bg-white">
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

                    {/* Company name and location - stacked on mobile */}
                    <div className="mb-4">
                      <a
                        href={job.url}
                        className="text-2xl md:text-3xl font-bold text-[#1A2234] underline underline-offset-4 decoration-2"
                      >
                        {job.company}
                      </a>
                      <span className="text-base md:text-xl text-[#888] block mt-1">
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
                          {/* Role title and period - stacked on mobile */}
                          <h3 className="text-lg md:text-xl font-bold text-[#4A5568]">
                            {role.title}
                          </h3>
                          <span className="text-base md:text-lg text-[#888] block mb-3">
                            {role.period}
                          </span>
                          <p className="text-base md:text-lg text-[#1A2234] leading-relaxed">
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
        <section id="projects" className="py-16 md:py-32 px-4 md:px-16 bg-[#f5f5f5]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 border-b-8 border-[#1A2234] pb-4 inline-block">
              OPEN SOURCE
            </h2>
            <h3 className="text-xl md:text-3xl font-bold mb-8 border-l-4 border-[#1A2234] pl-4 text-[#1A2234]">
              LIBRARIES I&apos;VE CONTRIBUTED TO
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, projectIndex) => (
                <div
                  key={projectIndex}
                  className={`p-6 bg-white border-4 border-[#1A2234] transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${projectIndex * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-xl text-[#1A2234]">
                      {project.name}
                    </h3>
                    <span className="flex items-center gap-1 px-3 py-1 bg-[#1A2234] text-white text-sm">
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
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1A2234] hover:underline"
                  >
                    VIEW PROJECT
                    <ExternalLinkIcon />
                  </a>
                </div>
              ))}
            </div>

            {/* More Open Source Projects box */}
            <div className="mt-8 md:mt-16 p-4 md:p-8 border-4 border-[#1A2234]">
              <h3 className="text-xl md:text-3xl font-bold mb-4">
                MORE OPEN SOURCE PROJECTS
              </h3>
              <p className="text-base md:text-lg text-[#1A2234] mb-6">
                Check out my GitHub for more open source projects, tutorials, and
                resources.
              </p>
              <a
                href={SOCIAL_LINKS.github}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2234] text-white font-bold hover:bg-[#2a2a4e] transition-colors"
              >
                VIEW GITHUB
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Connect Section - Contact links in single line */}
        <section className="py-12 md:py-16 px-4 md:px-16 bg-white border-t-4 border-[#1A2234]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">CONNECT</h2>
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4 md:gap-10">
              {/* GitHub link with icon */}
              <a
                href={SOCIAL_LINKS.github}
                className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
              >
                <GitHubIcon className="w-7 h-7" />
                <span>github.com/nathannewyen</span>
              </a>
              {/* X/Twitter link with icon */}
              <a
                href={SOCIAL_LINKS.twitter}
                className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
              >
                <XIcon className="w-7 h-7" />
                <span>x.com/nathannewyenn</span>
              </a>
              {/* Email link with icon */}
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-3 text-lg text-[#1A2234] hover:underline transition-colors"
              >
                <EmailIcon />
                <span>nhan13574 (at) gmail.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer - Copyright notice with dark background */}
        <footer className="py-8 md:py-10 px-4 md:px-16 bg-[#1A2234]">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-sm md:text-base text-white text-center tracking-wider">
              © 2025 NHAN NGUYEN. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
