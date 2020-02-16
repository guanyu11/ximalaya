import axios from "utils/request.js"

export const categoryApi = () => axios({
    url: "/api/m-revision/page/category/queryCategories",
    method: "get",

})

