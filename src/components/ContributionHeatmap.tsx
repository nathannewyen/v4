"use client";

import { useMemo } from "react";
import { Contribution } from "@/types";

interface ContributionHeatmapProps {
  contributions: Contribution[];
}

// Number of weeks to display in the heatmap
const WEEKS_TO_DISPLAY = 26;

// Number of rows to display (4 rows instead of 7 days)
const ROWS_TO_DISPLAY = 4;

// GitHub-style color levels for contribution intensity
const HEATMAP_COLORS = {
  light: {
    empty: "bg-[#ebedf0]",
    level1: "bg-[#9be9a8]",
    level2: "bg-[#40c463]",
    level3: "bg-[#30a14e]",
    level4: "bg-[#216e39]",
  },
  dark: {
    empty: "bg-[#161b22]",
    level1: "bg-[#0e4429]",
    level2: "bg-[#006d32]",
    level3: "bg-[#26a641]",
    level4: "bg-[#39d353]",
  },
} as const;

// Get the appropriate color class based on contribution count
const getColorClass = (count: number): string => {
  if (count === 0) return `${HEATMAP_COLORS.light.empty} dark:${HEATMAP_COLORS.dark.empty}`;
  if (count <= 1) return `${HEATMAP_COLORS.light.level1} dark:${HEATMAP_COLORS.dark.level1}`;
  if (count <= 2) return `${HEATMAP_COLORS.light.level2} dark:${HEATMAP_COLORS.dark.level2}`;
  if (count <= 3) return `${HEATMAP_COLORS.light.level3} dark:${HEATMAP_COLORS.dark.level3}`;
  return `${HEATMAP_COLORS.light.level4} dark:${HEATMAP_COLORS.dark.level4}`;
};

// Format date for tooltip display like GitHub (e.g., "Nov 20, 2024")
const formatDateForTooltip = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// GitHub-style contribution heatmap component
const ContributionHeatmap = ({ contributions }: ContributionHeatmapProps) => {
  // Build grid with 4 rows and multiple columns
  const { grid, totalContributions } = useMemo(() => {
    // Create a map of date string -> contribution count
    const contributionsByDate = new Map<string, number>();
    contributions.forEach((contribution) => {
      const dateKey = contribution.date;
      const currentCount = contributionsByDate.get(dateKey);
      if (currentCount !== undefined) {
        contributionsByDate.set(dateKey, currentCount + 1);
      } else {
        contributionsByDate.set(dateKey, 1);
      }
    });

    // Calculate total days to display (WEEKS_TO_DISPLAY * ROWS_TO_DISPLAY gives us total cells)
    const totalDays = WEEKS_TO_DISPLAY * ROWS_TO_DISPLAY;

    // Start from today and go backwards
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate flat array of days going backwards from today
    const days: { date: string; count: number }[] = [];
    let totalCount = 0;

    for (let i = totalDays - 1; i >= 0; i--) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const contributionCount = contributionsByDate.get(dateKey);
      const count = contributionCount !== undefined ? contributionCount : 0;
      totalCount += count;

      days.push({
        date: dateKey,
        count: count,
      });
    }

    // Organize into columns (each column has ROWS_TO_DISPLAY cells)
    const columns: { date: string; count: number }[][] = [];
    for (let col = 0; col < WEEKS_TO_DISPLAY; col++) {
      const column: { date: string; count: number }[] = [];
      for (let row = 0; row < ROWS_TO_DISPLAY; row++) {
        const index = col * ROWS_TO_DISPLAY + row;
        if (index < days.length) {
          column.push(days[index]);
        }
      }
      columns.push(column);
    }

    return { grid: columns, totalContributions: totalCount };
  }, [contributions]);

  return (
    <div className="flex flex-col gap-2">
      {/* Heatmap grid - columns left to right, 4 rows each */}
      <div className="flex gap-[3px]">
        {grid.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[3px]">
            {column.map((day) => (
              <div
                key={day.date}
                className={`w-[10px] h-[10px] rounded-sm ${getColorClass(day.count)}`}
                title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDateForTooltip(day.date)}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend row */}
      <div className="flex items-center justify-between text-xs text-[#57606a] dark:text-[#8b949e]">
        <span>{totalContributions} contributions</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div
            className={`w-[10px] h-[10px] rounded-sm ${HEATMAP_COLORS.light.empty} dark:${HEATMAP_COLORS.dark.empty}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-sm ${HEATMAP_COLORS.light.level1} dark:${HEATMAP_COLORS.dark.level1}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-sm ${HEATMAP_COLORS.light.level2} dark:${HEATMAP_COLORS.dark.level2}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-sm ${HEATMAP_COLORS.light.level3} dark:${HEATMAP_COLORS.dark.level3}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-sm ${HEATMAP_COLORS.light.level4} dark:${HEATMAP_COLORS.dark.level4}`}
          />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
