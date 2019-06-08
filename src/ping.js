var CronJob = require('cron').CronJob;
var moment = require('moment');

var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var _ = require('lodash');
const openPingPage = require('./helper/pingPage')

let seoDomainArr = ['movingboxsale.com','ausplastic.com']
let domain_template = '__ping_domain__'
// let ping_api_domin = 'http://localhost:1337'
let ping_api_domin = 'http://seo.50d.top'
let ping_api_url = '/pingurls'
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


// new CronJob('00 00 */3 * * *', function () {
  new CronJob('00 */1 * * * *', function () {
  console.log('---cron triggered---');
  console.log(moment().format());
    rp(auth_options)
      .then(function (response) {
          console.log(`Got jwt==================${response.jwt}`)
          return response.jwt
      })
      .then(function(jwt){
        return rp({
          method: 'GET',
          uri: `${ping_api_domin}${ping_api_url}${filter}`,
          headers: {
              Authorization: `Bearer ${jwt}`
          },
          json: true
        })
        .then(function(res){
          console.log(res)
          domain_template
          let allSeoUrl = res;
          allSeoUrl.forEach(seoUrl=>{
            seoDomainArr.forEach(seoDomain=>{
              let seoPlatformUrl = seoUrl.replace(domain_template,seoDomain)
              openPingPage(seoPlatformUrl, seoDomain)
            })
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












