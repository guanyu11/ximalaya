import axios from "utils/request.js";


export const searchApi = (
   {kw,core}
) => axios({
    url: "/api/m-revision/page/search",
    data: {
        kw: kw,
        core: core,
        page: 1,
        rows: 5
    },
    method: "get",
  
})
//search框value变化时 列出相关栏目 
export const suggestApi = ( {kw}) => axios({
     url: "/api/revision/suggest",
     data: {
        kw: encodeURI(kw),
        paidFilter: "false",
        scope: "all"
     },
     method: "get",
   
 })