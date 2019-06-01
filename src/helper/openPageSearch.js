
const puppeteer = require('puppeteer');

module.exports = async (seoPlatformUrl, seoUrl, inputID, startBtn) =>{
  try {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(seoPlatformUrl);
    console.log(`go to: ${seoPlatformUrl} for (${seoUrl})`);
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
        browser.close();
      },1*60*60*1000)
      
    });
  } catch (error) {
      console.log(error);
  } 
};