"use client";

import { useMemo } from "react";
import { Contribution } from "@/types";

interface ContributionHeatmapProps {
  contributions: Contribution[];
}

// Number of weeks to display in the heatmap
const WEEKS_TO_DISPLAY = 16;

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

// Format date as YYYY-MM-DD for consistent comparison
const formatDateKey = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// GitHub-style contribution heatmap component
const ContributionHeatmap = ({ contributions }: ContributionHeatmapProps) => {
  // Group contributions by date and generate heatmap data
  const heatmapData = useMemo(() => {
    // Create a map of date -> contribution count
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

    // Generate grid data for the last N weeks
    const today = new Date();
    const gridData: { date: string; count: number; dayOfWeek: number }[] = [];

    // Calculate the start date (beginning of the week, N weeks ago)
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - WEEKS_TO_DISPLAY * 7 - today.getDay());

    // Generate data for each day in the range
    const currentDate = new Date(startDate);
    while (currentDate <= today) {
      const dateKey = formatDateKey(currentDate);
      const contributionCount = contributionsByDate.get(dateKey);
      gridData.push({
        date: dateKey,
        count: contributionCount !== undefined ? contributionCount : 0,
        dayOfWeek: currentDate.getDay(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return gridData;
  }, [contributions]);

  // Organize data into weeks (columns) for CSS grid display
  const weeks = useMemo(() => {
    const weekColumns: { date: string; count: number }[][] = [];
    let currentWeek: { date: string; count: number }[] = [];

    heatmapData.forEach((day, index) => {
      currentWeek.push({ date: day.date, count: day.count });

      // Start a new week after Sunday (day 6) or at the end
      if (day.dayOfWeek === 6 || index === heatmapData.length - 1) {
        weekColumns.push(currentWeek);
        currentWeek = [];
      }
    });

    return weekColumns;
  }, [heatmapData]);

  // Calculate total contributions for display
  const totalContributions = useMemo(() => {
    return heatmapData.reduce((sum, day) => sum + day.count, 0);
  }, [heatmapData]);

  return (
    <div className="flex flex-col gap-2">
      {/* Heatmap grid container */}
      <div className="flex gap-[3px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-[10px] h-[10px] rounded-sm ${getColorClass(day.count)}`}
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Total contributions label */}
      <p className="text-xs text-[#57606a] dark:text-[#8b949e] text-right">
        {totalContributions} contributions in the last {WEEKS_TO_DISPLAY} weeks
      </p>
    </div>
  );
};

export default ContributionHeatmap;
