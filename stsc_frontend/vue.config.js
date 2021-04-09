module.exports = {
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个跨域
      "/api": {
        target: "http://192.168.31.185:8004", //跨域接口的地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
