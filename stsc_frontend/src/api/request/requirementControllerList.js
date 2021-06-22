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
    getRequireSubRequire: (params,data) => {
        return axios({
            url: `/bh/stcsp/requirement/getRequireSubRequire/${params.page}/${params.limit}`,
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
            url:`/bh/stcsp/evaluation/getEvaluation/${params.page}/${params.limit}/${params.serveId}`,
            method:"get",
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
    //查询买家用户消息
    getMessage: (params) => {
        return axios({
            url: `/bh/stcsp/message/getBuyerMessage/${params.userId}/${params.page}/${params.limit}`,
            method: "post",
            data:params
        });
    },
    //根据ID删除消息
    deleteMessageById: (params) => {
        return axios({
            url: `/bh/stcsp/message/deleteMessage/${params.id}`,
            method: "delete",
        });
    },
    //根据ID查询买家未读消息
    lookMessageById: (params) => {
        return axios({
            url: `/bh/stcsp/message/getBuyerMessage/${params.userId}/${params.page}/${params.limit}/${params.isRead}`,
            method: "post",
            data:params
        });
    },
    //查询卖家用户消息
    getSellerMessage: (params) => {
        return axios({
            url: `/bh/stcsp/message/getSellerMessage/${params.userId}/${params.page}/${params.limit}`,
            method: "post",
            data:params
        });
    },
    //根据ID查询卖家未读消息
    lookSellerMessageById: (params) => {
        return axios({
            url: `/bh/stcsp/message/getSellerMessage/${params.userId}/${params.page}/${params.limit}/${params.isRead}`,
            method: "post",
            data:params
        });
    },
    //消息状态变更
    changeMessageState: (params) => {
        return axios({
            url: `/bh/stcsp/message/changeStatus/${params.messageId}`,
            method: "get",
        });
    },
    //查询用户所有未读消息
    getUserMessageNoAll: (params) => {
        return axios({
            url: `/bh/stcsp/message/getUserMessage/${params.userId}`,
            method: "get",
        });
    },
    //编排接口
    getArrangeInfo: (params) => {
        return axios({
            url: `/bh/stcsp/layout/getResult/${params.requirementId}`,
            method: "get",
        });
    },
    //重新拆分接口
    resoution: (params) => {
        return axios({
            url: `/bh/stcsp/requirement/rearrange/${params.requirementId}`,
            method: "get",
        });
    },
    //确认编排结果
    confirmResult: (params) => {
        return axios({
            url: `/bh/stcsp/requirement/confirmResult/${params.requirementId}`,
            method: "get",
        });
    },

}
export default requirementControllerList

