import puppeteer from "puppeteer";

const user = process.argv[2];
const password = process.argv[3];
if (!user || !password) {
  console.error("Please set the USER and PASSWORD environment variables.");
  process.exit(1);
}

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
});
const page = await browser.newPage();

// Set screen size.
await page.setViewport({ width: 1200, height: 1024 });

// Navigate the page to a URL.
await page.goto("https://app.factorialhr.com/?locale=es");
await new Promise((resolve) => setTimeout(resolve, 5000));

// Type into search box.
await page.locator("#user_email").fill(user);
await page.locator("#user_password").fill(password);

// Wait and click on first result.
await page.locator('input[name="commit"]').click();

await new Promise((resolve) => setTimeout(resolve, 35000));

const botones = await page.$$('button');
for (const button of botones) {
    const innerHTML = await page.evaluate(el => el.innerHTML, button);
    if (innerHTML.includes("#stop")) {
        console.log(innerHTML);
        await button.click();
        break;
    }
}
await new Promise((resolve) => setTimeout(resolve, 5000));
await page.close();
await browser.close();

process.exit(0);