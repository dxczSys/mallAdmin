<template>
    <div class="login-wrapper">
        <div class="logo-title">
            <img src="~@/assets/img/logo.png">
            <div>易码商城</div>
        </div>
        <div class="login-bg">
            <div class="login-box">
                <div class="login-box-d">
                    <div class="box-title">重置密码</div>
                    <el-form ref="forgetPasswordForm" :model="forgetPasswordForm" :rules="forgetPasswordRules" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input v-model="forgetPasswordForm.phone" size="large" placeholder="手机号" prefix-icon="iconfont iconshoujihao"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="forgetPasswordForm.code" size="large" placeholder="验证码" prefix-icon="iconfont iconyanzhengma" style="width: 202px;"></el-input>
                            <el-button @click="getCode" v-if="codeTiming == 0" size="large">获取验证码</el-button>
                            <span style="color: #999;" v-else>重新发送({{codeTiming}}s)</span>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="forgetPasswordForm.password" size="large" placeholder="重置密码" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <el-form-item prop="passwordAgain" style="margin-bottom: 10px;">
                            <el-input type="password" v-model="forgetPasswordForm.passwordAgain" placeholder="确认重置密码" size="large" prefix-icon="iconfont iconmima"></el-input>
                        </el-form-item>
                        <div class="forget-register">
                            <span class="iconfont iconfanhui" tappable @click="$router.push({ name: 'login'})" style="font-size: 12px;">返回登录</span>
                        </div>
                        <el-form-item>
                            <el-button @click="resetPassword" type="primary" round style="width: 100%;">重置密码</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <div class="footer-copyright">
            <div class="copyright-box">
                <span>Copyright © 2020-2020  陕ICP备000001号-1  版本：1.0.0</span>
                <span>西安易码众城网络科技有限公司</span>
            </div>
            <div class="recommend-tips">推荐使用chrome浏览器访问</div>
        </div>

    </div>
</template>

<script>
import sha256 from 'js-sha256'
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
            codeTiming: 0,
            forgetPasswordForm: {
                phone: '',
                code: '',
                password: '',
                passwordAgain: '',
            },
            forgetPasswordRules: {
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
        resetPassword() {
            //重置密码
            this.$refs.forgetPasswordForm.validate(valid => {
                if (valid) {
                    if (this.forgetPasswordForm.password === this.forgetPasswordForm.passwordAgain) {
                        this.http({
                            url: 'merchant/userPassWord',
                            method: 'post',
                            data: {
                                userTel: this.forgetPasswordForm.phone,
                                code: this.forgetPasswordForm.code,
                                userPassWord: sha256(this.forgetPasswordForm.password)
                            }
                        }, res => {
                            if (res.data.code == 200) {
                                this.$message.success('修改成功')
                                this.$router.push({ name: 'login' })
                            }else {
                                this.$message.info(res.data.msg)
                            }
                        })
                    }else {
                        this.$message.info('俩次密码输入不一致')
                    }
                }
            })
        },
        getCode() {
            //获取验证码
            if (/^1[3456789]\d{9}$/.test(this.forgetPasswordForm.phone)) {
                this.codeTiming = 59
                let timer = setInterval(() => {
                    if (this.codeTiming > 0) {
                        -- this.codeTiming
                    }else {
                        clearTimeout(timer)
                        timer = null
                    }
                }, 1000)
                this.http({
                    url: 'merchant/sendPasswordMessage',
                    method: 'get',
                    data: {
                        phone: this.forgetPasswordForm.phone
                    }
                }, res => {
                    if (res.data.code == 200) {
                        this.$message.success('验证码已发送,请注意查收!')
                    }
                })
            }else {
                this.$message.info('请输入正确的手机号!')
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