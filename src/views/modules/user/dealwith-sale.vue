<template>
    <div class="deal-with-sale-wrapper">
        <div class="step-box">
            <el-steps :active="1" align-center>
                <el-step title="买家申请" description="买家陈述理由并提供证据申请"></el-step>
                <el-step title="卖家批复" description="买家根据实际情况决定是否退款"></el-step>
                <el-step title="确认收货" description="卖家确认收货后，钱款退回买家"></el-step>
                <el-step title="退款成功" description="退款成功，钱货俩清"></el-step>
            </el-steps>
        </div>
        <div class="refund-info">
            <span style="font-weight: 600;">退款信息</span>
            <div class="refund-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">交易金额</label>
                        <span>50.00元</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">退款金额</label>
                        <span>50.00元</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">申请时间</label>
                        <span>2020-02-04 15:23</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">退款原因</label>
                        <span>手动滑稽水电费好可怜可了圣诞解放路上看到荆防颗粒圣诞节疯狂拉三等奖疯狂拉三等奖房卡了时代峻峰开了撒娇的反馈了</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">凭据截图</label>
                        <img class="evidence-img" src="~@/assets/img/goods.png">
                        <img class="evidence-img" src="~@/assets/img/goods.png">
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="order-info">
            <span style="font-weight: 600;">订单信息</span>
            <div class="order-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">买家昵称</label>
                        <span>你猜</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">联系电话</label>
                        <span>15594649976</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">订单编号</label>
                        <span>763390232023802</span>
                    </el-col>
                    <el-col :span="8">
                        <label class="order-label">创建时间</label>
                        <span>2020-02-04 15:23</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="8">
                        <label class="order-label">发货时间</label>
                        <span>2020-02-04 15:23</span>
                    </el-col>
                </el-row>
                <el-table :data="orderTable" style="width: 100%" border>
                    <el-table-column header-align="center" align="center" type="index" width="50"></el-table-column>
                    <el-table-column header-align="center" prop="goodsName" label="商品名称" min-width="200"></el-table-column>
                    <el-table-column header-align="center" align="center" label="状态" width="200"></el-table-column>
                    <el-table-column header-align="center" align="center" label="单价" width="150"></el-table-column>
                    <el-table-column header-align="center" align="center" label="数量" width="150"></el-table-column>
                    <el-table-column header-align="center" align="center" label="商品总价" width="200">
                        <template slot-scope="scope">
                            <div>{{scope.row.totalPrice}}</div>
                            <div>(快递:{{scope.row.deliveryCost}})</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 10px; text-align: right;">实收款：<span style="color: #f40; font-size: 16px; font-weight: 600;">100.00</span>元</div>
            </div>
        </div>
        <div class="logistics-info">
            <span style="font-weight: 600;">物流信息</span>
            <div class="logistics-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">收货地址</label>
                        <span>李中男，86-18434753564，北京 北京市 大兴区 北京经济技术开发区 经开壹中心达内教育大厦 ，000000</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运送方式</label>
                        <span>快递</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">物流公司</label>
                        <span>申通快递</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运单号</label>
                        <span>12643384846283738</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">运单照片</label>
                        <img class="logistics-img" src="~@/assets/img/shoukuan.png">
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="deal-with-info">
            <span style="font-weight: 600;">退款处理</span>
            <div class="deal-with-info-box">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :span="20">
                        <label class="order-label">是否同意退款</label>
                        <el-radio v-model="isAgree" label="1">是</el-radio>
                        <el-radio v-model="isAgree" label="0">否</el-radio>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;" v-if="isAgree == '0'">
                    <el-col :span="16">
                        <div style="display: flex;">
                            <label class="order-label">拒绝原因</label>
                            <el-input type="textarea" v-model="rejectReason" placeholder="拒绝退款原因" rows="5" style="width: 500px;"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 20px;" v-if="isAgree == '0'">
                    <el-col :span="16">
                        <div style="display: flex;">
                            <label class="order-label">拒绝凭据</label>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="text-align: right;">
            <el-button @click="$router.push({ name: 'user-sale-manage'})">返回</el-button>
            <el-button type="primary">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderTable: [
                {
                    goodsName: 'java软件爬虫C语言PHP软件定制',
                    totalPrice: '100.00',
                    deliveryCost: '0.01' 
                }
            ],
            isAgree: '',
            rejectReason: '',
            rejectUrl: '',
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
.evidence-img{
    width: 150px;
    height: 130px;
    object-fit: contain;
}
.order-info-box,.logistics-info-box,.deal-with-info-box{
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
}
.logistics-img{
    width: 150px;
    height: 140px;
    object-fit: contain;
}


</style>