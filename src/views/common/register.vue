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
                    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input v-model="registerForm.phone" size="large" placeholder="手机号" prefix-icon="iconfont iconshoujihao"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="registerForm.code" size="large" placeholder="验证码" prefix-icon="iconfont iconyanzhengma" style="width: 222px;"></el-input>
                            <el-button @click="getCode" v-if="codeTiming == 0" size="large">获取验证码</el-button>
                            <span style="color: #999;" v-else>重新发送({{codeTiming}}s)</span>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="registerForm.password" size="large" placeholder="密码" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordAgain">
                            <el-input type="password" v-model="registerForm.passwordAgain" placeholder="确认密码" size="large" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <div class="forget-register">
                            <el-checkbox v-model="isAgree">已阅读并同意</el-checkbox>
                            <router-link to="/agreement" target="_blank">
                                <div>
                                    <span>《</span>
                                    <span tappable class="sett-agreement">入驻协议</span>
                                    <span>》</span>
                                </div>
                            </router-link>
                        </div>
                        <el-form-item>
                            <el-button @click="handleRegister" :disabled="!isAgree" type="primary" round style="width: 100%;">同意条款并注册</el-button>
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
        let checkPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('手机号不能为空'))
            }else {
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确手机号'));
                }
                callback();
            }
        }
        let checkPassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密码不能为空'))
            }else {
                if (value.length < 6) {
                    callback(new Error('密码不能少于6位'));
                }
                callback();
            }
        }
        return {
            isAgree: false,
            codeTiming: 0,
            registerForm: {
                phone: '',
                code: '',
                password: '',
                passwordAgain: '',
            },
            registerRules: {
                phone: [ 
                    { required: true, message: '手机号不能为空', trigger: 'blur'},
                    { validator: checkPhone, trigger:'blur' }
                ],
                code: [ {required: true, message: '请获取验证码并输入', trigger: 'blur' } ],
                password: [ 
                    { required: true, message: '密码不能为空', trigger: 'blur'},
                    { validator: checkPassword, trigger:'blur' }
                ],
                passwordAgain: [ { required: true, message: '请再输入一次', trigger: 'blur'} ],
            }
        }
    },
    methods: {
        handleRegister() {
            //注册
            this.$refs.registerForm.validate(valid => {
                if (valid) {
                    if (this.registerForm.password === this.registerForm.passwordAgain) {
                        this.http({
                            url: 'user/register',
                            method: 'post',
                            data: {
                                userTel: this.registerForm.phone,
                                userPassWord: this.registerForm.password,
                                code: this.registerForm.code
                            }
                        }, res => {
                            if (res.data.code == 200) {
                                this.$message.success('注册成功!')
                                let _data = res.data.data   
                                this.$cookie.set('token', _data.userToken)
                                this.$cookie.set('userId', _data.id)
                                this.$cookie.set('roleId', _data.roleLists[0].id)
                                this.$cookie.set('roleName', _data.roleLists[0].roleName)
                                this.$cookie.set('roleIdentify', _data.roleLists[0].roleIdentify)
                                this.$cookie.set('userName', _data.userName || '')
                                this.$cookie.set('realUserName', _data.realUserName || '')
                                this.$cookie.set('phone',  _data.userTel)
                                this.$cookie.set('url', _data.userPic || '')
                                this.$router.push({ name: 'home' })
                            }else {
                                this.$message.info(res.data.msg)
                            }
                        })
                    }else {
                        this.$message.info('俩次密码输入不一致！')
                    }
                }
            })
        },
        getCode() {
            //获取验证码
            if (/^1[3456789]\d{9}$/.test(this.registerForm.phone)) {
                this.codeTiming = 299
                let timer = setInterval(() => {
                    if (this.codeTiming > 0) {
                        -- this.codeTiming
                    }else {
                        clearTimeout(timer)
                        timer = null
                    }
                }, 1000)
                this.http({
                    url: `user/SendMessage?phone=${this.registerForm.phone}`,
                    method: 'get',
                }, res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
                    }
                })
            }else {
                this.$message.info('请输入正确的手机号')
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
    margin-bottom: 20px;
    .sett-agreement{
        color: #409eff;
        cursor: pointer;
        &:hover{
            color: #3c8fe3;
        }
    }
}
</style>