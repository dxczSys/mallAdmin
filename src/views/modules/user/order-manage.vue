<template>
    <div class="order-manage-wrapper">
        <div class="filter-box">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">条件查询</div>
            </div>
            <div class="filter-form">
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>商品编号</label>
                        <el-input v-model="filterForm.goodsNumber" placeholder="请输入商品名称"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label>商品名称</label>
                        <el-input v-model="filterForm.goodsName" placeholder="请输入商品编码"></el-input>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>订单编号</label>
                        <el-input v-model="filterForm.orderNumber" placeholder="请输入订单编号"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label>订单状态</label>
                        <el-select v-model="filterForm.orderState" placeholder="请选择订单状态">
                            <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>成交时间</label>
                        <el-date-picker v-model="filterForm.dealTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                        <el-button type="primary" style="margin-left: 36px;">搜索订单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-table-box">
            <el-button type="text">批量发货</el-button>
            <el-table :data="orderTable" style="width: 100%" border>
                <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column>
                <el-table-column prop="orderNumber" label="订单编号" width="200" header-align="center" align="center"></el-table-column>
                <el-table-column prop="" label="创建时间" min-width="200" header-align="center"></el-table-column>
                <el-table-column prop="" label="买家" width="200" header-align="center"></el-table-column>
                <el-table-column prop="" label="交易状态" width="150" header-align="center"></el-table-column>
                <el-table-column prop="" label="实收款" width="120" header-align="center"></el-table-column>
                <el-table-column label="操作" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="sendout(scope.row)">发货</el-button>
                        <el-button type="text" @click="viewDeail(scope.row)" style="color: #333;">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :hide-on-single-page="total % pageSize < 1" 
                :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterForm: {
                goodsNumber: '',
                goodsName: '',
                orderNumber: '',
                orderState: '',
                dealTime: ''
            },
            orderTable: [
                {
                    orderNumber: 'ds32318718378',
                }
            ],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            orderStateList: [
                {
                    label: '交易成功',
                    value: '1',
                },
                {
                    label: '买家已付款',
                    value: '2',
                },
                {
                    label: '已发货',
                    value: '3',
                },
                {
                    label: '待发货',
                    value: '4',
                },
                {
                    label: '退款中',
                    value: '5',
                }
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    methods: {
        handleSizeChange(v) {
            this.pageSize = v
        },
        handleCurrentChange(v) {
            this.currentPage = v
        },
        sendout(row) {
            this.$router.push({ name: 'user-sendout-goods' })
        },
        viewDeail(row) {
            this.$router.push({ name: 'user-order-detail' })
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-form{
    padding-top: 20px;
}
.filter-form-row{
    display: flex;
    margin-bottom: 20px;
}
.filter-form-col{
    /deep/ .el-input{
        width: 360px;
    }
    /deep/ .el-date-editor{
        width: 360px;
    }
    /deep/ .el-range-separator{
        padding: 0;
    }
    margin-right: 40px;
    label{
        margin-right: 10px;
    }
}
</style>