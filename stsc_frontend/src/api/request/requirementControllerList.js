// 需求接口
import axios from "../api";
const requirementControllerList = {
    // 删除需求
    deleteRequireById: (data) => {
        return axios({
            url: `/bh/stcsp/requirement/deleteRequireById/${data.id}`,
            method: "delete",
        });
    },
    // 根据买家id查询该用户所有需求
    getAllRequiresByUserId: (params) => {
        return axios({
            url: `/bh/stcsp/requirement/getAllRequiresByUserId/${params.buyerId}/${params.page}/${params.limit}`,
            method: "get",
        });
    },
    // 根据买家id查询该用户所有需求
    getRequireDetailById: (params) => {
        return axios({
            url: `/bh/stcsp/requirement/getRequireDetailById/${params.id}`,
            method: "get",
        });
    },
    // 根据条件查找需求
    getRequiresByCondition: (params,data) => {
        return axios({
            url: `/bh/stcsp/requirement/getRequiresByCondition/${params.page}/${params.limit}`,
            method: "post",
            data
        });
    },
    // 发布需求
    releaseRequire: (data) => {
        return axios({
            url: `/bh/stcsp/requirement/releaseRequire`,
            method: "delete",
            data
        });
    },
    // 修改需求
    updateRequireById: (params,data) => {
        return axios({
            url: `/bh/stcsp/requirement/updateRequireById/${params.id}`,
            method: "post",
            data
        });
    },
}
export default requirementControllerList
