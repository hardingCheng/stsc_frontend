// 服务接口
import axios from "../api";

const companyRealInfoController = {
    enterpriseCertification: (data) => {
        return axios({
            url: `/ph/stcsp/user/enterpriseCertification`,
            method: "post",
            data
        });
    },
}
export default companyRealInfoController
