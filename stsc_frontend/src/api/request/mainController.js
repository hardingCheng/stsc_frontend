// 服务接口
import axios from "../api";

const mainController = {
    getZhiWangTotalCount:(data)=>{
        return axios({
            url:`ph/stcsp/cnki/getResourcesCount`,
            method:"get"
        })
    },
    getZhiWangCount:(data)=>{
        return axios({
            url:`/ph/stcsp/cnki/getClassificationResourcesCount`,
            method:"get"
        })
    },
    getPlatformsDataCount:(data)=>{
        return axios({
            url:`/ph/stcsp/front/ziyuanInfo`,
            method:"get"
        })
    },
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
    getIndexData: (data) => {
        return axios({
            url: `/ph/stcsp/front/getData`,
            method: "get",
        });
    },
}
export default mainController
