// 平台统一文件上传接口
import axios from "../api";

const arrangeController = {
    getArrangeList: (params) => {
        return axios({
            url: `/bh/stcsp/arrange/getAll/${params.requirementId}`,
            method: "get",
        });
    },
}
export default arrangeController
