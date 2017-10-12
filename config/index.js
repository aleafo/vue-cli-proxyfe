// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../../',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /**
     * 前端开发数据交互node端代理的说明
     * 示例中： /api/act 代表接口的基本地址
     * @target： 目标服务器的地址
     * @ changeOrigin: 是否跨域（一般都可以设置为true）
     * @ pathRewrite:  将当前路径，重定向到目标路径，可以用于调试
     * 以下示例，即可将 this.$http.get('/api/act',...)  转发到 this.$http.get('http://localhost:8080//static/mock',...)
     */
    proxyTable: {
      '/api/act': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/act': '/static/mock'
        }
      }

      /**
       * 服务端的一个示例
       * 该示例即可将 /api/act/get_data.json 转发到   http://192.168.3.33:8080/api/act/get_data.json
       */
      /*
      ,proxyTable: {
        '/api/act': {
          target: 'http://192.168.3.33:8080/',
          changeOrigin: true,
          pathRewrite: {
            '^/api/act': '/api/act'
          }
        }
        */

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
