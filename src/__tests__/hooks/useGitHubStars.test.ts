import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useGitHubStars from "@/hooks/useGitHubStars";
import { initialProjects } from "@/data/projects";

// Mock SWR
vi.mock("swr", () => ({
  default: vi.fn(),
}));

import useSWR from "swr";

describe("useGitHubStars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial projects while loading", () => {
    // Mock SWR to return loading state
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGitHubStars(initialProjects));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.projects).toEqual(initialProjects);
  });

  it("should update star counts when data is fetched", () => {
    const mockStarCounts = initialProjects.map(() => ({
      stargazers_count: 125000,
    }));

    vi.mocked(useSWR).mockReturnValue({
      data: mockStarCounts,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGitHubStars(initialProjects));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.projects[0].stars).toBe("125k");
  });

  it("should format star counts correctly", () => {
    const mockStarCounts = [
      { stargazers_count: 500 },
      { stargazers_count: 1500 },
      { stargazers_count: 10000 },
      { stargazers_count: 100500 },
    ];

    vi.mocked(useSWR).mockReturnValue({
      data: mockStarCounts,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGitHubStars(initialProjects));

    expect(result.current.projects[0].stars).toBe("500");
    expect(result.current.projects[1].stars).toBe("1.5k");
    expect(result.current.projects[2].stars).toBe("10k");
    expect(result.current.projects[3].stars).toBe("100.5k");
  });

  it("should return original project when no data", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: new Error("Rate limit exceeded"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGitHubStars(initialProjects));

    expect(result.current.projects).toEqual(initialProjects);
  });
});
