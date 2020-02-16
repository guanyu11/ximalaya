/*
    路由表的配置：
        将用户请求的路径与页面进行相关联

*/

import FriRouter from "lib/fri_router.js"
import home from "controller/home/index.js"
import classify from "controller/classify/index.js";
import detail from "controller/detail/index.js"
import search from "controller/search/index.js"
const router = new FriRouter({
    //路由的形式
    mode:"hash",
    //路由表的配置
    routes:[
        {
            //当用户访问/的时候 页面展示home
            path:"/",
            template:home
        },
        {
            path:"/classify",
            template:classify
        },
    
        {
            path:"/detail",
            template:detail
        },
        {
            path:"/search",
            template:search
        }
    ]
})

window.router = router;

export default router;