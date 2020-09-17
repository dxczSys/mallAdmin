<template>
    <div class="deal-with-sale-wrapper">
        <div class="state-box">
            <div class="current-state">
                <span>当前售后状态：</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '0'">待确认</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '1'">已确认</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '2'">已拒绝</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '3'">超管介入</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '4'">超管已确认等待收货</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '5'">超管拒绝</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '6'">等待收货</span>
                <span v-if="tCustomerOrderRefund.refundStatus == '7'">已完成</span>
            </div>
        </div>
        <div class="refund-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">退款信息</div>
            </div>
            <div class="refund-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">交易金额</label>
                        <span>{{ tCustomerOrder.totalPrice }}元</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">退款金额</label>
                        <span>{{ tCustomerOrderRefund.refundMoney }}元</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">申请时间</label>
                        <span>{{_dateFormat('YYYY-mm-dd HH:MM', tCustomerOrderRefund.refundTime)}}</span>
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
                        <label class="order-label">凭据图片</label>
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
                        <span>{{ _dateFormat('YYYY-mm-dd HH:MM', tCustomerOrder.createTime) }}</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">发货时间</label>
                        <span>2020-02-04 15:23</span>
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
                        <span>{{tCustomerOrderDeliver.deliverMethod}}</span>
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
        <div class="deal-with-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">退款处理</div>
            </div>
            <div class="deal-with-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">是否同意退款</label>
                        <el-radio v-model="isAgree" label="1">是</el-radio>
                        <el-radio v-model="isAgree" label="0">否</el-radio>
                    </el-col>
                </el-row>
                <template v-if="isAgree == '1'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label">备注</label>
                                <el-input type="textarea" v-model="remark" placeholder="发货地址或备注说明" rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </template>
                <template v-if="isAgree == '0'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label required">拒绝原因</label>
                                <el-input type="textarea" v-model="rejectReason" placeholder="拒绝退款原因" rows="5" style="width: 500px;"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="16">
                            <div style="display: flex;">
                                <label class="order-label">拒绝凭据</label>
                                <upload-file :filelist="rejectUrl"></upload-file>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
        <div style="text-align: right;">
            <el-button @click="$router.push({ name: 'user-sale-manage'})">返回</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
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
            tCustomerOrderDeliver: {}
        }
    },
    created() {
        this.saleId = this.$route.query.id
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
                    this.orderTable = [{
                        goodTitle: obj.spu.goodTitle,
                        orderStatus: obj.tCustomerOrderDetail.orderStatus,
                        goodPrice: obj.tCustomerOrderDetail.goodPrice,
                        goodNumber: obj.tCustomerOrderDetail.goodNumber,
                        goodTotalPrice: obj.tCustomerOrderDetail.goodTotalPrice,
                        goodPostage: obj.tCustomerOrderDetail.goodPostage
                    }]
                }
            })
        },
        confirm() {
            if (this.isAgree === '') {
                this.$message.info('请选择是否同意退款')
                return
            }
            if (this.isAgree === '0' && !this.rejectReason) {
                this.$message.info('请填写拒绝原因')
                return
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