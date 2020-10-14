<template>
    <div class="contact">
        <lemon-imui
            v-if="refresh"
            ref="IMUI"
            :user="user"
            :hide-menu="hideMenu"
            @pull-messages="handlePullMessages"
            @send="handleSend"
            @change-contact="handleChangeContact" />
    </div>
</template>
<script>
export default {
    name: 'Contact',
    data() {
        return {
            user: {
                id: '',
                avatar: '',
                displayName: ''
            },
            hideMenu: true,
            refresh: true
        }
    },
    mounted() {
        let shop = JSON.parse(localStorage.getItem('shopData'))
        this.user = {
            id: shop.id,
            avatar: window.SITE_CONFIG['fileUrl'] + shop.shopSign,
            displayName: shop.abbreviation,
        }
        this.getConcatList()
        // this.initEmoji()
        this.receiveMessage()

        let but = document.getElementsByClassName('lemon-editor__tip')[0]
        but.innerHTML = '使用enter 快捷发送消息'
        let input = document.getElementsByClassName('lemon-editor__input')[0]
        input.addEventListener('keydown', this.handleEnter) 
    },
    methods: {
        receiveMessage() {
            let s = this
            window.addEventListener('onmessageWS', (e) => {
                let data = e.detail.data
                if (data != 'ping') {
                    console.log('接收到消息', data)
                    let obj = JSON.parse(data)
                    if (obj.type === 1) {
                        s.updateList(obj.chatList)
                    } else {
                        let message = obj.chatMessageVo
                        message.fromUser = JSON.parse(message.fromUser)
                        s.updateMessage(message, obj.msgId)
                        s.sendNotification()
                    }
                }
            })
        },
        sendNotification() {
            if (Notification && Notification.permission === 'granted') {
                new Notification('未读消息', {
                    body: '您有一条新消息！',
                    icon: require('@/assets/img/xiaoxin.png'),
                    silent: true
                })
            } else {
                this.$notify({
                    title: '未读消息',
                    message: '您有一条新消息！',
                    iconClass: 'notifition-icon',
                    duration: 0,
                    position: 'bottom-right'
                })
            }
        },
        updateMessage(message, id) {
            console.log('执行了....')
            const { IMUI } = this.$refs
            if (IMUI) {
                const contact = IMUI.currentContact
                let un = '+1'
                if (contact.id === id) {
                    IMUI.appendMessage(message)
                    un = 0
                    IMUI.updateContact(id, {
                        unread: un,
                        lastSendTime: new Date().getTime(),
                        lastContent: IMUI.lastContentRender(message)
                    })
                } else {
                    IMUI.updateContact(id, {
                        unread: un,
                        lastSendTime: new Date().getTime()
                    })
                }
            }
        },
        handleEnter(e) {
            let s = this
            const { IMUI } = this.$refs
            const contact = IMUI.currentContact
            if (e.keyCode === 13) {
                let content = e.target.innerText
                this.http({
                    url: 'merchant/vxchat/sendAccountMessage',
                    method: 'post',
                    data: {
                        hid: contact.id,
                        content,
                        shopId: s.$cookie.get('shopId'),
                        mediaId: '',
                        type: 'text'
                    }
                }, res => {
                    if (res.data.code === 200) {
                        let curM = {
                            content,
                            fileName: '',
                            fileSize: '',
                            fromUser: s.user,
                            id: new Date().getTime() + '',
                            messageIsRead: null,
                            messagesStatus: "succeed",
                            messagesType: "text",
                            sendTime: new Date().getTime(),
                            status: "succeed",
                            toContactId: contact.id,
                            type: "text"
                        }
                        IMUI.appendMessage(curM)
                        e.target.innerText = ''
                    }
                }, (e) => {}, false)
            }
        },
        getConcatList() {
            this.http({
                url: `merchant/vxchat/getChatListByShopId?sId=${this.$cookie.get('shopId')}`,
                method: 'get'
            }, res => {
                if (res.data.code === 200) {
                    this.init(res.data.data)
                }
            })
        },
        async handleSend(message, next, file) {
            const s = this
            let data = {
                hid: message.toContactId,
                content: message.content,
                shopId: s.$cookie.get('shopId'),
                mediaId: '',
                type: ''
            }
            if (file) {
                data.type = 'image'
                let url = await this.uploadFile(file)
                if (url.data.code == 200) {
                    data.mediaId = url.data.data
                    data.content = url.data.data
                    try {
                        let res2 = await this.sendMess(data)
                        if (res2.data.code === 200) {
                            next()
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {
                data.type = 'text'
                try {
                    let res1 = await this.sendMess(data)
                    if (res1.data.code === 200) {
                        next()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        uploadFile(file) {
            return new Promise((resolve, reject) => {
                this.$upload({
                    data: [file]
                }, res => {
                    if (res.data.code == 200) {
                       resolve(res)
                    }
                })
            })
        },
        sendMess(data) {
            let s = this
            return new Promise((resolve, reject) => {
                this.http({
                    url: 'merchant/vxchat/sendAccountMessage',
                    method: 'post',
                    data
                }, res => {
                    resolve(res)
                }, (e) => {}, false)
            })
        },
        init(data = []) {
            const { IMUI } = this.$refs
            data.forEach(item => {
                item.avatar = ''
                item.index = 'A'
                item.lastContent = '...'
                item.displayName = item.displayName.substr(item.displayName.length - 8)
            })
            IMUI.initContacts(data)
        },
        updateList(data) {
            const { IMUI } = this.$refs
            console.log('当前联系人', IMUI.getContacts())
            let cur = IMUI.getContacts()
            let arr = []
            let isExit = false
            if (cur.length) {
                for (let i = 0; i < cur.length; i++) {
                    if (cur[i].id === data.id) {
                        isExit = true
                        return
                    }
                }
            }
            data.avatar = ''
            data.index = 'A'
            data.lastContent = '...'
            data.displayName = data.displayName.substr(data.displayName.length - 8)
            arr = [data]
            IMUI.initContacts(arr)
        },
        getContent(id) {
            return new Promise((resolve, reject) => {
                this.http({
                    url: `merchant/vxchat/getChatMessageInfoByContactId?id=${id}`,
                    method: 'get',
                }, res => {
                    if (res.data.code === 200) {
                        resolve(res.data.data)
                    }
                })
            })
        },
        async handlePullMessages(contact, next) {
            const { IMUI } = this.$refs
            next([], true)
            try {
                let mess = await this.getContent(contact.id)
                mess.forEach(item => {
                    item.fromUser = JSON.parse(item.fromUser)
                })
                next(mess, true)
            } catch (error) {
                console.log('错误信息', error)
            }
        },
        handleChangeContact(contact) {
            this.$refs.IMUI.updateContact(contact.id, {
                unread: 0
            })
        },
        initEmoji() {
            const { IMUI } = this.$refs
            IMUI.initEmoji([
                {
                    label: "表情",
                    children: [
                    {
                        name: "1f600",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f600.png"
                    },
                    {
                        name: "1f62c",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f62c.png"
                    },
                    {
                        name: "1f601",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f601.png"
                    },
                    {
                        name: "1f602",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f602.png"
                    },
                    {
                        name: "1f923",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f923.png"
                    },
                    {
                        name: "1f973",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f973.png"
                    },
                    {
                        name: "1f603",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f603.png"
                    },
                    {
                        name: "1f604",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f604.png"
                    },
                    {
                        name: "1f605",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f605.png"
                    },
                    {
                        name: "1f606",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f606.png"
                    },
                    {
                        name: "1f607",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f607.png"
                    },
                    {
                        name: "1f609",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f609.png"
                    },
                    {
                        name: "1f60a",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60a.png"
                    },
                    {
                        name: "1f642",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f642.png"
                    },
                    {
                        name: "1f643",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f643.png"
                    },
                    {
                        name: "1263a",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/263a.png"
                    },
                    {
                        name: "1f60b",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60b.png"
                    },
                    {
                        name: "1f60c",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60c.png"
                    },
                    {
                        name: "1f60d",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60d.png"
                    },
                    {
                        name: "1f970",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f970.png"
                    },
                    {
                        name: "1f618",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f618.png"
                    },
                    {
                        name: "1f617",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f617.png"
                    },
                    {
                        name: "1f619",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f619.png"
                    },
                    {
                        name: "1f61a",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61a.png"
                    },
                    {
                        name: "1f61c",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61c.png"
                    },
                    {
                        name: "1f92a",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f92a.png"
                    },
                    {
                        name: "1f928",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f928.png"
                    },
                    {
                        name: "1f9d0",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f9d0.png"
                    },
                    {
                        name: "1f61d",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61d.png"
                    },
                    {
                        name: "1f61b",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61b.png"
                    },
                    {
                        name: "1f911",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f911.png"
                    },
                    {
                        name: "1f913",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f913.png"
                    },
                    {
                        name: "1f60e",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60e.png"
                    },
                    {
                        name: "1f929",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f929.png"
                    },
                    {
                        name: "1f921",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f921.png"
                    },
                    {
                        name: "1f920",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f920.png"
                    },
                    {
                        name: "1f917",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f917.png"
                    },
                    {
                        name: "1f60f",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f60f.png"
                    },
                    {
                        name: "1f636",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f636.png"
                    },
                    {
                        name: "1f610",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f610.png"
                    },
                    {
                        name: "1f611",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f611.png"
                    },
                    {
                        name: "1f612",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f612.png"
                    },
                    {
                        name: "1f644",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f644.png"
                    },
                    {
                        name: "1f914",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f914.png"
                    },
                    {
                        name: "1f925",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f925.png"
                    },
                    {
                        name: "1f92d",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f92d.png"
                    },
                    {
                        name: "1f92b",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f92b.png"
                    },
                    {
                        name: "1f92c",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f92c.png"
                    },
                    {
                        name: "1f92f",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f92f.png"
                    },
                    {
                        name: "1f633",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f633.png"
                    },
                    {
                        name: "1f61e",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61e.png"
                    },
                    {
                        name: "1f61f",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f61f.png"
                    },
                    {
                        name: "1f620",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f620.png"
                    },
                    {
                        name: "1f621",
                        title: "微笑",
                        src: "https://twemoji.maxcdn.com/2/72x72/1f621.png"
                    }
                    ]
                }
            ])
        }
    }
}
</script>
<style lang="scss" scoped>
.contact{
    // /deep/ .lemon-wrapper{
    //     height: 800px;
    //     width: 1000px;
    // }
    /deep/ .lemon-icon-folder{
        display: none;
    }
}
</style>