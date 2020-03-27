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
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import { getHttp } from '@/utils/tools'
// import VueLazyload from 'vue-lazyload'  //图片懒加载

Vue.use(VueCookie)
Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据
if (process.env.NODE_ENV !== 'production') {
    require('@/mock')
}

// 挂载全局
Vue.prototype.http = getHttp // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
