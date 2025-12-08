import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

// Mock next-themes
const mockSetTheme = vi.fn();
let mockTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme = "light";
  });

  it("should render theme toggle button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should have correct aria-label for light mode", () => {
    mockTheme = "light";
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("should have correct aria-label for dark mode", () => {
    mockTheme = "dark";
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to light mode");
  });

  it("should switch to dark mode when in light mode", () => {
    mockTheme = "light";
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("should switch to light mode when in dark mode", () => {
    mockTheme = "dark";
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
