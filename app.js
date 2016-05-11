/**
 * Created by kevin on 16/5/11.
 */
const koa = require('koa');
const path = require('path');
const static = require('koa-static');
const onerror = require('koa-onerror');
const config = require('./config/config');
const Logger = require('mini-logger');

const log = Logger({
    dir:config.logDir,
    categories:['router','model','controller'],
    format:'YYYY-MM-DD-[{category}][.log]'
});

global.log = log;
const publicFiles = static(path.join(config.staticDir));
publicFiles._name = 'static';

const app = koa();

require('./webpack.js')(app);

app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

app.use(function *pageNotFound(next){
    yield next;

    if (404 != this.status) return;

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    switch (this.accepts('html', 'json')) {
        case 'html':
            this.type = 'html';
            this.body = '<p>Page Not Found</p>';
            break;
        case 'json':
            this.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            this.type = 'text';
            this.body = 'Page Not Found';
    }
});

app.use(publicFiles);
require('./main/routes')(app);
onerror(app);


console.log(config.build.index,config.build.assetsRoot,config.build.assetsSubDirectory);


const port = process.env.PORT || config.port;
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
});