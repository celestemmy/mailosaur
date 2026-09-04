import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dashboard.cloudapi.soemailsecurity.com/register');
  await page.getByRole('textbox', { name: 'John', exact: true }).fill('p');
  await page.getByRole('textbox', { name: 'Doe' }).fill('joe');
  await page.getByRole('textbox', { name: 'john@company.com' }).fill('ibukunoluwatinah+400@gmail.com');
  await page.getByRole('textbox', { name: 'Min 8 characters' }).fill('Ibk4real;@');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('Ibk4real;@');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('button', { name: 'Resend verification email' }).click();
});