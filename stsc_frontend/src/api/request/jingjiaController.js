import axios from "../api";
import Axios from "axios";
import store from "@/store";

const BiddingController = {
  // 甲拒绝价格
  jiajujue: (data) => {
    console.log(data.JingjiaId)
    return axios({
      url: `/ph/stcsp/Jingjia/jiajujue/`,
      method: "post",
      JingjiaId:data.JingjiaId
    });
  },
  //甲同意价格
  jiatongyi: (data) => {
    console.log(data.JingjiaId)
    return axios({
      url: `/ph/stcsp/Jingjia/jiatongyi/`,
      method: "post",
      JingjiaId:data.JingjiaId
    });
  },
  //乙拒绝价格
  yijujue: (data) => {
    return axios({
      url: `/ph/stcsp/Jingjia/yijujue/`,
      method: "post",
      serveId:data.ServeId,
      JingjiaId:data.JingjiaId
    });
  },
  //乙同意价格
  yitongyi: (data) => {
    return axios({
      url: `/ph/stcsp/Jingjia/yitongyi/`,
      method: "post",
      serveId:data.ServeId,
      JingjiaId:data.JingjiaId
    });
  },
  // searchBiddingStatus: (data) => {
  //   return axios({
  //     url: `/ph/stcsp/Jingjia/isJingjia/?requirmentId=${data.requirmentId}`,
  //     method: "post"
  //     // requirementId:data.requirementId
  //   });
  // }
  // 查询该需求的竞价状态
  queryBiddingStatus: (requirementId) => {
    let data = "requirementId=" + requirementId
    return Axios({   //原生axios，加上token
      url:`/ph/stcsp/Jingjia/isJingjia`,
      method:'post',
      data,
      headers:{token: store.state.token},
    })
  },
  // 开启竞价流程
  startBidding: (JingjiaId) => {
    let data = "JingjiaId=" + JingjiaId
    return Axios({   //原生axios，加上token
      url:`/ph/stcsp/Jingjia/kaiqiJingjia`,
      method:'post',
      data,
      headers:{token: store.state.token},
    })
  },
  // 取消竞价
  deleteBidding: (requirementId) => {
    let data = "requirementId=" + requirementId
    return Axios({   //原生axios，加上token
      url: `/ph/stcsp/Jingjia/quxiaojingjia`,
      method: 'post',
      data,
      headers: {token: store.state.token},
    })
  }
}
export default BiddingController