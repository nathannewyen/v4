"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getRepoDisplayName } from "@/hooks/github/utils";
import { GERRIT_TO_GITHUB_ORG } from "@/constants";

interface ProjectSelectProps {
  projects: string[];
  value: string;
  onChange: (value: string) => void;
}

// Get GitHub organization avatar URL from repo path or Gerrit mapping
const getAvatarUrl = (repo: string): string | null => {
  if (repo.includes("/")) {
    return `https://github.com/${repo.split("/")[0]}.png`;
  }
  const githubOrg = GERRIT_TO_GITHUB_ORG[repo];
  return githubOrg ? `https://github.com/${githubOrg}.png` : null;
};

// Custom project select dropdown with avatars and display names
const ProjectSelect = ({ projects, value, onChange }: ProjectSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Get display label for current selection
  const getDisplayLabel = (val: string) => {
    if (val === "all") return `All Projects (${projects.length})`;
    return getRepoDisplayName(val);
  };

  // Handle option selection
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="text-xs text-[#888] dark:text-[#777] uppercase">Project:</label>
      <div ref={dropdownRef} className="relative">
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full sm:w-auto min-w-[200px] pl-3 pr-10 py-2 text-sm font-mono cursor-pointer text-left",
            "bg-white dark:bg-[#2a2a3e]",
            "text-[#1A2234] dark:text-white",
            "border border-[#e0e0e0] dark:border-[#3a3a4e]",
            "focus:outline-none focus:border-[#1A2234] dark:focus:border-white",
            "flex items-center gap-2"
          )}
        >
          {/* Avatar for selected project */}
          {value !== "all" && getAvatarUrl(value) && (
            <Image
              src={getAvatarUrl(value)!}
              alt=""
              width={20}
              height={20}
              className="rounded-full flex-shrink-0"
            />
          )}
          <span className="truncate">{getDisplayLabel(value)}</span>
          {/* Dropdown arrow */}
          <svg
            className={cn(
              "absolute right-3 w-4 h-4 transition-transform",
              "text-[#666] dark:text-[#999]",
              isOpen && "rotate-180"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full min-w-[250px] max-h-[300px] overflow-y-auto",
              "bg-white dark:bg-[#2a2a3e]",
              "border border-[#e0e0e0] dark:border-[#3a3a4e]",
              "shadow-lg"
            )}
          >
            {/* All Projects option */}
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className={cn(
                "w-full px-3 py-2 text-sm font-mono text-left",
                "flex items-center gap-2",
                "hover:bg-[#f5f5f5] dark:hover:bg-[#3a3a4e]",
                value === "all" && "bg-[#e8e8e8] dark:bg-[#3a3a4e] font-bold"
              )}
            >
              <span>All Projects ({projects.length})</span>
            </button>

            {/* Divider */}
            <div className="border-t border-[#e0e0e0] dark:border-[#3a3a4e]" />

            {/* Project options */}
            {projects.map((project) => {
              const avatarUrl = getAvatarUrl(project);
              const displayName = getRepoDisplayName(project);

              return (
                <button
                  key={project}
                  type="button"
                  onClick={() => handleSelect(project)}
                  className={cn(
                    "w-full px-3 py-2 text-sm font-mono text-left",
                    "flex items-center gap-2",
                    "hover:bg-[#f5f5f5] dark:hover:bg-[#3a3a4e]",
                    "text-[#1A2234] dark:text-white",
                    value === project && "bg-[#e8e8e8] dark:bg-[#3a3a4e] font-bold"
                  )}
                >
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-full flex-shrink-0"
                    />
                  )}
                  <span className="truncate">{displayName}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSelect;
