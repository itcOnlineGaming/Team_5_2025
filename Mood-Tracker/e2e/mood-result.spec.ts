import { test, expect } from '@playwright/test';

test.describe('Mood Result Screen', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear any existing mood entries in localStorage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display loading state when no mood parameter is provided', async ({ page }) => {
    await page.goto('/result');
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('should display correct mood image and text for mood 1 (red)', async ({ page }) => {
    await page.goto('/result?mood=0');
    
    await expect(page.locator('.mood-image')).toBeVisible();
    await expect(page.locator('.mood-image')).toHaveAttribute('src', /RedMood/);
    await expect(page.getByText('Oh No!')).toBeVisible();
    await expect(page.getByText("Lets try adjusting the schedule today to better suit your needs")).toBeVisible();
  });

  test('should display correct mood image and text for mood 2 (orange)', async ({ page }) => {
    await page.goto('/result?mood=1');
    
    await expect(page.locator('.mood-image')).toHaveAttribute('src', /OrangeMood/);
    await expect(page.getByText('You might need a break.')).toBeVisible();
    await expect(page.getByText("lets ease the workload today")).toBeVisible();
  });

  test('should display correct mood image and text for mood 3 (yellow)', async ({ page }) => {
    await page.goto('/result?mood=2');
    
    await expect(page.locator('.mood-image')).toHaveAttribute('src', /YellowMood/);
    await expect(page.getByText('Good to Know!')).toBeVisible();
    await expect(page.getByText("Let's balance out our progress today")).toBeVisible();
  });

  test('should display correct mood image and text for mood 4 (lime)', async ({ page }) => {
    await page.goto('/result?mood=3');
    
    await expect(page.locator('.mood-image')).toHaveAttribute('src', /LimeMood/);
    await expect(page.getByText('Wonderful!')).toBeVisible();
    await expect(page.getByText("Time to start another productive day")).toBeVisible();
  });

  test('should display correct mood image and text for mood 5 (green)', async ({ page }) => {
    await page.goto('/result?mood=4');
    
    await expect(page.locator('.mood-image')).toHaveAttribute('src', /GreenMood/);
    await expect(page.getByText('Thats great to hear!')).toBeVisible();
    await expect(page.getByText("Let's calculate what tasks we can focus on today")).toBeVisible();
  });

  test('should save mood entry and navigate to homescreen on continue', async ({ page }) => {
    await page.goto('/result?mood=2');
    
    await page.click('.continueButton');
    
    // Check navigation occurred
    await expect(page).toHaveURL(/\/Homescreen/);
    
    // Verify mood was saved to store
    await page.goto('/result?mood=0');
    const moodEntries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('moodEntries') || '[]');
    });
    
    expect(moodEntries).toHaveLength(2);
    expect(moodEntries[0].mood).toBe(3); // mood=2 parameter = mood value 3
  });

  test('should NOT show support buttons for first low mood', async ({ page }) => {
    await page.goto('/result?mood=0'); // First low mood
    
    await expect(page.getByText('Try some breathing excercises')).not.toBeVisible();
    await expect(page.getByText('Try some Yoga')).not.toBeVisible();
    await expect(page.getByText('Oh No!')).toBeVisible();
  });

  test('should NOT show support buttons for second low mood', async ({ page }) => {
    // Add first low mood entry
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=1'); // Second low mood
    
    await expect(page.getByText('Try some breathing excercises')).not.toBeVisible();
    await expect(page.getByText('Try some Yoga')).not.toBeVisible();
  });

  test('should show support buttons on third low mood', async ({ page }) => {
    // Add two previous low mood entries
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 20000 },
        { mood: 2, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=0'); // Third low mood
    
    await expect(page.getByText("Looks like you're having a rough day")).toBeVisible();
    await expect(page.getByText('maybe try some breathing or yoga excercises')).toBeVisible();
    await expect(page.getByText('Try some breathing excercises')).toBeVisible();
    await expect(page.getByText('Try some Yoga')).toBeVisible();
  });

  test('should navigate to breathing screen when breathing button clicked', async ({ page }) => {
    // Setup for support buttons to appear
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 20000 },
        { mood: 2, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=1');
    
    await page.click('button:has-text("Try some breathing excercises")');
    
    await expect(page).toHaveURL(/\/Breathingscreen/);
  });

  test('should navigate to yoga screen when yoga button clicked', async ({ page }) => {
    // Setup for support buttons to appear
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 20000 },
        { mood: 2, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=0');
    
    await page.click('button:has-text("Try some Yoga")');
    
    await expect(page).toHaveURL(/\/YogaScreen/);
  });

  test('should save mood before navigating to breathing screen', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 20000 },
        { mood: 2, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=1');
    await page.click('button:has-text("Try some breathing excercises")');
    
    await page.goto('/');
    const moodEntries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('moodEntries') || '[]');
    });
    
    expect(moodEntries).toHaveLength(3);
    expect(moodEntries[2].mood).toBe(2);
  });

  test('should save mood before navigating to yoga screen', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 20000 },
        { mood: 2, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=0');
    await page.click('button:has-text("Try some Yoga")');
    
    await page.goto('/');
    const moodEntries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('moodEntries') || '[]');
    });
    
    expect(moodEntries).toHaveLength(3);
    expect(moodEntries[2].mood).toBe(1);
  });

  test('should handle invalid mood parameter gracefully', async ({ page }) => {
    await page.goto('/result?mood=invalid');
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('should handle out of range mood parameter', async ({ page }) => {
    await page.goto('/result?mood=10');
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('should not show support buttons for high moods mixed with low moods', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('moodEntries', JSON.stringify([
        { mood: 1, timestamp: Date.now() - 30000 },
        { mood: 5, timestamp: Date.now() - 20000 },
        { mood: 4, timestamp: Date.now() - 10000 }
      ]));
    });
    
    await page.goto('/result?mood=0'); // Second low mood total
    
    await expect(page.getByText('Try some breathing excercises')).not.toBeVisible();
  });

  test('should display cloud background image', async ({ page }) => {
    await page.goto('/result?mood=2');
    
    const cloudBg = page.locator('.cloud-bg');
    await expect(cloudBg).toBeVisible();
    await expect(cloudBg).toHaveCSS('background-image', /Cloud/);
  });
});