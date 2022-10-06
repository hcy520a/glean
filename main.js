import App from './App'
import Vue from 'vue'
import store from "./store"
import {
    showToast,
    setGlobalCache
} from 'utils/api.js'
import uView from "uview-ui";
Vue.use(uView);
// 挂载到全局,创建一个showToast方法
Vue.prototype.$showToast = showToast
Vue.prototype.$setGlobalCache = setGlobalCache
Vue.config.productionTip = false

// 挂载vuex
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
