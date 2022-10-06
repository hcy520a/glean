import App from './App'
import Vue from 'vue'

import {
    showToast
} from 'utils/api.js'
// 挂载到全局,创建一个showToast方法
Vue.prototype.$showToast = showToast
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
