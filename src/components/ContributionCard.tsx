"use client";

import { Contribution } from "@/types";
import { PROJECT_COLORS, STATUS_COLORS } from "@/constants";
import { ExternalLinkIcon } from "@/components/icons";

interface ContributionCardProps {
  contribution: Contribution;
  index: number;
}

// Individual contribution card component
const ContributionCard = ({ contribution, index }: ContributionCardProps) => {
  // Get project-specific colors with fallback
  const projectColors = PROJECT_COLORS[contribution.repoName as keyof typeof PROJECT_COLORS] ?? {
    background: "bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-500/30",
  };

  // Get status-specific colors
  const statusColors = STATUS_COLORS[contribution.status];

  // Format the date for display
  const formattedDate = new Date(contribution.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <article
      className="group bg-white dark:bg-[#15151f] border border-[#e0e0e0] dark:border-[#3a3a4e] p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeIn"
      style={{ animationDelay }}
    >
      {/* Header: Project name and type badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs font-mono ${projectColors.background} ${projectColors.text} ${projectColors.border} border`}
          >
            {contribution.repoName}
          </span>
          <span className="px-2 py-1 text-xs font-mono bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa] uppercase">
            {contribution.type}
          </span>
        </div>
        <span
          className={`px-2 py-1 text-xs font-mono ${statusColors.background} ${statusColors.text} ${statusColors.border} border capitalize`}
        >
          {contribution.status}
        </span>
      </div>

      {/* Title with link */}
      <h3 className="text-lg font-bold text-[#1A2234] dark:text-white mb-2 line-clamp-2 group-hover:text-[#326CE5] dark:group-hover:text-[#61DAFB] transition-colors">
        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2"
        >
          <span className="flex-1">{contribution.title}</span>
          <ExternalLinkIcon className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </h3>

      {/* Description */}
      <p className="text-sm text-[#666] dark:text-[#a0a0a0] mb-4 line-clamp-2">
        {contribution.description}
      </p>

      {/* Footer: Date and line changes */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {/* Source badge */}
          <span className="text-[#888] dark:text-[#777] uppercase">{contribution.source}</span>
          {/* Date */}
          <span className="text-[#888] dark:text-[#777]">{formattedDate}</span>
        </div>

        {/* Line changes */}
        <div className="flex items-center gap-2 font-mono">
          <span className="text-green-600 dark:text-green-400">+{contribution.additions}</span>
          <span className="text-red-600 dark:text-red-400">-{contribution.deletions}</span>
        </div>
      </div>

      {/* Files changed preview */}
      {contribution.files.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#e0e0e0] dark:border-[#3a3a4e]">
          <div className="text-xs text-[#888] dark:text-[#777] mb-1">
            {contribution.files.length} file{contribution.files.length > 1 ? "s" : ""} changed
          </div>
          <div className="flex flex-wrap gap-1">
            {contribution.files.slice(0, 2).map((file) => (
              <span
                key={file}
                className="text-xs font-mono bg-[#f5f5f5] dark:bg-[#0a0a0f] px-2 py-1 text-[#666] dark:text-[#a0a0a0] truncate max-w-[200px]"
                title={file}
              >
                {file.split("/").pop()}
              </span>
            ))}
            {contribution.files.length > 2 && (
              <span className="text-xs font-mono bg-[#f5f5f5] dark:bg-[#0a0a0f] px-2 py-1 text-[#666] dark:text-[#a0a0a0]">
                +{contribution.files.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
};

export default ContributionCard;
