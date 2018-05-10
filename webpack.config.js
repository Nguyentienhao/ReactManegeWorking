const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        app: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'webpack_build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js?$/,
            }
        ]
    },
    mode: "development",
    watch: true
};

module.exports = config;