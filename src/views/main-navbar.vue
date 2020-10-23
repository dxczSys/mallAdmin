<template>
    <nav
        class="site-navbar-wrapper"
        :class="'site-navbar--' + navbarLayoutType"
    >
        <div class="navbar-left">
            <div class="navbar-logo">
                <img
                    src="~@/assets/img/logo.png"
                    alt="logo"
                >
            </div>
            <div class="mall-name">
                <b>易码商城</b>
            </div>
        </div>
        <div class="navbar-right">
            <!-- <el-badge v-if="role_id.includes('1') || role_id.includes('2')" :value="approvalNum" class="mark-tip">
                <icon-svg name="lingdang"></icon-svg>
            </el-badge> -->
            <div
                class="navbar-avatar"
                @click="$router.push({ name: 'setting-update-personInfo' })"
            >
                <el-image
                    class="user-avatar"
                    :src="avatarUrl"
                >
                    <div
                        slot="error"
                        class="image-slot"
                    >
                        <img src="~@/assets/img/avatar_default.png">
                    </div>
                </el-image>
                <span>{{ user_name }}</span>
            </div>
            <div
                class="navbar-logout"
                @click="logoutHandle"
            >
                <span class="iconfont iconicon-tuichu"></span>
            </div>
        </div>
    </nav>
</template>

<script>
import { clearLoginInfo } from "@/utils"
import { mapState } from "vuex"
export default {
  data() {
    return {
      avatarUrl: require("@/assets/img/avatar_default.png"),
      approvalNum: 0
    }
  },
  computed: {
    ...mapState("user", ["role_id", "url", 'user_name']),
    ...mapState('common', ['navbarLayoutType'])
  },
  methods: {
    logoutHandle() {
      this.$confirm(`确定[退出]当前系统?`, "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        clearLoginInfo();
        this.$router.push({ name: "login" });
      });
    }
  },
  mounted() {
    if (this.url) {
      this.avatarUrl = window.SITE_CONFIG.fileUrl + this.url;
    }
  }
};
</script>

<style lang="scss" scoped>
.site-navbar-wrapper {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  // background: linear-gradient(to right, rgb(74, 194, 154), rgb(189, 255, 243));
  background: linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229));
}
.navbar-right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  .navbar-avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
    .user-avatar {
      /deep/ img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }
  .mark-tip {
    margin-right: 30px;
    margin-top: 6px;
    cursor: pointer;
    svg {
      font-size: 28px;
    }
  }
}
.navbar-logout {
  span {
    font-size: 25px;
    color: #409eff;
    cursor: pointer;
    &:hover {
      color: #3e8ef7;
    }
  }
}
.navbar-left {
  display: flex;
  align-items: center;
  margin-left: 40px;
}
.mall-name {
  margin-left: 8px;
  b {
    font-size: 18px;
  }
}
.navbar-logo {
  img {
    width: 30px;
  }
}
</style>