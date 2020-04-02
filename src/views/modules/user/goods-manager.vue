<template>
    <div class="goods-manager-wrapper">
        <div class="filter-box">
            <span style="font-weight: 600;">条件查询</span>
            <div class="filter-form">
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>商品名称</label>
                        <el-input v-model="filterForm.goodsName" placeholder="请输入商品名称"></el-input>
                    </div>
                    <div class="filter-form-col">
                        <label>商品编码</label>
                        <el-input v-model="filterForm.goodsNum" placeholder="请输入商品编码"></el-input>
                    </div>
                </div>
                <div class="filter-form-row">
                    <div class="filter-form-col">
                        <label>商品类目</label>
                        <filter-tree v-model="filterForm.goodsKinds" :data="goodsKindsList" width="360" :showCheckbox="showCheckbox"></filter-tree>
                    </div>
                    <div class="filter-form-col">
                        <label>销售状态</label>
                        <el-select v-model="filterForm.firstLevel" placeholder="请选择销售状态">
                            <el-option v-for="(item, index) in sellStateList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-button style="margin-left: 10px;">重置</el-button>
                        <el-button type="primary">查询</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-content-box">
            <el-button type="text">批量上架</el-button>
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
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
                <el-table-column prop="price" header-align="center" width="120" align="center" label="价格">
                </el-table-column>
                <el-table-column prop="num" header-align="center" width="80" align="center" label="库存">
                </el-table-column>
                <el-table-column prop="sellNum" header-align="center" align="center" width="80" label="销量">
                </el-table-column>
                <el-table-column prop="state" header-align="center" align="center" width="80" label="状态">
                </el-table-column>
                <el-table-column prop="time" header-align="center" width="150" align="center" label="发布时间">
                </el-table-column>
                <el-table-column header-align="center" align="center" width="150" label="操作">
                    <template slot-scope="scope">
                        <div><el-button type="text">编辑/详情</el-button></div>
                        <div><el-button type="text">立即下架</el-button></div>
                        <div><el-button type="text" style="color: #F56C6C;">删除</el-button></div>
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
import filterTree from '@/components/filter-tree'
export default {
    components: { filterTree },
    data() {
        return {
            showCheckbox: true,
            tableData: [{
                goodsName: 'Python代码代做代写网络爬虫数据抓取分析程序代写爬虫定制GUIweb',
                id: '599344673442',
                url: require('@/assets/img/goods.png'),
                price: '￥45.00',
                num: 23,
                sellNum: 0,
                state: '在售',
                time: '2020-01-02 12:00'
            }],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            filterForm: {
                goodsName: '',
                goodsNum: '',
                goodsKinds: '',
                sellState: '',
            },
            sellStateList: [{
                label: '全部',
                value: '',
            },{
                label: '在售',
                value: '1',
            },{
                label: '下架',
                value: '2',
            }],
            goodsKindsList: [
                {
                    id: 1,
                    label: '一级 1',
                    level: 1,
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        level: 2,
                        children: [{
                            id: 9,
                            label: '三级 1-1-1',
                            level: 3
                        }, {
                            id: 10,
                            label: '三级 1-1-2',
                            level: 3
                        }]
                    }]
                }
            ],
        }
    },
    methods: {
        handleCurrentChange(v) {
            this.currentPage = v
        },
        handleSizeChange(v) {
            this.pageSize = v
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
    margin-right: 40px;
    label{
        margin-right: 10px;
    }
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