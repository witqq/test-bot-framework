const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const config = {
    entry: [
        "react-hot-loader/patch",
        "./client-src/index.tsx"
    ],
    output: {
        path: path.join(__dirname, "static"),
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "react-hot-ts",
            chunksSortMode: "dependency",
            template: path.resolve(__dirname, "./client-src/index-template.html"),
            hash: true
        }),
        new WebpackBuildNotifierPlugin({
            title: "Hot Reload build",
            suppressWarning: true
        })
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loaders: [
                    "react-hot-loader/webpack",
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "client-src")
            }
        ]
    },

    devServer: {
        hot: true,
        port: 3000
    }

};

module.exports = config;