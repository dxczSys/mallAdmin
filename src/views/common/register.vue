<template>
    <div class="login-wrapper">
        <div class="logo-title">
            <img src="~@/assets/img/logo.png">
            <div>易码商城</div>
        </div>
        <div class="login-bg">
            <div class="login-box">
                <div class="login-box-d">
                    <div class="box-title">欢迎注册易码商城</div>
                    <div class="go-login">
                        <span>已有账号?</span>
                        <span tappable @click="$router.push({name: 'login'})">去登陆</span>
                    </div>
                    <el-form ref="registerForm" :model="registerForm" label-width="0px">
                        <el-form-item>
                            <el-input v-model="registerForm.username" size="large" placeholder="用户名" prefix-icon="iconfont iconyonghu"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.phone" size="large" placeholder="手机号" prefix-icon="iconfont iconshoujihao"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.code" size="large" placeholder="验证码" prefix-icon="iconfont iconyanzhengma" style="width: 222px;"></el-input>
                            <el-button size="large">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.password" size="large" placeholder="密码" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" v-model="registerForm.passwordAgain" placeholder="确认密码" size="large" prefix-icon="iconfont iconmima"></el-input>
                            <div class="forget-register">
                                <el-checkbox v-model="registerForm.isAgree">已阅读并同意</el-checkbox>
                                <router-link to="/agreement" target="_blank">
                                    <div>
                                        <span>《</span>
                                        <span tappable class="sett-agreement">入驻协议</span>
                                        <span>》</span>
                                    </div>
                                </router-link>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" round style="width: 100%;">同意条款并注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div class="footer-copyright">
            <div class="copyright-box">
                <span>Copyright © 2020-2020  陕ICP备16012831号-2  版本：1.0.0</span>
                <span>西安易码众城网络科技有限公司</span>
            </div>
            <div class="recommend-tips">推荐使用chrome浏览器访问</div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                username: '',
                phone: '',
                code: '',
                password: '',
                passwordAgain: '',
                isAgree: false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
    .logo-title{
        padding: 25px 0;
        display: flex;
        img{
            margin-left: 100px;
            height: 35px;
        }
        div{
            color: #333;
            font-size: 32px;
            margin-left: 5px;
        }
    }
    .login-bg{
        height: 500px;
        display: flex;
        justify-content: flex-end;
        background-image: url('~@/assets/img/login-bg.jpg');
        background-size: cover;
        .login-box{
            width: 380px;
            margin-right: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    .footer-copyright{
        text-align: center;
        .copyright-box{
            padding-top: 20px;
            padding-bottom: 5px;
            span:last-child{
                color: #409eff;
            }
        }
        .recommend-tips{
            font-size: 12px;
        }
    }
}
.login-box-d{
    position: relative;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    width: 380px;
    .box-title{
        font-size: 20px;
        padding-top: 15px;
        padding-bottom: 20px;
        text-align: center;
    }
    .go-login{
        position: absolute;
        top: 6px;
        right: 10px;
        font-size: 12px;
        span:last-child{
            color: #409eff;
            cursor: pointer;
            &:hover{
                color: #3c8fe3;
            }
        }
    }
}
.forget-register{
    display: flex;
    .sett-agreement{
        color: #409eff;
        cursor: pointer;
        &:hover{
            color: #3c8fe3;
        }
    }
}
</style>