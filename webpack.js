/**
 * Created by kevin on 16/5/11.
 */
module.exports = function(app){
    const webpack = require('webpack');
    const webpackConfig = process.env.NODE_ENV === 'testing'
        ? require('./build/webpack.prod.conf')
        : require('./build/webpack.dev.conf');

    const compiler = webpack(webpackConfig);

    const devMiddleware = require('koa-webpack-dev-middleware')(compiler,{
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors:true,
            chunks:false
        }
    });

    const hotMiddleware = require('koa-webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
    app.use(hotMiddleware)
}