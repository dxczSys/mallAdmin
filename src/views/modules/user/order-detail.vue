<template>
    <div class="order-detail-wrapper">
        <div class="state-box">
            <div class="current-state">当前订单状态：{{orderState}}</div>
            <div class="state-tip">
                <div></div>
                <div>{{tipMess}}</div>
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
        <div style="text-align: right;" @click="$router.push({ name: 'user-order-manage' })">
            <el-button type="primary">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderState: '交易成功',
            tipMess: '交易已成功，如果买家提出售后要求，请积极与买家协商，做好售后服务。',
            orderTable: [
                {
                    goodsName: 'java软件爬虫C语言PHP软件定制',
                    totalPrice: '100.00',
                    deliveryCost: '0.01' 
                }
            ]
        }
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