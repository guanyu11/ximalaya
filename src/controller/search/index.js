import searchView from "view/search.art";
import "styles/search/index.scss"
import {searchApi,suggestApi} from "api/search.js"
import searchListView from "view/search-list.art";
import {throttle} from "../../utils/tool"
class Search {
    constructor() {
        this.searchData = {
            kw: "",
            core: "all",
            page: 1,
            rows: 5
        }
    }
    render() {
        $("#app").html("")
        var arr = JSON.parse(window.localStorage.getItem("searchHistory")) || []
        var html = searchView({ data:arr });
        if($(".search_con").length!==0){
            console.log($(".search_con"),0)
            $(".search_con").html(html);
        }else{
        var search_con = $("<div class='search_con'></div>")
        search_con.html(html);
        $("#app").prepend(search_con)
        }
        this.search();
        this.clearTap();
        // this.RecordTap();
        this.searchBack();
    }
    search() {
        //回车事件
        $(".search-input").on("keydown", this.handleSearchCb.bind(this))
        //绑定input 的val改变触发事件
        $(".search-input").on("input",throttle.bind(this,this.handleSearchFo.bind(this),2))
    }
  
    async handleSearchFo(e){
    // console.log( $(".search-input").val());
    if( $(".search-input").val()){
        $(".clearOut").css({
            display:"block"
        })//让叉号出现   绑定其点击事件
        // $(".clearOut").on("tap",function(){
        //     $(".search-input").val("")
        // })
        $(".clearOut").on("tap" ,this.clearOutHandle.bind(this) )

        this.searchData.kw= $(".search-input").val();
        let data=(await suggestApi(this.searchData)).data.result;
        console.log(data,"serList-data")
        let html=searchListView({data})
        $(".Record").remove();
        $(".search-list").html(html)
    }else{
        console.log("kong");
        this.render();//value 为空  渲染出搜索历史
    }
    this.pushDetails()
    
    }
    //叉号点击事件   清空搜索框
    clearOutHandle(){
        $(".search-input").val("");
        this.handleSearchFo()
    }
    handleSearchCb(e) {
        if (e.keyCode == 13) {
            let val = $(".search-input").val();
            if (val) {
                if (!window.localStorage.getItem("searchHistory")) {
                    var arr = [];
                    arr.push(val);
                } else {
                    var arr = JSON.parse(window.localStorage.getItem("searchHistory"));
                    var flag = arr.includes(val);
                    if(!flag){
                        if(arr.length>=9){
                            arr.shift();
                        }
                        arr.push(val);
                    }
                }
                window.localStorage.setItem("searchHistory", JSON.stringify(arr));

                this.searchData.kw = val;
                this.searchBookList(this.searchData);
                
            }
        }
    }
   async searchBookList(data){
        let searchList = await searchApi({...data});
      console.log(searchList,"searchList")
        // let html = searchListView({data:booksdata.data.bookList});
        // $(".Record").remove();
        // $(".search-list").html(html);
        // this.searchBookListDes();
        this.pushDetails()
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


    searchBookListDes(){
       
        this.searchListItem =$(".search-list-item");
        
        this.searchListItem.each(this.handleSearchListItmeEach.bind(this))
    }
    handleSearchListItmeEach(index){
       
        this.searchListItem.eq(index).on("tap",this.handleSearchListItemCb.bind(this,index))
    }
    handleSearchListItemCb(index){
        var id = this.searchListItem.eq(index).attr("data-id");
        router.push("/detail?id="+id)
    }
    clearTap(){
        $(".clear").on("tap",this.handleClearcb.bind(this))
    }
    handleClearcb(){
        window.localStorage.removeItem("searchHistory");
        $(".Record-b").html("");
    }
    RecordTap(){
        $(".Record-b>div").each(this.handleRecordEach.bind(this))
    }
    handleRecordEach(index){
        $(".Record-b>div").eq(index).on("tap",this.handleRecordCb.bind(this,index))
    }
    handleRecordCb(index){
        var val =  $(".Record-b>div").eq(index).text();
        this.searchData.word = val;
        this.searchBookList(this.searchData)
    }
    searchBack(){
        $(".logo").on("tap",(e)=>{
            router.push("/")
        })
        $(".back").on("tap",this.handleSearchBackCb.bind(this))
    }
    handleSearchBackCb(){
        router.back();
    }


    
}

export default new Search