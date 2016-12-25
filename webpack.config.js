var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'main': './src/main.js',
        'example': './src/example.js'
    },
    output: {
        path: './dist',
        filename: '[name].built.js',
    },
    module: {
        resolveLoader: {
              root: path.resolve(__dirname, 'node_modules')
        },
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
}