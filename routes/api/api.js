/**
 * Created by kevin on 16/5/11.
 */
var Router = require('koa-router');

function register (app) {
    var router = new Router({
        prefix: '/api'
    });
    router.get('/', function(){
        this.body = 'foo';
    }); // responds to "/api"
    router.get('/messages', function(){
        this.body = 'foo messages';
    }); // responds to "/api/messages"
    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register