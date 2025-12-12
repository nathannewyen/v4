"use client";

import { memo } from "react";
import { Contribution } from "@/types";
import { PROJECT_COLORS, STATUS_CONFIG, ANIMATION_DELAY_MS } from "@/constants";

interface ContributionCardProps {
  contribution: Contribution;
  index: number;
}

// SVG path data for each status icon
const STATUS_ICON_PATHS = {
  merged:
    "M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z",
  closed:
    "M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-2.03-5.273a.75.75 0 0 1 1.06 0l.97.97.97-.97a.749.749 0 1 1 1.06 1.06l-.97.97.97.97a.749.749 0 1 1-1.06 1.06l-.97-.97-.97.97a.749.749 0 1 1-1.06-1.06l.97-.97-.97-.97a.75.75 0 0 1 0-1.06ZM3.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",
  open: "M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z",
} as const;

// GitHub-style PR status icon component using consolidated config
const PRStatusIcon = ({ status }: { status: Contribution["status"] }) => {
  const statusConfig = STATUS_CONFIG[status];
  return (
    <svg className={`w-5 h-5 ${statusConfig.iconColor}`} viewBox="0 0 16 16" fill="currentColor">
      <path d={STATUS_ICON_PATHS[status]} />
    </svg>
  );
};

// Default colors for projects not in PROJECT_COLORS
const DEFAULT_PROJECT_COLORS = {
  primary: "#6B7280",
  background: "bg-gray-500/10",
  text: "text-gray-600 dark:text-gray-400",
  border: "border-gray-500/30",
};

// GitHub-style contribution card component - memoized to prevent unnecessary re-renders
const ContributionCard = memo(function ContributionCard({
  contribution,
  index,
}: ContributionCardProps) {
  // Get project-specific colors, use default for unknown projects
  const projectKey = contribution.repoName as keyof typeof PROJECT_COLORS;
  const projectColors = PROJECT_COLORS[projectKey]
    ? PROJECT_COLORS[projectKey]
    : DEFAULT_PROJECT_COLORS;

  // Get status configuration from centralized config
  const statusConfig = STATUS_CONFIG[contribution.status];

  // Format the date for display (date is already in local time from API conversion)
  const formattedDate = new Date(contribution.date + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate animation delay based on card index for staggered entrance
  const animationDelay = `${index * ANIMATION_DELAY_MS}ms`;

  return (
    <a
      href={contribution.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View pull request: ${contribution.title} (opens in new tab)`}
      className="group block bg-white dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-md hover:border-[#0969da] dark:hover:border-[#58a6ff] transition-all duration-200 animate-fadeIn"
      style={{ animationDelay }}
    >
      <div className="p-4">
        {/* Top row: Status icon + Repository */}
        <div className="flex items-start gap-3">
          {/* PR Status Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <PRStatusIcon status={contribution.status} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Repository full path (owner/repo) */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold ${projectColors.text}`}>
                {contribution.repo}
              </span>
              <span className="text-xs text-[#57606a] dark:text-[#8b949e]">•</span>
              <span className={`text-xs font-medium ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>

            {/* PR Title */}
            <h3 className="text-sm font-semibold text-[#24292f] dark:text-[#c9d1d9] group-hover:text-[#0969da] dark:group-hover:text-[#58a6ff] transition-colors line-clamp-2 mb-2">
              {contribution.title}
            </h3>

            {/* Meta row */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-[#57606a] dark:text-[#8b949e]">
              {/* Source */}
              <span className="uppercase font-medium">{contribution.source}</span>

              {/* Date */}
              <span>{formattedDate}</span>

              {/* Line changes - display additions and deletions with descriptive labels */}
              {contribution.additions > 0 && (
                <span className="text-green-600 dark:text-green-400">
                  +{contribution.additions} lines added
                </span>
              )}
              {contribution.deletions > 0 && (
                <span className="text-red-600 dark:text-red-400">
                  -{contribution.deletions} lines removed
                </span>
              )}

              {/* Files */}
              {contribution.files.length > 0 && (
                <span>
                  {contribution.files[0].includes("file")
                    ? contribution.files[0]
                    : `${contribution.files.length} file${contribution.files.length > 1 ? "s" : ""}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

export default ContributionCard;
