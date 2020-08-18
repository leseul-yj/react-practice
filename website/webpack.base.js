/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

// 多页面应用
const setMap = () => {
    const chunks = {
        index: [path.join(__dirname,"./src/index/index.js")],
        ticket: [path.join(__dirname,"./src/ticket/index.js")],
        order: [path.join(__dirname,"./src/order/index.js")],
        query: [path.join(__dirname,"./src/query/index.js")]
    };
    const htmlWebpackPlugins = [];
    Object.keys(chunks).map(item => {
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            title: `${item}`,
            template: `./public/${item}.ejs`,
            favicon: "./public/favicon.ico",
            filename: `./${item}.html`,//打包后的文件名称
            chunks: [item],
            chunksSortMode: "manual",
            alwaysWriteToDisk: true,
            hash: true,
            inject: true,//是否自动引入相关的css,js文件
            minify: {//是否使用文件压缩
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }))
    });
    return {
        chunks,
        htmlWebpackPlugins
    }
}
const {chunks,htmlWebpackPlugins} = setMap();
exports.default = {
    entry: chunks,
    output: {
        path: path.resolve(__dirname,"./dist"),
        filename: "[name].[chunkhash].js",
        publicPath: "./"
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: "babel-loader",
            exclude: [/node_modules/]
        },
        {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }
            ]
        },
        {
            test: /\.less$/,
            include: [path.resolve(__dirname,"node_modules")],
            use: ["style-loader","css-loader","less-loader"],
        },
        {
            test: /\.less$/,
            exclude: [path.resolve(__dirname,"node_modules")],
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            },
            {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                    camelCase: true,
                    modules: true,
                    importLoaders: 1,
                    localIdentName: "[folder]__[name]__[local]__[hash:base64:5]"
                }
            },
            {
                loader: "less-loader" // compiles Less to CSS
            }
            ]
        },
        {
            test: /\.json$/,
            loader: "json-loader"
        },
        {
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            }
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            }
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/octet-stream"
                }
            }
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: "file-loader"
        }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: [".js",".jsx",".json",".css",".less"],
        modules: [__dirname,"node_modules",path.resolve(__dirname,"./src/index"),path.resolve(__dirname,"./src/ticket")]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ].concat(htmlWebpackPlugins)
};