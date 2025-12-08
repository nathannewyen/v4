import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useActiveSection from "@/hooks/useActiveSection";
import { NAVIGATION_SECTIONS } from "@/constants";

describe("useActiveSection", () => {
  beforeEach(() => {
    // Mock document.getElementById to return elements
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      if (NAVIGATION_SECTIONS.includes(id as (typeof NAVIGATION_SECTIONS)[number])) {
        return document.createElement("div");
      }
      return null;
    });
  });

  it("should return first section as default active", () => {
    const { result } = renderHook(() => useActiveSection(NAVIGATION_SECTIONS));

    expect(result.current).toBe(NAVIGATION_SECTIONS[0]);
  });

  it("should return first section when only one section provided", () => {
    const { result } = renderHook(() => useActiveSection(["intro"] as const));

    expect(result.current).toBe("intro");
  });

  it("should handle empty sections array", () => {
    const emptySections: readonly string[] = [];
    const { result } = renderHook(() => useActiveSection(emptySections));

    expect(result.current).toBeUndefined();
  });
});
