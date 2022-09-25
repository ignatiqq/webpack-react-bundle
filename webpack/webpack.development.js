const commonPaths = require('./commonPaths');
const path = require('path');
const filenames = require('./utils/filenames');
const mainRules = require('./additionally/rules');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const extensions = require('./additionally/extensions');

const devConfig = {
    mode: 'development',
    entry: {
        main: path.resolve(commonPaths.projectRoot, './src/index.tsx'),
    },
    output: {
        path: path.resolve(commonPaths.projectRoot, './dist'),
        filename: filenames.filenameWithContentHash('[name]', 'js'),
        publicPath: commonPaths.projectRoot,
        clean: true
    },
    resolve: {
        extensions: [...extensions],
    },
    devtool: 'inline-source-map',
    devServer: {
        port: '8080',
        historyApiFallback: true
    },
    module: {
        rules: [...mainRules],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(commonPaths.projectRoot, './public/index.html'),
            favicon: path.resolve(commonPaths.projectRoot, './public/favicon.ico'),
        }),
    ],
}

module.exports = devConfig;
