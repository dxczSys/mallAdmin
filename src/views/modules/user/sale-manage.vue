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
                        <label class="col-label">订单编号</label>
                        <el-input v-model="filterForm.orderNumber" placeholder="请输入订单编号"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label class="col-label">退款状态</label>
                        <el-select v-model="filterForm.orderState" placeholder="请选择订单状态">
                            <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label class="col-label">运单号</label>
                        <el-input v-model="filterForm.goodsNumber" placeholder="请输入退货运单号"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label class="col-label">申请时间</label>
                        <el-date-picker v-model="filterForm.applyTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
                        <el-button type="primary" style="margin-left: 10px;">查询</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-table-box">
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column header-align="center" min-width="200" label="商品名称">
                    <template slot-scope="scope">
                        <div class="table-goods-box">
                            <img :src="scope.row.url">
                            <div class="table-goods-des">
                                <div>{{scope.row.goodsName}}</div>
                                <div>商品编码:{{scope.row.id}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" header-align="center" width="100" align="center" label="交易金额">
                </el-table-column>
                <el-table-column prop="num" header-align="center" width="100" align="center" label="退款金额">
                </el-table-column>
                <el-table-column prop="sellNum" header-align="center" align="center" width="160" label="申请时间">
                </el-table-column>
                <el-table-column prop="state" header-align="center" align="center" width="200" label="原因">
                </el-table-column>
                <el-table-column prop="time" header-align="center" width="150" align="center" label="状态">
                </el-table-column>
                <el-table-column header-align="center" align="center" width="100" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="dealWith(scope.row)">审批处理</el-button>
                        <el-button type="text" style="color: 409eff; margin-left: 0;">确认收货</el-button>
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
                orderNumber: '',
                goodsNumber: '',
                orderState: '',
                applyTime: ''
            },
            tableData: [
                {
                    goodsName: 'Python代码代做代写网络爬虫数据抓取分析程序代写爬虫定制GUIweb',
                    id: '599344673442',
                    url: require('@/assets/img/goods.png'),
                }
            ],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            orderStateList: [
                {
                    label: '全部',
                    value: '',
                },
                {
                    label: '退款进行中',
                    value: '1',
                },
                {
                    label: '退款待处理',
                    value: '2',
                },
                {
                    label: '已拒绝退款',
                    value: '3',
                },
                {
                    label: '待买家发货',
                    value: '4',
                },
                {
                    label: '待卖家收货',
                    value: '5',
                },
                {
                    label: '退款成功',
                    value: '2',
                },
                {
                    label: '退款关闭',
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
        dealWith(row) {
            this.$router.push({ name: 'user-dealwith-sale'})
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
    .col-label{
        display: inline-block;
        width: 5em;
        text-align: right;
        margin-right: 10px;
    }

}
.order-table-box{
    border-top: 1px solid #eee;
}
.table-goods-box{
    display: flex;
    img{
        width: 100px;
        height: 100px;
        object-fit: contain;
        border-radius: 4px;
    }
    .table-goods-des{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        div:first-child{
            max-width: 310px;
        }
    }

}
</style>