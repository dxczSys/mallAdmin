<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
import { createSocket } from '@/utils/websocket'
export default {
  mounted() {
    let id = this.$cookie.get('shopId')
    id && (createSocket(window.SITE_CONFIG.socket + id))
  }
}
</script>
