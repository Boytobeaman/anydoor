const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-cn');
const {mn} = require('./config/ssConfig');
const srcToImg = require('./helper/srcToImg');

const to_url = `https://www.ausplastic.com`;
(async () => {
    try {
        // const browser = await puppeteer.launch({headless: false});
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto(to_url);
        console.log(`go to: ${to_url}`);
        await page.setViewport({
            width: 1920,
            height: 2300
        });
        console.log(`reset viewport`);
        await page.focus('.product-header-search');
        await page.keyboard.sendCharacter('stackable');
        await page.click('button[type="submit"]');
        console.log('go to search list');
        page.on('load', async () =>{
          console.log('page loading done, start fetch...');
          await page.waitFor(22000);
          await browser.close();
        });
        
    } catch (error) {
        console.log(error);
    }
    
})();