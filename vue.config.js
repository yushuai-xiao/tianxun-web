// const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://zbd329.top:81/tianxun',
        target: 'http://localhost:8081/tianxun',
        // target: 'http://124.221.208.203:81/tianxun',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views')
  // }
}
