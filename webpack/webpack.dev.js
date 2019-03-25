const merge = require( 'webpack-merge' );
const common = require( './webpack.com' );

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        port: 9527,
        noInfo: true
    }
}

module.exports = merge( common, dev )
