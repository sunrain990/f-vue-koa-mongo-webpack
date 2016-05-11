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
    "staticDir": path.join(__dirname,'..', 'public')
};


if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}
module.exports = config;