import { test, expect } from '@playwright/test';

const BASE_PATH = '/Team_5';
const BASE_URL = `http://localhost:5173${BASE_PATH}`;

test(`Test on Playwright Page`, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('Show Start Screen Popup', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('button', {name: 'View Information'}).click();
  await expect(page.getByRole('heading', { name: 'Hello, and welcome to our application called "Mood Tracker".' })).toBeVisible();
});