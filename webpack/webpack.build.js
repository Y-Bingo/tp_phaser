const path = require( 'path' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.com' );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const JavaScriptObfuscator = require( 'webpack-obfuscator' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

// 项目跟路径
const ROOT_PATH = process.cwd();

const build = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: '[name].[contenthash].bundle.js'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin( [ 'bin/*.js' ], { root: path.resolve( ROOT_PATH, './' ) } ),
        new JavaScriptObfuscator(
            {
                rotateStringArray: true,
                stringArray: true,
                // stringArrayEncoding: 'base64', // disabled by default
                stringArrayThreshold: 0.75
            },
            [ 'vendors.*.js' ]
        ),
        new ImageminPlugin( {
            disable: false,
            test: /\.(jpe?g|png|gif|svg)$/i,
            cacheFolder: path.resolve( './.cache' )
        } )
    ]
}

module.exports = merge( common, build )
