module.exports = {
    plugins: [
        //自动添加浏览器前缀
        require("autoprefixer")({
            overrideBrowserslist: [
                "defaults",
                "Android 4.1",
                "iOS 7.1",
                "Chrome>31",
                "ff>31",
                "ie>=8",
                "last 2 versions",
                ">0%"
            ]
        })
    ]
}