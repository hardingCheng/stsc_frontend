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
}
export default orderControllerList
