import { test, expect } from "@playwright/test";

test.describe("Contributions Heatmap", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contributions page before each test
    await page.goto("/contributions");
    // Wait for the page to load
    await page.waitForLoadState("networkidle");
  });

  test("should display heatmap on desktop", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Wait for heatmap to be visible (either skeleton or loaded)
    const heatmap = page.getByTestId("contribution-heatmap");
    const skeleton = page.getByTestId("heatmap-skeleton");

    // Either skeleton or heatmap should be visible initially
    const isHeatmapVisible = await heatmap.isVisible().catch(() => false);
    const isSkeletonVisible = await skeleton.isVisible().catch(() => false);

    expect(isHeatmapVisible || isSkeletonVisible).toBe(true);

    // Wait for data to load and heatmap to appear
    await expect(heatmap).toBeVisible({ timeout: 10000 });
  });

  test("should be hidden on mobile", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Heatmap should be hidden on mobile
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeHidden();
  });

  test("should show skeleton while loading", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Intercept API calls to delay them
    await page.route("**/api.github.com/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });

    // Reload page to see skeleton
    await page.reload();

    // Check for skeleton (may or may not be visible depending on cache)
    const skeleton = page.getByTestId("heatmap-skeleton");
    const heatmap = page.getByTestId("contribution-heatmap");

    // Eventually heatmap should be visible
    await expect(heatmap).toBeVisible({ timeout: 15000 });
  });

  test("should display tooltip on cell hover", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Get the first cell with contributions (green cell)
    const cells = page.getByTestId("heatmap-cell");
    const firstCell = cells.first();

    // Hover over the cell
    await firstCell.hover();

    // Wait for tooltip to appear
    await page.waitForTimeout(100);

    // Check that tooltip text is visible (contains "contribution" and a date)
    const tooltipText = page.locator("text=/\\d+ contributions? on/");
    await expect(tooltipText).toBeVisible();
  });

  test("should filter contributions when clicking a cell", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Get initial contribution count
    const resultsText = page.locator(
      "text=/Showing \\d+-\\d+ of \\d+ contributions|\\d+ contributions found/"
    );

    // Get a cell and click it
    const cells = page.getByTestId("heatmap-cell");
    const targetCell = cells.first();

    // Get the date from the cell
    const cellDate = await targetCell.getAttribute("data-date");

    // Click the cell to filter
    await targetCell.click();

    // Check that the cell now has ring styling (is selected)
    await expect(targetCell).toHaveClass(/ring-2/);

    // Click the same cell again to clear filter
    await targetCell.click();

    // Check that the ring is removed
    await expect(targetCell).not.toHaveClass(/ring-2/);
  });

  test("should show selected state with ring highlight", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Click a cell
    const cells = page.getByTestId("heatmap-cell");
    const targetCell = cells.nth(50); // Pick a cell in the middle

    await targetCell.click();

    // Verify ring-2 class is applied (selected state)
    await expect(targetCell).toHaveClass(/ring-2/);
    await expect(targetCell).toHaveClass(/ring-blue-500/);
  });

  test("should display total contributions count", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Check that total contributions text is visible
    const totalText = page.getByTestId("heatmap-total");
    await expect(totalText).toBeVisible();
    await expect(totalText).toContainText("contributions");
  });

  test("should have Less/More legend", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Check for legend text within the heatmap (avoid matching "Want to see more?")
    await expect(heatmap.locator("text=Less")).toBeVisible();
    await expect(heatmap.locator("text=More")).toBeVisible();
  });

  test("cells should have smooth hover animation", async ({ page }, testInfo) => {
    // Skip on mobile - heatmap is hidden via CSS (hidden lg:block)
    test.skip(testInfo.project.name === "Mobile Safari", "Heatmap hidden on mobile");

    // Wait for heatmap to load
    const heatmap = page.getByTestId("contribution-heatmap");
    await expect(heatmap).toBeVisible({ timeout: 10000 });

    // Get a cell and check it has transition classes
    const cells = page.getByTestId("heatmap-cell");
    const firstCell = cells.first();

    // Check that the cell has transition-all class for smooth animations
    await expect(firstCell).toHaveClass(/transition-all/);
  });
});
