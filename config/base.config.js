const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
/*
    __dirname:当前文件的绝对路径

    path.join：做路径的拼接
*/


//配置入口文件和出口文件地址
const PATH = {
    app: path.join(__dirname, "../src/main.js"),
    build: path.join(__dirname, "../dist")
}

//配置webpack
module.exports = {
    //入口的配置
    entry: {
        app: PATH.app
    },
    //出口配置
    output: {
        path: PATH.build,
        filename: "[name].js"
    },
    //使用插件配置项
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            title: "~喜马拉雅"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, "../public"),
                from: "**/*",
                to: path.join(__dirname, "../dist"),
                //忽略文件
                ignore: ["index.html"]
            }
        ])
    ],
    //别名的配置项
    resolve: {
        //文件引入的优先级
        extensions: [".js", "scss", "art", "css", "json"],
        //别名的配置
        alias: {
            "@": path.join(__dirname, "../src"),
            "view": path.join(__dirname, "../src/view"),
            "controller": path.join(__dirname, "../src/controller"),
            "lib": path.join(__dirname, "../src/lib"),
            "router": path.join(__dirname, "../src/router"),
            "styles": path.join(__dirname, "../src/styles"),
            "api":path.join(__dirname,"../src/api"),
            "model":path.join(__dirname,"../src/model"),
            "utils":path.join(__dirname,"../src/utils")
        }
    },
    //loader的配置  有些文件浏览器无法识别 ，因此我们需要将浏览器不识别的文件转换为浏览器识别的文件
    module: {
        //规则
        rules: [
            {
                //引入非模块化的插件
                test: require.resolve('zepto'),
                //转化成模块的方式
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            //一个对象代表一个规则
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.join(__dirname, "../node_modules")
            },
            {
                test: /\.art$/,
                loader: "art-template-loader"
            },
            //处理图片的loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 2048,
                        esModule: false, // 默认值是 true，需要手动改成 false
                        // name是图片原始的名称  ext是文件的后缀名
                        name: "img/[name].[ext]"
                    }
                },
                exclude: path.join(__dirname, "../node_modules")
            },
            //处理字体的配置项
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "font/[name].[ext]"
                    }
                },
                exclude: path.join(__dirname, "../node_modules")
            }
        ]
    }
}
