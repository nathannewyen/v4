"use client";

import { useState, useEffect } from "react";
import { NAVIGATION_SECTIONS } from "@/constants";
import { initialProjects } from "@/data/projects";
import { useGitHubStars } from "@/hooks";
import { Hero, Experience, Projects, Connect, Footer } from "@/components/sections";
import ThemeToggle from "@/components/ThemeToggle";

// Portfolio component - main landing page with hero, experience, projects, and contact sections
const Portfolio = () => {
  // Track which navigation section is currently active
  const [activeSection, setActiveSection] = useState("intro");
  // Track if the page has finished loading for animation purposes
  const [isLoaded, setIsLoaded] = useState(false);
  // Fetch and update project star counts from GitHub API
  const projects = useGitHubStars(initialProjects);

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
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] text-[#1A2234] dark:text-[#e5e5e5] selection:bg-[#1A2234] selection:text-white dark:selection:bg-white dark:selection:text-[#1A2234] font-mono transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1A2234] focus:text-white"
      >
        Skip to main content
      </a>

      {/* Navigation - Fixed header with section links */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1A2234] dark:bg-[#15151f] transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="px-4 md:px-16 py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <a
              href="#"
              className="text-sm md:text-base font-black tracking-tight text-white shrink-0"
              style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
            >
              NHAN NGUYEN
            </a>
            <div className="flex items-center gap-4 md:gap-10">
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
                    className={`text-xs md:text-base font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                      activeSection === section
                        ? "text-white underline underline-offset-4 decoration-2"
                        : "text-white hover:underline hover:underline-offset-4 hover:decoration-2"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main id="main" className="relative">
        <Hero isLoaded={isLoaded} />
        <Experience isLoaded={isLoaded} />
        <Projects projects={projects} isLoaded={isLoaded} />
        <Connect />
        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
