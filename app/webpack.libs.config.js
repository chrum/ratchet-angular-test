var path = require('path');
var webpack = require('webpack');
module.exports = {
    cache: true,
    // devtool: 'source-map',
    entry: './src/libs/libs.js',
    output: {
        path: 'www/js',
        filename: 'libs.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    resolve: {
        root: [
            './bower_components',
            './node_modules'
        ],
        moduleDirectories: [
            'bower_components',
            'node_modules'
        ],
        alias: {
            bower_components: [path.join(__dirname, '/bower_components')]
        }
    }

};