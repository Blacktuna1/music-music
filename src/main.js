import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router/index'
import store from './store/index'

// 全局样式表
import "./assets/css/base.css"
import 'element-ui/lib/theme-chalk/index.css';

import { request } from "./network/request";

Vue.prototype.$request = request;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
