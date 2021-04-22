import axios from "./api"; // 倒入 api

/* 将所有接口统一起来便于维
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 公共API
const commonApiList = {
  vcode: () => {
    return axios({
      url: "/stcsp/user/getCode",
      method: "get",
    });
  },
};
// 用户API
const userApiList = {
  login: (data) => {
    return axios({
      url: "/stcsp/user/login",
      method: "post",
      data,
    });
  },
  register: (data) => {
    return axios({
      url: "/stcsp/user/register",
      method: "post",
      data,
    });
  },
  //根据ID查看服务详情
  getServeDetail: (params) => {
    return axios({
      url: `/stcsp/serve/getServiceDetailById/${params.id}`,
      method: "get",
      params,
    });
  },
  //根据条件查找需求
  getDemand: (data) => {
    return axios({
      url: `/stcsp/requirement/getRequiresByCondition/${data.page}/${data.limit}`,
      method: "post",
       data,
    });
  },
  ////根据条件查找服务
  getServe: (data) => {
    return axios({
      url: `/stcsp/serve/getServesByCondition/${data.page}/${data.limit}`,
      method: "post",
      data,
    });
  },
};
// 后台API
const backstageApiList = {
  login: (data) => {
    return axios({
      url: "/stcsp/user/login",
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
  userApiList,
  commonApiList,
  backstageApiList,
};
