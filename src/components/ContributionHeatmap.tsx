"use client";

import { useMemo, useState } from "react";
import { Contribution } from "@/types";

interface ContributionHeatmapProps {
  contributions: Contribution[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  isLoading?: boolean;
}

// Tooltip state interface
interface TooltipState {
  date: string;
  count: number;
  x: number;
  y: number;
}

// Number of weeks to display in the heatmap
const WEEKS_TO_DISPLAY = 26;

// Number of rows to display (4 rows instead of 7 days)
const ROWS_TO_DISPLAY = 4;

// Animation delay between cells for staggered effect (ms)
const CELL_ANIMATION_DELAY = 5;

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

// Skeleton loading component for the heatmap grid
const HeatmapSkeleton = () => {
  return (
    <div className="flex flex-col gap-2" data-testid="heatmap-skeleton">
      {/* Skeleton grid */}
      <div className="flex gap-[3px]">
        {Array.from({ length: WEEKS_TO_DISPLAY }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[3px]">
            {Array.from({ length: ROWS_TO_DISPLAY }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="w-[10px] h-[10px] rounded-[2px] bg-[#e0e0e0] dark:bg-[#2a2a3e] animate-pulse"
                style={{
                  animationDelay: `${(colIndex * ROWS_TO_DISPLAY + rowIndex) * 10}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Skeleton legend */}
      <div className="flex items-center justify-between">
        <div className="w-24 h-3 bg-[#e0e0e0] dark:bg-[#2a2a3e] rounded animate-pulse" />
        <div className="flex items-center gap-1">
          <div className="w-8 h-3 bg-[#e0e0e0] dark:bg-[#2a2a3e] rounded animate-pulse" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px] bg-[#e0e0e0] dark:bg-[#2a2a3e] animate-pulse"
            />
          ))}
          <div className="w-8 h-3 bg-[#e0e0e0] dark:bg-[#2a2a3e] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// GitHub-style contribution heatmap component
const ContributionHeatmap = ({
  contributions,
  selectedDate,
  onDateSelect,
  isLoading = false,
}: ContributionHeatmapProps) => {
  // State for custom tooltip (instant display on hover)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

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

  // Handle mouse enter on cell - show tooltip instantly
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    date: string,
    count: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      date,
      count,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  // Handle mouse leave - hide tooltip
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Handle click on cell - toggle date filter
  const handleCellClick = (date: string) => {
    if (selectedDate === date) {
      // Click same date again to clear filter
      onDateSelect(null);
    } else {
      // Click new date to filter
      onDateSelect(date);
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <HeatmapSkeleton />;
  }

  return (
    <div className="relative flex flex-col gap-2" data-testid="contribution-heatmap">
      {/* Custom tooltip with smooth fade-in */}
      <div
        className={`fixed z-50 px-2 py-1 text-xs text-white bg-[#24292f] rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150 ${
          tooltip ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: tooltip ? tooltip.x : 0,
          top: tooltip ? tooltip.y - 8 : 0,
          transform: "translate(-50%, -100%)",
          visibility: tooltip ? "visible" : "hidden",
        }}
      >
        {tooltip && (
          <>
            {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""} on{" "}
            {formatDateForTooltip(tooltip.date)}
            {/* Tooltip arrow */}
            <div
              className="absolute left-1/2 bottom-0 w-0 h-0 -translate-x-1/2 translate-y-full"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "4px solid #24292f",
              }}
            />
          </>
        )}
      </div>

      {/* Heatmap grid - columns left to right, 4 rows each */}
      <div className="flex gap-[3px]">
        {grid.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[3px]">
            {column.map((day, rowIndex) => {
              const isSelected = selectedDate === day.date;
              const cellIndex = colIndex * ROWS_TO_DISPLAY + rowIndex;
              return (
                <div
                  key={day.date}
                  data-testid="heatmap-cell"
                  data-date={day.date}
                  className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all duration-200 animate-fadeIn ${getColorClass(day.count)} ${
                    isSelected ? "ring-2 ring-blue-500 ring-offset-1 scale-125" : "hover:scale-110"
                  }`}
                  style={{
                    animationDelay: `${cellIndex * CELL_ANIMATION_DELAY}ms`,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, day.date, day.count)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCellClick(day.date)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend row */}
      <div className="flex items-center justify-between text-xs text-[#57606a] dark:text-[#8b949e]">
        <span data-testid="heatmap-total">{totalContributions} contributions</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div
            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 ${HEATMAP_COLORS.light.empty} dark:${HEATMAP_COLORS.dark.empty}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 ${HEATMAP_COLORS.light.level1} dark:${HEATMAP_COLORS.dark.level1}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 ${HEATMAP_COLORS.light.level2} dark:${HEATMAP_COLORS.dark.level2}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 ${HEATMAP_COLORS.light.level3} dark:${HEATMAP_COLORS.dark.level3}`}
          />
          <div
            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 ${HEATMAP_COLORS.light.level4} dark:${HEATMAP_COLORS.dark.level4}`}
          />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
