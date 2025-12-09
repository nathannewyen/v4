"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import useGitHubContributions, { getUniqueProjects } from "@/hooks/useGitHubContributions";
import ContributionCard from "@/components/ContributionCard";
import ContributionFilters from "@/components/ContributionFilters";
import { Footer } from "@/components/sections";
import ThemeToggle from "@/components/ThemeToggle";
import Skeleton from "@/components/Skeleton";

// Main contributions showcase component
const ContributionsShowcase = () => {
  // Fetch contributions from GitHub API
  const { contributions, isLoading, isError } = useGitHubContributions();

  // Filter state
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  // Get unique projects for filter options
  const projects = useMemo(() => getUniqueProjects(contributions), [contributions]);

  // Filter contributions based on selected filters
  const filteredContributions = useMemo(() => {
    return contributions.filter((contribution) => {
      const matchesProject = selectedProject === "all" || contribution.repoName === selectedProject;
      const matchesType = selectedType === "all" || contribution.type === selectedType;
      const matchesSource = selectedSource === "all" || contribution.source === selectedSource;
      return matchesProject && matchesType && matchesSource;
    });
  }, [contributions, selectedProject, selectedType, selectedSource]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] text-[#1A2234] dark:text-[#e5e5e5] selection:bg-[#1A2234] selection:text-white dark:selection:bg-white dark:selection:text-[#1A2234] font-mono transition-colors duration-300">
      {/* Navigation header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A2234] dark:bg-[#15151f]">
        <div className="px-4 md:px-16 py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-white font-mono text-xl font-bold hover:opacity-80 transition-opacity"
            >
              NHAN.NGUYEN
            </Link>
            <div className="flex items-center gap-4 md:gap-10">
              <Link
                href="/"
                className="text-white font-mono uppercase hover:opacity-80 transition-opacity"
              >
                Portfolio
              </Link>
              <span className="text-white font-mono uppercase font-bold border-b-2">
                Contributions
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-24 md:pt-28 pb-16 px-4 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Page header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Open Source Contributions</h1>
            <p className="text-[#666] dark:text-[#a0a0a0] text-lg max-w-2xl">
              A showcase of my contributions to open source projects including React Native,
              Kubernetes, Go, and LangChain. Click on any contribution to view the code changes.
            </p>
          </header>

          {/* Filters section */}
          <section className="mb-8 p-4 bg-white dark:bg-[#15151f] border border-[#e0e0e0] dark:border-[#3a3a4e]">
            <ContributionFilters
              projects={projects}
              selectedProject={selectedProject}
              selectedType={selectedType}
              selectedSource={selectedSource}
              onProjectChange={setSelectedProject}
              onTypeChange={setSelectedType}
              onSourceChange={setSelectedSource}
            />
          </section>

          {/* Results count */}
          <div className="mb-6 text-sm text-[#888] dark:text-[#777]">
            {isLoading ? (
              "Loading contributions..."
            ) : (
              <>
                Showing {filteredContributions.length} contribution
                {filteredContributions.length !== 1 ? "s" : ""}
                {selectedProject !== "all" && ` in ${selectedProject}`}
                {selectedType !== "all" && ` of type ${selectedType.toUpperCase()}`}
                {selectedSource !== "all" && ` from ${selectedSource}`}
              </>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#15151f] border border-[#e0e0e0] dark:border-[#3a3a4e] p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="w-16 h-6" />
                  </div>
                  <Skeleton className="w-full h-6 mb-2" />
                  <Skeleton className="w-3/4 h-6 mb-4" />
                  <Skeleton className="w-full h-12 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Failed to load contributions</h3>
              <p className="text-[#666] dark:text-[#a0a0a0]">
                GitHub API rate limit may have been reached. Please try again later.
              </p>
            </div>
          )}

          {/* Contributions grid */}
          {!isLoading && !isError && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContributions.map((contribution, index) => (
                <ContributionCard key={contribution.id} contribution={contribution} index={index} />
              ))}
            </section>
          )}

          {/* Empty state */}
          {!isLoading && !isError && filteredContributions.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No contributions found</h3>
              <p className="text-[#666] dark:text-[#a0a0a0]">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContributionsShowcase;
