import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/${base}');
  await expect(page).toHaveURL("http://localhost:5173/${base}");

  //Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle();
});