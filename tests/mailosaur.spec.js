const { test } = require('@playwright/test');
const path = require('path');
const MailosaurClient = require('mailosaur');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});


const mailosaur = new MailosaurClient(
  process.env.MAILOSAUR_API_KEY
);
console.log(process.env.MAILOSAUR_SERVER_ID, process.env.MAILOSAUR_SERVER_DOMAIN);
test('Get email from Mailosaur', async () => {

const email = await mailosaur.messages.get(
  process.env.MAILOSAUR_SERVER_ID,
  {
    sentTo: `qauser@${process.env.MAILOSAUR_SERVER_DOMAIN}`,
    receivedAfter: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }, { timeout: 60000 }
);
  console.log(email);
}, {timeout: 60000});