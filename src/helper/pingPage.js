
const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-cn');

module.exports = async (seoPlatformUrl, seoUrl) =>{
  try {
    const browser = await puppeteer.launch({headless: false});
    // const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(seoPlatformUrl);
    console.log(`go to: ${seoPlatformUrl} for (${seoUrl})`);
    await page.setViewport({
        width: 1300,
        height: 1300
    });
    await page.waitFor(4200);
    browser.close();

  } catch (error) {
      console.log(error);
  } 
};