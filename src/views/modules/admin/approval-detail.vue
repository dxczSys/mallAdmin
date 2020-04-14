<template>
    <div class="approval-detail-wrapper">
        <el-form ref="detailForm" :model="detailForm" :rules="rules" label-width="120px">
            <div v-if="type=='1'" class="detail-box">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">审批管理-商户认证</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称">
                            <span>{{shopMess.shopName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属商场">
                            <span>{{shopMess.shopToPart}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层">
                            <span>{{shopMess.shopToFloor}}楼</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业">
                            <span>{{shopMess.shopToIndustry || '无'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <span>{{shopMess.shopTel}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信">
                            <span>{{shopMess.shopPersonVx}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="店铺标志">
                            <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMess.shopSign]"></img-view>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照">
                            <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMess.shopBusinessLicense]"></img-view>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人/经营者">
                            <span>{{shopMess.shopLegalPerson}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号">
                            <span>{{shopMess.shopLegalPersonId}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="身份证正面">
                            <img-view :images="[fileUrl + shopMess.idCardPicPositive]"></img-view>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证反面">
                            <img-view :images="[fileUrl + shopMess.idCardPicSide]"></img-view>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="商铺简介">
                    <span>{{shopMess.shopInfo}}</span>
                </el-form-item>
            </div>
            <div v-if="type=='2'" class="ad-box">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">审批管理-广告位申请</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称">
                            <span>{{tShop.shopName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属商场">
                            <span>{{tShop.shopToPart}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层">
                            <span>{{tShop.shopToFloor}}楼</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业">
                            <span>{{tShop.shopToIndustry || '无'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人/经营者">
                            <span>{{tShop.shopLegalPerson}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <span>{{tShop.shopTel}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="广告位类型">
                            <span>{{tAdvert.advertType == '1'? '置顶广告位' : '促销广告位'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请时长">
                            <span>{{tAdvert.advertDurationDayNums}}天</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="促销商品">
                    <img class="goods-img" :src="shopMess.goodsUrl">
                    <div class="goods-mess">{{shopMess.goodsDes}}</div>
                </el-form-item> -->
                <el-form-item label="已付款">
                    <span>{{tAdvertOrder.orderMoney}}元</span>
                </el-form-item>
            </div>
            <el-form-item label="审批">
                <el-radio :disabled="tAdvert.advertApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="2">通过</el-radio>
                <el-radio :disabled="tAdvert.advertApprovalStatus != '1'" v-model="detailForm.approvalStutas" label="3">拒绝</el-radio>
            </el-form-item>
            <el-form-item v-if="detailForm.approvalStutas == 3" label="拒绝原因" prop="rejectReason" required>
                <el-input :disabled="tAdvert.advertApprovalStatus != '1'" type="textarea" maxlength="100" show-word-limit
                    rows="4" v-model="detailForm.rejectReason" placeholder="拒绝原因：包含非法信息，最多100字">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push({ name: 'admin-approval-manage', query: { index: index }})">返回</el-button>
                <el-button v-if="tAdvert.advertApprovalStatus == 1" @click="dealApproval" type="primary">批复</el-button>
            </el-form-item>
        </el-form>     
    </div>
</template>

<script>
import imgView from '@/components/img-view'
export default {
    components: { imgView },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
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
            }
        }
    },
    methods: {
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
                        this.shopMess = res.data.data
                        if (res.data.data.shopApprovalStatus != '1') {
                            this.detailForm.approvalStutas = res.data.data.shopApprovalStatus
                            this.detailForm.rejectReason = res.data.data.shopApprovalRefuseInfo
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
                                this.$message.error(res.data.msg)
                            }
                        })
                    }else {
                        this.http({
                            url: 'merchant/advert/advertApproval',
                            method: 'post',
                            data: {
                                approvalId: this.id,
                                id: this.iidd,
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
</style>