import detailView from "view/detail.art";
import detailli from "view/detail_li.art";
import searchHead from "view/search_head.art";

import "styles/detail/index.scss";
import { midDetailApi,topDetailApi ,authApi} from "api/detail.js"
class Detail {
    constructor() {
        this.page=1;
    }
    async render() {
        let {id} = router.$route.query;
        console.log(id)
        this.id=id;
     
        let topDetail = (await topDetailApi(this.id)).data;
        console.log(topDetail,"topDetail")
        let authId=topDetail.albumDetailInfo.albumInfo.anchorId;
        let authData= (await authApi(authId)).data;
        console.log(authId,"authId",authData,"authData")

        // statCountInfo
        var html = detailView({topDetail,authData});
        var container = $("<div class='detail'></div>")
        container.html(html);
        $("#app").html(container);
        var serHead=searchHead();
        $("#app").prepend( serHead);
        this.createProLi()
        this.loadMore()
     
    }
    async createProLi(){
        let midDetail = (await midDetailApi(this.id,this.page)).data;
        console.log(midDetail,"midDetail")
        var pro_li=detailli({midDetail})
        $(".program_list").append(pro_li);
        $(".logo").on("tap",(e)=>{
            router.push("/")
        })
        this.playAduio();

    }
    loadMore(){
        $(".loadMore").on("tap",this.loadMoreCb.bind(this))
    }
    loadMoreCb(){
        this.page++;
        this.createProLi();
        
    }
  
    playAduio(){
        $(".playBn").each(this.playAduioTap.bind(this))
    }
    playAduioTap(index){
        $(".playBn").eq(index).on("tap",this.playAduioTapCb.bind(this,index))
    }
    playAduioTapCb(index,e){
        e.preventDefault();
        // console.log(index,e)
      
       var player=($(".playBn").eq(index).siblings().eq(0))[0];
    //    console.log(player)
       if (player.paused){ /*如果已经暂停*/
        player.play(); /*播放*/
        $(".playBn").eq(index).parent().parent().addClass("active").siblings().removeClass("active");
        $(".playBn").eq(index).html("&#xe629;")
        }else {
        player.pause();/*暂停*/
        $(".playBn").eq(index).parent().parent().removeClass("active");
        
        $(".playBn").eq(index).html("&#xe63a;")

        }
        // 

    }






 
}


export default new Detail;