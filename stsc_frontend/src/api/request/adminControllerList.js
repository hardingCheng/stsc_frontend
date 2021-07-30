// 后台管理员相关接口
import axios from "../api";

const adminControllerList = {
    // 新增管理员
    add: (data) => {
        return axios({
            url: "/ph/stcsp/admin/add",
            method: "post",
            data
        });
    },
    //后台多条件组合查询带分页
    list: (data) => {
        return axios({
            url: "/ph/stcsp/admin/list",
            method: "post",
            data
        });
    },
    // 按用户名模糊查询带分页
    query: (data) => {
        return axios({
            url: "/ph/stcsp/admin/query",
            method: "post",
            data
        });
    },
    update: (data) => {
        return axios({
            url: `/ph/stcsp/admin/update/${data.id}`,
            method: "post",
            data: {}
        });
    },
};

export default adminControllerList
