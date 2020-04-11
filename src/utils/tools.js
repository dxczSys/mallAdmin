import Vue from 'vue'
import http from '@/utils/httpRequest'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'

export function dateFormat(fmt, date) {
    let ret
    let opt = {
        "Y+": date.getFullYear().toString(),       
        "m+": (date.getMonth() + 1).toString(),     
        "d+": date.getDate().toString(),            
        "H+": date.getHours().toString(),           
        "M+": date.getMinutes().toString(),         
        "S+": date.getSeconds().toString()         
    }
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt
}

export function getHttp(params, callback, err = (e) => { console.log(e) }) {
    let url = http.adornUrl(params.url)
    let loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    })
    if (params.method == 'get') {
        http({
            url: url,
            method: params.method,
            params: http.adornParams(params.data || {})
        }).then(data => {
            loadingInstance.close()
            callback(data)
        }).catch(error => {
            loadingInstance.close()
            Message({
                message: '服务器开小差了...',
                type: 'error',
                duration: 1500
            })
            err(error)
        })
    }else if (params.method == 'post') {
        http({
            url: url,
            method: params.method,
            data: http.adornData(params.data || {})
        }).then(data => {
            loadingInstance.close()
            callback(data)
        }).catch(error => {
            loadingInstance.close()
            Message({
                message: '服务器开小差了...',
                type: 'error',
                duration: 1500
            })
            err(error)
        })
    }else {
        http({
            url: url,
            method: 'post',
            data: http.adornData(params.data || {}, false, 'form'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(data => {
            loadingInstance.close()
            callback(data)
        }).catch(error => {
            loadingInstance.close()
            Message({
                message: '服务器开小差了...',
                type: 'error',
                duration: 1500
            })
            err(error)
        })
    }
}

export function uploadFile(params, callback, err = (e) => { console.log(e) }) {
    let url = http.uploadUrl('')
    let loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    })
    let formData = new FormData()
    let file = params.data || []
    file.forEach(item => {
        formData.append('files', item)
    })
    http({
        url: url,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(data => {
        loadingInstance.close()
        callback(data)
    }).catch(error => {
        loadingInstance.close()
        Message({
            message: '服务器开小差了...',
            type: 'error',
            duration: 1500
        })
        err(error)
    })
}