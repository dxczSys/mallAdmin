<template>
    <div class="approve-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">商铺认证</div>
        </div>
        <div class="step-box">
            <el-steps :active="shopApprovalStatus" process-status="success" finish-status="wait" align-center>
                <el-step title="申请" description="商户自主填写相关资料"></el-step>
                <el-step title="审核中" description="发送商城管理员审核"></el-step>
                <el-step title="审核通过" v-if="shopApprovalStatus < 3" description="商铺认证审核已通过"></el-step>
                <el-step title="拒绝" status="error" v-else :description="refuseInfo"></el-step>
            </el-steps>
        </div>
        <div class="base-mess-wrapper">
            <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px" class="base-form">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">基本信息</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称" prop="shopName" required>
                            <el-input v-model="infoForm.shopName" :disabled="isApproval" maxlength="15" show-word-limit placeholder="商铺名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="名称缩写">
                            <el-input v-model="infoForm.abbreviation" :disabled="isApproval" maxlength="4" show-word-limit placeholder="名称缩写"></el-input>
                            <div style="color: #E6A23C; font-size: 12px;">提醒:小程序最多显示4个字，请设置缩写</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所属商场" prop="shopCityName" required>
                            <el-select v-model="infoForm.shopCityName" filterable remote :remote-method="remoteMethod" :disabled="isApproval" placeholder="所属商场">
                                <el-option v-for="(item, index) in shopCityList" :key="index" :label="item.shopName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在楼层" prop="floor" required>
                            <el-select v-model="infoForm.floor" :disabled="isApproval" placeholder="所在楼层">
                                <el-option v-for="(item, index) in floorList" :key="index" :label="item.shopName + '楼'" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所属行业" prop="businessType">
                            <el-select v-model="infoForm.businessType" :disabled="isApproval" placeholder="所属行业">
                                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.categoryName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone" required>
                            <el-input v-model="infoForm.phone" :disabled="isApproval" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="微信绑定" prop="chatCode" required>
                            <span v-if="infoForm.chatCode">已绑定</span>
                            <img v-if="!infoForm.chatCode" class="bind-weixin" @click="bindWechat" src="~@/assets/img/weixin.png" alt="绑定微信" >
                            <div style="color: #E6A23C; font-size: 12px;">提醒:请授权绑定微信，否则无法正常划账</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信号" prop="chat" required>
                            <el-input v-model="infoForm.chat" :disabled="isApproval" placeholder="微信"></el-input>
                            <div style="color: #E6A23C; font-size: 12px;">提醒:请填写正确微信号，而不是手机号，否则无法正常划账</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div v-if="infoForm.chatCode">
                    <div style="display: flex;align-items: center; margin-bottom: 20px;">
                        <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                        <div style="font-weight: 600;">营业信息</div>
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="店铺标志" prop="shopLogo" required>
                                <image-cropping :filelist="infoForm.shopLogo"></image-cropping>
                                <div style="color: #E6A23C; font-size: 12px;">提醒:LOGO最佳比例1:1(最佳是圆形)</div>
                                <div v-if="isApproval && infoForm.shopLogo[0] && infoForm.shopLogo[0].raw">
                                    <el-button @click="updateLogo" size="mini" type="primary">保存修改</el-button>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="营业执照" prop="shopPermit" required>
                                <upload-file :disabled="isApproval" :size="5" limitTip="图片大小不能超过5M" :filelist="infoForm.shopPermit"></upload-file>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="法人/经营者" prop="shopOwner" required>
                                <el-input v-model="infoForm.shopOwner" :disabled="isApproval" placeholder="法人/经营者"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证号" prop="cardNum" required>
                                <el-input v-model="infoForm.cardNum" :disabled="isApproval" placeholder="身份证号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="身份证正面" prop="cardUrl" required>
                                <upload-file :size="3" :disabled="isApproval" limitTip="图片大小不能超过3M" :filelist="infoForm.cardUrl"></upload-file>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证反面" prop="cardOverUrl" required>
                                <upload-file :size="3" :disabled="isApproval" limitTip="图片大小不能超过3M" :filelist="infoForm.cardOverUrl"></upload-file>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="商铺简介" prop="introduction" required>
                        <el-input type="textarea" :disabled="isApproval" v-model="infoForm.introduction" rows="5" placeholder="商铺简介" style="width: 90%;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="!isApproval" @click="sendCheck" type="primary">发送审核</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import uploadFile from '@/components/upload-file'
import imageCropping from '@/components/image-cropping'
export default {
    components: { uploadFile, imageCropping },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            isApproval: false,
            shopApprovalStatus: 0,
            refuseInfo: '',
            shopId: '',
            infoForm: {
                shopName: '',
                abbreviation: '',
                shopCityName: '',
                floor: '',
                businessType: '',
                phone: '',
                chat: '',
                chatCode: '',
                shopLogo: [],
                shopPermit: [],
                shopOwner: '',
                cardNum: '',
                cardUrl: [],
                cardOverUrl: [],
                introduction: '',
            },
            rules: {
                shopName: [ { required: true, message: '商铺名称不能为空', trigger: 'blur'} ],
                shopCityName: [ { required: true, message: '所属商场不能为空', trigger: 'blur'} ],
                floor: [ { required: true, message: '所在楼层不能为空', trigger: 'blur'} ],
                businessType: [ { required: true, message: '请选择所属行业', trigger: 'change'} ],
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur'},
                    { required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
                ],
                chat: [ { required: true, message: '请输入微信号', trigger: 'blur'} ],
                chatCode: [ { required: true, message: '请绑定微信', trigger: 'change'} ],
                shopLogo: [ { required: true, message: '请上传店铺标志', trigger: 'blur'} ],
                shopPermit: [ { required: true, message: '请上传营业执照', trigger: 'blur'} ],
                shopOwner: [ { required: true, message: '法人/经营者不能为空', trigger: 'blur'} ],
                cardNum: [ 
                    { required: true, message: '身份证号不能为空', trigger: 'blur'},
                    { min: 15, max: 18, message: '请输入正确的身份证号码', trigger: 'blur' },
                    { required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码', trigger: 'blur'}
                ],
                cardUrl: [ { required: true, message: '请上传身份证正面', trigger: 'blur'} ],
                cardOverUrl: [ { required: true, message: '请上传身份证反面', trigger: 'blur'} ],
                introduction: [ { required: true, message: '商铺简介不能为空', trigger: 'blur'} ],
            },
            shopCityList: [],
            shopCityListTemp: [],
            floorList: [],
            businessTypeList: [],
        }
    },
    watch: {
        'infoForm.shopCityName'(n) {
            if (n) {
                this.getFloorList(n)
            }
        }
    },
    methods: {
        getMallList() {
            this.http({
                url: 'merchant/shopMall/tShopMallSelByAllAuthorization',
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.shopCityList = res.data.data
                    this.shopCityListTemp = JSON.parse(JSON.stringify(res.data.data))
                }
            })
        },
        getFloorList(id) {
            this.http({
                url: `merchant/shopMall/tShopMallFloorSelByShopId?shopId=${id}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.floorList = res.data.data
                }
            })
        },
        getBussinessList() {
            this.http({
                url: 'merchant/tGoodCategory/selTGoodCategoryByGrade?grade=1',
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.businessTypeList = res.data.data
                }
            })
        },
        sendCheck() {
            this.$refs.infoForm.validate(valid => {
                let logo = new Promise((resolve, reject) => {
                    this.$upload({
                        data: [this.infoForm.shopLogo[0].raw]
                    }, res => {
                        if (res.data.code == 200) {
                            resolve({name: 'shopLogo', url: res.data.data})
                        }
                    })
                })
                let permit = new Promise((resolve, reject) => {
                    this.$upload({
                        data: [this.infoForm.shopPermit[0].raw]
                    }, res => {
                        if (res.data.code == 200) {
                            resolve({name: 'shopPermit', url: res.data.data})
                        }
                    })
                })
                let card = new Promise((resolve, reject) => {
                    this.$upload({
                        data: [this.infoForm.cardUrl[0].raw]
                    }, res => {
                        if (res.data.code == 200) {
                            resolve({name: 'cardUrl', url: res.data.data})
                        }
                    })
                })
                let cardover = new Promise((resolve, reject) => {
                    this.$upload({
                        data: [this.infoForm.cardOverUrl[0].raw]
                    }, res => {
                        if (res.data.code == 200) {
                            resolve({name: 'cardOverUrl', url: res.data.data})
                        }
                    })
                })
                Promise.all([logo, permit, card, cardover]).then(res => {
                    let _urllogo = '', _urlpermit = '', _urlcard = '', _urlcardover = ''
                    res.forEach(urlItem => {
                        if (urlItem.name == 'shopLogo') {
                            _urllogo = urlItem.url
                        }
                        if (urlItem.name == 'shopPermit') {
                            _urlpermit = urlItem.url
                        }
                        if (urlItem.name == 'cardUrl') {
                            _urlcard = urlItem.url
                        }
                        if (urlItem.name == 'cardOverUrl') {
                            _urlcardover = urlItem.url
                        }
                    })
                    this.http({
                        url: 'merchant/tShop/tShopAuthentication',
                        method: 'post',
                        data: {
                            shopName: this.infoForm.shopName,
                            abbreviation: this.infoForm.abbreviation,
                            shopToPart: this.infoForm.shopCityName,
                            shopToFloor: this.infoForm.floor,
                            shopToIndustry: this.infoForm.businessType,
                            shopTel: this.infoForm.phone,
                            shopPersonVx: this.infoForm.chat,
                            code: this.infoForm.chatCode,
                            shopSign: _urllogo,
                            shopBusinessLicense: _urlpermit,
                            idCardPicPositive: _urlcard,
                            idCardPicSide: _urlcardover,
                            shopLegalPerson: this.infoForm.shopOwner,
                            shopLegalPersonId: this.infoForm.cardNum,
                            shopInfo: this.infoForm.introduction
                        }
                    }, approvalRes => {
                        if (approvalRes.data.code == 200) {
                            this.$message.success('申请已发送，等待管理员审核中...')
                            localStorage.removeItem('approvalParams')
                            this.getApprovalData()
                        }else {
                            this.$message.info('网络异常，请刷新重试')
                        }
                    })
                })
            })
        },
        getApprovalData() {
            this.http({
                url: 'merchant/tShop/selTShopByLoginUserId',
                method: 'get',
            }, res => {
                if (res.data.code == 200) {
                    let obj = res.data.data
                    this.shopId = obj.id
                    this.shopApprovalStatus = parseInt(obj.shopApprovalStatus)
                    this.refuseInfo = obj.shopApprovalRefuseInfo || '认证被拒绝，包含违规信息'
                    this.isApproval = true
                    this.infoForm.shopName = obj.shopName
                    this.infoForm.abbreviation = obj.abbreviation
                    this.infoForm.shopCityName = obj.shopToPart
                    this.infoForm.floor = obj.shopToFloor
                    this.infoForm.businessType = obj.shopToIndustry
                    this.infoForm.phone = obj.shopTel
                    this.infoForm.chat = obj.shopPersonVx
                    this.infoForm.shopLogo = [{ url: this.fileUrl + obj.shopSign}]
                    this.infoForm.shopPermit = [{ url: this.fileUrl + obj.shopBusinessLicense }]
                    this.infoForm.cardUrl = [{ url: this.fileUrl + obj.idCardPicPositive }]
                    this.infoForm.cardOverUrl = [{ url: this.fileUrl + obj.idCardPicSide }]
                    this.infoForm.shopOwner = obj.shopLegalPerson
                    this.infoForm.cardNum = obj.shopLegalPersonId
                    this.infoForm.introduction = obj.shopInfo
                }else {
                    this.isApproval = false
                }
            })
        },
        updateLogo() {
            this.$upload({
                data: [this.infoForm.shopLogo[0].raw]
            }, res => {
                if (res.data.code == 200) {
                    this.http({
                        url: 'merchant/tShop/updateTShopByShopId',
                        method: 'post',
                        data: {
                            id: this.shopId,
                            shopSign: res.data.data,
                        }
                    }, resovel => {
                        if (resovel.data.code == 200) {
                            this.$message.success('修改成功!')
                            this.getApprovalData()
                        }
                    })
                }
            })
            
        },
        remoteMethod(query) {
            if (query) {
                this.http({
                    url: `merchant/shopMall/selShopMallLikeName?shopMallName=${query}`,
                    method: 'get',
                }, res => {
                    if (res.data.code == 200) {
                        this.shopCityList = res.data.data
                    }
                })
            }else {
                this.shopCityList = JSON.parse(JSON.stringify(this.shopCityListTemp))
            }
        },
        bindWechat() {
            let approvalParams = {
                shopName: this.infoForm.shopName,
                abbreviation: this.infoForm.abbreviation,
                shopCityName: this.infoForm.shopCityName,
                floor: this.infoForm.floor,
                businessType: this.infoForm.businessType,
                phone: this.infoForm.phone,
                chat: this.infoForm.chat,
            }
            localStorage.setItem('approvalParams', JSON.stringify(approvalParams))
            window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wx492cea4884805e00&redirect_uri=https%3a%2f%2fs.yimazhongcheng.com%2f%23%2fuser-approve&response_type=code&scope=snsapi_login&state=auth2#wechat_redirect', '_self')
        }
    },
    async mounted() {
        await this.getMallList()
        await this.getBussinessList()
        await this.getApprovalData()
        if (this.$route.query.state == 'auth2') {
            let params = JSON.parse(localStorage.getItem('approvalParams'))
            this.infoForm.chatCode = this.$route.query.code
            this.infoForm.shopName = params.shopName
            this.infoForm.abbreviation = params.abbreviation
            this.infoForm.shopCityName = params.shopCityName
            this.infoForm.floor = params.floor
            this.infoForm.businessType = params.businessType
            this.infoForm.phone = params.phone
            this.infoForm.chat = params.chat
        }
        
    }
    
}
</script>

<style lang="scss" scoped>
.step-box{
    padding: 10px 0;
    background-color: #fff7eb;
    border: 1px solid #F58B0F;
    border-radius: 4px;
}
.base-mess-wrapper{
    padding: 20px;
    .base-form{
        padding-right: 20px;
        /deep/ .el-form-item__content .el-select{
            width: 360px;
        }
        /deep/ .el-form-item__content .el-input{
            width: 360px;
        }
        /deep/ .el-form-item__content .el-textarea{
            width: 360px;
        }
    }
}
.bind-weixin{
    width: 30px;
    cursor: pointer;
}
</style>