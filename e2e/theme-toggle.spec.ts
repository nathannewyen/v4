import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");
  });

  test("should have theme toggle button", async ({ page }) => {
    const themeToggle = page.locator('button[aria-label*="Switch to"]');
    await expect(themeToggle).toBeVisible();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    // Click theme toggle button
    const themeToggle = page.locator('button[aria-label*="Switch to"]');
    const initialAriaLabel = await themeToggle.getAttribute("aria-label");

    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify aria-label changed
    const newAriaLabel = await themeToggle.getAttribute("aria-label");
    expect(newAriaLabel).not.toBe(initialAriaLabel);
  });

  test("should have accessible theme toggle button", async ({ page }) => {
    const themeToggle = page.locator('button[aria-label*="Switch to"]');

    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();

    // Verify aria-label is present
    const ariaLabel = await themeToggle.getAttribute("aria-label");
    expect(ariaLabel).toMatch(/Switch to (light|dark) mode/);
  });
});
