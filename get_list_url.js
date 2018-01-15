const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const comics = [];
// const main_url = 'http://manhua.fzdm.com/56/';

let getListUrl = function (url) {
    return new Promise ((resolve,reject)=>{
        request(url,(err,response,body)=>{
            if(err){
                reject(err); 
            }

            $ = cheerio.load(body);
            $('.pure-u-1-2').each(function(i,e){
                const obj = {};
                obj.link = $(e).find('a').attr('href');
                obj.title = $(e).find('a').attr('title');
                if(!isNaN(parseInt(obj.link.substring(0, obj.link.length - 1)))){
                    comics.push(obj)

                    // 根据获取的序号新建文件夹
                    if(!fs.existsSync(path.join(__dirname,'data',obj.link.substring(0, obj.link.length - 1)))){
                        fs.mkdir(path.join(__dirname,'data',obj.link.substring(0, obj.link.length - 1)),(err)=>{
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                }
            })
            
            // 将章节信息写入一个文件中，存档
            // JSON.stringify(str, null, 4) //使用四个空格缩进
            fs.writeFile('url.txt',JSON.stringify(comics,null,2),'utf8',(err)=>{
                if(err){
                    console.log(err)
                }
            })
            resolve(comics)
        })
    })
}
module.exports = getListUrl;