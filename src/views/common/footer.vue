<template>
  <div class="footer-copyright">
    <div class="copyright-box">
      <span>Copyright © 2020-2025 陕ICP备19024156号 版本：1.0.0</span>
      <span @click="goOfficial">西安易码众城网络科技有限公司</span>
    </div>
    <div
      class="recommend-tips"
      @click="downloadChrome"
    >推荐使用chrome浏览器访问</div>
  </div>
</template>

<script>
export default {
  methods: {
    downloadChrome() {
      window.open("https://www.google.cn/intl/zh-CN/chrome/", "_blank");
    },
    goOfficial() {
      window.open("http://www.yimazhongcheng.com", "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-copyright {
  text-align: center;
  .copyright-box {
    padding-top: 12px;
    padding-bottom: 5px;
    span:last-child {
      cursor: pointer;
      color: #409eff;
      &:hover {
        color: #1584f7;
      }
    }
  }
  .recommend-tips {
    font-size: 12px;
    padding-bottom: 5px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>