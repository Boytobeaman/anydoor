
const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-cn');

module.exports = async (seoPlatformUrl, callback) =>{
  // const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  // const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(seoPlatformUrl);
    console.log(`go to: ${seoPlatformUrl} (${count} of ${whole_count})`);
    await page.setViewport({
        width: 1300,
        height: 1300
    });
    await page.waitFor(1200);
    browser.close();
    callback(null,"")
    count+=1;

  } catch (error) {
      console.log(error);
      browser.close();
      callback(null,"")
      count+=1;
  }
};