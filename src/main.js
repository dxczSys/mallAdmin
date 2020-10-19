import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import '@/element-ui'
import '@/icons'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import '@/assets/font/iconfont.css'
import clickoutside from 'element-ui/lib/utils/clickoutside'
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import { getHttp, uploadFile, dateFormat } from '@/utils/tools'
import httpRequest from '@/utils/httpRequest'
import { checkPermission } from '@/utils/pwaPush'
// import VueLazyload from 'vue-lazyload'  //图片懒加载

import LemonIMUI from 'lemon-imui'
import "lemon-imui/dist/index.css"
Vue.use(LemonIMUI)

Vue.use(VueCookie)
Vue.config.productionTip = false

//推送
checkPermission()

// 挂载全局
Vue.prototype.http = getHttp
Vue.prototype.$upload = uploadFile
Vue.prototype.$httpapi = httpRequest
Vue.prototype._dateFormat = dateFormat
Vue.prototype.isAuth = isAuth

Vue.directive('clickoutside', clickoutside)

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
