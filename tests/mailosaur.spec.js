const { test } = require('@playwright/test');
const path = require('path');
const MailosaurClient = require('mailosaur');

// Load MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID, and MAILOSAUR_SERVER_DOMAIN from .env
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const mailosaur = new MailosaurClient(
  process.env.MAILOSAUR_API_KEY
);
console.log(process.env.MAILOSAUR_SERVER_ID, process.env.MAILOSAUR_SERVER_DOMAIN);

test('Get email from Mailosaur', { timeout: 60000 }, async () => {
  // List emails already in the inbox (no polling).
  // Note: there are currently no emails to qauser@… — existing ones are
  // moving-solution@… and goes-angry@… on this server.
  const result = await mailosaur.messages.list(
    process.env.MAILOSAUR_SERVER_ID
  );

  console.log(`${result.items.length} messages in inbox`);
  for (const item of result.items) {
    console.log({
      subject: item.subject,
      to: (item.to || []).map((t) => t.email),
      received: item.received,
    });
  }

  if (result.items.length === 0) {
    throw new Error('No emails found in inbox');
  }

  // list returns summaries only; getById loads full HTML/text body
  const email = await mailosaur.messages.getById(result.items[0].id);
  console.log(email.subject, email.to);
});
