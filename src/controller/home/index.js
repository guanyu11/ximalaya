import home from "view/home.art"
import nav from "view/nav.art"
import searchHead from "view/search_head.art";
import "styles/home/index.scss"
import {
    homeMainApi,
    moreCommendApi,
    navDataApi
    
} from "api/home.js"
import Swiper from "@/common/swiper/index.js";

/*
 * render:渲染  路由调用
 *
 */
class Home {
    constructor() {
        this.key = "youshengshu";
    }
    init() {

    }
    async render() {
        $("#app").html("")
        console.log("home")
        //获取nav种类数据   创建nav
        let navData=(await navDataApi()).data;
        console.log(navData,"navData")
        var home_nav = $("<div class='home_nav'></div>")
        var container = $("<div class='container'></div>")
        
        let html=nav({navData});
        home_nav.html(html);
        $("#app").prepend( home_nav);
        var serHead=searchHead();
        $("#app").prepend(serHead);
        $("#app").append(container);

        this.touchNav()//绑定ul点击事件和move事件
        this.nav=$(".nav_ul");
        this.moveNav()//绑定ul move事件
        this.createMain()

    }
    toClassify(){
        console.log($(".fiveIconHome"))
        $(".fiveIconHome>a").eq(4).on("tap",function(){
            router.push("/classify")
        })
        $(".logo").on("tap",(e)=>{
            router.push("/")
        })
    }


    //移动事件
    moveNav(){
        console.log( $(".nav_ul")," $(.nav_ul)")
        this.nav.on("touchstart",this.moveNavStart.bind(this))
    }
    moveNavStart(e){
        console.log(e)
        this.leftStart=Number(this.nav.css("left"
            ).split("px")[0]);
        this.navX = e.touches[0].pageX;
        // console.log(this.navX,"this.navX")
        this.nav.on("touchmove",this.handMoveNav.bind(this))
    }
    handMoveNav(e){
        this.navDisX=e.touches[0].pageX-this.navX;
        this.nav.css({
            left: this.leftStart + this.navDisX+"px"
        })
        if(Number(this.nav.css("left"
        ).split("px")[0])>=0){
            // console.log(">>>")
            this.nav.css({
                left:0
            }) 
        }
        if((Number(this.nav.css("left"
        ).split("px")[0])+this.nav[0].offsetWidth)<=window.innerWidth){
            this.nav.css({
                left:(window.innerWidth-this.nav[0].offsetWidth)+"px"
            }) 
        }
      
        this.nav.on("touchend",this.navTouchEnd.bind(this))
    }
    navTouchEnd(){
        this.nav.off("touchmove", this.handlenavTouchEnd.bind(this))
        this.nav.off("touchend", this.handlenavTouchEnd.bind(this))
    }
    handlenavTouchEnd(){

    }
//点击事件
    touchNav(){
        $(".nav_ul_sort").each(this.touchNavA.bind(this))
    }
    touchNavA(index){
        $(".nav_ul_sort").eq(index).on("tap",this.touchNavCb.bind(this,index))
    }
    touchNavCb(index,e){
        e.preventDefault();
        console.log(index,e)
       console.log($(".nav_ul_sort").eq(index).data("key")) 
       $(".nav_ul_sort").eq(index).addClass("active").siblings().removeClass("active");
        this.key=$(".nav_ul_sort").eq(index).data("key");
        this.createMain()
    }
//给所有a添加点击事件，跳转到detail
    // router.push("/detail?id=" + id);

//根据nav生成home主体
    async createMain() {
       
        var data = await homeMainApi( this.key );
        console.log(data,"homeMaindata")
        var moreCom = await moreCommendApi( this.key )
        console.log(moreCom)
        var moreCommend =moreCom.data.materials;
        console.log(data, "homeMaindata", moreCommend, "moreCommend")
        var tomatoes = data.data.moduleContent.tomatoes;
        var moduleRankDatas = data.data.moduleContent.moduleRankDatas;
        var banners = data.data.moduleContent.focusImages;
        // for(let i=0;i<moduleRankDatas.length;i++){
        //     for(let j=0;j<moduleRankDatas[i].albumBriefDetailInfos.length;j++){
        //     console.log(moduleRankDatas[i].albumBriefDetailInfos[j].albumInfo.id)
        //     // console.log(moduleRankDatas[i].albumBriefDetailInfos[j].albumInfo)
        //     }
        // }
        //将data.data.moduleContent传递:
        //focusImages为轮播图
        // moduleRankDatas为大模块
        // tomatoes为图标
        var home_main = home({
            tomatoes,
            moduleRankDatas,
            moreCommend,
            banners
        });
        
        // // var header = headerView();
        // // container.append(header);
        $(".container").html(home_main);
        // $(".nav").siblings().remove();
        // $("#app").append(container);
        // //轮播
        new Swiper(".banner");

        this.pushDetails();
        
        this.toClassify()
    }


    pushDetails() {

        this.detailList = $(".detail_A");
        this.detailList.each(this.handleDetailListEach.bind(this))
    }
    handleDetailListEach(index) {
        this.detailList.eq(index).on("tap", this.detailListCK.bind(this, index))
    }
    detailListCK(index) {
        var id = this.detailList.eq(index).attr("data-id")
        console.log(id)
        router.push("/detail?id=" + id)
    }
   
    search() {
        $(".header-right_search").on("tap", this.handleSearchCb.bind(this))
    }
    handleSearchCb() {
        router.push("/search")
    }

}

export default new Home()