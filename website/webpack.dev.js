const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base").default;
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const port = "5009";

exports.default = merge(base,{
    mode: "development",
    module: {
        rules: [
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "image/svg+xml",
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: {
                    loader: "url-loader",
                }
            }
        ]
    },
    devtool: "eval-source-map",
    output: {
        filename: "[name].js",
        publicPath: '/dist'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackHarddiskPlugin({
            outputPath: __dirname
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        port,
        host: "localhost",
        inline: true,
        disableHostCheck: true,
        historyApiFallback: {
            verbose: true,
            index: "./index.html"
        },
        publicPath: "/dist"
    }
});
