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
    // 通过需求ID查看需求详情
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
            method: "post",
            data
        });
    },
    // 修改需求
    updateRequireById: (data) => {
        return axios({
            url: `/bh/stcsp/requirement/updateRequireById/`,
            method: "post",
            data
        });
    },
    //获取评论列表
    getCommentList:(params)=>{
        return axios({
            url:`/bh/stcsp/evaluation/getEvaluation/${params.page}/${params.limit}/${params.id}`,
            method:"get",
            date:params
        })
    },
    // 根据买家id查询该用户
    getUser: (params) => {
        return axios({
            url: `/bh/stcsp/evaluation/getUsernameAvatarById/${params.id}`,
            method: "get",
            data:params
        });
    },
    //查询用户消息
    getMessage: (params) => {
        return axios({
            url: `/bh/stcsp/message/getMessageByUserId/${params.id}/${params.page}/${params.limit}`,
            method: "post",
            data:params
        });
    },
    //根据ID删除消息
    deleteMessageById: (params) => {
        return axios({
            url: `/bh//stcsp/message/deleteMessage/${params.id}`,
            method: "get",
            data:params
        });
    },
}
export default requirementControllerList

