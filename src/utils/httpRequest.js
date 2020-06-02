import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import md5 from 'js-md5'
import { clearLoginInfo } from '@/utils'
import { Message } from 'element-ui'


const http = axios.create({
    baseURL: window.SITE_CONFIG.baseUrl,
    timeout: 5*60*1000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config.headers['Authorization'] = Vue.cookie.get('acc_token') // 请求头带上acc_token
    config.headers['sing'] = md5(`token=${Vue.cookie.get('acc_token')}&private_sing=08c063bde1f64805875ff5a73f9f3404`).toUpperCase()
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data && response.data.code === 401) { // 401, acc_token失效
        Message({
            message: '登录失效！',
            type: 'error',
            duration: 2 * 1000
        })
        clearLoginInfo()
        router.push({ name: 'login' })
    }else if (response.data && response.data.code === 500) {
        Message({
            message: response.data.msg,
            type: 'error',
            duration: 2 * 1000
        })
    }
    return response
}, error => {
    return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * 上传文件地址处理
 */
http.uploadUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.uploadUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = false) => {
    let defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = false, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
