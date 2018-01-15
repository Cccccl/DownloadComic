const getListUrl = require('./get_list_url');
const downloadImg = require('./download_img');
const downloadComic = require('./download_comic');
const request = require('request');

const main_url = 'http://manhua.fzdm.com/56/';

let download = () => {
    getListUrl(main_url)
    .then(async (comics)=>{
        console.log('get list!')
        for(let i=0;i<comics.length;i++){
            let result = comics[i].link.split('/')[0];
            console.log(result)
            await downloadComic(result)
        }
    }).catch((err)=>{
        console.log(err);
    })
}

download()

// 对 setTimeout 函数进行Promise封装，使其可以同步调用，跳出事件循环
let timePause = ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('next begin');
            resolve();
        }, 1000)
    })
}; 