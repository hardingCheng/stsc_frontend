module.exports = {
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: 80, // 端口号
    https: false, // https:{type:Boolean}
    compress: true,
    disableHostCheck: true, //webpack4.0 开启热更新
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个跨域
      "/ph": {
        // target: "http://60.205.217.212:8001",
        target: "http://192.168.31.235:8001",
        changeOrigin: true,
        pathRewrite: {
          "^/ph": "",
        },
      },
      "/bh": {
         // target: "http://60.205.217.212:8003",
        target: "http://192.168.31.65:8003",
        changeOrigin: true,
        pathRewrite: {
          "^/bh": "",
        },
      },
      "/third": {
        target: "http://192.168.31.65:8003",
        // target: "http://60.205.217.212:8003",
        changeOrigin: true,
        pathRewrite: {
          "^/third": "",
        },
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  //webpack配置
    configureWebpack: {
      //警告 webpack 的性能提示
      performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js');
        }
      }
    },
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
  publicPath: './',
  outputDir: 'dist'
};
