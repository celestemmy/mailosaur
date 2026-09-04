import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://gadamoney.com/');
  await page.getByRole('link', { name: 'Sign up For Free' }).click();
  await page.getByRole('textbox', { name: 'John Doe' }).click();
  await page.getByRole('textbox', { name: 'John Doe' }).click();
  await page.getByRole('textbox', { name: 'John Doe' }).fill('Tee ini');
  await page.getByRole('textbox', { name: 'amami@example.com' }).click();
  await page.getByRole('textbox', { name: 'amami@example.com' }).fill('ibukunoluwatinah@gmail.com');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'amami@example.com' }).fill('ibukunoluwatinah+500@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Ibk4real;@');
  await page.getByRole('checkbox', { name: 'By creating an account, you' }).check();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('textbox', { name: '0' }).first().click();
  await page.getByRole('button', { name: 'Verify Email' }).click();
  await page.getByRole('link', { name: 'Skip for later' }).click();
});