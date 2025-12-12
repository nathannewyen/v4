"use client";

import { useMemo, useCallback } from "react";
import {
  SOCIAL_LINKS,
  CONTRIBUTION_SOURCES,
  CONTRIBUTION_STATUSES,
  STATUS_CONFIG,
} from "@/constants";
import { SortOrder, FilterSource, StatusFilter } from "@/types";
import FilterSelect from "@/components/ui/FilterSelect";
import FilterButton from "@/components/ui/FilterButton";

interface ContributionFiltersProps {
  projects: string[];
  selectedProject: string;
  selectedSource: FilterSource;
  selectedStatus: StatusFilter;
  sortOrder: SortOrder;
  onProjectChange: (project: string) => void;
  onSourceChange: (source: FilterSource) => void;
  onStatusChange: (status: StatusFilter) => void;
  onSortChange: (sort: SortOrder) => void;
}

// Filter controls component for contributions page
const ContributionFilters = ({
  projects,
  selectedProject,
  selectedSource,
  selectedStatus,
  sortOrder,
  onProjectChange,
  onSourceChange,
  onStatusChange,
  onSortChange,
}: ContributionFiltersProps) => {
  // Build project options for the select dropdown (memoized to avoid recreation on every render)
  const projectOptions = useMemo(
    () => [
      { value: "all", label: `All Projects (${projects.length})` },
      ...projects.map((project) => ({ value: project, label: project })),
    ],
    [projects]
  );

  // Build sort options for the select dropdown (static, never changes)
  const sortOptions = useMemo(
    () => [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "updated", label: "Last Updated" },
    ],
    []
  );

  // Capitalize first letter of source name for display
  const formatSourceLabel = useCallback((source: string) => {
    if (source === "all") return "All";
    return source.charAt(0).toUpperCase() + source.slice(1);
  }, []);

  // Get status label from STATUS_CONFIG or capitalize for "all"
  const formatStatusLabel = useCallback((status: string) => {
    if (status === "all") return "All";
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    if (config) {
      return config.label;
    }
    return status;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Filters - stack vertically on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-4">
        {/* Project filter */}
        <FilterSelect
          id="project-filter"
          label="Project"
          value={selectedProject}
          options={projectOptions}
          onChange={onProjectChange}
        />

        {/* Sort filter */}
        <FilterSelect
          id="sort-filter"
          label="Sort"
          value={sortOrder}
          options={sortOptions}
          onChange={(value) => onSortChange(value as SortOrder)}
        />

        {/* Source filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:col-span-2 lg:col-span-1">
          <span id="source-filter-label" className="text-xs text-[#888] dark:text-[#777] uppercase">
            Source:
          </span>
          <div className="flex gap-1" role="group" aria-labelledby="source-filter-label">
            {CONTRIBUTION_SOURCES.map((source) => (
              <FilterButton
                key={source}
                active={selectedSource === source}
                onClick={() => onSourceChange(source)}
              >
                {formatSourceLabel(source)}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Status filter - separate row for better layout */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span id="status-filter-label" className="text-xs text-[#888] dark:text-[#777] uppercase">
          Status:
        </span>
        <div className="flex gap-1 flex-wrap" role="group" aria-labelledby="status-filter-label">
          {CONTRIBUTION_STATUSES.map((status) => (
            <FilterButton
              key={status}
              active={selectedStatus === status}
              onClick={() => onStatusChange(status)}
            >
              {formatStatusLabel(status)}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* GitHub link - stack on mobile (button uses GITHUB_COLORS.button styles) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-[#e0e0e0] dark:border-[#3a3a4e]">
        <span className="text-xs text-[#888] dark:text-[#777]">
          Want to see more? Check out my full GitHub profile.
        </span>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub Profile (opens in new tab)"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-mono font-bold text-white bg-[#24292f] hover:bg-[#32383f] dark:bg-[#f0f6fc] dark:text-[#24292f] dark:hover:bg-[#d0d7de] transition-colors"
        >
          {/* GitHub logo icon */}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View GitHub Profile
          {/* External link icon - matches text size with bolder stroke */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContributionFilters;
