import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

describe("useScrollAnimation", () => {
  it("should return ref and initial visibility as false", () => {
    const { result } = renderHook(() => useScrollAnimation());

    const [ref, isVisible] = result.current;

    expect(ref).toBeDefined();
    expect(ref.current).toBeNull();
    expect(isVisible).toBe(false);
  });

  it("should accept custom threshold parameter", () => {
    const { result } = renderHook(() => useScrollAnimation(0.5));

    const [ref, isVisible] = result.current;

    expect(ref).toBeDefined();
    expect(isVisible).toBe(false);
  });

  it("should return stable ref across rerenders", () => {
    const { result, rerender } = renderHook(() => useScrollAnimation());

    const firstRef = result.current[0];
    rerender();
    const secondRef = result.current[0];

    expect(firstRef).toBe(secondRef);
  });
});
