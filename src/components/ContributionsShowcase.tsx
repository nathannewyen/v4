"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import useGitHubContributions, { getUniqueProjects } from "@/hooks/useGitHubContributions";
import ContributionCard from "@/components/ContributionCard";
import ContributionFilters from "@/components/ContributionFilters";
import Pagination from "@/components/Pagination";
import ContributionHeatmap from "@/components/ContributionHeatmap";
import { Footer } from "@/components/sections";
import ThemeToggle from "@/components/ThemeToggle";
import Skeleton from "@/components/Skeleton";
import { FilterSource, StatusFilter, SortOrder } from "@/types";
import { ITEMS_PER_PAGE } from "@/constants";

// Main contributions showcase component
const ContributionsShowcase = () => {
  // Fetch contributions from GitHub API
  const { contributions, isLoading, isError } = useGitHubContributions();

  // Filter and sort state
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedSource, setSelectedSource] = useState<FilterSource>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProject, selectedSource, selectedStatus, sortOrder, selectedDate]);

  // Get unique projects for filter options
  const projects = useMemo(() => getUniqueProjects(contributions), [contributions]);

  // Filter and sort contributions based on selected options
  const filteredContributions = useMemo(() => {
    // Apply filters - match against full repo path (e.g., "langchain-ai/langchain")
    const filtered = contributions.filter((contribution) => {
      const matchesProject = selectedProject === "all" || contribution.repo === selectedProject;
      const matchesSource = selectedSource === "all" || contribution.source === selectedSource;
      const matchesStatus = selectedStatus === "all" || contribution.status === selectedStatus;
      const matchesDate = selectedDate === null || contribution.date === selectedDate;
      return matchesProject && matchesSource && matchesStatus && matchesDate;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [contributions, selectedProject, selectedSource, selectedStatus, sortOrder, selectedDate]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredContributions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContributions = filteredContributions.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] text-[#1A2234] dark:text-[#e5e5e5] selection:bg-[#1A2234] selection:text-white dark:selection:bg-white dark:selection:text-[#1A2234] font-mono transition-colors duration-300">
      {/* Navigation header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A2234] dark:bg-[#15151f]">
        <div className="px-4 md:px-16 py-4 md:py-5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 md:gap-4">
            <Link
              href="/"
              className="text-white font-mono text-base md:text-xl font-bold hover:opacity-80 transition-opacity"
            >
              NHAN.NGUYEN
            </Link>
            <div className="flex items-center gap-3 md:gap-6">
              <Link
                href="/"
                className="text-white font-mono text-xs md:text-base uppercase hover:opacity-80 transition-opacity"
              >
                Portfolio
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-24 md:pt-28 pb-16 px-4 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Page header with contribution heatmap */}
          <header className="mb-8 md:mb-12">
            {/* Title on its own row */}
            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4">
              Open Source Contributions
            </h1>

            {/* Description and heatmap on same row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <p className="text-[#666] dark:text-[#a0a0a0] text-sm md:text-lg max-w-2xl">
                A showcase of my contributions to open source projects including React Native,
                Kubernetes, Go, and LangChain. Click on any contribution to view the code changes.
              </p>

              {/* Heatmap aligned with description (hidden on mobile/tablet) */}
              <div className="hidden lg:block flex-shrink-0">
                <ContributionHeatmap
                  contributions={contributions}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </header>

          {/* Filters section */}
          <section className="mb-8 p-4 bg-white dark:bg-[#15151f] border border-[#e0e0e0] dark:border-[#3a3a4e]">
            <ContributionFilters
              projects={projects}
              selectedProject={selectedProject}
              selectedSource={selectedSource}
              selectedStatus={selectedStatus}
              sortOrder={sortOrder}
              onProjectChange={setSelectedProject}
              onSourceChange={setSelectedSource}
              onStatusChange={setSelectedStatus}
              onSortChange={setSortOrder}
            />
          </section>

          {/* Results count - only show when not loading */}
          {!isLoading && (
            <div className="mb-6 text-sm text-[#888] dark:text-[#777]">
              {/* Show range when paginated, otherwise show total count */}
              {totalPages > 1
                ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredContributions.length)} of ${filteredContributions.length} contributions`
                : `Showing ${filteredContributions.length} contribution${filteredContributions.length !== 1 ? "s" : ""}`}
              {selectedProject !== "all" && ` in ${selectedProject}`}
              {selectedSource !== "all" && ` from ${selectedSource}`}
            </div>
          )}

          {/* Loading state - List view skeleton */}
          {isLoading && (
            <section className="flex flex-col gap-3">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md p-4"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                      <Skeleton className="w-3/4 h-5 mb-3" />
                      <div className="flex gap-4">
                        <Skeleton className="w-14 h-3" />
                        <Skeleton className="w-24 h-3" />
                        <Skeleton className="w-20 h-3" />
                        <Skeleton className="w-16 h-3" />
                      </div>
                    </div>
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

          {/* Contributions list - show paginated results */}
          {!isLoading && !isError && (
            <>
              <section className="flex flex-col gap-3">
                {paginatedContributions.map((contribution, index) => (
                  <ContributionCard
                    key={contribution.id}
                    contribution={contribution}
                    index={index}
                  />
                ))}
              </section>

              {/* Pagination controls - only show when more than one page */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
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
