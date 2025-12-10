"use client";

import { SOCIAL_LINKS, CONTRIBUTION_SOURCES } from "@/constants";

interface ContributionFiltersProps {
  projects: string[];
  selectedProject: string;
  selectedSource: string;
  sortOrder: "newest" | "oldest";
  onProjectChange: (project: string) => void;
  onSourceChange: (source: string) => void;
  onSortChange: (sort: "newest" | "oldest") => void;
}

// Filter controls component for contributions page
const ContributionFilters = ({
  projects,
  selectedProject,
  selectedSource,
  sortOrder,
  onProjectChange,
  onSourceChange,
  onSortChange,
}: ContributionFiltersProps) => {
  // Select dropdown style - custom arrow with proper spacing
  const selectStyle =
    "w-full sm:w-auto pl-3 pr-10 py-2 text-sm font-mono bg-white dark:bg-[#2a2a3e] text-[#1A2234] dark:text-white border border-[#e0e0e0] dark:border-[#3a3a4e] cursor-pointer focus:outline-none focus:border-[#1A2234] dark:focus:border-white appearance-none bg-no-repeat bg-[length:16px_16px] bg-[position:right_0.75rem_center] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23666%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23999%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]";

  // Filter button style helper
  const getButtonStyle = (isActive: boolean) =>
    `flex-1 sm:flex-none px-3 py-2 text-sm font-mono transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-bold"
        : "bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa] hover:bg-[#d0d0d0] dark:hover:bg-[#3a3a4e]"
    }`;

  return (
    <div className="flex flex-col gap-4">
      {/* Filters - stack vertically on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-4">
        {/* Project filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label
            htmlFor="project-filter"
            className="text-xs text-[#888] dark:text-[#777] uppercase"
          >
            Project:
          </label>
          <select
            id="project-filter"
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className={selectStyle}
          >
            <option value="all">All Projects ({projects.length})</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        {/* Sort filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor="sort-filter" className="text-xs text-[#888] dark:text-[#777] uppercase">
            Sort:
          </label>
          <select
            id="sort-filter"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
            className={selectStyle}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Source filter - full width row on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:col-span-2 lg:col-span-1">
          <span id="source-filter-label" className="text-xs text-[#888] dark:text-[#777] uppercase">
            Source:
          </span>
          <div className="flex gap-1" role="group" aria-labelledby="source-filter-label">
            {CONTRIBUTION_SOURCES.map((source) => (
              <button
                key={source}
                className={getButtonStyle(selectedSource === source)}
                onClick={() => onSourceChange(source)}
                aria-pressed={selectedSource === source}
              >
                {source === "all" ? "All" : source.charAt(0).toUpperCase() + source.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub link - stack on mobile */}
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
