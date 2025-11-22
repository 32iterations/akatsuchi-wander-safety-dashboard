import { test, expect } from '@playwright/test';

/**
 * Admin Page E2E Tests
 *
 * Tests for the care team dashboard:
 * 1. Rules configuration section is visible
 * 2. Event replay features are present
 * 3. Navigation back to main page works
 * 4. 3D scene renders in event replay
 */

test.describe('Admin Dashboard', () => {
  test('loads with rules and configuration sections', async ({ page }) => {
    await page.goto('/admin');

    // Check main heading
    await expect(page.getByText('管理端 Dashboard')).toBeVisible();

    // Check rules section
    await expect(page.getByText('規則模擬：徘徊觸發條件')).toBeVisible();
    await expect(page.getByText('Rule #1')).toBeVisible();
    await expect(page.getByText('Rule #2')).toBeVisible();
  });

  test('displays event timeline information', async ({ page }) => {
    await page.goto('/admin');

    // Check for event replay section
    await expect(page.getByText('事件時間軸')).toBeVisible();

    // Check that timeline events are displayed
    await expect(page.getByText(/王奶奶/)).toBeVisible();
    await expect(page.getByText(/林護理師/)).toBeVisible();
  });

  test('shows 3D scene in event replay section', async ({ page }) => {
    await page.goto('/admin');

    // Check that 3D canvas is present
    const canvases = page.locator('canvas');
    const count = await canvases.count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigation back to main page works', async ({ page }) => {
    await page.goto('/admin');

    // Click back link
    await page.getByRole('link', { name: /返回展示頁/ }).click();

    // Verify we're back on main page
    await expect(page).toHaveURL('/');
    await expect(page.getByText('赤土崎多功能館')).toBeVisible();
  });

  test('occupancy visualization is present', async ({ page }) => {
    await page.goto('/admin');

    // Check for space heatmap section
    await expect(page.getByText('空間熱度')).toBeVisible();
  });

  test('responsive design - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/admin');

    // Check that main elements are visible on mobile
    await expect(page.getByText('管理端 Dashboard')).toBeVisible();
    await expect(page.getByText('Rule #1')).toBeVisible();
  });
});
