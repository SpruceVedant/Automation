const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\paths\\to\\Google\\Chrome\\chrome.exe',
    headless: false 
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://yoururl.com/Login', { waitUntil: 'networkidle0' });

  
    await page.waitForSelector('input[name="username"]', { visible: true, timeout: 10000 });

    await page.type('input[name="username"]', 'username');
    await page.type('input[name="password"]', 'password');

    await page.click('button[type="submit"]');

    await page.waitForNavigation();
// same url will not open because of browser cookies
    // await page.goto('https://yoururl.com/attendance/dailyattendance');

    await page.click('#btnTimeOut');

    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('An error occurred:', error.message);
    await page.screenshot({ path: 'error_screenshot.png' });
  } finally {
    await browser.close();
  }
})();
