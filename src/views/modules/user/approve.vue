<template>
    <div class="approve-wrapper">
        <div class="modules-title">
            <div class="modules-title-bar"></div>
            <div class="modules-title-content">商铺认证</div>
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
                <div class="moudules-box">
                    <div class="modules-title">
                        <div class="modules-title-bar"></div>
                        <div class="modules-title-content">商户申请信息</div>
                    </div>
                    <el-form-item label="主体类型" prop="organization_type" required>
                        <el-radio-group v-model="infoForm.organization_type">
                            <el-radio :label="4">个体工商户</el-radio>
                            <el-radio :label="2">企业</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="营业执照" prop="business_license_copy" required>
                                <upload-file :disabled="isApproval" :filelist="infoForm.business_license_copy" limitTip=""></upload-file>
                                <div class="tip-box">
                                    <div>图片要求:</div>
                                    <div>1.请上传证件的彩色扫描件或彩色数码拍摄件，黑白复印件需加盖公章（公章信息需完整）</div>
                                    <div>2.不得添加无关水印（非微信支付商户申请用途的其他水印）</div>
                                    <div>3.需提供证件的正面拍摄件，完整、照面信息清晰可见。信息不清晰、扭曲、压缩变形、反光、不完整均不接受。</div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件注册号" prop="business_license_number" required>
                               <el-input v-model="infoForm.business_license_number" maxlength="18" placeholder="证件注册号"></el-input>
                               <div class="tip-box">请填写营业执照上的注册号/统一社会信用代码，须为15位数字或 18位数字|大写字母</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="企业名称" prop="merchant_name" required>
                                <el-input v-model="infoForm.merchant_name" maxlength="110" placeholder="企业名称"></el-input>
                                <div class="tip-box">
                                    <div>1.请填写营业执照/登记证书的企业名称，2~110个字符，支持括号</div>
                                    <div>2.个体工商户，若营业执照上商户名称为空或为“无”，请填写"个体户+经营者姓名"，如“个体户张三”</div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经营者/法人" prop="legal_person" required>
                               <el-input v-model="infoForm.legal_person" placeholder="经营者/法定代表人姓名"></el-input>
                               <div class="tip-box">必须是证件的经营者/法定代表人姓名</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="身份证正面" prop="id_card_copy" required>
                                <upload-file :disabled="isApproval" :filelist="infoForm.id_card_copy" limitTip=""></upload-file>
                                <div class="tip-box">请上传经营者/法定代表人的身份证人像面照片</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证反面" prop="id_card_national" required>
                                <upload-file :disabled="isApproval" :filelist="infoForm.id_card_national" limitTip=""></upload-file>
                                <div class="tip-box">请上传经营者/法定代表人的身份证国徽面照片</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="身份证姓名" prop="id_card_name" required>
                                <el-input v-model="infoForm.id_card_name" placeholder="身份证姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证号码" prop="id_card_number" required>
                                <el-input v-model="infoForm.id_card_number" placeholder="身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="身份证有效期限" prop="id_card_valid_time" required>
                                <el-date-picker v-model="infoForm.id_card_valid_time" type="date" placeholder="身份证有效期限"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="moudules-box">
                    <div class="modules-title">
                        <div class="modules-title-bar"></div>
                        <div class="modules-title-content">结算银行账户信息</div>
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="账户类型" prop="bank_account_type" required>
                                <el-select v-model="infoForm.bank_account_type" placeholder="账户类型">
                                    <el-option v-for="(item, index) in bank_account_type_option" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开户银行" prop="account_bank" required>
                                <el-select v-model="infoForm.account_bank" placeholder="开户银行">
                                    <el-option v-for="(item, index) in bank" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="开户名称" prop="account_name" required>
                                <el-input v-model="infoForm.account_name" placeholder="开户名称"></el-input>
                                <div class="tip-box">
                                    <div>1.选择经营者个人银行卡时，开户名称必须与身份证姓名一致</div>
                                    <div>2.选择对公账户时，开户名称必须与营业执照上的“商户名称”一致</div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开户银行地区" prop="bank_address_code" required>
                                <el-cascader :value="infoForm.bank_address_code" :props="region_props"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="开户银行支行" prop="bank_name" required>
                                <el-select v-model="infoForm.bank_name" placeholder="开户银行支行">
                                    <el-option v-for="(item, index) in bank" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="银行帐号" prop="account_number" required>
                                <el-input v-model="infoForm.account_number" placeholder="银行帐号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="moudules-box">
                    <div class="modules-title">
                        <div class="modules-title-bar"></div>
                        <div class="modules-title-content">店铺信息</div>
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="店铺名称" prop="store_name" required>
                                <el-input v-model="infoForm.store_name" placeholder="店铺名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="店铺简称" prop="merchant_shortname" required>
                                <el-input v-model="infoForm.merchant_shortname" maxlength="4" placeholder="店铺简称"></el-input>
                                <div class="tip-box">最多4个字</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="超级管理员姓名" prop="contact_name" required>
                                <el-input v-model="infoForm.contact_name" placeholder="超级管理员姓名"></el-input>
                                <div class="tip-box">该姓名需与法人身份证姓名一致</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="超级管理员身份证号码" prop="contact_id_card_number" required>
                                <el-input v-model="infoForm.contact_id_card_number" placeholder="超级管理员身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="超级管理员手机" prop="mobile_phone" required>
                                <el-input type="number" v-model="infoForm.mobile_phone" placeholder="超级管理员手机"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="商铺简介" prop="introduction" required>
                        <el-input type="textarea" :disabled="isApproval" v-model="infoForm.introduction" rows="5" placeholder="商铺简介" style="width: 90%;"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import uploadFile from '@/components/upload-file'
import imageCropping from '@/components/image-cropping'
import bank from '@/enumerate/bank'
import { bank_account_type_option } from '@/enumerate/approval'
export default {
    components: { uploadFile, imageCropping },
    data() {
        let self = this
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            bank_account_type_option,
            bank,
            isApproval: false,
            shopApprovalStatus: 0,
            refuseInfo: '',
            shopId: '',
            infoForm: {
                organization_type: 4,
                business_license_copy: [],
                business_license_number: '',
                merchant_name: '',
                legal_person: '',
                id_card_copy: [],
                id_card_national: [],
                id_card_name: '',
                id_card_number: '',
                id_card_valid_time: '',
                bank_account_type: '',
                account_bank: '',
                account_name: '',
                bank_address_code: [],
                bank_name: '',
                account_number: '',

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
            region_props: {
                lazy: true,
                label: 'name',
                value: 'id',
                lazyLoad(node, resolve) {
                    console.log(node)
                    if (node.level == 0) {
                        self.http({
                            url: 'merchant/base/getArea?parentId=',
                            method: 'get'
                        }, res => {
                            if (res.data.code == 200) {
                                resolve(res.data.data)
                            }
                        })
                    } else {
                        self.http({
                            url: `merchant/base/getArea?parentId=${node.value}`,
                            method: 'get'
                        }, res => {
                            if (res.data.code == 200) {
                                debugger
                                if (node.level == 3) {
                                    
                                    resolve(res.data.data.map(item => {
                                        item.leaf = false
                                    }))
                                } else {
                                    resolve(res.data.data)
                                }
                            }
                        })
                    }
                    
                }
            }
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
.tip-box{
    padding-top: 6px;
    color: #E6A23C;
    font-size: 12px;
    line-height: 20px;
}
.modules-title{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &-bar{
        width: 5px;
        height: 15px;
        background-color: #409eff;
        border-radius: 1px;
        margin-right: 3px;
    }
    &-content{
        font-weight: 600;
    }
}
</style>