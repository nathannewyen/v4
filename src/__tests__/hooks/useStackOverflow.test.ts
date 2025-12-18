import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useStackOverflow from "@/hooks/useStackOverflow";

// Mock SWR
vi.mock("swr", () => ({
  default: vi.fn(),
}));

import useSWR from "swr";

// Mock answer data matching StackOverflowAnswer type
const mockAnswers = [
  {
    answerId: 123,
    questionId: 456,
    questionTitle: "How to use React hooks?",
    isAccepted: true,
    score: 5,
    link: "https://stackoverflow.com/a/123",
    creationDate: 1699900000,
    tags: ["react", "javascript"],
  },
  {
    answerId: 124,
    questionId: 457,
    questionTitle: "TypeScript generics explained",
    isAccepted: false,
    score: 3,
    link: "https://stackoverflow.com/a/124",
    creationDate: 1699800000,
    tags: ["typescript", "generics"],
  },
];

// Mock user data matching StackOverflowUser type
const mockUser = {
  reputation: 451,
  badgeCounts: {
    gold: 1,
    silver: 3,
    bronze: 8,
  },
  profileImage: "https://example.com/avatar.png",
  displayName: "Nathan Nguyen",
};

describe("useStackOverflow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading state initially", () => {
    // Mock SWR to return loading state for both calls
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useStackOverflow());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.answers).toEqual([]);
    expect(result.current.user).toBeNull();
    expect(result.current.isError).toBe(false);
  });

  it("should return user and answers when data is fetched", () => {
    // Mock SWR to return different data based on key
    vi.mocked(useSWR).mockImplementation((key: string) => {
      if (key === "stackoverflow-user") {
        return {
          data: mockUser,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: vi.fn(),
        };
      }
      if (key === "stackoverflow-answers") {
        return {
          data: mockAnswers,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: vi.fn(),
        };
      }
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
        isValidating: false,
        mutate: vi.fn(),
      };
    });

    const { result } = renderHook(() => useStackOverflow());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.answers).toEqual(mockAnswers);
    expect(result.current.isError).toBe(false);
  });

  it("should return error state when API fails", () => {
    // Mock SWR to return error state
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: new Error("API Error"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useStackOverflow());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.answers).toEqual([]);
    expect(result.current.user).toBeNull();
  });

  it("should return loading true if either user or answers is loading", () => {
    // Mock SWR with user loaded but answers still loading
    vi.mocked(useSWR).mockImplementation((key: string) => {
      if (key === "stackoverflow-user") {
        return {
          data: mockUser,
          error: undefined,
          isLoading: false,
          isValidating: false,
          mutate: vi.fn(),
        };
      }
      // answers still loading
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
        isValidating: true,
        mutate: vi.fn(),
      };
    });

    const { result } = renderHook(() => useStackOverflow());

    expect(result.current.isLoading).toBe(true);
  });
});
