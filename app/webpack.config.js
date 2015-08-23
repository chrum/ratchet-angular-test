var path = require('path');
module.exports = {
    cache: true,
    devtool: 'source-map',
    entry: './src/js/app.js',
    output: {
        path: path.join(__dirname, 'www/js'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
};