<template>
    <div class="order-manage-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">订单管理</div>
        </div>
        <div class="filter-box">
            <div class="filter-form">
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>商品编号</label>
                        <el-input v-model="filterForm.goodsNumber" placeholder="商品编码"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label>商品名称</label>
                        <el-input v-model="filterForm.goodsName" placeholder="商品名称"></el-input>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>订单编号</label>
                        <el-input v-model="filterForm.orderNumber" placeholder="订单编号"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label>订单状态</label>
                        <el-select v-model="filterForm.orderState" placeholder="订单状态">
                            <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>成交时间</label>
                        <el-date-picker v-model="filterForm.dealTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                        <el-button @click="handleReset" style="margin-left: 36px;">重置</el-button>
                        <el-button @click="getTableData" type="primary" style="margin-left: 10px;">搜索订单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-table-box">
            <!-- <el-button type="text">批量发货</el-button> -->
            <el-table :data="orderTable" style="width: 100%;" border>
                <!-- <el-table-column type="selection" width="55" header-align="center" align="center"></el-table-column> -->
                <el-table-column header-align="center" align="center" type="index" label="序号"></el-table-column>
                <el-table-column prop="orderId" label="订单编号" width="160" header-align="center" align="center"></el-table-column>
                <el-table-column label="下单时间" width="150" align="center" header-align="center">
                    <template slot-scope="scope">{{_dateFormat('YYYY-mm-dd HH:MM', scope.row.createTime)}}</template>
                </el-table-column>
                <el-table-column prop="goodTitle" label="商品名称" min-width="180" header-align="center"></el-table-column>
                <el-table-column prop="customerTel" label="买家" width="100" align="center" header-align="center"></el-table-column>
                <el-table-column label="交易状态" width="90" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderStatus == '0'">待付款</span>
                        <span v-if="scope.row.orderStatus == '1'">待发货</span>
                        <span v-if="scope.row.orderStatus == '2'">待收货</span>
                        <span v-if="scope.row.orderStatus == '3'">已完成</span>
                        <span v-if="scope.row.orderStatus == '6'">退款中</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goodPrice" label="单价(元)" width="80" align="center" header-align="center"></el-table-column>
                <el-table-column prop="goodNumber" label="购买数量(件)" width="80" align="center" header-align="center"></el-table-column>
                <el-table-column prop="goodTotalPrice" label="实收款(元)" width="100" align="center" header-align="center"></el-table-column>
                <el-table-column label="操作" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.orderStatus == '1'" type="text" @click="sendout(scope.row)">发货</el-button>
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
                orderState: '1',
                dealTime: []
            },
            orderTable: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            orderStateList: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '待付款',
                    value: '0',
                },
                {
                    label: '待发货',
                    value: '1',
                },
                {
                    label: '待收货',
                    value: '2',
                },
                {
                    label: '已完成',
                    value: '3',
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
                }],
                disabledDate(time) {
                    return time.getTime() > new Date()
                },
            },
        }
    },
    watch: {
        'filterForm.orderState'() {
            this.getTableData()
        }
    },
    methods: {
        handleSizeChange(v) {
            this.pageSize = v
            this.getTableData()
        },
        handleCurrentChange(v) {
            this.currentPage = v
            this.getTableData()
        },
        sendout(row) {
            this.$router.push({ 
                name: 'user-sendout-goods',
                query: {
                    id: row.id
                }
            })
        },
        viewDeail(row) {
            this.$router.push({ 
                name: 'user-order-detail',
                query: {
                    id: row.id
                }
            })
        },
        handleReset() {
            this.currentPage = 1
            this.pageSize = 10
            this.filterForm.goodsNumber = ''
            this.filterForm.goodsName = ''
            this.filterForm.orderNumber = ''
            this.filterForm.orderState = ''
            this.filterForm.dealTime = []
            this.getTableData()
        },
        getTableData() {
            this.http({
                url: 'merchant/orderDetail/tCustomerOrderDetailSelbyPage',
                method: 'post',
                data: {
                    currentPage: this.currentPage,
                    pagesize: this.pageSize,
                    t: {
                        shop: this.$cookie.get('shopId'),
                        goodDetailCode: this.filterForm.goodsNumber,
                        goodTitle: this.filterForm.goodsName,
                        orderId: this.filterForm.orderNumber,
                        orderStatus: this.filterForm.orderState,
                        startDate: this.filterForm.dealTime? this.filterForm.dealTime[0] : null,
                        beginDate: this.filterForm.dealTime? this.filterForm.dealTime[1] : null
                    }
                }
            }, res => {
                if (res.data.code == 200) {
                    this.orderTable = res.data.data.rows
                    this.total = res.data.data.total
                }
            })
        }
    },
    mounted() {
        this.getTableData()
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