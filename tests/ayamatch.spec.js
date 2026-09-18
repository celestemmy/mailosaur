import { test, expect } from '@playwright/test';
import path from 'path';
import MailosaurClient from 'mailosaur';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
const serverId = process.env.MAILOSAUR_SERVER_ID;
const serverDomain = process.env.MAILOSAUR_SERVER_DOMAIN || `${serverId}.mailosaur.net`;

test('create account on ayamatch', { timeout: 120000 }, async ({ page }) => {
  // Unique address so you always get a fresh OTP email
  const testEmail = `ayamatch-${Date.now()}@${serverDomain}`;

  await page.goto('https://www.ayamatch.com/');
  await page.getByRole('banner').getByRole('link', { name: 'Get Started' }).click();

  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Full name' }).fill('opeolu');
  await page.getByRole('textbox', { name: 'Email address' }).fill(`palace-happen@${serverDomain}`);
  await page.getByRole('textbox', { name: 'Password' }).fill('Ibk4real;@');
  await page.locator('input[type="date"]').fill('2003-06-21');
  await page.getByRole('button', { name: 'Male', exact: true }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  // Wait for OTP email (sent after Proceed)
  const email = await mailosaur.messages.get(
    serverId,
    { sentTo: testEmail },
    { timeout: 60000 } // wait up to 60s
  );

  // Prefer codes Mailosaur parsed; fallback to regex on body
  const otp =
    email.html?.codes?.[0]?.value ||
    email.text?.codes?.[0]?.value ||
    (email.text?.body || email.html?.body || '').match(/\b(\d{4,8})\b/)?.[1];

  expect(otp).toBeTruthy();
  console.log('OTP:', otp);

  // Adjust these to match the OTP screen after Proceed
  // Option A: single OTP field
  // await page.getByRole('textbox').fill(otp);

  // Option B: multiple digit boxes (common pattern)
  const digits = otp.split('');
  const otpInputs = page.locator('input').filter({ hasNot: page.locator('[type="date"]') });
  // or more specific once you know the UI:
  // const otpInputs = page.locator('input[maxlength="1"]');
  for (let i = 0; i < digits.length; i++) {
    await otpInputs.nth(i).fill(digits[i]);
  }

  await page.getByRole('button', { name: /verify|confirm|submit|continue/i }).click();
});