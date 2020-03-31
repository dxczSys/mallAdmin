<template>
    <div class="apply-ad-wrapper">
        <el-steps :active="1" align-center style="border-bottom: 1px solid #eee;">
            <el-step title="申请" description="商户自主填写相关资料并付款"></el-step>
            <el-step title="审核中" description="发送商城管理员审核"></el-step>
            <el-step title="已上架" description="审核通过立即上线广告位"></el-step>
        </el-steps>
        <div class="apply-form">
            <el-form ref="applyForm" :model="applyForm" label-width="120px">
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
                <el-form-item v-if="applyForm.adType == '1'" label="选择促销商品" required>
                    <el-select v-model="applyForm.goodsId" placeholder="请选择本店促销商品">
                        <el-option v-for="(item, index) in goodsList" :key="index" :label="`商品编码:${item.goodsNum}  ${item.goodsName}`" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时长" required>
                    <el-radio-group v-model="applyForm.timeType">
                        <el-radio v-for="(item, index) in timeTypeList" :key="index" :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="400px">
            <div class="pay-box">
                <img src="~@/assets/img/shoukuan.png">
                <div>请使用微信扫码支付订单</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
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
            timeTypeList: [{
                label: '￥40.00/月',
                value: '1'
            },{
                label: '￥230.00/6个月',
                value: '2'
            },{
                label: '￥450.00/年',
                value: '3'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
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
.pay-box{
    border-radius: 4px;
    text-align: center;
    background-color: #00c250;
    padding: 50px 10px;
    img{
        width: 200px;
        border-radius: 4px;
    }
    div{
        font-size: 20px;
        margin-top: 10px;
    }
}
</style>