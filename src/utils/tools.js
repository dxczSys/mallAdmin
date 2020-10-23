import Vue from 'vue'
import http from '@/utils/httpRequest'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'

export function dateFormat(fmt, str) {
    let ret, date = new Date(str)
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

export function getHttp(params, callback, err = (e) => { console.log(e) }, isLoading = true) {
    let url = http.adornUrl(params.url)
    let loadingInstance = null
    if (isLoading) {
        loadingInstance = Loading.service({
            lock: true,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
        })
    }
    if (params.method == 'get') {
        http({
            url: url,
            method: params.method,
            params: http.adornParams(params.data || {})
        }).then(data => {
            isLoading && loadingInstance.close()
            callback(data)
        }).catch(error => {
            isLoading && loadingInstance.close()
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
            data: params.data || {}
        }).then(data => {
            isLoading && loadingInstance.close()
            callback(data)
        }).catch(error => {
            isLoading && loadingInstance.close()
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
            isLoading && loadingInstance.close()
            callback(data)
        }).catch(error => {
            isLoading && loadingInstance.close()
            Message({
                message: '服务器开小差了...',
                type: 'error',
                duration: 1500
            })
            err(error)
        })
    }
}

export function uploadFile(params, callback, err = (e) => { console.log(e) }, isLoading = true) {
    let url = http.uploadUrl('')
    let loadingInstance = null
    if (isLoading) {
        loadingInstance = Loading.service({
            lock: true,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
        })
    }
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
        isLoading && loadingInstance.close()
        callback(data)
    }).catch(error => {
        isLoading && loadingInstance.close()
        Message({
            message: '服务器开小差了...',
            type: 'error',
            duration: 1500
        })
        err(error)
    })
}

//比较俩个对象是否相同
export function deepCompare(x, y) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof(x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
