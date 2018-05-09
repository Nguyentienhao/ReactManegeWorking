const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
            },
            {
                test: /\.css?$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.png$/, loader: "url-loader?mimetype=image/png"
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
        // new CleanWebpackPlugin(['webpack_build'])
    ],
    watch: true
};

module.exports = config;