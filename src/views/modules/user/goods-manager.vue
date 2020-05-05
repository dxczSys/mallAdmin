<template>
    <div class="goods-manager-wrapper">
        <div class="filter-box">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">商品管理</div>
            </div>
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
                        <label>销售状态</label>
                        <el-select v-model="filterForm.sellState" placeholder="请选择销售状态">
                            <el-option v-for="(item, index) in sellStateList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-button @click="resetForm" style="margin-left: 10px;">重置</el-button>
                        <el-button @click="getGoodsList" type="primary">查询</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-content-box">
            <el-button type="text" @click="handleManyPut">批量上架</el-button>
            <el-table :data="tableData" @selection-change="selectionChange" style="width: 100%;">
                <el-table-column type="selection" :selectable="isSelect" width="55"></el-table-column>
                <el-table-column header-align="center" min-width="200" label="商品名称">
                    <template slot-scope="scope">
                        <div class="table-goods-box">
                            <img :src="fileUrl + scope.row.goodPic">
                            <div class="table-goods-des">
                                <div>{{scope.row.goodTitle}}</div>
                                <div>商品编码：{{scope.row.goodCode || '无'}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" width="120" align="center" label="价格">
                    <template slot-scope="scope">
                        <span>￥{{scope.row.goodPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goodNumber" header-align="center" width="80" align="center" label="库存">
                </el-table-column>
                <el-table-column prop="goodSales" header-align="center" align="center" width="80" label="销量">
                </el-table-column>
                <el-table-column header-align="center" align="center" width="80" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.goodIsUpperShelf == '1'? '在售' : '已下架'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="time" header-align="center" width="150" align="center" label="发布时间">
                    <template slot-scope="scope">
                        <span>{{_dateFormat('YYYY-mm-dd HH:MM', scope.row.goodCreateTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" width="150" label="操作">
                    <template slot-scope="scope">
                        <div><el-button @click="toEdit(scope.row)" type="text">编辑|详情</el-button></div>
                        <div><el-button v-if="scope.row.goodIsUpperShelf == '1'" @click="immediatelyShelf(scope.row)" type="text" style="color: #E6A23C;">立即下架</el-button></div>
                        <div><el-button v-if="scope.row.goodIsUpperShelf == '2'" @click="immediatelyPut(scope.row)" type="text">立即上架</el-button></div>
                        <div><el-button @click="handleDelete(scope.row)" type="text" style="color: #F56C6C;">删除</el-button></div>
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
            fileUrl: window.SITE_CONFIG.fileUrl,
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            checkboxValue: [],
            filterForm: {
                goodsName: '',
                goodsNum: '',
                sellState: '',
            },
            sellStateList: [{
                label: '全部',
                value: '',
            },{
                label: '在售',
                value: '1',
            },{
                label: '已下架',
                value: '2',
            }],
        }
    },
    methods: {
        isSelect(row, index) {
            if (row.goodIsUpperShelf == '2') {
                return true
            }else {
                return false
            }
        },
        selectionChange(selection) {
            let arr = []
            selection.forEach(item => {
                arr.push(item.id)
            })
            this.checkboxValue = arr
        },
        handleCurrentChange(v) {
            this.currentPage = v
        },
        handleSizeChange(v) {
            this.pageSize = v
        },
        getGoodsList() {
            this.http({
                url: 'merchant/good/tGoodSelByPage',
                method: 'post',
                data: {
                    currentPage: this.currentPage,
                    pagesize: this.pageSize,
                    t: {
                        goodTitle: this.filterForm.goodsName,
                        goodIsUpperShelf: this.filterForm.sellState,
                        goodCode: this.filterForm.goodsNum,
                        goodShop: this.$cookie.get('shopId')
                    }
                }
            }, res => {
                if (res.data.code == 200) {
                    this.total = res.data.data.total
                    this.tableData = res.data.data.rows
                }
            })
        },
        resetForm() {
            this.filterForm.goodsName = ''
            this.filterForm.goodsNum = ''
            this.filterForm.sellState = ''
            this.getGoodsList()
        },
        immediatelyShelf(row) {
            this.$confirm('立即下架该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.http({
                    url: 'merchant/good/tGoodSelLowerShelfByGoodId',
                    method: 'post',
                    data: [row.id]
                }, res => {
                    if (res.data.code == 200) {
                        row.goodIsUpperShelf = '2'
                        this.$message.success('下架成功！')
                    }
                })
            }).catch(() => {})
        },
        immediatelyPut(row) {
            this.$confirm('立即上架该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                this.http({
                    url: 'merchant/good/tGoodSelUpShelfByGoodId',
                    method: 'post',
                    data: [row.id]
                }, res => {
                    if (res.data.code == 200) {
                        row.goodIsUpperShelf = '1'
                        this.$message.success('上架成功！')
                    }
                })
            }).catch(() => {})
        },
        handleManyPut() {
            if (this.checkboxValue.length) {
                this.$confirm('立即上架所选商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.http({
                        url: 'merchant/good/tGoodSelUpShelfByGoodId',
                        method: 'post',
                        data: this.checkboxValue
                    }, res => {
                        if (res.data.code == 200) {
                            this.getGoodsList()
                            this.$message.success('上架成功！')
                        }
                    })
                }).catch(() => {})
            }
        },
        handleDelete(row) {
            if (row.goodIsUpperShelf == '2') {
                this.$confirm('删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.http({
                        url: 'merchant/good/tGoodDelById',
                        method: 'get',
                        data: {
                            goodId: row.id
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            this.$message.success('删除成功！')
                            this.getGoodsList()
                        }
                    })
                }).catch(() => {})
            }else {
                this.$message.info('请先下架该商品方可删除')
            }
        },
        toEdit(row) {
            this.$router.push({
                name: 'user-edit-goods',
                query: {
                    id: row.id
                }
            })
        }
    },
    mounted() {
        this.getGoodsList()
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