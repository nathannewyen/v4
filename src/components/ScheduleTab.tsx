"use client";

import { useState } from "react";
import { openCalendly } from "@/lib/openCalendly";

const STORAGE_KEY = "schedule-tab-expanded";

export default function ScheduleTab() {
  // Default is minimized. Once a recruiter expands it, that preference sticks
  // across sessions via localStorage. ssr:false means window is safe here.
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const [closing, setClosing] = useState(false);

  const persist = (next: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  const handleMinimize = () => {
    setClosing(true);
    persist(false);
  };

  const handleCollapseEnd = () => {
    if (closing) {
      setClosing(false);
      setExpanded(false);
    }
  };

  const handleExpand = () => {
    setExpanded(true);
    persist(true);
  };

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={handleExpand}
        aria-label="Show book a call tab"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 border border-r-0 border-[#1A2234] dark:border-white bg-transparent text-[#1A2234] dark:text-white px-1.5 py-2 font-mono text-[11px] font-bold hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234] transition-colors cursor-pointer animate-fadeIn"
      >
        ‹
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <div
        className={`group flex flex-col items-end ${closing ? "animate-slideOutRight" : "animate-slideInRight"}`}
        onAnimationEnd={handleCollapseEnd}
      >
        {/* Minimize cap — subtle, appears above tab on hover */}
        <button
          type="button"
          onClick={handleMinimize}
          aria-label="Minimize book a call tab"
          className="border border-r-0 border-b-0 border-[#1A2234] dark:border-white bg-transparent text-[#1A2234] dark:text-white font-mono text-[10px] leading-none px-1.5 py-1 opacity-0 group-hover:opacity-100 hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234] transition-opacity cursor-pointer"
        >
          ×
        </button>

        {/* Book a call tab */}
        <button
          type="button"
          onClick={openCalendly}
          aria-label="Book a call with Nhan"
          className="border border-r-0 border-[#1A2234] dark:border-white bg-transparent text-[#1A2234] dark:text-white px-1.5 py-4 font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A2234] hover:text-white dark:hover:bg-white dark:hover:text-[#1A2234] transition-colors [writing-mode:vertical-rl] cursor-pointer"
        >
          Book a Call
        </button>
      </div>
    </div>
  );
}
