const path = require("path");
const baseConfig = require("./base.config");
const webpackMerge = require("webpack-merge");
const ExtractTextWebpackplugin = require("extract-text-webpack-plugin");
const config = webpackMerge(baseConfig, {
    mode: "production",
    devtool:"cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                //css抽离
                use:ExtractTextWebpackplugin.extract({
                    //解析css 和sass  postcss 用来加浏览器的前缀
                    use:[
                        {loader:"css-loader"},
                        {loader:"postcss-loader"},
                        {loader:"sass-loader"}
                    ],
                    fallback: "style-loader",
                }),
                exclude:path.join(__dirname,"../node_modules")
            }
        ]
    },
    plugins:[
        new ExtractTextWebpackplugin({
            filename:"css/[name].[hash:8].css"
        })
    ]
})

module.exports = config;