import { test, expect } from '@playwright/test';

const BASE_PATH = '/Team_5';
const BASE_URL = `http://localhost:5173${BASE_PATH}`;

test('has title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveURL(BASE_URL);

  //Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle();
});