module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    compress: true,
    disableHostCheck: true, //webpack4.0 开启热更新
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个跨域
      "/api": {
        target: "http://192.168.31.185:8001", //跨域接口的地址
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
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
};
