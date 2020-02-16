import axios from "utils/request.js";


export const homeMainApi = (key) => axios({
    method: "get",
    url: "/api/m-revision/page/index/queryIndexCategoryTabContent",
    data: {
        moduleKey: key
    }
})
//获取更多推荐书籍的api
export const moreCommendApi  = (key) => axios({
    method: "get",
    url: "/api/m-revision/page/index/queryCategoryFeed",
    data: {
        moduleKey: key
    }
})


//获取nav种类的api
export const navDataApi = () => axios({
    method: "get",
    url: "/api/m-revision/page/index/queryIndexTabModule",
   
})