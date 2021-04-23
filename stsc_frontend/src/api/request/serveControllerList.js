// 服务接口
import axios from "../api";

const serveControllerList = {
    // 删除服务
    deleteServeById: (params) => {
        return axios({
            url: `/bh/stcsp/serve/deleteServeById/${params.id}`,
            method: "delete",
        });
    },
    // 根据卖家ID查询该卖家的所有需求
    getAllServesByUserId: (params) => {
        return axios({
            url: `/bh/stcsp/serve/getAllServesByUserId/${params.userId}/${params.page}/${params.limit}`,
            method: "delete",
        });
    },
    // 根据条件查找服务
    getServesByCondition: (params,data) => {
        return axios({
            url: `/bh/stcsp/serve/getServesByCondition/${params.page}/${params.limit}`,
            method: "post",
            data
        });
    },
    // 通过服务ID查看服务详情
    getServesDetailById: (params) => {
        return axios({
            url: `/bh/stcsp/serve/getServesDetailById/${params.id}`,
            method: "get",
        });
    },
    // 发布服务
    releaseServe: (data) => {
        return axios({
            url: `/bh/stcsp/serve/releaseServe`,
            method: "post",
            data
        });
    },
    // 修改服务
    updateServeById: (data) => {
        return axios({
            url: `/bh/stcsp/serve/updateServeById`,
            method: "post",
            data
        });
    },
}
export default serveControllerList
