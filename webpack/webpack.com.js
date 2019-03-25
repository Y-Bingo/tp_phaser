const path = require( 'path' );
const webpack = require( 'webpack' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

// 辅助插件
const SimpleProgressPlugin = require( "webpack-simple-progress-plugin" );       // 控制台编译进度插件

// 项目跟路径
const ROOT_PATH = process.cwd();

module.exports = {
    entry: [ './src/Main.ts' ],
    output: {
        path: path.resolve( ROOT_PATH, "./bin" ),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', "json" ],
        alias: {
            phaser: path.join(ROOT_PATH, 'node_modules/phaser/dist/phaser.js')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, include: path.join( ROOT_PATH, './src' ), loader: 'ts-loader' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: '[name].bundle.js'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin( { gameName: 'My Phaser Game', template: 'temp/index.html' } ),
        new SimpleProgressPlugin(),
        new CopyWebpackPlugin( [
            { from: 'resource/', to: 'resource' },
            { from: 'temp/', to: '' }
        ] ),
        // 全局变量设置
        // new webpack.DefinePlugin( {
        //     'DEBUG': true,
        //     'DEFAULT_GAME_WIDTH': /*[[DEFAULT_GAME_WIDTH*/800/*DEFAULT_GAME_WIDTH]]*/,
        //     'DEFAULT_GAME_HEIGHT': /*[[DEFAULT_GAME_HEIGHT*/500/*DEFAULT_GAME_HEIGHT]]*/,
        //     'MAX_GAME_WIDTH': /*[[MAX_GAME_WIDTH*/888/*MAX_GAME_WIDTH]]*/,
        //     'MAX_GAME_HEIGHT': /*[[MAX_GAME_HEIGHT*/600/*MAX_GAME_HEIGHT]]*/,
        //     'SCALE_MODE': JSON.stringify(/*[[SCALE_MODE*/'USER_SCALE'/*SCALE_MODE]]*/ ),
        //     // The items below most likely the ones you should be modifying
        //     'GOOGLE_WEB_FONTS': JSON.stringify( [ // Add or remove entries in this array to change which fonts are loaded
        //         'Barrio'
        //     ] ),
        //     'SOUND_EXTENSIONS_PREFERENCE': JSON.stringify( [ // Re-order the items in this array to change the desired order of checking your audio sources (do not add/remove/modify the entries themselves)
        //         'webm', 'ogg', 'm4a', 'mp3', 'aac', 'ac3', 'caf', 'flac', 'mp4', 'wav'
        //     ] )
        // } ),
    ]
}
