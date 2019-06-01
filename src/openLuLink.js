var CronJob = require('cron').CronJob;
const openSeoPage = require('./helper/openPageSearch')

let seoPlatformUrl = 'https://tool.lusongsong.com/seo/'
let seoUrlArr = ['www.movingboxsale.com','www.ausplastic.com']
let input = 'input[name="dn"]'
let startBtn = 'input[type="submit"]'

// let seoPlatformUrl = 'https://www.ausplastic.com'
// let seoUrlArr = ['folding crates','stacking crate','moving boxes']
// let input = '.product-header-search'
// let startBtn = 'button[type="submit"]'

new CronJob('00 00 */9 * * *', function () {
// new CronJob('00 */1 * * * *', function () {
    console.log('---cron triggered---');
    console.log(new Date());
    seoUrlArr.forEach(seoUrl=>{
      openSeoPage(seoPlatformUrl, seoUrl, input, startBtn)
    })
}, null, true, 'Asia/Shanghai');