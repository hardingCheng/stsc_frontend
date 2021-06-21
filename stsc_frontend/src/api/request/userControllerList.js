// 平台用户相关接口
import axios from "../api";

const userControllerList = {
    // 用户实名认证接口
    authAccount: (data) => {
        return axios({
            url: "/ph/stcsp/user/authAccount2",
            method: "post",
            data
        });
    },
    // 根据id删除本用户信息
    del: (data) => {
        return axios({
            url: `/ph/stcsp/user/del/${data.id}`,
            method: "delete",
        });
    },
    // 获取验证码
    getCode: () => {
        return axios({
            url: "/ph/stcsp/user/getCode",
            method: "get",
        });
    },
    // 获取根据token获取用户信息接口
    getCurrentUserInfo: () => {
        return axios({
            url: "/ph/stcsp/user/getCurrentUserInfo",
            method: "get",
        });
    },
    // 个人信息完善
    improveInfo: (data) => {
        return axios({
            url: "/ph/stcsp/user/improveInfo",
            method: "post",
            data
        });
    },
    // 根据用户id获取用户信息
    info: (params) => {
        return axios({
            url: `/ph/stcsp/user/info/${params.id}`,
            method: "get",
        });
    },
    // 校验用户名是否已存在
    isExist: (params) => {
        return axios({
            url: `/ph/stcsp/user/isExist/${params.username}`,
            method: "get",
        })
    },
    // 后台多条件组合查询带分页
    list: (data) => {
        return axios({
            url: "/ph/stcsp/user/list",
            method: "post",
            data
        });
    },
    // 登录
    login: (data) => {
        return axios({
            url: "/ph/stcsp/user/login",
            method: "post",
            data,
        });
    },
    // 注册
    register: (data) => {
        return axios({
            url: "/ph/stcsp/user/register",
            method: "post",
            data,
        });
    },
    // 退出登录接口
    logout: (params) => {
        return axios({
            url: `/ph/stcsp/user/logout`,
            method: "get",
        })
    },
    // 平台用户修改个人信息
    updateInfo: (data) => {
        return axios({
            url: `/ph/stcsp/user/updateInfo`,
            method: "post",
            data,
        });
    },
    // 是否认证
    getAuthInfo(data){
        return axios({
            url: `/ph/stcsp/user/getAuthInfo`,
            method: "get",
        });
    },
    // 获取用户信息
    getUserInfo(data){
        return axios({
            url: `/ph/stcsp/user/info`,
            method: "get",
        });
    },
    // 第三方登录
    thirdLogin: (params,data) => {
        return axios({
            url: `/bh/stcsp/user/thirdLogin/${params.source}`,
            method: "post",
            data
        });
    },
}
export default userControllerList
