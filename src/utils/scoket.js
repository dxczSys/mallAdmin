let ws
let lockReconnect = false
let wsUrl = window.SITE_CONFIG.socket

function createWebSocket() {
    try {
        ws = new WebSocket(wsUrl)
        initEventHandle()
    } catch (e) {
        reconnect(wsUrl)
    }     
}

function initEventHandle(onmessage = () => {}) {
    ws.onclose = function () {
        reconnect(wsUrl)
    }
    ws.onerror = function () {
        reconnect(wsUrl)
    }
    ws.onopen = function () {
        console.log('链接成功')
        //心跳检测重置
        heartCheck.reset().start()
    }
    ws.onmessage = function (event) {
        console.log('接收到消息', event)
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        heartCheck.reset().start()
        onmessage(event)
    }
}

function close() {
    ws.close()
}

function reconnect(url) {
    if(lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(url)
        lockReconnect = false
    }, 2000)
}

//心跳检测
let heartCheck = {
    timeout: 60000,//60秒
    timeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj)
        return this
    },
    start: function(){
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            ws.send("HeartBeat")
        }, this.timeout)
    }
}

function init(id) {
    wsUrl = wsUrl + id
    createWebSocket()
}

export default init