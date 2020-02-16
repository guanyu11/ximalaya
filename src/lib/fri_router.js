import router from "../router"

class FriRoute{

    constructor(options){
        //路由配置项，
        this.$options=options;
        //路由的形式  用户传了就用传的，没传默认哈希hash
        this.$mode=this.$options.mode||"hash";
        //路由表
        this.$routes=this.$options.routes||[];
        //定义初始的哈希值
        this.current="/";
        //路由表对象
        this.mapRoutes={};
               //定义tabbar的显示
        this.flag = true;

        this.$route={
            query:{},
            path:"/"
        }

        //初始化事件
        this.init();

    }
    init(){
        //先判断是hash路由还是history
        this.isMode();
        //1、监听路由变化的事件
       
        this.mapRoutesEvent();
        //3、渲染对应的页面
        
        //获取路由传值得对象
       
    }
    isMode(){
        //定义hash路由  和其他一样多个#/
        if(!window.sessionStorage.getItem("mode")&&this.$mode==="hash"){
          console.log(window.location.origin)//http://localhost:9000   域名
        window.location.href=window.location.origin +"#/"   ;
        window.sessionStorage.setItem("mode","hash")
        }

        this.bindEvent();
        //2、处理路由表对象   routes是一个数组，把数组对象转换成对象
       
    }
    bindEvent(){
        //第一次加载进来也需要监听路由变化
        
        window.addEventListener("load",this.handlerBindEventSucc.bind(this))
        if(this.$mode==="hash"){
          window.addEventListener("hashchange",this.handlerBindEventSucc.bind(this))//监听hash值改变的事件  
        }else if(this.$mode==="history"){
            window.addEventListener("popState",this.handlerBindEventSucc.bind(this))
        }
    }
    // bindEvent(){
    //     // 第一次加载进来也需要监听路由变化
    //     window.addEventListener("load",this.handlerBindEventSucc.bind(this))
    //     window.addEventListener("hashchange",this.handlerBindEventSucc.bind(this))
        
    // }

    // handlerBindEventCb (){
    //     if(this.$mode==="hash"){
    //         window.addEventListener("hashchange",this.handlerBindEventSucc.bind(this))//监听hash值改变的事件  
    //       }else if(this.$mode==="history"){
    //           window.addEventListener("popState",this.handlerBindEventSucc.bind(this))
    //       }
    // }

    //哈希值改变后要做的事情
    handlerBindEventSucc(e){
        if(this.$mode==="hash"){
            console.log("哈希值改变了")
            //获取到hash值
            let hash =(window.location.hash.split("?")[0]).slice(1)||"/";
            console.log(hash,"hash")
            this.current=hash;
        }else if(this.$mode==="history"){//如果是history 
            console.log(e);
            console.log(e.state,"e.state")
            let hash=e.state||"/";
            this.current=hash;
            console.log(this.current,"this.current")

        }
        //获取get传值
        this.getQuery();
        this.randerTemplate();
       
    }
    //将路由表转换成路由对象
    mapRoutesEvent(){
        // console.log(this.$routes)
        this.$routes.forEach((item)=>{
            this.mapRoutes[item.path]=item;
        })
        console.log(this.mapRoutes,"this.mapRoutes")
    }
    //渲染
    randerTemplate(){
        if(this.$mode=="history"){
            this.current=window.sessionStorage.getItem("path");
        }
        console.log(this.$route,"this.$route")
        console.log(this.current,"this.current")
        
        this.$route.path=this.current;

        console.log(this.current,"this.current")
        var template =this.mapRoutes[this.current].template;
       
        $("#app").html("");
        template.render();
    }
    //路由跳转
    push(path){
        if(this.$mode==="hash"){
        window.location.hash=path;
        }else if(this.$mode=="history"){
            window.history.pushState(path,"",path);
            this.current=path.split("?")[0];
            sessionStorage.setItem("path",this.current);
            this.getQuery();
            this.randerTemplate();
        }
    }
    //
    getQuery() {
        var href = window.location.href;
        var obj = href.substr(href.indexOf("?") + 1).split("&").reduce(function (prev, item) {
            let key = item.split("=")[0];
            let val = item.split("=")[1];
            prev[key] = val;
            return prev;
        }, {})

        this.$route.query = obj;

    }
    back(){
        window.history.back();
    }
}
export default FriRoute;