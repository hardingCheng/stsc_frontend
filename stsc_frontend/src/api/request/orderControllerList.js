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
    setpDoing(params){
        return axios({
            url: `/ph/stcsp/order/setpDoing/${params.id}`,
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
    }

}
export default orderControllerList
