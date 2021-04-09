import axios from "./api"; // 倒入 api

/* 将所有接口统一起来便于维
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
const userList = {
  login: (data) => {
    return axios({
      url: "/userservice/user/login",
      method: "post",
      data,
    });
  },
  mock: (params) => {
    return axios({
      url: "/mock",
      method: "get",
      params,
    });
  },
};

// 默认全部倒出
// 根绝需要进行
export default {
  userList,
};
