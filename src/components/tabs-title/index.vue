<template>
  <div class="tabs-title">
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
