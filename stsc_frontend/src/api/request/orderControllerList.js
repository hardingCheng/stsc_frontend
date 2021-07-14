// 平台用户相关接口
import axios from "../api";

const orderControllerList = {
    // 用户实名认证接口
    createOrder: (data) => {
        return axios({
            url: "/ph/stcsp/order/createOrder",
            method: "post",
            data
        });
    },
    getOrderListForBuyer: (data) => {
        return axios({
            url: `/ph/stcsp/order/listForBuyer/${data.page}`,
            method: "get",
        });
    },
    getOrderListForSeller: (data) => {
        return axios({
            url: `/ph/stcsp/order/listForSeller/${data.page}`,
            method: "get",
        });
    },
    nextForUpload: (data) => {
        return axios({
            url: `/ph/stcsp/order/nextForUpload`,
            method: "post",
            data
        });
    },
    stepDoing(params){
        return axios({
            url: `/ph/stcsp/order/stepDoing/${params.id}`,
            method: "get",
        });
    },
    setServerUploadFile(data,params){
        return axios({
            url: `/ph/stcsp/order/uploadfile/${params.orderId}`,
            method: "post",
            data
        });
    },
    getAcceptanceUploadFle(params){
        return axios({
            url: `/ph/stcsp/order/downloadfile/${params.orderId}`,
            method: "get",
        });
    },
    getOrderInfo(params){
        return axios({
            url: `/ph/stcsp/order/getOrderInfo/${params.orderId}`,
            method: "get",
        });
    },
    // 通过服务ID查看子订单详情
    getSubOrderDetailById: (params) => {
        return axios({
            url: `/ph/stcsp/suborder/getOrderInfo/${params.subOrderId}`,
            method: "get",
        });
    },
    //获取订单买家信息
    getOrderBuyerInfo(params){
        return axios({
            url: `/ph/stcsp/user/admin/info/${params.id}`,
            method: "get",
        });

    },
    //提交评论
    submitComment(params){
        return axios({
            url: `/bh/stcsp/evaluation/releaseEvaluation`,
            method: "post",
            data:params
        });
    },
    getSplitDetailInfo(params){
        return axios({
            url: `/ph/stcsp/order/getDetailInfo/${params.id}`,
            method: "get",
        });
    },
    setUploadContracts(data){
        return axios({
            url: `/ph/stcsp/order/uploadContracts`,
            method: "post",
            data
        });
    },
    //生成大订单接口
    saveForSelect: (data) => {
        return axios({
            url: `/ph/stcsp/order/createOrderForRequire`,
            method: "post",
            data:data
        });
    },
    getSubOrderDetailsInfo(params){
        return axios({
            url: `/ph/stcsp/suborder/getSubOrderInfo/${params.nid}`,
            method: "get",
        });
    },

    setSubOrderAcceptanceList: (data,params) => {
        return axios({
            url: `/ph/stcsp/suborder/uploadfile/${params.subOrderId}`,
            method: "post",
            data
        });
    },
    getSubOrderAcceptanceList: (params) => {
        return axios({
            url: `/ph/stcsp/suborder/downloadfile/${params.subOrderId}`,
            method: "get",
        });
    },
    getOrderAcceptanceList: (params) => {
        return axios({
            url: `/ph/stcsp/order/lookfile/${params.orderId}`,
            method: "get",
        });
    },
    getSubOrderInfo: (params) => {
        return axios({
            url: `/ph/stcsp/suborder/getOrderInfo/${params.subOrderId}`,
            method: "get",
        });
    },
    setSubOrderUploadContract: (data) => {
        return axios({
            url: `/ph/stcsp/suborder/uploadContractForSeller`,
            method: "post",
            data
        });
    },
    getSubOrderSellerInfo: (params) => {
        return axios({
            url: `/ph/stcsp/suborder/getSubOrder/${params.subOrderId}`,
            method: "get",
        });
    },
    setNextStepForSeller(data){
        return axios({
            url: `/ph/stcsp/suborder/nextStepForSeller`,
            method: "post",
            data
        });
    },
    setNextSmallOrderStepForSeller(data){
        return axios({
            url: `/ph/stcsp/order/nextStepForSeller`,
            method: "post",
            data
        });
    },
    setNextStepForBuyer(data){
        return axios({
            url: `/ph/stcsp/suborder/nextStepForBuyer`,
            method: "post",
            data
        });
    },
    setNextSmallOrderStepForBuyer(data){
        return axios({
            url: `/ph/stcsp/order/nextStepForBuyer`,
            method: "post",
            data
        });
    },
    getContractsForBuyer: (params) => {
        return axios({
            url: `/ph/stcsp/order/getContractsForBuyer/${params.orderId}`,
            method: "get",
        });
    },
    getSuccessAllInfo: (params) => {
        return axios({
            url: `/ph/stcsp/front/listForCase/${params.page}`,
            method: "post",
            data:params
        });
    },
    getSuccessDetailInfo: (params) => {
        return axios({
            url: `/ph/stcsp/front/getInfo/${params.id}`,
            method: "get",
        });
    },
    setAcceptAttachment: (params) => {
        return axios({
            url: `/ph/stcsp/order/acceptAttachment/${params.orderId}`,
            method: "get",
        });
    },
    getOrderEvaluation: (params) => {
        return axios({
            url: `/bh/stcsp/evaluation/getEvaluationByOrderId/${params.id}`,
            method: "get",
        });
    },
    getOrderNowForRequire: (params) => {
        return axios({
            url: `/ph/stcsp/order/orderNowForRequire/${params.requireId}`,
            method: "post",
        });
    },
}
export default orderControllerList
