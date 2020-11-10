<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
import { createSocket } from '@/utils/websocket'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('mall', ['shop_id', 'badge'])
  },
  watch: {
    shop_id(n) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations('mall', ['SET_ORDER_BADGE', 'SET_SALE_BADGE']),
    init () {
      let id = this.shop_id
      id && (createSocket(window.SITE_CONFIG.socket + id))
      window.addEventListener('onmessageWS', (e) => {
        let data = e.detail.data
        if (data != 'ping') {
          let obj = JSON.parse(data)
          if (obj.type === 2) {
            this.sendNotification('未读消息', '您有一条新消息！')
          } else if (obj.type === 11) {
            this.SET_ORDER_BADGE(true)
            this.sendNotification('订单', '您有一个新订单，请尽快处理！')
          } else if (obj.type === 12) {
            this.SET_SALE_BADGE(true)
            this.sendNotification('售后', '您有一个新售后问题，请尽快处理！')
          }
        }
      })
    },
    sendNotification(title, message) {
      if (Notification && Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: require('@/assets/img/xiaoxin.png'),
          silent: true
        })
      } else {
        this.$notify({
          title: title,
          message: '您有一条新消息！',
          iconClass: 'notifition-icon',
          duration: 0,
          position: 'bottom-right'
        })
      }
    }
  }
}
</script>
