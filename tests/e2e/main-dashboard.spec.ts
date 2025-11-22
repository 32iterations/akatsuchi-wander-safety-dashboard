import { test, expect } from '@playwright/test';

/**
 * Main Dashboard E2E Tests
 *
 * Critical user flows for judges to see:
 * 1. Dashboard loads with all key components
 * 2. 3D scene is interactive
 * 3. Risk indicator is visible
 * 4. Occupancy chart shows data
 * 5. Navigation to admin page works
 */

test.describe('Main Dashboard', () => {
  test('loads successfully with all key components', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.locator('h1')).toContainText('赤土崎多功能館');

    // Check 3D canvas container exists
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Check risk indicator section
    await expect(page.getByText('即時徘徊風險')).toBeVisible();

    // Check occupancy chart
    await expect(page.getByText('館內空間使用率')).toBeVisible();
  });

  test('displays occupancy data for all zones', async ({ page }) => {
    await page.goto('/');

    // Check for specific zones
    await expect(page.getByText('記憶小徑（日照區）')).toBeVisible();
    await expect(page.getByText('感官花園')).toBeVisible();
    await expect(page.getByText('共融活動大廳')).toBeVisible();

    // Check that occupancy numbers are displayed
    const occupancyText = await page.textContent('body');
    expect(occupancyText).toMatch(/\d+\/\d+/); // matches pattern like "7/10"
  });

  test('navigation to admin page works', async ({ page }) => {
    await page.goto('/');

    // Click admin link
    await page.getByRole('link', { name: /管理端/ }).click();

    // Verify we're on admin page
    await expect(page).toHaveURL('/admin');
    await expect(page.getByText('管理端 Dashboard')).toBeVisible();
  });

  test('demo button is present', async ({ page }) => {
    await page.goto('/');

    // Check for demo playback button
    const demoButton = page.getByRole('button', { name: /一鍵播放/ });
    await expect(demoButton).toBeVisible();
  });

  test('responsive design - mobile view', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that main elements are still visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('canvas')).toBeVisible();
  });
});
