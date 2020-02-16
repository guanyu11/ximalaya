import "zepto";
import "touchjs";
import "./router";
import "styles/common/index.scss";

// window.console.log = function(){}

/*
    路由：
        根据用户请求路径的不同返回不同的页面或者数据

    前端路由：
        前端路由一般情况下都是用来做单页面开发(SPA) 前端路由用户请求的路径发生改变后页面是不会刷新的，用户体验比较好一些
        思考：什么情况下路径发生改变页面不会刷新 历史记录
            1、hash
            2、history

        路由的底层原理：
            hash路由：通过onhashchange来检测hash值得变换 根据hash值得变换来显示不同的页面  地址栏中会带#
            history路由：通过pushState replaceState来检测地址的改变 切换不同的页面  地址栏中不会带#
                pushState进行路由跳转

                popState监听浏览器的前进后退

        单页面开发用户体验比较好


        默认情况下前端路由发生改变后是不会经历后端的，但是history路由地址发生改变后会经历后端，所以使用history路由的时候
        需要做后端的配置

    后端路由：
        接口


    MVC:
        M:model层 数据层 主要的作用用来做数据的增删改查
        V:view层 视图层  主要是用来做类似于HTML一样的模块
        C:controller 逻辑层  编写业务逻辑

*/