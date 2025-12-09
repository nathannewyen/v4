"use client";

import { Contribution } from "@/types";
import { PROJECT_COLORS } from "@/constants";

interface ContributionCardProps {
  contribution: Contribution;
  index: number;
}

// GitHub-style PR status icon component
const PRStatusIcon = ({ status }: { status: "merged" | "open" | "closed" }) => {
  if (status === "merged") {
    // Purple merge icon - like GitHub merged PRs
    return (
      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
      </svg>
    );
  }

  if (status === "closed") {
    // Red closed PR icon
    return (
      <svg className="w-5 h-5 text-red-600" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.251 2.251 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-2.03-5.273a.75.75 0 0 1 1.06 0l.97.97.97-.97a.749.749 0 1 1 1.06 1.06l-.97.97.97.97a.749.749 0 1 1-1.06 1.06l-.97-.97-.97.97a.749.749 0 1 1-1.06-1.06l.97-.97-.97-.97a.75.75 0 0 1 0-1.06ZM3.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
      </svg>
    );
  }

  // Green open PR icon - "In Review"
  return (
    <svg className="w-5 h-5 text-green-600" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
};

// Status label text based on status
const getStatusLabel = (status: "merged" | "open" | "closed"): string => {
  if (status === "merged") return "Merged";
  if (status === "closed") return "Closed";
  return "In Review";
};

// Status color classes
const getStatusColor = (status: "merged" | "open" | "closed"): string => {
  if (status === "merged") return "text-purple-600 dark:text-purple-400";
  if (status === "closed") return "text-red-600 dark:text-red-400";
  return "text-green-600 dark:text-green-400";
};

// GitHub-style contribution card component
const ContributionCard = ({ contribution, index }: ContributionCardProps) => {
  // Get project-specific colors with fallback for unknown projects
  const projectColors = PROJECT_COLORS[contribution.repoName as keyof typeof PROJECT_COLORS] ?? {
    primary: "#6B7280",
    background: "bg-gray-500/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-500/30",
  };

  // Format the date for display
  const formattedDate = new Date(contribution.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate animation delay based on card index for staggered entrance
  const animationDelay = `${index * 50}ms`;

  return (
    <a
      href={contribution.url}
      target="_blank"
      rel="noopener noreferrer"
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
            {/* Repository name */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold ${projectColors.text}`}>
                {contribution.repoName}
              </span>
              <span className="text-xs text-[#57606a] dark:text-[#8b949e]">•</span>
              <span className={`text-xs font-medium ${getStatusColor(contribution.status)}`}>
                {getStatusLabel(contribution.status)}
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

              {/* Line changes */}
              {(contribution.additions > 0 || contribution.deletions > 0) && (
                <span className="font-mono">
                  <span className="text-green-600 dark:text-green-400">
                    +{contribution.additions}
                  </span>{" "}
                  <span className="text-red-600 dark:text-red-400">-{contribution.deletions}</span>
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
};

export default ContributionCard;
