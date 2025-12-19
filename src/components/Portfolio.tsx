"use client";

import { useState, useEffect } from "react";
import { NAVIGATION_SECTIONS } from "@/constants";
import { siteConfig } from "@/config/site";
import { initialProjects } from "@/data/projects";
import { useGitHubStars, useActiveSection } from "@/hooks";
import { Hero, Experience, Projects, StackOverflow, Connect, Footer } from "@/components/sections";
import ThemeToggle from "@/components/ThemeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";

// Portfolio component - main landing page with hero, experience, projects, and contact sections
const Portfolio = () => {
  // Track if the page has finished loading for animation purposes
  const [isLoaded, setIsLoaded] = useState(false);
  // Fetch and update project star counts from GitHub API
  const { projects, isLoading: isLoadingStars } = useGitHubStars(initialProjects);
  // Track which navigation section is currently visible based on scroll position
  const activeSection = useActiveSection(NAVIGATION_SECTIONS);

  // Set loaded state to true after component mounts to trigger entrance animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll to a section smoothly
  const scrollToSection = (sectionId: string) => {
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
            <a href="#" className="text-white font-mono text-xl font-bold">
              NHAN.NGUYEN
            </a>
            <div className="flex items-center gap-4 md:gap-10">
              <div className="hidden md:flex gap-10" role="navigation" aria-label="Main navigation">
                {NAVIGATION_SECTIONS.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    aria-current={activeSection === section ? "page" : undefined}
                    className={`text-white font-mono uppercase cursor-pointer ${
                      activeSection === section ? "font-bold border-b-2" : ""
                    }`}
                  >
                    {section}
                  </button>
                ))}
                {/* External link to notes blog */}
                <a
                  href={siteConfig.social.notes.url}
                  className="text-white font-mono uppercase hover:font-bold hover:border-b-2 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NOTES
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main id="main" className="relative">
        <ErrorBoundary>
          <Hero isLoaded={isLoaded} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects projects={projects} isLoading={isLoadingStars} />
        </ErrorBoundary>
        <ErrorBoundary>
          <StackOverflow />
        </ErrorBoundary>
        <ErrorBoundary>
          <Connect />
        </ErrorBoundary>
        <Footer />
      </main>
    </div>
  );
};

export default Portfolio;
