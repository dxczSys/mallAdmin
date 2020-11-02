<template>
  <div class="tabs-title" :style="{'margin-top': `${ top }px`}">
    <div class="front-block"></div>
    <div class="content">{{ tabsName }}</div>
  </div>
</template>
<script>
export default {
  props: {
    tabsName: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.tabs-title{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .front-block{
    width: 5px;
    height: 15px;
    background-color: #409eff;
    border-radius: 1px;
    margin-right: 3px;
  }
  .content{
    font-weight: 600;
  }
}
</style>
