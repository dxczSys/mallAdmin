<template>
    <div class="order-detail-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 15px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">订单管理--订单详情</div>
        </div>
        <div class="state-box">
            <div class="current-state">
                <span>当前订单状态：</span>
                <span v-if="orderState == '0'">待付款</span>
                <span v-if="orderState == '1'">待发货</span>
                <span v-if="orderState == '2'">待收货</span>
                <span v-if="orderState == '3'">已完成</span>
                <span v-if="orderState == '4'">退款中</span>
                <span v-if="orderState == '5'">退款成功</span>
                <span v-if="orderState == '6'">退款中</span>
            </div>
            <!-- <div class="state-tip">
                <div></div>
                <div>{{tipMess}}</div>
            </div> -->
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
                        <span>{{orderId}}</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">买家账号</label>
                        <span>{{customerTel}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">下单时间</label>
                        <span>{{createTime}}</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">发货时间</label>
                        <span>{{deliveryTime? deliveryTime : '未发货'}}</span>
                    </el-col>
                </el-row>
                <el-table :data="orderTable" style="width: 100%" border>
                    <el-table-column header-align="center" align="center" type="index" width="50"></el-table-column>
                    <el-table-column prop="goodTitle" header-align="center" label="商品名称" min-width="200"></el-table-column>
                    <el-table-column prop="goodPrice" header-align="center" align="center" label="单价" width="150"></el-table-column>
                    <el-table-column prop="goodNumber" header-align="center" align="center" label="数量" width="150"></el-table-column>
                    <el-table-column header-align="center" align="center" label="商品总价" width="200">
                        <template slot-scope="scope">
                            <div>{{scope.row.goodTotalPrice}}</div>
                            <div>配送费:{{scope.row.goodPostge}}元</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 10px; text-align: right;">实收款：<span style="color: #f40; font-size: 16px; font-weight: 600;">{{goodTotalPrice}}</span>元</div>
            </div>
        </div>
        <div v-if="orderState != '0'" class="logistics-info">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">物流信息</div>
            </div>
            <div class="logistics-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">收件人</label>
                        <span>{{addressPer}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">联系方式</label>
                        <span>{{addressPerTel}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">收货地址</label>
                        <span>{{address}}</span>
                    </el-col>
                </el-row>
                <div v-if="orderState != '0' && orderState != '1'">
                    <el-row :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="20">
                            <label class="order-label">运送方式</label>
                            <span v-if="deliverMethod == '1'">自提</span>
                            <span v-if="deliverMethod == '2'">跑腿</span>
                            <span v-if="deliverMethod == '3'">快递</span>
                            <span v-if="deliverMethod == '4'">其他</span>
                        </el-col>
                    </el-row>
                    <el-row v-if="deliverCompany" :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="20">
                            <label class="order-label">配送公司</label>
                            <span>{{deliverCompany}}</span>
                        </el-col>
                    </el-row>
                    <el-row v-if="deliverCode" :gutter="20" style="margin-bottom: 20px;">
                        <el-col :span="20">
                            <label class="order-label">运单号</label>
                            <span>{{deliverCode}}</span>
                        </el-col>
                    </el-row>
                    <el-row v-if="deliverPic" :gutter="20">
                        <el-col :span="20">
                            <label class="order-label">照片</label>
                            <img-view style="display: inline-block;" :images="fileUrl + deliverPic"></img-view>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div style="text-align: right; margin-top: 20px;">
            <el-button @click="$router.push({ name: 'user-order-manage' })">返回</el-button>
            <el-button v-if="orderState == '1'" type="primary" @click="goSend">去发货</el-button>
        </div>
    </div>
</template>

<script>
import imgView from '@/components/img-view'
export default {
    components: { imgView },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            priId: '',
            orderState: '',
            orderId: '',
            customerTel: '',
            createTime: '',
            deliveryTime: '',
            goodTotalPrice: '',
            orderTable: [],
            addressPer: '',
            addressPerTel: '',
            address: '',
            deliverMethod: '',
            deliverCompany: '',
            deliverCode: '',
            deliverPic: ''
        }
    },
    computed: {
        tipMess() {
            if (this.orderState == '0') {
                return '通知或等待买家付款。'
            }else if(this.orderState == '1') {
                return '买家已下单，请按用户要求，即刻配送。'
            }else if (this.orderState == '2') {
                return '请等待买家收货。'
            }else if (this.orderState == '3') {
                return '交易已成功，如果买家提出售后要求，请积极与买家协商，做好售后服务。'
            }
        }
    },
    methods: {
        getOrderDetail(id) {
            this.http({
                url: 'merchant/orderDetail/tCustomerOrderDetailInfoByOrderId',
                method: 'get',
                data: {
                    orderId: id
                }
            }, res => {
                if (res.data.code == 200) {
                    let obj = res.data.data
                    this.orderState = obj.orderStatus
                    this.orderId = obj.orderId
                    this.customerTel = obj.customerTel
                    this.createTime = this._dateFormat('YYYY-mm-dd HH:MM', obj.createTime)
                    obj.deliverTime? this.deliveryTime = this._dateFormat('YYYY-mm-dd HH:MM', obj.deliverTime) : ''
                    this.orderTable = [{
                        goodTitle: obj.goodTitle,
                        goodPostge: obj.goodPostge,
                        goodPrice: obj.goodPrice,
                        goodNumber: obj.goodNumber,
                        goodTotalPrice: obj.goodTotalPrice
                    }]
                    this.goodTotalPrice = obj.goodTotalPrice
                    this.addressPer = obj.addressPer
                    this.addressPerTel = obj.addressPerTel
                    this.address = `${obj.address}${obj.addressInfo}`
                    this.deliverMethod = obj.deliverMethod
                    this.deliverCompany = obj.deliverCompany
                    this.deliverCode = obj.deliverCode
                    this.deliverPic = obj.deliverPic
                }
            })
        },
        goSend() {
            this.$router.push({
                name: 'user-sendout-goods',
                query: {
                    id: this.priId
                }
            })
        }
    },
    mounted() {
        this.priId = this.$route.query.id
        this.getOrderDetail(this.$route.query.id)
    }
}
</script>

<style lang="scss" scoped>
.state-box{
    background-color: rgba(255, 247, 235, 1);
    border: 1px solid #F58B0F;
    padding: 20px;
    border-radius: 4px;
    .current-state{
        font-size: 20px;
        margin-bottom: 15px;
    }
    .state-tip{
        display: flex;
        align-items: center;
        div:first-child{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #17B3A3;
            border: 2px solid #fff;
            box-shadow: 1px 0px 3px #000;
            margin-right: 10px;
        }
    }
}
.order-info{
    margin-top: 20px;
    .order-info-box{
        margin-top: 15px; 
    }
}
.logistics-info-box{
    margin-top: 15px;
}
.logistics-img{
    width: 150px;
    height: 140px;
    object-fit: contain;
}
.order-label{
    display: inline-block;
    width: 6em;
    text-align: right;
    margin-right: 10px;
}
</style>