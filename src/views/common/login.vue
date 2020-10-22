<template>
  <div class="login-wrapper">
    <div class="logo-title">
      <img src="~@/assets/img/logo.png">
      <div>易码商城</div>
    </div>
    <div class="login-bg-box">
      <div class="login-bg">
        <div class="login-box">
          <div class="login-box-d">
            <div class="box-title">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px">
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      size="large"
                      placeholder="手机号"
                      prefix-icon="iconfont iconyonghu"
                      @keydown.enter.native="handleLogin">
                    </el-input>
                  </el-form-item>
                  <el-form-item
                    prop="password"
                    style="margin-bottom: 10px;">
                    <el-input
                      type="password"
                      v-model="loginForm.password"
                      placeholder="密码"
                      size="large"
                      prefix-icon="iconfont iconmima"
                      @keydown.enter.native="handleLogin"></el-input>
                  </el-form-item>
                  <div class="forget-register">
                      <span
                          tappable
                          @click="$router.push({ name: 'forget-password'})"
                      >忘记密码?</span>
                      <span
                          tappable
                          @click="$router.push({name: 'register'})"
                      >免费注册</span>
                  </div>
                  <el-form-item>
                      <el-button
                          @click="handleLogin"
                          type="primary"
                          round
                          style="width: 100%;"
                      >登&nbsp;&nbsp;录</el-button>
                  </el-form-item>
              </el-form>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import sha256 from "js-sha256"
import myFooter from "./footer"
import { createSocket } from "@/utils/websocket"
import { mapMutations } from 'vuex'
export default {
  components: { myFooter },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations('user', ['SET_USER_ID', 'SET_ROLE_ID', 'SET_ROLE_NAME', 'SET_USER_NAME', 'SET_REAL_USER_NAME', 'SET_PHONE', 'SET_URL']),
    ...mapMutations('mall', ['SET_MALL', 'SET_MALL_NAME', 'SET_MALL_ID', 'SET_FLOOR_NAME', 'SET_FLOOR_ID', 'SET_SHOP', 'SET_SHOP_NAME', 'SET_SHOP_ID']),
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.http(
            {
              url: "merchant/login",
              method: "form",
              data: {
                username: this.loginForm.username,
                password: sha256(this.loginForm.password)
              }
            },
            res => {
              if (res.data.code == 200) {
                let _data = res.data.data.user,
                  mall = res.data.data.shopMall,
                  shop = res.data.data.shop,
                  floor = res.data.data.shopFloor,
                  _roleids = [],
                  _roleNames = [],
                  roleLists = res.data.data.user.roleLists || []
                roleLists.forEach(item => {
                  _roleids.push(item.id);
                  _roleNames.push(item.roleName);
                })
                this.$cookie.set("acc_token", _data.userToken)
                this.SET_USER_ID(_data.id)
                this.SET_ROLE_ID(_roleids)
                this.SET_ROLE_NAME(_roleNames)
                this.SET_USER_NAME(_data.userName || "")
                this.SET_REAL_USER_NAME(_data.realUserName || "")
                this.SET_PHONE(_data.userTel)
                this.SET_URL(_data.userPic || "")
                // this.$cookie.set("userId", _data.id);
                // this.$cookie.set("roleId", JSON.stringify(_roleids));
                // this.$cookie.set("roleName", JSON.stringify(_roleNames));
                // this.$cookie.set("userName", _data.userName || "");
                // this.$cookie.set("realUserName", _data.realUserName || "");
                // this.$cookie.set("phone", _data.userTel);
                // this.$cookie.set("url", _data.userPic || "");

                if (mall) {
                  // sessionStorage.setItem("mallData", JSON.stringify(mall));
                  // this.$cookie.set("mallName", mall.shopName);
                  // this.$cookie.set("mallId", mall.id);
                  this.SET_MALL(mall)
                  this.SET_MALL_NAME(mall.shopName)
                  this.SET_MALL_ID(mall.id)
                }
                if (floor) {
                  // this.$cookie.set("floorName", floor.shopName);
                  // this.$cookie.set("floorId", floor.id);
                  this.SET_FLOOR_NAME(floor.shopName)
                  this.SET_FLOOR_ID(floor.id)
                }
                if (shop) {
                  // localStorage.setItem("shopData", JSON.stringify(shop));
                  // this.$cookie.set("shopName", shop.shopName);
                  // this.$cookie.set("shopId", shop.id);
                  this.SET_SHOP(shop)
                  this.SET_SHOP_NAME(shop.shopName)
                  this.SET_SHOP_ID(shop.id)
                  createSocket(window.SITE_CONFIG.socket + shop.id)
                }
                this.$router.push({ name: "home" })
              } else {
                this.$message.info(res.data.msg)
              }
            }
          )
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .logo-title {
    padding: 25px 0;
    display: flex;
    img {
      margin-left: 100px;
      height: 35px;
    }
    div {
      color: #333;
      font-size: 32px;
      margin-left: 5px;
    }
  }
  .login-bg-box {
    flex-grow: 1;
  }
  .login-bg {
    height: 55vh;
    display: flex;
    justify-content: flex-end;
    background-image: url("~@/assets/img/login-bg.jpg");
    background-size: cover;
    .login-box {
      width: 360px;
      margin-right: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
.login-box-d {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  width: 360px;
  .box-title {
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: center;
  }
}
.forget-register {
  color: #999;
  text-align: right;
  margin-bottom: 20px;
  span {
    padding-left: 5px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>