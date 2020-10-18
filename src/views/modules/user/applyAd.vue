<template>
    <div class="apply-ad-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">广告位申请</div>
        </div>
        <div class="step-box">
            <el-steps :active="activityStatus" process-status="success" finish-status="wait" align-center>
                <el-step title="申请" description="商户自主填写相关资料并付款"></el-step>
                <el-step title="审核中" description="商城管理员正在审核中..."></el-step>
                <el-step title="已上架" v-if="activityStatus == 2 || activityStatus == 1" description="广告位已上线"></el-step>
                <el-step title="失败" v-if="activityStatus == 3" :description="detailData.advertRefuseInfo || '不通过'"></el-step>
                <el-step title="强制下架" v-if="activityStatus == 4" description="已被强制下架"></el-step>
            </el-steps>
        </div>
        <div class="apply-form">
            <el-form ref="applyForm" :model="applyForm" :rules="rules" label-width="120px">
                <el-form-item label="广告位类型" required>
                    <el-select :disabled="type != 0" v-model="applyForm.adType" placeholder="请选择广告位类型">
                        <el-option v-for="(item, index) in adTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位介绍">
                    <img v-if="applyForm.adType == '1'" class="ad-introduction" src="~@/assets/img/zhiding-ad.png">
                    <img v-if="applyForm.adType == '2'" class="ad-introduction" src="~@/assets/img/cuxiao-ad.png">
                    <span v-if="applyForm.adType == '1'" class="ad-introduction-mess">*广告位介绍：该广告位位于易码商城小程序首页置顶位，如左图所示。首页是用户查看最多的地方，且该位置位于最醒目，用户操作最容易触及的地方，我们在此为广大商户设置了20个展示商户基本信息的广告位，快来加入吧！</span>
                    <span v-if="applyForm.adType == '2'" class="ad-introduction-mess">*广告位介绍：该广告位位于易码商城小程序底部，如左图所示。该位置是用户最容易触及的地方，我们在此为广大商户设置了30个展示促销商品信息的广告位，可以大大提升自己的知名度，快来加入吧！</span>
                </el-form-item>
                <el-form-item v-if="applyForm.adType == '2'" prop="goodsId" label="选择促销商品" required>
                    <el-select v-model="applyForm.goodsId" v-el-select-loadmore="handleChangePage" placeholder="请选择本店促销商品">
                        <el-option v-for="(item, index) in goodsList" :key="index" :label="`商品编码:${item.goodNumber || '无'} -- ${item.goodTitle}`" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时长" prop="timeType" required>
                    <el-radio-group v-model="applyForm.timeType" :disabled="type == '1'">
                        <el-radio v-for="(item, index) in timeTypeList" :key="index" :label="item.id">{{item.advertPrice}}元/{{item.advertDay}}天</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="type == 1 && detailData.advertApprovalStatus != '2'" label="申请时间">
                    <span>{{_dateFormat('YYYY-mm-dd HH:MM', detailData.advertCreateTime)}}</span>
                </el-form-item>
                <el-form-item v-if="type != 0 && (detailData.advertApprovalStatus == '2' || detailData.advertApprovalStatus == '4')" label="上架时间">
                    <span>{{_dateFormat('YYYY-mm-dd HH:MM', detailData.advertApprovalTime)}}</span>
                </el-form-item>
                <el-form-item v-if="type != 0 && (detailData.advertApprovalStatus == '2' || detailData.advertApprovalStatus == '4')" label="到期时间">
                    <span>{{_dateFormat('YYYY-mm-dd HH:MM', detailData.advertExpireTime)}}</span>
                </el-form-item>
                <el-form-item v-if="type == 1 && detailData.advertApprovalStatus == '2' && getOverDay(detailData.advertExpireTime) < 3" label="*温馨提示">
                    <span style="color: #E6A23C;">您的广告位即将到期，为了不影响您的使用，请及时续费，否则到期之后会下线该广告</span>
                </el-form-item>
                <el-form-item v-if="type == 1 && detailData.advertApprovalStatus == '3'" label="拒绝原因">
                    <span>{{detailData.advertRefuseInfo}}</span>
                </el-form-item>
                <el-form-item v-if="type == 1 && detailData.advertApprovalStatus == '4'" label="下架原因">
                    <span>{{detailData.advertIsUpperInfo}}</span>
                </el-form-item>
                <el-form-item v-if="type == 1 && detailData.advertApprovalStatus == '3'" label="退款详情">
                    <span>申请费用已退回至原账户，请注意查收。如有为题，请联系管理员。</span>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="type == 1" @click="$router.push({ name: 'user-ad-manager' })">返回</el-button>
                    <el-button type="primary" v-if="type == 1 && detailData.advertIsExpire == '2' && detailData.advertApprovalStatus == '2'"
                        @click="type = 2, applyForm.timeType = ''">续费</el-button>
                    <el-button v-if="type != 1" @click="$router.push({ name: 'user-ad-manager' })">取消</el-button>
                    <el-button v-if="type == 2" type="primary" @click="openPayType">立即续费</el-button>
                    <el-button v-if="type == 0" type="primary" @click="openPayType">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog v-if="typeDialogVisible" title="选择支付类型" :visible.sync="typeDialogVisible" width="400px">
            <div class="pay-type">
                <el-radio v-model="payType" label="1">
                    微信支付
                    <img src="~@/assets/img/weixin.png" alt="微信支付">
                </el-radio>
                <el-radio v-model="payType" label="2">
                    支付宝
                    <img src="~@/assets/img/aliply_logo.png" alt="微信支付">
                </el-radio>
            </div>
            <div slot="footer">
                <el-button @click="payType = '1', typeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleApply">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog v-if="dialogVisible" class="pay-wrapper" fullscreen lock-scroll :visible.sync="dialogVisible" :close-on-click-modal="false" 
            :before-close="beforeDialogClose" :close-on-press-escape="false" top="0" width="100%">
            <div class="alipy-logo-box">
                <img v-if="payType == '1'" src="~@/assets/img/wechat_logo.png" alt="微信支付">
                <img v-else src="~@/assets/img/aliply_logo.png" alt="支付宝">
                <div class="divider-box">
                    <div></div>
                </div>
                <div v-if="payType == '1'">微信收银台</div>
                <div v-else>支付宝收银台</div>
            </div>
            <div class="pay-box" :class="{'wechat': payType == '1', 'zhifubao': payType == '2'}">
                <div class="alipy-content">
                    <div class="alipy-content-left">
                        <div class="sweep-title">
                            <span>扫一扫付款</span>
                            <span>{{qrcode.price}}(元)</span>
                        </div>
                        <vue-qr :text="qrcode.url" :margin="0" colorDark="#333" :logoMargin="2" :logoCornerRadius="2"
                            colorLight="#fff" :logoSrc="qrcode.icon" :logoScale="0.1" :size="230">
                        </vue-qr>
                        <div v-if="payType == '1'" style="padding-top: 15px;">打开手机微信扫描二维码支付</div>
                        <div v-else style="padding-top: 15px;">打开手机支付宝扫描二维码支付</div>
                        <div style="color: #0ae; padding-top: 15px;">请您在提交订单后5分钟内完成支付，否则订单会自动取消</div>
                        <div>
                            <span>{{Math.floor(timeNum/60)}}分</span>
                            <span>{{timeNum%60}}秒</span>
                        </div>
                    </div>
                    <div class="content-divider">
                        <div></div>
                    </div>
                    <div class="alipy-content-right">
                        <div style="line-height: 50px; margin-top: 40px;">
                            <label>订单号：</label>
                            <span style="color: #0ae;">{{qrcode.orderId}}</span>
                        </div>
                        <div style="line-height: 30px;">
                            <label>合计金额：</label>
                            <span style="padding-left: 5px;">{{qrcode.price}}(元)</span>
                        </div>
                        <div style="margin-top: 206px;">
                            <img style="width: 20px;" src="~@/assets/img/weixin.png">
                            <label>客服：</label>
                            <span>18629399197</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
    components: { vueQr },
    directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            typeDialogVisible: false,
            applyForm: {
                adType: '1',
                goodsId: '',
                timeType: '',
            },
            adTypeList: [],
            goodsList: [],
            timeTypeList: [],
            rules: {
                goodsId: [ { required: true, message: '请选择本地促销商品', trigger: 'change' } ],
                timeType: [ { required: true, message: '请选择申请时长', trigger: 'change' } ],
            },
            qrcode: {
                url: '',
                icon: require('@/assets/img/logo_small.png'),
                orderId: '',
                price: '',
            },
            payType: '1',
            timer: null,
            countTimer: null,
            timeNum: 0,
            approvalId: '',
            type: 0,
            detailData: {},
            activityStatus: 0,
            currentPage: 1,
            pagesize: 10
        }
    },
    watch: {
        'applyForm.adType'(n) {
            if (n == 1) {
                this.gettimeTypeList()
            }else {
                this.gettimeTypeList()
                this.getGoodsList()
            }
        },
        // typeDialogVisible(n) {
        //     if (!n) {
        //         this.payType = '1'
        //     }
        // },
        dialogVisible(n) {
            if (!n) {
                clearInterval(this.timer)
                this.timer = null
                clearInterval(this.countTimer)
                this.countTimer = null
            }
        }
    },
    methods: {
        getOverDay(time) {
            let curtime = new Date(), stopTime = new Date(time), str = ''
            let num = (stopTime - curtime)/1000/60/60/24 
            if (num > 0) {
                if (num < 1) {
                    return 1
                }else {
                    return Math.floor(num)
                }
            }else {
                return 0
            }
        },
        gettimeTypeList() {
            this.http({
                url: 'merchant/TAdvertPriceType/tAdvertPriceTypeSelAll',
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
        openPayType() {
            this.$refs.applyForm.validate(valid => {
                if (valid) {
                    this.typeDialogVisible = true
                }
            })
        },
        handleApply() {
            this.typeDialogVisible = false
            this.dialogVisible = true
            if (this.payType == '1') {
                this.http({
                    url: 'merchant/advert/advertPayOrderVX',
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
                        this.getAlipyResult()
                        this.beginTiming()
                    }else {
                        this.$message.error(res.data.msg)
                    }
                })
            } else {
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
                        this.getAlipyResult()
                        this.beginTiming()
                    }else {
                        this.$message.error(res.data.msg)
                    }
                })
            }
        },
        beginTiming() {
            this.timeNum = 299
            this.countTimer = setInterval(() => {
                if (this.timeNum > 0) {
                    this.timeNum --
                }else {
                    this.$message.info('支付超时')
                    clearInterval(this.countTimer)
                    this.countTimer = null
                    this.dialogVisible = false
                }
            }, 1000)
        },
        getAlipyResult() {
            this.timer = setInterval(() => {
                this.http({
                    url: 'merchant/advert/advertFindByPayOrder',
                    method: 'get',
                    data: { orderId: this.qrcode.orderId }
                }, res => {
                    if (res.data.code == 0) {
                    }else if (res.data.code == 1) {
                        clearInterval(this.timer)
                        this.timer = null
                        let day = this.getDays()
                        //续费
                        if (this.type == 2) {
                            this.http({
                                url: 'merchant/advert/advertRenew',
                                method: 'post',
                                data: {
                                    id: this.approvalId,
                                    advertOrderId: this.qrcode.orderId,
                                    advertDuration: this.applyForm.timeType,
                                    advertDurationDayNums: day
                                }
                            }, saveRes => {
                                if (saveRes.data.code == 200) {
                                    this.$message.success('续费成功！')
                                    this.$router.push({ name: 'user-ad-manager' })
                                }else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                        }else {
                            this.http({
                                url: 'merchant/advert/advertApply',
                                method: 'post',
                                data: {
                                    advertType: this.applyForm.adType,
                                    advertGood: this.applyForm.goodsId,
                                    advertDuration: this.applyForm.timeType,
                                    advertOrderId: this.qrcode.orderId,
                                    advertDurationDayNums: day
                                }
                            }, saveRes => {
                                if (saveRes.data.code == 200) {
                                    this.$message.success('申请成功，等待管理员审核...')
                                    this.$router.push({ name: 'user-ad-manager' })
                                }else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                        }
                    }else {
                        this.$message.error(res.data.msg)
                    }
                },err => {}, false)
            }, 3000)
        },
        getDays() {
            let day = 0
            for (let i = 0; i < this.timeTypeList.length; i ++) {
                if (this.timeTypeList[i].id == this.applyForm.timeType) {
                    day = parseInt(this.timeTypeList[i].advertDay)
                    break
                }
            }
            return day
        },
        beforeDialogClose(done) {
            this.$confirm('确认取消付款?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                clearInterval(this.countTimer)
                this.countTimer = null
                done()
            }).catch(() => {})
        },

        //查看详情
        getDetailData() {
            this.http({
                url: 'merchant/advert/advertSelById',
                method: 'get',
                data: { id: this.approvalId }
            }, res => {
                if (res.data.code == 200) {
                    this.applyForm.adType = res.data.data.advertType
                    this.type == 1 && (this.applyForm.timeType = res.data.data.advertDuration)
                    this.activityStatus = parseInt(res.data.data.advertApprovalStatus)
                    this.detailData = res.data.data
                }else {
                    this.$message.error(res.data.msg)
                }
            })
        },

        //获取剩余广告位
        getLastAd() {
            this.http({
                url: 'merchant/advert/selAdvertCountByUserShopMall',
                method: 'get',
            }, res => {
                if (res.data.code == 200) {
                    if (res.data.data.countA < 20) {
                        this.adTypeList.push({ value: '1', label: '置顶广告位' })
                    }
                    if (res.data.data.countB < 30) {
                        this.adTypeList.push({ value: '2', label: '促销广告位' })
                    }
                }else {
                    this.$message.error(res.data.msg || '')
                }
            })
        },
        getGoodsList() {
            this.http({
                url: 'merchant/good/selGoodByShopId',
                method: 'post',
                data: {
                    currentPage: this.currentPage,
                    pagesize: this.pagesize,
                    t: {
                        goodShop: this.$cookie.get('shopId')
                    }
                }
            }, res => {
                if (res.data.code == 200) {
                    this.goodsList = res.data.data.rows
                }
            })
        },
        handleChangePage() {
            this.pagesize += 10
            this.getGoodsList()
        }

    },
    mounted() {
        this.getLastAd()
        this.gettimeTypeList()
        if (this.$route.query.id) {
            this.approvalId = this.$route.query.id
            this.type = this.$route.query.type
            this.getDetailData()
        }
    },
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
    margin-left: 10px;
}
.pay-wrapper{
    /deep/ .el-dialog__header{
        padding-top: 10px;
    }
    /deep/ .el-dialog__headerbtn{
        top: 12px;
        .el-dialog__close{
            font-size: 25px;
            font-weight: 600;
        }
    }
    /deep/ .el-dialog__body{
        padding: 0;
    }
    .alipy-logo-box{
        display: flex;
        align-items: flex-end;
        width: 800px;
        margin: 0 auto;
        margin-bottom: 5px;
        .divider-box{
            padding: 0 5px;
            div{
                border-left: 1px solid #999;
                height: 14px;
                margin-bottom: 6px;
            }
        }
    }
}
.wechat{
    background-image: url('~@/assets/img/wechat_body_bg.jpg');
}
.zhifubao{
    background-image: url('~@/assets/img/aliply_body_bg.jpg');
}
.pay-box{
    height: 660px;
    display: flex;
    justify-content: center;
    .alipy-content{
        display: flex;
        background-color: #fff;
        margin: 35px 0;
        border-radius: 4px;
        width: 800px;
        padding: 50px 30px;
        .alipy-content-left{
            text-align: center;
            color: #333;
            .sweep-title{
                padding: 10px 0;
                span:last-child{
                    padding-left: 5px;
                }
            }
        }
        .content-divider{
            padding: 0 50px;
            div{
                border-left: 1.5px dashed #eee;
                height: 350px;
                margin-top: 10px;
            }
        }
        .alipy-content-right{
            color: #333;
        }
    }
}
.pay-type{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>