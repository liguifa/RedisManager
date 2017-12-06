const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./src/client/app.js"
    },
    output: {
        path: __dirname,
        filename: "./src/public/applciation.js"
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)/, loader: "babel-loader", query: { presets: ['es2015', 'react'] } },
            { test: /\.(css)/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        //new webpack.BannerPlugin("Hello World"),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings:false
        //     },
        //     except:['import']
        // }),

        new webpack.HotModuleReplacementPlugin()
    ],
}