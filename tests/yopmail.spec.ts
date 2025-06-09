import { chromium, Page } from 'playwright';

function generateRandomEmail(): string {
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${randomId}@yopmail.com`;
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Go to Yopmail
  await page.goto('https://yopmail.com/');

  // 2. Generate random email and open inbox
  const randomEmail = generateRandomEmail().split('@')[0];
  await page.locator('#login').fill(randomEmail);
  await page.keyboard.press('Enter');

  // 3. Wait for inbox page to load
  await page.waitForSelector('#newmail');

  // 4. Click the “new mail” button to open compose window
  await page.locator('#newmail').click();

  // 5. Switch to the compose iframe
  const composeFrame = page.frameLocator('iframe#ifmail');

  // 6. Compose and send email
  await composeFrame.locator('#msgto').fill(`${randomEmail}@yopmail.com`);
  await composeFrame.locator('#msgsubject').fill('Hello from Nigeria!');
  await composeFrame.locator('#msgbody').fill('I am your Nigerian prince, please send me your bank details.');

  // Click Send
  await composeFrame.locator('#msgsend').click();

  console.log(`Email sent from: ${randomEmail}@yopmail.com`);
  await page.waitForTimeout(5000); // wait to observe result
  await browser.close();
}

main().catch(console.error);
