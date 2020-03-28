import Vue from 'vue'
import http from '@/utils/httpRequest'
import { Message } from 'element-ui'

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
    if (params.method == 'get') {
        http({
            url: url,
            method: params.method,
            params: http.adornParams(params.data || {})
        }).then(callback).catch(err)
    }else if (params.method == 'post') {
        http({
            url: url,
            method: params.method,
            data: http.adornData(params.data || {})
        }).then(callback).catch(err)
    }else {
        http({
            url: url,
            method: params.method,
            data: http.adornData(params.data || {}, false, 'form'),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(callback).catch(err)
    }
}