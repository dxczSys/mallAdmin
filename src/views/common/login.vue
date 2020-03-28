<template>
    <div class="login-wrapper">
        <div class="logo-title">
            <img src="~@/assets/img/logo.png">
            <div>易码商城</div>
        </div>
        <div class="login-bg">
            <div class="login-box">
                <div class="login-box-d">
                    <div class="box-title">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px">
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" size="large" placeholder="手机号" prefix-icon="iconfont iconyonghu"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" style="margin-bottom: 10px;">
                            <el-input type="password" v-model="loginForm.password" placeholder="密码" size="large" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <div class="forget-register">
                            <span tappable @click="$router.push({ name: 'forget-password'})">忘记密码?</span>
                            <span tappable @click="$router.push({name: 'register'})">免费注册</span>
                        </div>
                        <el-form-item>
                            <el-button @click="handleLogin" type="primary" round style="width: 100%;">登&nbsp;&nbsp;录</el-button>
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
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [ { required: true, message: '手机号不能为空', trigger: 'blur'} ],
                password: [ { required: true, message: '密码不能为空', trigger: 'blur'} ],
            },
        }
    },
    methods: {
        handleLogin() {
            this.$cookie.set('token', 'sdsdfeeff')
            sessionStorage.setItem('userType', '1')
            sessionStorage.setItem('userId', '112233')
            this.$router.push({ name: 'home' })
            // this.$refs.loginForm.validate(valid => {
            //     if (valid) {
            //         this.http({
            //             url: 'sys/login',
            //             method: 'post',
            //             data: {
            //                 username: this.loginForm.username,
            //                 password: this.loginForm.password
            //             }
            //         }, res => {
            //             if (res.code == 0) {
            //                 this.$cookie.set('token', 'sdsdfeeff')
            //                 sessionStorage.setItem('userType', '1')
            //                 sessionStorage.setItem('userId', '112233')
            //                 this.$router.push({ name: 'home' })
            //             }else {
            //                 this.$message.info('登录失败')
            //             }
            //         })
            //     }
            // })
        },
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
            width: 360px;
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
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    width: 360px;
    .box-title{
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 20px;
        text-align: center;
    }
}
.forget-register{
    color: #999;
    text-align: right;
    margin-bottom: 20px;
    span{
        padding-left: 5px;
        cursor: pointer;
        &:hover{
            color: #409eff;
        }
    }
}
</style>