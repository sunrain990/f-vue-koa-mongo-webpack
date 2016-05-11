/**
 * Created by kevin on 16/5/11.
 */
var Router = require('koa-router');

function register (app) {
    var router = new Router();
    router.get('/', function(){
        this.body = 'Home Page';
    }); // responds to "/"
    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register