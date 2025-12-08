import { test, expect } from "@playwright/test";

test.describe("Portfolio Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/Nhan Nguyen/);
  });

  test("should display hero section content", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("NHAN");
    await expect(page.locator("h1")).toContainText("NGUYEN");
  });

  test("should navigate to sections when clicking nav links", async ({ page }) => {
    // Click on experience section
    await page.click('button:has-text("experience")');

    // Verify scroll to experience section
    const experienceSection = page.locator("#experience");
    await expect(experienceSection).toBeVisible();
  });

  test("should have skip to content link for accessibility", async ({ page }) => {
    // Focus the skip link (it becomes visible on focus)
    const skipLink = page.locator('a[href="#main"]');
    await skipLink.focus();

    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveText("Skip to main content");
  });

  test("should display all navigation sections", async ({ page }) => {
    const nav = page.locator("nav");

    await expect(nav.getByText("intro")).toBeVisible();
    await expect(nav.getByText("experience")).toBeVisible();
    await expect(nav.getByText("projects")).toBeVisible();
  });

  test("should display social links in hero", async ({ page }) => {
    await expect(page.locator('a:has-text("GITHUB")')).toBeVisible();
    await expect(page.locator('a:has-text("X / TWITTER")')).toBeVisible();
  });
});
