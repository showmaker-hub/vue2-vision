const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 2024-08-22 16:08:25 
  /*** build 
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].filename = 'AliDashboard.html'; // 修改为你想要的文件名
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? '/static/SVRvision/A1dist/' : '/' ,
  transpileDependencies: true,
  ***/
  
  
  /*** debug 
  
  transpileDependencies: true,
  
  ***/
  
  transpileDependencies: true,
})
