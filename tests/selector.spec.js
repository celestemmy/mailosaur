import { test, expect } from '@playwright/test';

test('selector test', async ({ page }) => {
  await page.goto('https://frontend.api.gadamoney.com/login');

  const emailInput = page.locator('input[type="email"]').first();
  await expect(emailInput).toBeVisible();
  await emailInput.fill('ibukunholuwah55@gmail.com');

  const loginButton = page.locator('button[type="submit"]').first();
  await expect(loginButton).toBeVisible();  
  await loginButton.click();
});
