<template>
    <div class="contact">
        <lemon-imui
            ref="IMUI"
            :user="user"
            :hide-menu="hideMenu" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                id: '1',
                avatar: 'http://contentcms-bj.cdn.bcebos.com/cmspic/2c044bcf5c58bafa0d24d5bb8637baa3.jpeg?x-bce-process=image/crop,x_0,y_0,w_899,h_489',
                displayName: 'aa'
            },
            hideMenu: true
        }
    },
    mounted() {
       this.init()
       this.initEmoji()
    },
    methods: {
        init() {
            const { IMUI } = this.$refs
            const contactData1 = {
                id: "contact-1",
                displayName: "工作协作群",
                avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
                type: "single",
                index: "A",
                unread: 14,
                lastSendTime: 1566047865417,
                lastContent: "2"
            }
            let data = [
                contactData1
            ]
            IMUI.initContacts(data)
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

</style>