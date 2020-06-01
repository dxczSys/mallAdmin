<template>
    <div class="update-person-info-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">个人资料</div>
        </div>
        <div class="avatar-box">
            <div class="avatar-left">
                <el-card>
                    <upload-file class="avatar-left-img" :size="2" limitTip="" :filelist="avatar"></upload-file>
                </el-card>
            </div>
            <el-card class="deptment-right">
                <div>
                    <span>身份:</span>
                    <span v-for="(item, index) in roleLists" :key="index">
                        <span>{{item.roleName}}</span>
                        <span v-if="index < roleLists.length - 1">、</span>
                    </span>
                </div>
                <div style="padding-top: 30px;">
                    <span>昵称:</span>
                    <span v-if="!isEdit">{{nikeName}}</span>
                    <span v-if="!nikeName && !isEdit" style="color: #999; font-size: 13px;">您尚未设置昵称</span>
                    <el-input v-if="isEdit" v-model="nikeName" placeholder="请输入昵称" maxlength="10" style="width: 260px;"></el-input>
                    <span class="el-icon-edit-outline" v-if="!isEdit" @click="isEdit = !isEdit"></span>
                </div>
                <div v-if="isEdit" style="color: #999; font-size: 12px;padding-left: 46px; padding-top: 5px;">*昵称最多10个字</div> 
            </el-card>
        </div>
        <div class="base-mess-box">
            <div style="display: flex;align-items: center; margin-bottom: 20px;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">绑定设置</div>
            </div>
            <div class="row-box">
                <label class="row-label">绑定手机</label>
                <div>{{hiddenPhone}}</div>
                <el-button type="text" @click="dialogVisible = true">修改手机</el-button>
            </div>
            <div class="row-box">
                <label class="row-label">绑定微信</label>
                <div v-if="!chat && !isEditChat" style="color: #999; font-size: 13px;">未绑定</div>
                <div v-if="chat && !isEditChat">{{chat}}</div>
                <el-input v-if="isEditChat" v-model="chat" placeholder="微信号" style="width: 260px;"></el-input>
                <el-button v-if="!isEditChat" type="text" @click="isEditChat = !isEditChat">修改绑定</el-button>
                <div style="color: #E6A23C; font-size: 12px; margin-left: 10px;">提醒:请务必绑定微信号，而不是手机号，否则无法正常划账</div>
            </div>
            <div style="display: flex;align-items: center; margin-bottom: 20px;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">基础信息</div>
            </div>
            <div class="row-box">
                <label class="row-label">真实姓名</label>
                <span v-if="!isEditName">{{realName}}</span>
                <span v-if="!realName && !isEditName" style="color: #999; font-size: 13px;">您尚未设置真实姓名</span>
                <el-input v-if="isEditName" v-model="realName" placeholder="真实姓名" maxlength="10" style="width: 360px;"></el-input>
                <span class="el-icon-edit-outline" v-if="!isEditName" @click="isEditName = !isEditName"></span>
            </div>
            <div class="row-box">
                <label class="row-label">邮箱</label>
                <span v-if="!isEditEmail">{{email}}</span>
                <span v-if="!isEditEmail && !email" style="color: #999; font-size: 13px;">您尚未设置邮箱</span>
                <el-input v-if="isEditEmail" v-model="email" placeholder="邮箱" style="width: 360px;"></el-input>
                <span class="el-icon-edit-outline" v-if="!isEditEmail" @click="isEditEmail = !isEditEmail"></span>
            </div>
            <div class="row-box">
                <label class="row-label">性别</label>
                <el-radio v-model="sex" label="1">男</el-radio>
                <el-radio v-model="sex" label="2">女</el-radio>
            </div>
            <div style="padding-left: 92px;">
                <el-button @click="handleSaveInfo" type="primary">保存</el-button>
            </div>
        </div>

        <el-dialog title="手机绑定" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="400px">
            <div v-if="!nextStep">
                <div style="font-size: 13px;">您正在更改您之前绑定的手机</div>
                <div style="font-size: 13px;">易码商城将给您{{hiddenPhone}}的手机发送验证码，请您填写，5分钟内有效</div>
                <div style="margin-top: 10px;">
                    <label style="margin-right: 10px;">验证码</label>
                    <el-input v-model="code" placeholder="验证码" style="width: 150px;"></el-input>
                    <el-button type="primary" @click="getCode(0)" v-if="codeTiming == 0" size="small">获取验证码</el-button>
                    <span style="color: #999; margin-left: 5px;" v-else>重新发送({{codeTiming}}s)</span>
                </div>
                <div style="padding-left: 55px; margin-top: 20px;">
                    <el-button :disabled="code.length != 6" type="primary" size="small" @click="handleNext">下一步</el-button>
                </div>
            </div>
            <div v-if="nextStep">
                <div style="font-size: 13px; margin-bottom: 10px;">请绑定新手机号</div>
                <div style="margin-bottom: 20px;">
                    <label style="margin-right: 10px;">手机号</label>
                    <el-input v-model="newPhone" placeholder="手机号" style="width: 150px;" :disabled="codeTiming > 0"></el-input>
                    <el-button type="primary" @click="getCode(1)" v-if="codeTiming == 0" size="small">获取验证码</el-button>
                    <span style="color: #999; margin-left: 5px;" v-else>重新发送({{codeTiming}}s)</span>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="margin-right: 10px;">验证码</label>
                    <el-input v-model="newCode" placeholder="验证码" style="width: 150px;"></el-input>
                </div>
                <div style="padding-left: 55px;">
                    <el-button :disabled="newCode.length != 6" type="primary" @click="updatePhone" size="small">修改绑定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import uploadFile from '@/components/upload-file'
import { clearLoginInfo } from '@/utils'
export default {
    components: { uploadFile },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            isEdit: false,
            isEditChat: false,
            isEditName: false,
            isEditEmail: false,
            dialogVisible: false,
            nextStep: false,
            roleLists: '',
            nikeName: '',
            avatar: [],
            phone: '',
            chat: '',
            email: '',
            realName: '',
            sex: '',
            code: '',
            newPhone: '',
            newCode: '',
            codeTiming: 0,
        }
    },
    computed: {
        hiddenPhone() {
            return this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        }
    },
    methods: {
        handleNext() {
            if (this.code.length == 6) {
                this.http({
                    url: 'merchant/checkSendMessageWithUpdTel',
                    method: 'get',
                    data: {
                        userTel: this.phone,
                        newCode: this.code
                    }
                }, res => {
                    if (res.data.code == 200) {
                        this.nextStep = true
                        this.codeTiming = 0
                    }else {
                        this.$message.info(res.data.msg)
                    }
                })
            }else {
                this.$message.info('请输入正确验证码')
            }
        },
        getCode(num) {
            let phone = ''
            if (num == 1 && !/^1[3456789]\d{9}$/.test(this.newPhone)) {
                this.$message.info('请输入正确的手机号')
                return false
            }
            if (num == 0) {
                phone = this.phone
            }else {
                phone = this.newPhone
            }
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
                url: 'merchant/SendMessageWithUpdTel',
                method: 'get',
                data: {
                    phone: phone
                }
            }, res => {
                if (res.data.code == 200) {
                    this.$message.success('验证码已发送')
                }
            })
            
        },
        getPersonInfo() {
            this.http({
                url: 'merchant/getUserIByUserId',
                method: 'get',
            }, res => {
                if (res.data.code == 200) {
                    let user = res.data.data.user
                    this.roleLists = user.roleLists
                    if (user.userPic) {
                        this.avatar = [{ url: this.fileUrl + user.userPic }]
                    }else {
                        this.avatar = [{ url: require('@/assets/img/avatar_default.png')}]
                    }
                    this.nikeName = user.userName
                    this.phone = user.userTel
                    this.chat = user.uerVx
                    this.realName = user.realUserName || ''
                    this.email = user.userEmail || ''
                    this.sex = user.userSex || ''
                }
            })
        },
        checkEmail() {
            let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
            if (this.email && !reg.test(this.email)) {
                this.$message.info('邮箱格式不正确!')
                return false
            }
            return true
        },
        handleSaveInfo() {
            if (this.avatar[0].raw) {
                this.$upload({
                    data: [this.avatar[0].raw]
                }, imgres => {
                    if (imgres.data.code == 200) {
                        if (this.checkEmail()) {
                            this.http({
                                url: 'merchant/userUpdateById',
                                method: 'post',
                                data: {
                                    id: this.$cookie.get('userId'),
                                    userName: this.nikeName,
                                    userPic: imgres.data.data,
                                    uerVx: this.chat,
                                    realUserName: this.realName,
                                    userEmail: this.email,
                                    userSex: this.sex
                                }
                            }, res => {
                                if (res.data.code == 200) {
                                    this.isEdit && (this.$cookie.set('userName', this.nikeName), this.isEdit = false)
                                    this.isEditChat && (this.isEditChat = false)
                                    this.isEditName && (this.$cookie.set('realUserName', this.realName), this.isEditName = false)
                                    this.isEditEmail && (this.isEditEmail = false)
                                    this.$cookie.set('url', imgres.data.data)
                                    this.$message.success('更新成功！')
                                }
                            })
                        }
                    }
                })
            }else {
                if (this.checkEmail()) {
                    this.http({
                        url: 'merchant/userUpdateById',
                        method: 'post',
                        data: {
                            id: this.$cookie.get('userId'),
                            userName: this.nikeName,
                            realUserName: this.realName,
                            userEmail: this.email,
                            userSex: this.sex
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            this.isEdit && (this.$cookie.set('userName', this.nikeName), this.isEdit = false)
                            this.isEditChat && (this.isEditChat = false)
                            this.isEditName && (this.$cookie.set('realUserName', this.realName), this.isEditName = false)
                            this.isEditEmail && (this.isEditEmail = false)
                            this.$message.success('更新成功！')
                        }
                    })
                }
            }
        },
        updatePhone() {
            this.http({
                url: 'merchant/userUpdateById',
                method: 'post',
                data: {
                    id: this.$cookie.get('userId'),
                    userTel: this.newPhone,
                    code: this.newCode
                }
            }, res => {
                if (res.data.code == 200) {
                    this.dialogVisible = false
                    this.$message.success('已成功换绑,请重新登录')
                    clearLoginInfo()
                    this.$router.push({ name: 'login' })
                }else {
                    this.$message.info(res.data.msg)
                }
                this.dialogVisible = false
                this.code = ''
                this.newCode = ''
                this.newPhone = ''
                this.nextStep = false
                this.codeTiming = 0
            })
        }
    },
    mounted() {
        this.getPersonInfo()
    }
}
</script>

<style lang="scss" scoped>
.avatar-box{
    display: flex;
    margin-top: 20px;
}
.avatar-left-img{
    /deep/ .img-item{
        width: 100px;
        height: 100px;
        border: none;
        img{
            border-radius: 50%;
            object-fit: fill;
        }
    }
    /deep/ .avatar-uploader-icon{
        width: 100px !important;
        height: 100px !important;
        line-height: 100px !important;
    }
    /deep/ .delete-layer{
        width: 100px !important;
        height: 100px !important;
        line-height: 100px !important;
    }
}
.deptment-right{
    flex-grow: 1;
    margin-left: 10px;
}
.base-mess-box{
    margin-top: 20px;
    .row-box{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        /deep/ .el-button{
            padding: 0;
            margin-left: 20px;
        }
        .row-label{
            width: 6em;
            text-align: right;
            margin-right: 10px;
        }
    }
}
.el-icon-edit-outline{
    color: #17B3A3;
    cursor: pointer; 
    font-size: 18px;
    padding-left: 5px;
}
</style>