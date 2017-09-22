const {getCssIdent} = require("./get-css-ident");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

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
                use: [
                    {loader: "react-hot-loader/webpack"},
                    {
                        loader: "awesome-typescript-loader",
                        // options: {configFileName:  "tsconfig-client.json"}
                    }
                ],
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "client-src"),

            },
            {
                test: /\.css$/, use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.less$/, use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                        getLocalIdent: getCssIdent
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        plugins: [
                            new LessPluginCleanCSS({advanced: true}),
                            new LessPluginAutoPrefix({browsers: ["last 5 versions"]})
                        ]
                    }
                }]
            },
            {test: /\.otf(\?[a-z0-9]+)?$/, loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'},
            {test: /\.woff(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?.+)?$/, loader: "file-loader"},
            {test: /\.(svg|jpe?g|png|gif)(\?.+)?$/, loader: "file-loader"},
            {test: /\.cur(\?.+)?$/, loader: "file-loader"},
        ]
    },

    devServer: {
        hot: true,
        port: 3000,
        proxy:{
            "/api": "http://localhost:8080"
        }
    }

};

module.exports = config;