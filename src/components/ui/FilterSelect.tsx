"use client";

import { cn } from "@/lib/utils";

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: FilterSelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

// Base styles for the select dropdown
const selectBaseStyles = cn(
  "w-full sm:w-auto pl-3 pr-10 py-2 text-sm font-mono cursor-pointer",
  "bg-white dark:bg-[#2a2a3e]",
  "text-[#1A2234] dark:text-white",
  "border border-[#e0e0e0] dark:border-[#3a3a4e]",
  "focus:outline-none focus:border-[#1A2234] dark:focus:border-white",
  "appearance-none bg-no-repeat bg-[length:16px_16px] bg-[position:right_0.75rem_center]",
  // Light mode arrow
  "bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23666%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]",
  // Dark mode arrow
  "dark:bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23999%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"
);

// Reusable filter select dropdown component
const FilterSelect = ({ id, label, value, options, onChange, className }: FilterSelectProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label htmlFor={id} className="text-xs text-[#888] dark:text-[#777] uppercase">
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectBaseStyles, className)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
