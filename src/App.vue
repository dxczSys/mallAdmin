<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
import { createSocket } from '@/utils/websocket'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('mall', ['shop_id'])
  },
  mounted() {
    let id = this.shop_id
    id && (createSocket(window.SITE_CONFIG.socket + id))
    window.addEventListener('onmessageWS', (e) => {
      let data = e.detail.data
      if (data != 'ping') {
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
      }
    })
  }
}
</script>
