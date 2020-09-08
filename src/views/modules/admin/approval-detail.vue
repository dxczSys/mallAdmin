<template>
    <div class="approval-detail-wrapper">
        <el-form v-if="type=='1'" :model="infoForm" label-width="120px" class="base-form">
            <div class="moudules-box">
                <div class="modules-title">
                    <div class="modules-title-bar"></div>
                    <div class="modules-title-content">商户申请信息</div>
                </div>
                <el-form-item label="主体类型" prop="organization_type" required>
                    <el-radio-group v-model="infoForm.organization_type" :disabled="isApproval">
                        <el-radio :label="4">个体工商户</el-radio>
                        <el-radio :label="2">企业</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="营业执照" prop="business_license_copy" required>
                            <upload-img v-model="infoForm.business_license_copy" url-type="1" :disabled="isApproval"></upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件注册号" prop="business_license_number" required>
                            <el-input v-model="infoForm.business_license_number" maxlength="18" :disabled="isApproval" placeholder="证件注册号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="merchant_name" required>
                            <el-input v-model="infoForm.merchant_name" maxlength="110" :disabled="isApproval" placeholder="企业名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经营者/法人" prop="legal_person" required>
                            <el-input v-model="infoForm.legal_person" :disabled="isApproval" placeholder="经营者/法定代表人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="身份证正面" prop="id_card_copy" required>
                            <upload-img v-model="infoForm.id_card_copy" url-type="1" :disabled="isApproval"></upload-img>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证反面" prop="id_card_national" required>
                            <upload-img v-model="infoForm.id_card_national" url-type="1" :disabled="isApproval"></upload-img>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="身份证姓名" prop="id_card_name" required>
                            <el-input v-model="infoForm.id_card_name" :disabled="isApproval" placeholder="身份证姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号码" prop="id_card_number" required>
                            <el-input v-model="infoForm.id_card_number" :disabled="isApproval" placeholder="身份证号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="身份证有效期限" prop="id_card_valid_time" required>
                            <el-date-picker v-model="infoForm.id_card_valid_time" type="date" :disabled="isApproval" value-format="yyyy-MM-dd" placeholder="身份证有效期限"></el-date-picker>
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
                            <el-select v-model="infoForm.bank_account_type" :disabled="isApproval" placeholder="账户类型">
                                <el-option v-for="(item, index) in bank_account_type_option" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开户银行" prop="account_bank" required>
                            <el-select v-model="infoForm.account_bank" :disabled="isApproval" placeholder="开户银行">
                                <el-option v-for="(item, index) in bank" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="开户名称" prop="account_name" required>
                            <el-input v-model="infoForm.account_name" :disabled="isApproval" placeholder="开户名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开户银行地区" prop="bank_address_code" required>
                            <el-input v-model="infoForm.bank_address_code" :disabled="isApproval"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="开户银行支行" prop="bank_name" required>
                            <el-input v-model="infoForm.bank_name" :disabled="isApproval"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="银行帐号" prop="account_number" required>
                            <el-input v-model="infoForm.account_number" :disabled="isApproval" placeholder="银行帐号"></el-input>
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
                            <el-input v-model="infoForm.store_name" :disabled="isApproval" placeholder="店铺名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店铺简称" prop="merchant_shortname" required>
                            <el-input v-model="infoForm.merchant_shortname" maxlength="4" :disabled="isApproval" placeholder="店铺简称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所属商场" prop="shopCityName" required>
                            <el-select v-model="infoForm.shopCityName" :disabled="isApproval" placeholder="所属商场">
                                <el-option v-for="(item, index) in shopCityList" :key="index" :label="item.shopName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店铺标志" prop="shopLogo" required>
                            <image-cropping v-model="infoForm.shopLogo" :disabled="isApproval"></image-cropping>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层" prop="floor" required>
                            <el-select v-model="infoForm.floor" :disabled="isApproval" placeholder="所在楼层">
                                <el-option v-for="(item, index) in floorList" :key="index" :label="item.shopName + '楼'" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业" prop="businessType">
                            <el-select v-model="infoForm.businessType" :disabled="isApproval" placeholder="所属行业">
                                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.label" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="微信绑定" prop="chatCode" required>
                            <span v-if="infoForm.chatCode">已绑定</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信号" prop="chat" required>
                            <el-input v-model="infoForm.chat" :disabled="isApproval" placeholder="微信"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="超级管理员姓名" prop="contact_name" required>
                            <el-input v-model="infoForm.contact_name" :disabled="isApproval" placeholder="超级管理员姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="超级管理员身份证号码" prop="contact_id_card_number" required>
                            <el-input v-model="infoForm.contact_id_card_number" :disabled="isApproval" placeholder="超级管理员身份证号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="超级管理员手机" prop="mobile_phone" required>
                            <el-input type="number" v-model="infoForm.mobile_phone" :disabled="isApproval" placeholder="超级管理员手机"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="超级管理员邮箱" prop="contact_email" required>
                            <el-input v-model="infoForm.contact_email" :disabled="isApproval" placeholder="超级管理员邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="店铺简介" prop="introduction" required>
                    <el-input type="textarea" :disabled="isApproval" v-model="infoForm.introduction" rows="5" placeholder="店铺简介" style="width: 90%;"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-form ref="detailForm" :model="detailForm" :rules="rules" label-width="120px">
            <div v-if="type=='2'" class="ad-box">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">审批管理-广告位申请</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称:">
                            <span>{{tShop.shopName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属商场:">
                            <span>{{tShop.shopToPart}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层:">
                            <span>{{tShop.shopToFloor}}楼</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业:">
                            <span>{{tShop.shopToIndustry || '无'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人/经营者:">
                            <span>{{tShop.shopLegalPerson}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:">
                            <span>{{tShop.shopTel}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="广告位类型:">
                            <span>{{tAdvert.advertType == '1'? '置顶广告位' : '促销广告位'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请时长:">
                            <span>{{tAdvert.advertDurationDayNums}}天</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="促销商品">
                    <img class="goods-img" :src="shopMess.goodsUrl">
                    <div class="goods-mess">{{shopMess.goodsDes}}</div>
                </el-form-item> -->
                <el-form-item label="已付款:">
                    <span>{{tAdvertOrder.orderMoney}}元</span>
                </el-form-item>
            </div>
            <el-form-item v-if="type == '1'" label="审批:">
                <el-radio :disabled="shopMess.shopApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="2">通过</el-radio>
                <el-radio :disabled="shopMess.shopApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="3">拒绝</el-radio>
            </el-form-item>
            <el-form-item v-if="type == '2'" label="审批:">
                <el-radio :disabled="tAdvert.advertApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="2">通过</el-radio>
                <el-radio :disabled="tAdvert.advertApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="3">拒绝</el-radio>
            </el-form-item>
            <el-form-item v-if="type == '1' && detailForm.approvalStutas == 3" label="拒绝原因:" prop="rejectReason" required>
                <el-input :disabled="shopMess.shopApprovalStatus != '1'" type="textarea" maxlength="100" show-word-limit
                    rows="4" v-model="detailForm.rejectReason" placeholder="拒绝原因：包含非法信息，最多100字">
                </el-input>
            </el-form-item>
            <el-form-item v-if="type == '2' && detailForm.approvalStutas == 3" label="拒绝原因:" prop="rejectReason" required>
                <el-input :disabled="tAdvert.advertApprovalStatus != '1'" type="textarea" maxlength="100" show-word-limit
                    rows="4" v-model="detailForm.rejectReason" placeholder="拒绝原因：包含非法信息，最多100字">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push({ name: 'admin-approval-manage', query: { index: index }})">返回</el-button>
                <el-button v-if="shopMess.shopApprovalStatus == '1' || tAdvert.advertApprovalStatus == '1'" @click="dealApproval" type="primary">批复</el-button>
            </el-form-item>
        </el-form>     
    </div>
</template>

<script>
import imgView from '@/components/img-view'
import uploadImg from '@/components/upload-img'
import imageCropping from '@/components/image-cropping'
import bank from '@/enumerate/bank'
import { bank_account_type_option } from '@/enumerate/approval'
export default {
    components: { imgView, uploadImg, imageCropping },
    data() {
        let self = this
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            bank,
            bank_account_type_option,
            id: '',
            iidd: '',
            type: '',
            index: '',
            detailForm: {
                approvalStutas: '2',
                rejectReason: '',
            },
            shopMess: {},
            tShop: {},
            tAdvert: {},
            tAdvertOrder: {},
            rules: {
                rejectReason: [ { required: true, message: '拒绝原因不能为空', trigger: 'blur' } ]
            },
            infoForm: {
                organization_type: 4,
                business_license_copy: {},
                business_license_number: '',
                merchant_name: '',
                legal_person: '',
                id_card_copy: {},
                id_card_national: {},
                id_card_name: '',
                id_card_number: '',
                id_card_valid_time: '',
                bank_account_type: '',
                account_bank: '',
                account_name: '',
                bank_address_code: [],
                bank_name: '',
                account_number: '',
                shopCityName: '',
                floor: '',
                businessType: '',
                chat: '',
                chatCode: '',
                shopLogo: '',
                introduction: '',
                contact_email: '',
                contact_name: '',
                contact_id_card_number: '',
                mobile_phone: '',
                store_name: '',
                merchant_shortname: '',
            },
            isApproval: true,
            shopCityList: [],
            shopCityListTemp: [],
            floorList: [],
            businessTypeList: [],
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
        getBussinessList(id) {
            this.http({
                url: `merchant/tGoodCategory/selectTGoodCategoryAsTree?shopMallId=${id}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.businessTypeList = res.data.data
                }
            })
        },
        getShopApprovalDetail() {
            this.http({
                url: 'merchant/tShop/selApprovalDetailById',
                method: 'get',
                data: {
                    id: this.iidd,
                    type: this.type
                }
            }, res => {
                if (res.data.code == 200) {
                    if (this.type == '1') {
                        let tShop = res.data.data.tShop
                        let tShopVX = res.data.data.tShopVX
                        this.infoForm.business_license_copy = JSON.parse(tShopVX.business_license_copy)
                        this.infoForm.business_license_number = tShopVX.business_license_number
                        this.infoForm.merchant_name = tShopVX.merchant_name
                        this.infoForm.legal_person = tShopVX.legal_person
                        this.infoForm.id_card_copy = JSON.parse(tShopVX.id_card_copy)
                        this.infoForm.id_card_national = JSON.parse(tShopVX.id_card_national)
                        this.infoForm.id_card_name = tShopVX.id_card_name
                        this.infoForm.id_card_number = tShopVX.id_card_number
                        this.infoForm.id_card_valid_time = tShopVX.id_card_valid_time
                        this.infoForm.bank_account_type = parseInt(tShopVX.bank_account_type)
                        this.infoForm.account_bank = tShopVX.account_bank
                        this.infoForm.account_name = tShopVX.account_name
                        this.infoForm.store_name = tShopVX.store_name
                        this.infoForm.merchant_shortname = tShopVX.merchant_shortname
                        this.infoForm.bank_address_code = `${ tShopVX.province_name }/${ tShopVX.city_name }/${ tShopVX.area_name }`
                        this.infoForm.bank_name = tShopVX.bank_name
                        this.infoForm.account_number = tShopVX.account_number
                        this.infoForm.shopCityName = tShop.shopToPart
                        this.infoForm.floor = tShop.shopToFloor
                        this.infoForm.businessType = tShop.shopToIndustry
                        this.infoForm.chat = tShop.shopPersonVx
                        this.infoForm.chatCode = tShop.chatCode
                        this.infoForm.shopLogo = tShop.shopSign
                        this.infoForm.introduction = tShop.shopInfo
                        this.infoForm.contact_email = tShopVX.contact_email
                        this.infoForm.contact_name = tShopVX.contact_name
                        this.infoForm.contact_id_card_number = tShopVX.contact_id_card_number
                        this.infoForm.mobile_phone = tShopVX.mobile_phone
                        this.shopMess = res.data.data.tShop
                        if (tShop.shopApprovalStatus != '1') {
                            this.detailForm.approvalStutas = tShop.shopApprovalStatus
                            this.detailForm.rejectReason = tShop.shopApprovalRefuseInfo + tShopVX.audit_detail
                        }
                    }else {
                        this.tShop = res.data.data.tShop
                        this.tAdvert = res.data.data.tAdvert
                        this.tAdvertOrder = res.data.data.tAdvertOrder
                    }
                    
                }
            })
        },
        dealApproval() {
            this.$refs.detailForm.validate(valid => {
                if (valid) {
                    if (this.type == '1') {
                        this.http({
                            url: 'merchant/tShop/tShopApproval',
                            method: 'post',
                            data: {
                                approvalId: this.id,
                                id: this.iidd,
                                shopApprovalStatus: this.detailForm.approvalStutas,
                                shopApprovalRefuseInfo: this.detailForm.rejectReason
                            }
                        }, res => {
                            if (res.data.code == 200) {
                                this.$router.push({ 
                                    name: 'admin-approval-manage',
                                    query: {
                                        index: this.index
                                    }
                                })
                            }else {
                                this.$message({
                                    type: 'info',
                                    message: res.data.msg,
                                    duration: 6000
                                })
                                this.$router.push({ 
                                    name: 'admin-approval-manage',
                                    query: {
                                        index: this.index
                                    }
                                })
                            }
                        })
                    }else {
                        this.http({
                            url: 'merchant/advert/advertApproval',
                            method: 'post',
                            data: {
                                approvalId: this.id,
                                id: this.iidd,
                                advertShop: this.tShop.id,
                                advertType: this.tAdvert.advertType,
                                advertApprovalStatus: this.detailForm.approvalStutas,
                                advertDurationDayNums: parseInt(this.tAdvert.advertDurationDayNums),
                                advertRefuseInfo: this.detailForm.rejectReason
                            }
                        }, res => {
                            if (res.data.code == 200) {
                                this.$router.push({ 
                                    name: 'admin-approval-manage',
                                    query: {
                                        index: this.index
                                    }
                                })
                            }else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }
                }
            })
        },
    },
    mounted() {
        if (this.$route.query.id) {
            this.id = this.$route.query.id
            this.iidd = this.$route.query.iidd
            this.type = this.$route.query.type
            this.index = this.$route.query.index
            this.getShopApprovalDetail()
        }
    }
}
</script>

<style lang="scss" scoped>
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
.logo-img{
    width: 100px;
    height: 100px;
    object-fit: scale-down;
    border-radius: 4px;
}
.goods-img{
    max-width: 300px;
    max-height: 350px;
    object-fit: scale-down;
}
.goods-mess{
    text-align: center;
    max-width: 300px;
    margin-top: 10px;
    line-height: 22px;
}
.logo-box{
    width: 100px;
    height: 120px;
    /deep/ .img-box img{
        border-radius: 50%;
    }
}
</style>