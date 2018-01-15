// download_comic.js
// 引入下载图片模块
const downloadImg = require('./download_img');
const reuqest = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

let downloadComic = (comicId) => {
    // 添加async前缀，说明函数内部存在同步写法
    return new Promise(async (resolve, reject) => {
        // 漫画第一章的序号，从1开始
        for (let i = 0; i < 25; i++) {
            let start = i;
            let start_url = `http://manhua.fzdm.com/56/${comicId}/index_${start}.html`;
            let filename = path.join(__dirname, 'data', comicId, start + 1 + '.jpg');

            await downloadImg(start_url, filename)
            console.log('finish comic ' + comicId + ':' + (start + 1 + '.jpg'));

            console.log(start)
            if(start==18){
                resolve();
            }
        }
        // resolve();
    })
}

module.exports = downloadComic
