<template>
    <div class="apply-ad-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">广告位申请</div>
        </div>
        <div class="step-box">
            <el-steps :active="0" align-center>
                <el-step title="申请" description="商户自主填写相关资料并付款"></el-step>
                <el-step title="审核中" description="发送商城管理员审核"></el-step>
                <el-step title="已上架" description="审核通过立即上线广告位"></el-step>
            </el-steps>
        </div>
        <div class="apply-form">
            <el-form ref="applyForm" :model="applyForm" :rules="rules" label-width="120px">
                <el-form-item label="广告位类型" required>
                    <el-select v-model="applyForm.adType" placeholder="请选择广告位类型">
                        <el-option v-for="(item, index) in adTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位介绍">
                    <img v-if="applyForm.adType == '1'" class="ad-introduction" src="~@/assets/img/zhiding-ad.png">
                    <img v-if="applyForm.adType == '2'" class="ad-introduction" src="~@/assets/img/cuxiao-ad.png">
                    <span v-if="applyForm.adType == '1'" class="ad-introduction-mess">*提示：该广告位位于易码商城小程序首页置顶位，如左图所示。首页是用户查看最多的地方，且该位置位于最醒目，用户操作最容易触及的地方，我们在此为广大商户设置了20个展示商户基本信息的广告位，快来加入吧！</span>
                    <span v-if="applyForm.adType == '2'" class="ad-introduction-mess">*提示：该广告位位于易码商城小程序底部，如左图所示。该位置是用户最容易触及的地方，我们在此为广大商户设置了30个展示促销商品信息的广告位，可以大大提升自己的知名度，快来加入吧！</span>
                </el-form-item>
                <el-form-item v-if="applyForm.adType == '2'" prop="goodsId" label="选择促销商品" required>
                    <el-select v-model="applyForm.goodsId" placeholder="请选择本店促销商品">
                        <el-option v-for="(item, index) in goodsList" :key="index" :label="`商品编码:${item.goodsNum}  ${item.goodsName}`" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时长" prop="timeType" required>
                    <el-radio-group v-model="applyForm.timeType">
                        <el-radio v-for="(item, index) in timeTypeList" :key="index" :label="item.id">{{item.advertPrice}}元/{{item.advertDay}}天</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="$router.push({ name: 'user-ad-manager' })">取消</el-button>
                    <el-button type="primary" @click="handleApply">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog class="pay-wrapper" fullscreen :visible.sync="dialogVisible" :close-on-click-modal="false" 
            :close-on-press-escape="false" top="0" width="100%">
            <div class="pay-box">
                <vue-qr :text="qrcode.url" :margin="0" colorDark="#333" :logoMargin="2" :logoCornerRadius="2"
                    colorLight="#fff" :logoSrc="qrcode.icon" :logoScale="0.18" :size="200">
                </vue-qr>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
    components: { vueQr },
    data() {
        return {
            dialogVisible: false,
            applyForm: {
                adType: '1',
                goodsId: '',
                timeType: '',
            },
            adTypeList: [{
                value: '1',
                label: '置顶广告位'
            },{
                value: '2',
                label: '促销广告位'
            }],
            goodsList: [{
                id: '1',
                goodsNum: '599344673442',
                goodsName: 'Python代码代做代写网络爬虫数据抓取分析程序代写爬虫定制GUIweb'
            }],
            timeTypeList: [],
            rules: {
                goodsId: [ { required: true, message: '请选择本地促销商品', trigger: 'blur' } ],
                timeType: [ { required: true, message: '请选择申请时长', trigger: 'blur' } ],
            },
            qrcode: {
                url: '',
                icon: require('@/assets/img/logo.png'),
                orderId: '',
                price: '',
            }
        }
    },
    watch: {
        'applyForm.adType'() {
            this.gettimeTypeList()
        }
    },
    methods: {
        gettimeTypeList() {
            this.http({
                url: 'admin/TAdvertPriceType/tAdvertPriceTypeSelAll',
                method: 'get',
                data: {
                    query: this.applyForm.adType
                }
            }, res => {
                if (res.data.code == 200) {
                    this.timeTypeList = res.data.data
                }else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        handleApply() {
            this.$refs.applyForm.validate(valid => {
                if (valid) {
                    this.http({
                        url: 'merchant/advert/advertPayOrder',
                        method: 'get',
                        data: {
                            tid: this.applyForm.timeType
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            this.qrcode.url = res.data.data.qrCode
                            this.qrcode.orderId = res.data.data.orderId
                            this.qrcode.price = res.data.data.orderMoney
                            this.dialogVisible = true
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            })
        }
    },
    mounted() {
        this.gettimeTypeList()
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
.apply-form{
    margin-top: 20px;
    /deep/ .el-form-item__content .el-select{
        width: 360px;
    }
}
.ad-introduction{
    width: 200px;
}
.ad-introduction-mess{
    vertical-align: top;
    display: inline-block;
    padding-left: 10px;
    width: 360px;
    color: #999;
}
.pay-wrapper{

}
.pay-box{
    
}
</style>