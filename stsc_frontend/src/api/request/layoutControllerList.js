// 服务接口
import axios from "../api";

const layoutControllerList = {
    getLayoutResult: (params) => {
        return axios({
            url: `/bh/stcsp/layout/getResult/${params.requirementId}`,
            method: "get",
        });
    },
}
export default layoutControllerList
