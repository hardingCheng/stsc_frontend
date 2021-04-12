/*
统一 url 配置
统一api 请求
request (请求)拦截器，例如：带上token等，设置请求头
response (响应)拦截器，例如：统一错误处理，页面重定向等
根据需要，结合 Vuex 做全局的loading动画，或者错误处理
将 axios 封装成 Vue 插件使用
*/
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
import axios from "axios"; // 注意先安装哦
import config from "./config.js"; // 倒入默认配置
import qs from "qs"; // 序列化请求数据，视服务端的要求
import { Message } from "element-ui"; //全局错误弹窗
import store from "../store";
import router from "../router";
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
      transformResponse: [
        function (data) {
          return data;
        },
      ],
    });

    // request 拦截器
    instance.interceptors.request.use(
      (config) => {
        // TODO: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
        store.commit("modGlobalLoding");
        // TODO: 2

        /*
        这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），
        会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。然后，在每次请求接口的时候，
        都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。
        每次发送请求之前判断vuex中是否存在token
        如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
         */

        //带上 token , 可以结合 vuex 或者重 localStorage
        //前期先使用vuex 后期localStorage  方便拿取
        if (store.state.token) {
          config.headers["Authorization"] = store.state.token;
        } else {
          // 重新回到登录页面
          if (window.location.hash === "#/login") {
            return;
          } else {
            router.push({ path: "/login" });
          }
        }

        // TODO: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化   post put delete
        // if (
        //   config.method.toLocaleLowerCase() === "post" ||
        //   config.method.toLocaleLowerCase() === "put" ||
        //   config.method.toLocaleLowerCase() === "delete"
        // ) {
        //   config.data = qs.stringify(config.data);
        // }
        return config;
      },
      (error) => {
        // 请求错误时做些事(接口错误、超时等)
        // TODO: 4
        // 关闭loadding
        store.commit("modGlobalLoding");
        //  1.判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          // 重复请求一次
          // 全局提醒  刷新？
          Message.error(`请求超时，刷新页面重新获取`);
        }
        //  2.需要重定向到错误页面
        const errorInfo = error.response;
        if (errorInfo) {
          const errorStatus = errorInfo.status; // 404 403 500 ... 等
          router.push({
            path: `/error/${errorStatus}`,
          });
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        let data = response.data;
        if (response.data == undefined) {
          data = response.request.responseText;
        }
        switch (response.status) {
          case 200:
            data = JSON.parse(data);
            break;
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)
        // err.data = data
        // err.response = response
        return data;
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;

            case 401:
              err.message = "未授权，请登录";
              break;

            case 403:
              err.message = "拒绝访问";
              break;

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`;
              break;

            case 408:
              err.message = "请求超时";
              break;

            case 500:
              err.message = "服务器内部错误";
              break;

            case 501:
              err.message = "服务未实现";
              break;

            case 502:
              err.message = "网关错误";
              break;

            case 503:
              err.message = "服务不可用";
              break;

            case 504:
              err.message = "网关超时";
              break;

            case 505:
              err.message = "HTTP版本不受支持";
              break;

            default:
          }
        }
        // 此处使用的是 element UI 的提示组件
        Message.error(`ERROR: ${err.message}`);
      }
    );

    //请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
