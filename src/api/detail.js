import axios from "utils/request.js";

//获取详情上半部分的api
export const topDetailApi = (id) => axios({
    method: "get",
    url: "/api/m-revision/page/album/v2/queryAlbumPage/"+id,
    data: {
        albumCounts: "track"
    }
})

// https: //m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage
    //获取详情的api
    export const midDetailApi = (id,page) => axios({
        method: "get",
        url: "/api/m-revision/common/album/queryAlbumTrackRecordsByPage",
        data: {
            albumId: id,
            page: page,
            pageSize: 10,
            asc: true,
            countKeys: "play,comment"
        }
    })
    //获取用户信息的api
    // https://m.ximalaya.com/m-revision/common/user/queryUserInfo/1000265?userCountKeys=follower
    export const authApi = (authid) => axios({
        method: "get",
        url: "/api/m-revision/common/user/queryUserInfo/"+authid,
        data: {
            userCountKeys: "follower"
        }
    })