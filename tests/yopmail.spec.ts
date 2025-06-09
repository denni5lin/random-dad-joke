import { chromium, Page } from 'playwright';

function generateRandomEmail(): string {
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${randomId}@yopmail.com`;
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get dad joke
  await page.goto('https://icanhazdadjoke.com/');

  const dadJokeSelector = '.card-content p';
  await page.waitForSelector(dadJokeSelector);
  const jokeText = await page.locator(dadJokeSelector).innerText();

  // Go to Yopmail
  await page.goto('https://yopmail.com/');

  // Generate random email and open inbox
  const randomEmail = generateRandomEmail().split('@')[0];
  await page.locator('#login').fill(randomEmail);
  await page.keyboard.press('Enter');

  // Wait for inbox page to load
  await page.waitForSelector('#newmail');

  // Click the “new mail” button to open compose window
  await page.locator('#newmail').click();

  // Switch to the compose iframe
  const composeFrame = page.frameLocator('iframe#ifmail');

  // Compose and send email
  await composeFrame.locator('#msgto').fill(`${randomEmail}@yopmail.com`);
  await composeFrame.locator('#msgsubject').fill('Your Daily Dad Joke');
  await composeFrame.locator('#msgbody').fill(jokeText);

  // Click Send
  await composeFrame.locator('#msgsend').click();

  console.log(`Email sent from: ${randomEmail}@yopmail.com`);
  await page.waitForTimeout(5000); // wait to observe result
  await browser.close();
}

main().catch(console.error);
