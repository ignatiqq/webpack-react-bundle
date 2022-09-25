const filenames = require("./utils/filenames");
const path = require("path");
const commonPaths = require("./commonPaths");
const mainRules = require("./additionally/rules");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const {filenameWithHash} = require("./utils/filenames");
const extensions = require("./additionally/extensions");

const prodConfig = {
    mode: 'production',
    entry: {
        main: path.resolve(commonPaths.projectRoot, './src/index.tsx'),
    },
    output: {
        filename: filenames.filenameWithContentHash('[name]', 'js'),
        path: path.resolve(commonPaths.projectRoot, './dist'),
        publicPath: './',
        clean: true,
    },
    resolve: {
        extensions: [...extensions],
    },
    devtool: 'source-map',
    optimization: {
        moduleIds: 'deterministic',
        minimizer: [new TerserWebpackPlugin()],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [...mainRules],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: filenameWithHash('bundle', 'css'),
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(commonPaths.projectRoot, './public/index.html'),
            favicon: path.resolve(commonPaths.projectRoot, './public/favicon.ico'),
            minify: {
                removeComments: true
            }
        }),
    ],
}

module.exports = prodConfig;