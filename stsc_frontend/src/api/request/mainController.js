// 服务接口
import axios from "../api";

const mainController = {
    getChartData: (data) => {
        return axios({
            url: `/ph/stcsp/front/dataForPlugin`,
            method: "get",
        });
    },
    getSuccessfulCase: (data) => {
            return axios({
                url: `/ph/stcsp/front/getSuccessfulCase`,
                method: "get",
            });
        },
    }
export default mainController
