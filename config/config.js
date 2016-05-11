/**
 * Created by kevin on 16/5/11.
 */
var path = require('path');
var _ = require('lodash');
var local = require('./local');

var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "koa-fight",
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'main/public'),


    build: {
        index: path.join(__dirname,'..', 'main/public/index.html'),
        assetsRoot: path.join(__dirname,'..', 'main/public/dist'),
        assetsSubDirectory: path.join(__dirname,'..', 'static'),
        assetsPublicPath: '/',
        productionSourceMap: true
    },
    //proxy the request /api/posts/1 to http://jsonplaceholder.typicode.com/posts/1
    dev: {
        port: 8080,
        proxyTable: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
};

if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}
module.exports = config;