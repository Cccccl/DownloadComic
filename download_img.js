const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');

let download = (url, filename) => {
    // 新建Promise对象，使其成为可以回调的函数，方便后面的async-await调用
    return new Promise((resolve,reject)=>{
        request(url,(err,response,body)=>{
            if(err||response.statusCode === 404){
                reject();
            }else{
                $ = cheerio.load(body);
                // console.log(response.body)
                if (response.body.split('mhurl =')[1]){
                    console.log('reaching to ' + url);
                    var result = 'http://183.91.33.78/p1.xiaoshidi.net/' + response.body.split('mhurl =')[1].split(';')[0].split('"')[1];
                    request(result).pipe(fs.createWriteStream(filename)).on('close', () => {
                        resolve();
                    });
                }else{
                    console.log('***************************comic: ' + url.split('/')[4]+'话' + ' finish***************************');
                }
            }
        })
    })
}

module.exports = download



