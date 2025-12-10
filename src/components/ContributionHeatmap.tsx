"use client";

import { useMemo } from "react";
import { Contribution } from "@/types";

interface ContributionHeatmapProps {
  contributions: Contribution[];
}

// Number of weeks to display in the heatmap
const WEEKS_TO_DISPLAY = 17;

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

// Format date for tooltip display (e.g., "November 20th")
const formatDateForTooltip = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();

  // Add ordinal suffix (st, nd, rd, th)
  const ordinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${ordinalSuffix(day)}`;
};

// GitHub-style contribution heatmap component
const ContributionHeatmap = ({ contributions }: ContributionHeatmapProps) => {
  // Build weeks array with proper structure (each week has 7 days, Sun-Sat)
  const { weeks, totalContributions } = useMemo(() => {
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

    // Calculate the end date (today) and start date (beginning of week, N weeks ago)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start from the beginning of the week containing (today - WEEKS_TO_DISPLAY weeks)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - WEEKS_TO_DISPLAY * 7 + (7 - today.getDay()));

    // Adjust to start on Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    // Generate weeks array - each week is a column with 7 days (Sun=0 to Sat=6)
    const weeksArray: { date: string; count: number; dayOfWeek: number }[][] = [];
    const currentDate = new Date(startDate);
    let totalCount = 0;

    while (currentDate <= today) {
      const week: { date: string; count: number; dayOfWeek: number }[] = [];

      // Fill 7 days for this week
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        // Only add days that are not in the future
        if (currentDate <= today) {
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const day = String(currentDate.getDate()).padStart(2, "0");
          const dateKey = `${year}-${month}-${day}`;

          const contributionCount = contributionsByDate.get(dateKey);
          const count = contributionCount !== undefined ? contributionCount : 0;
          totalCount += count;

          week.push({
            date: dateKey,
            count: count,
            dayOfWeek: currentDate.getDay(),
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (week.length > 0) {
        weeksArray.push(week);
      }
    }

    return { weeks: weeksArray, totalContributions: totalCount };
  }, [contributions]);

  return (
    <div className="flex flex-col gap-2">
      {/* Heatmap grid - weeks as columns, days as rows */}
      <div className="flex gap-[3px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
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
