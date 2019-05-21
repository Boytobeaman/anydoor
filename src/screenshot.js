const puppeteer = require('puppeteer');
const {mn} = require('./config/ssConfig');
const srcToImg = require('./helper/srcToImg');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://image.baidu.com');
        console.log('go to: https://image.baidu.com');
        await page.setViewport({
            width: 1920,
            height: 1300
        });
        console.log(`reset viewport`);
        await page.focus('#kw');
        await page.keyboard.sendCharacter('狗');
        await page.click('.s_search');
        console.log('go to search list');
        page.on('load', async () =>{
            console.log('page loading done, start fetch...');
            const srcs = await page.evaluate( ()=>{
                const images = document.querySelectorAll('img.main_img');
                return Array.prototype.map.call(images, img=>img.src);
            });
            srcs.forEach(async src => {
                await srcToImg(src, mn);
            });
            await browser.close();
        });
        
    } catch (error) {
        console.log(error);
    }
    
})();