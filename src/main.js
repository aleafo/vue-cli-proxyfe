// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import axios from 'axios'
import util from './assets/js/util'

import 'mint-ui/lib/style.css'


import './assets/scss/yx-skin-base.scss'
import './assets/scss/yx-iconfont.css'
import './assets/scss/alliance.scss'

Vue.use(MintUI)

//加载全局使用的函数
Vue.prototype.util = util;

Vue.config.productionTip = false

//加载 axios
Vue.prototype.$http = axios

//组件之间传递变量使用
window.eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
