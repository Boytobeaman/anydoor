
const puppeteer = require('puppeteer');

module.exports = async (seoPlatformUrl, seoUrl, inputID, startBtn) =>{
  try {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(seoPlatformUrl);
    console.log(`go to: ${seoPlatformUrl}`);
    await page.setViewport({
        width: 1920,
        height: 1300
    });
    console.log(`reset viewport`);
    await page.waitFor(1200);
    await page.focus(`#${inputID}`);
    // select input text to remove them
    await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('A');
    await page.keyboard.up('Control');

    await page.keyboard.sendCharacter(seoUrl);
    await page.click(`#${startBtn}`);
    console.log(`started for url ${seoUrl}`);
    page.on('load', async () =>{
        setTimeout(()=>{
        },1*60*60*1000)
        await browser.close();
    });
  } catch (error) {
      console.log(error);
  } 
};