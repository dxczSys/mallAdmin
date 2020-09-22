<template>
    <div class="deal-with-sale-wrapper">
        <div class="state-box">
            <div class="current-state">
                <span>当前售后状态：</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '0'">待卖家确认</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '1'">卖家同意</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '2'">卖家拒绝</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '3'">管理员介入</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '4'">管理员已同意</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '5'">管理员拒绝</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '6'">等待卖家收货</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '7'">已完成</span>
            </div>
        </div>
        <div class="refund-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">买家退款信息</div>
            </div>
            <div class="refund-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">交易金额</label>
                        <span>{{ tCustomerOrderDetail.goodTotalPrice }}元</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">邮费</label>
                        <span>{{ tCustomerOrderDetail.goodPostage }}元</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">退款金额</label>
                        <span>{{ tCustomerOrderRefund.refundMoney }}元</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">申请时间</label>
                        <span>{{ _dateFormat('YYYY-mm-dd HH:MM', tCustomerOrderRefund.refundTime) }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">退款原因</label>
                        <span>{{ tCustomerOrderRefund.refundText }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">退款凭据</label>
                        <img-view style="display: inline-block;" :images="fileUrl + tCustomerOrderRefund.refundPic"></img-view>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="order-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">订单信息</div>
            </div>
            <div class="order-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">订单编号</label>
                        <span>{{ tCustomerOrder.orderId }}</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">联系电话</label>
                        <span>{{ tCustomer.customerTel }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">下单时间</label>
                        <span>{{ _dateFormat('YYYY-mm-dd HH:MM', tCustomerOrderDetail.createTime) }}</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">发货时间</label>
                        <span>{{ _dateFormat('YYYY-mm-dd HH:MM', tCustomerOrderDeliver.deliverTime) }}</span>
                    </el-col>
                </el-row>
                <el-table :data="orderTable" style="width: 100%" border>
                    <el-table-column header-align="center" align="center" type="index" width="50"></el-table-column>
                    <el-table-column prop="goodTitle" header-align="center" label="商品名称" min-width="200"></el-table-column>
                    <el-table-column header-align="center" align="center" label="状态" width="200">
                        <template slot-scope="scope">
                            <span>{{ scope.row.orderStatus | statesFilter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" label="单价" width="150">
                        <template slot-scope="scope">
                            <span>{{ scope.row.goodPrice }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodNumber" header-align="center" align="center" label="数量" width="150"></el-table-column>
                    <el-table-column header-align="center" align="center" label="商品总价" width="200">
                        <template slot-scope="scope">
                            <div>{{ scope.row.goodTotalPrice }}元</div>
                            <div>(快递:{{scope.row.goodPostage}}元)</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 10px; text-align: right;">实收款：<span style="color: #f40; font-size: 16px; font-weight: 600;">{{ tCustomerOrderDetail.goodTotalPrice }}</span>元</div>
            </div>
        </div>
        <div class="logistics-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">物流信息</div>
            </div>
            <div class="logistics-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">收货地址</label>
                        <span>{{tCustomerAddress.addressPer}}，{{tCustomerAddress.addressPerTel}}，{{tCustomerAddress.address}} {{tCustomerAddress.addressInfo}}，{{tCustomerAddress.postCode}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运送方式</label>
                        <span>{{ tCustomerOrderDeliver.deliverMethod | sendTypeFilter }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">物流公司</label>
                        <span>{{tCustomerOrderDeliver.deliverCompany}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运单号</label>
                        <span>{{tCustomerOrderDeliver.deliverCode}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运单照片</label>
                        <img-view style="display: inline-block;" :images="fileUrl + tCustomerOrderDeliver.deliverPic"></img-view>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="logistics-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">卖家信息</div>
            </div>
            <div class="deal-with-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="10">
                        <label class="order-label">店铺名称</label>
                        <span>{{tShop.shopName}}</span>
                    </el-col>
                    <el-col :span="10">
                        <label class="order-label">店铺简称</label>
                        <span>{{tShop.abbreviation}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="10">
                        <label class="order-label">店铺营业者</label>
                        <span>{{tUser.realUserName}}</span>
                    </el-col>
                    <el-col :span="10">
                        <label class="order-label">店铺联系电话</label>
                        <span>{{tUser.userTel}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="10">
                        <label class="order-label">所属商场</label>
                        <span>{{ tShopMall.shopName }}</span>
                    </el-col>
                    <el-col :span="10">
                        <label class="order-label">商场地址</label>
                        <span>{{ tShopMall.shopAddress }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="10">
                        <label class="order-label">商场负责人</label>
                        <span>{{ tShopMall.shopPropertyCompany }}</span>
                    </el-col>
                    <el-col :span="10">
                        <label class="order-label">联系电话</label>
                        <span>{{ tShopMall.shopTel }}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="logistics-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">卖家售后信息</div>
            </div>
            <div class="deal-with-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">是否同意退款</label>
                        <el-radio v-model="shopIsAgree" disabled label="1">是</el-radio>
                        <el-radio v-model="shopIsAgree" disabled label="0">否</el-radio>
                    </el-col>
                </el-row>
                <template v-if="shopIsAgree == '1'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label required">备注</label>
                                <el-input type="textarea" v-model="shopRemark" disabled placeholder="发货地址或备注说明" rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </template>
                <template v-if="shopIsAgree == '0'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label required">拒绝原因</label>
                                <el-input type="textarea" v-model="shopRejectReason" disabled rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label">拒绝凭据</label>
                                <img-view v-if="tCustomerOrderRefund.refundFailPic" style="display: inline-block;" :images="fileUrl + tCustomerOrderRefund.refundFailPic"></img-view>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
        <div v-if="tCustomerOrderRefund.refundStatus != '0' && tCustomerOrderRefund.refundStatus != '1' && tCustomerOrderRefund.refundStatus != '2'" class="deal-with-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">退款处理</div>
            </div>
            <div class="deal-with-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">是否同意退款</label>
                        <el-radio v-model="isAgree" :disabled="type" label="1">是</el-radio>
                        <el-radio v-model="isAgree" :disabled="type" label="0">否</el-radio>
                    </el-col>
                </el-row>
                <template v-if="isAgree == '1'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label required">备注</label>
                                <el-input type="textarea" v-model="remark" :disabled="type" placeholder="发货地址或备注说明" rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </template>
                <template v-if="isAgree == '0'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label required">拒绝原因</label>
                                <el-input type="textarea" v-model="rejectReason" :disabled="type" placeholder="拒绝退款原因" rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label">拒绝凭据</label>
                                <upload-file v-if="!type && tCustomerOrderRefund.refundStatus == '3'" :filelist="rejectUrl"></upload-file>
                                <img-view v-if="tCustomerOrderRefund.refundAdminFailPic && type" style="display: inline-block;" :images="fileUrl + tCustomerOrderRefund.refundAdminFailPic"></img-view>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
        <div style="text-align: right;">
            <el-button @click="$router.push({ name: 'admin-sale-services'})">返回</el-button>
            <el-button v-if="!type" type="primary" @click="confirm">确定</el-button>
        </div>
    </div>
</template>

<script>
import imgView from '@/components/img-view'
import uploadFile from '@/components/upload-file'
export default {
    filters: {
        statesFilter(v) {
            if (v == '0') {
                return '待付款'
            }
            if (v == '1') {
                return '待发货'
            }
            if (v == '2') {
                return '待收货'
            }
            if (v == '3') {
                return '已完成'
            }
            if (v == '4') {
                return '退款中'
            }
            if (v == '5') {
                return '退款成功'
            }
            if (v == '6') {
                return '退款失败'
            }
        },
        sendTypeFilter(v) {
            if (v == '1') {
                return '自提'
            }
            if (v == '2') {
                return '跑腿'
            }
            if (v == '3') {
                return '快递'
            }
            if (v == '4') {
                return '其他'
            }
        }
    },
    components: { imgView, uploadFile },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            orderTable: [],
            isAgree: '',
            remark: '',
            rejectReason: '',
            rejectUrl: [],
            saleId: '',
            tCustomerOrder: {},
            tCustomerOrderRefund: {},
            tCustomer: {},
            tCustomerOrderDetail: {},
            tCustomerAddress: {},
            tCustomerOrderDeliver: {},
            type: '',
            tShop: {},
            tShopMall: {},
            tUser: {},
            shopIsAgree: '',
            shopRejectReason: '',
            shopRemark: ''
        }
    },
    created() {
        this.saleId = this.$route.query.id
        this.type = this.$route.query.type
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.http({
                url: `merchant/orderRefund/orderRefundSelById?id=${this.saleId}`,
                method: 'get'
            }, res => {
                if (res.data.code === 200) {
                    let obj = res.data.data
                    this.tCustomerOrder = obj.tCustomerOrder
                    this.tCustomerOrderRefund = obj.tCustomerOrderRefund
                    this.tCustomer = obj.tCustomer
                    this.tCustomerOrderDetail = obj.tCustomerOrderDetail
                    this.tCustomerAddress = obj.tCustomerAddress
                    this.tCustomerOrderDeliver = obj.tCustomerOrderDeliver
                    this.tShop = obj.tShop
                    this.tShopMall = obj.tShopMall
                    this.tUser = obj.tUser
                    this.orderTable = [{
                        goodTitle: obj.spu.goodTitle,
                        orderStatus: obj.tCustomerOrderDetail.orderStatus,
                        goodPrice: obj.tCustomerOrderDetail.goodPrice,
                        goodNumber: obj.tCustomerOrderDetail.goodNumber,
                        goodTotalPrice: obj.tCustomerOrderDetail.goodTotalPrice,
                        goodPostage: obj.tCustomerOrderDetail.goodPostage
                    }]
                    this.shopIsAgree = this.tCustomerOrderRefund.isAck + ''
                    this.shopRejectReason = this.tCustomerOrderRefund.refundFailText
                    this.isAgree = this.tCustomerOrderRefund.adminIsAck + ''
                    this.remark = this.tCustomerOrderRefund.refundAddress
                    this.rejectReason = this.tCustomerOrderRefund.refundAdminFailText
                    this.shopRemark = this.tCustomerOrderRefund.refundAddress
                }
            })
        },
        confirm() {
            if (this.isAgree === '') {
                this.$message.info('请选择是否同意退款')
                return
            }
            if (this.isAgree === '0') {
                if (!this.rejectReason) {
                    this.$message.info('请填写拒绝原因')
                    return
                }
                if (this.rejectUrl.length) {
                    this.$upload({
                        data: [this.rejectUrl[0].raw]
                    }, res => {
                        if (res.data.code == 200) {
                            this.http({
                                url: 'merchant/orderRefund/orderRefundFalse',
                                method: 'post',
                                data: {
                                    id: this.tCustomerOrderRefund.id,
                                    refundAdminFailPic: res.data.data,
                                    refundAdminFailText: this.rejectReason,
                                    adminIsAck: this.isAgree
                                }
                            }, resolve => {
                                if (resolve.data.code == 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: '已拒绝',
                                        type: 'success'
                                    })
                                    this.$router.push({
                                        name: 'user-sale-manage'
                                    })
                                }
                            })
                        }
                    })
                }else {
                    this.http({
                        url: 'merchant/orderRefund/orderRefundFalse',
                        method: 'post',
                        data: {
                            id: this.tCustomerOrderRefund.id,
                            refundAdminFailText: this.rejectReason,
                            adminIsAck: this.isAgree
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '已拒绝',
                                type: 'success'
                            })
                            this.$router.push({
                                name: 'admin-sale-services'
                            })
                        }
                    })
                }
            }else {
                if (this.isAgree === '1') {
                    if (!this.remark) {
                        this.$message.info('请填写备注')
                        return
                    }
                    this.http({
                        url: 'merchant/orderRefund/orderRefundCheck',
                        method: 'post',
                        data: {
                            id: this.tCustomerOrderRefund.id,
                            refundAddress: this.remark,
                            adminIsAck: this.isAgree
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '同意退款成功',
                                type: 'success'
                            })
                            this.$router.push({
                                name: 'admin-sale-services'
                            })
                        }
                    })
                }
            }
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
.refund-info{
    margin-top: 20px;
}
.refund-info-box{
    margin-top: 15px;
}
.order-label{
    display: inline-block;
    width: 6em;
    text-align: right;
    margin-right: 10px;
}
.required::before{
    content: '*';
    color: #F56C6C;
}
.evidence-img{
    width: 150px;
    height: 130px;
    object-fit: contain;
}
.order-info-box,.logistics-info-box,.deal-with-info-box{
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}
.logistics-img{
    width: 150px;
    height: 140px;
    object-fit: contain;
}
.state-box{
    background-color: rgba(255, 247, 235, 1);
    border: 1px solid #F58B0F;
    padding: 20px;
    border-radius: 4px;
    .current-state{
        font-size: 20px;
        margin-bottom: 15px;
    }
}

</style>