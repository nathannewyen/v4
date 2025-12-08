"use client";

interface ContributionFiltersProps {
  projects: string[];
  selectedProject: string;
  selectedType: string;
  selectedSource: string;
  onProjectChange: (project: string) => void;
  onTypeChange: (type: string) => void;
  onSourceChange: (source: string) => void;
}

// Filter controls component for contributions page
const ContributionFilters = ({
  projects,
  selectedProject,
  selectedType,
  selectedSource,
  onProjectChange,
  onTypeChange,
  onSourceChange,
}: ContributionFiltersProps) => {
  const types = ["all", "pr", "commit"];
  const sources = ["all", "github", "gerrit"];

  // Select dropdown style
  const selectStyle =
    "px-3 py-2 text-sm font-mono bg-white dark:bg-[#2a2a3e] text-[#1A2234] dark:text-white border border-[#e0e0e0] dark:border-[#3a3a4e] cursor-pointer focus:outline-none focus:border-[#1A2234] dark:focus:border-white";

  // Filter button style helper
  const getButtonStyle = (isActive: boolean) =>
    `px-3 py-2 text-sm font-mono transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-bold"
        : "bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa] hover:bg-[#d0d0d0] dark:hover:bg-[#3a3a4e]"
    }`;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Project filter - dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#888] dark:text-[#777] uppercase">Project:</span>
        <select
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

      {/* Type and source filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Type filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#888] dark:text-[#777] uppercase">Type:</span>
          <div className="flex gap-1">
            {types.map((type) => (
              <button
                key={type}
                className={getButtonStyle(selectedType === type)}
                onClick={() => onTypeChange(type)}
              >
                {type === "all" ? "All" : type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Source filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#888] dark:text-[#777] uppercase">Source:</span>
          <div className="flex gap-1">
            {sources.map((source) => (
              <button
                key={source}
                className={getButtonStyle(selectedSource === source)}
                onClick={() => onSourceChange(source)}
              >
                {source === "all" ? "All" : source.charAt(0).toUpperCase() + source.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionFilters;
