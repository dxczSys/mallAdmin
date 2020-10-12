<template>
    <div class="contact">
        <lemon-imui
            v-if="refresh"
            ref="IMUI"
            :user="user"
            :hide-menu="hideMenu"
            @pull-messages="handlePullMessages"
            @send="handleSend" />
    </div>
</template>
<script>
const getTime = () => {
  return new Date().getTime();
};
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};
const generateRandWord = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};
const generateMessage = (toContactId = "", fromUser) => {
  if (!fromUser) {
    fromUser = {
      id: "system",
      displayName: "系统测试",
      avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg"
    };
  }
  return {
    id: generateRandId(),
    status: "succeed",
    type: "text",
    sendTime: getTime(),
    content: generateRandWord(),
    //fileSize: 1231,
    //fileName: "asdasd.doc",
    toContactId,
    fromUser
  };
};
export default {
    data() {
        return {
            user: {
                id: '1',
                avatar: '',
                displayName: 'aa'
            },
            hideMenu: true,
            refresh: true
        }
    },
    mounted() {
        this.getConcatList()
        this.initEmoji()
        this.receiveMessage()
    },
    methods: {
        receiveMessage() {
            let s = this
            window.addEventListener('onmessageWS', (e) => {
                let data = e.detail.data
                if (data != 'ping') {
                    let obj = JSON.parse(data)
                    if (obj.type === 1) {
                        s.init(obj.chatList)
                    }
                }
            })
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
            debugger
            let res = await this.sendMess(message)
            if (res.data.code === 200) {
                next()
                this.$refs.IMUI.updateContact(message.toContactId, {
                    lastContent: this.$refs.IMUI.lastContentRender(message.content)
                })
            }
        },
        sendMess(message) {
            let s = this
            return new Promise((resolve, reject) => {
                this.http({
                    url: 'merchant/vxchat/sendAccountMessage',
                    method: 'post',
                    data: {
                        hid: message.toContactId,
                        content: message.content,
                        shopId: s.$cookie.get('shopId'),
                        mediaId: '',
                        type: 'text'
                    }
                }, res => {
                    resolve(res)
                })
            })
        },
        init(data = []) {
            const { IMUI } = this.$refs
            data.forEach(item => {
                item.avatar = ''
                item.index = 'A'
                item.lastContent = '...'
            })
            IMUI.initContacts(data)
            this.$forceUpdate()
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
            let mess = await this.getContent(contact.id)
            mess.forEach(item => {
                item.fileName = 'aa'
                item.fileSize = 123
                item.type = 'text'
                item.fromUser = JSON.parse(item.fromUser)
            })
            console.log('aaaaaaaaa', mess)
            let isEnd = false
            !mess.length && (isEnd = true)
            next(mess, isEnd)

            // const otheruser = {
            //     id: "hehe",
            //     displayName: "I KNOEW",
            //     avatar: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4085009425,1005454674&fm=26&gp=0.jpg"
            // };
            // const messages = [
            //     generateMessage(IMUI.currentContactId, this.user),
            //     generateMessage(IMUI.currentContactId, otheruser),
            //     generateMessage(IMUI.currentContactId, this.user),
            //     generateMessage(IMUI.currentContactId, otheruser),
            //     generateMessage(IMUI.currentContactId, this.user),
            //     generateMessage(IMUI.currentContactId, this.user),
            //     generateMessage(IMUI.currentContactId, otheruser),
            //     {
            //     ...generateMessage(IMUI.currentContactId, this.user),
            //     ...{ status: "failed" }
            //     }
            // ];

            // console.log(messages);
            // let isEnd = false;
            // if (IMUI.getMessages(IMUI.currentContactId).length > 20) isEnd = true;

            // next(messages, isEnd)
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
// .contact{
//     /deep/ .lemon-wrapper{
//         height: 800px;
//         width: 1000px;
//     }
// }
</style>