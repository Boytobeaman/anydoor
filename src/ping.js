var CronJob = require('cron').CronJob;
var moment = require('moment');
var async = require('async');

var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var _ = require('lodash');
const openPingPage = require('./helper/pingPage')

let domain_template = '__ping_domain__'
// let ping_api_domin = 'http://localhost:1337'
let ping_api_domin = 'http://seo.50d.top'
let ping_api_url = '/pingurls'
let domain_api_url = '/pingdomains'
let auth_url ='/auth/local'
let limit = -1
var auth_options = {
  method: 'POST',
  url: `${ping_api_domin}${auth_url}`,
  form: {
      'identifier': 'test',
      'password': 'ABC123456'
  },
  json: true
};

let filter = ''
if(typeof limit != 'undefined'){
  filter = `?_limit=${limit}`
}


new CronJob('00 00 */7 * * *', function () {
  // new CronJob('00 */1 * * * *', function () {
  console.log('---cron triggered---');
  console.log(moment().format());
    rp(auth_options)
      .then(function (response) {
          console.log(`Got jwt==================${response.jwt}`)
          return response.jwt
      })
      .then(function(jwt){
        Promise.all([
          rp({
            method: 'GET',
            uri: `${ping_api_domin}${ping_api_url}${filter}`,
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            json: true
          }), 
          rp({
            method: 'GET',
            uri: `${ping_api_domin}${domain_api_url}${filter}`,
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            json: true
        })]).then(datas =>{
          // 接收到的 datas 是一个数组，依次包含了多个 promise 返回的内容
          let allSeoUrl = datas[0];
          let seoDomainArr = datas[1]
          let allPingUrlArr = [];
          allSeoUrl.forEach(seoUrl=>{
            seoDomainArr.forEach(seoDomain=>{
              let seoPlatformUrl = seoUrl.url.replace(domain_template,seoDomain.domain)
              allPingUrlArr.push(seoPlatformUrl)
            })
          })
          global.count = 0;
          global.whole_count = allPingUrlArr.length;
          async.mapLimit(allPingUrlArr, 5, function (pingUrl, callback) {
            openPingPage(pingUrl, callback);
          }, function (err, result) {
            if(err){
              console.log(err)
            }else{
              console.log('all ping finished')
              console.log(moment().format())
            }
          }) 

        })
        .catch(function(err){
          console.log(err)
        })
      })
      .catch(function(err){
        console.log(err)
      })
  }, null, true, 'Asia/Shanghai');












