<template>
    <div class="update-password-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">修改密码</div>
        </div>
        <el-form ref="updatePasswordForm" :model="updatePasswordForm" label-width="0px" style="margin-top: 20px; margin-left: 20px;">
            <el-form-item required>
                <el-input v-model="updatePasswordForm.phone" placeholder="手机号" size="large" prefix-icon="iconfont iconshoujihao" style="width: 360px"></el-input>
            </el-form-item>
            <el-form-item required>
                <el-input v-model="updatePasswordForm.code" placeholder="验证码" size="large" prefix-icon="iconfont iconyanzhengma" style="width: 244px"></el-input>
                <el-button @click="getCode" v-if="codeTiming == 0" size="large">获取验证码</el-button>
                <span style="color: #999; margin-left: 5px;" v-else>重新发送({{codeTiming}}s)</span>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="updatePasswordForm.password" size="large" placeholder="新密码" prefix-icon="iconfont iconmima" style="width: 360px"></el-input>
            </el-form-item>
            <el-form-item prop="againPassword">
                <el-input type="text" v-model="updatePasswordForm.againPassword" size="large" placeholder="确认密码" prefix-icon="iconfont iconmima" style="width: 360px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updatePasswordForm: {
                phone: '',
                code: '',
                password: '',
                againPassword: '',
            },
            codeTiming: 0,
        }
    },
    methods: {
        getCode() {
            //获取验证码
            this.codeTiming = 59
            let timer = setInterval(() => {
                if (this.codeTiming > 0) {
                    -- this.codeTiming
                }else {
                    clearTimeout(timer)
                    timer = null
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>