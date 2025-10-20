import { test, expect } from '@playwright/test';

test.describe('Feeling Page', () => {
  test('renders 5 circles', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const circles = await page.locator('.circle').all();
    expect(circles.length).toBe(5);
  });

  test('clicking a circle selects it', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const circles = page.locator('.circle');
    await circles.nth(2).click();
    await expect(circles.nth(0)).not.toHaveClass(/selected/);
  });

  test('Feedback Sent on Button Press', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const button = page.locator('confirmButton');
    await page.locator('button:text("Confirm")').click();
  });
});