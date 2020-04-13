<template>
    <div class="ad-setprice-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">广告位定价</div>
        </div>
        <div class="top-operate">
            <div>
                <el-radio v-model="adType" label="1">置顶广告位</el-radio>
                <el-radio v-model="adType" label="2">促销广告位</el-radio>
            </div>
            <div style="">
                <el-button type="primary" size="small" @click="addData">新增</el-button>
            </div>
        </div>
        <div class="table-box">
            <el-table :data="tableData" style="width: 100%;" v-if="isrRefresh" border>
                <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
                <el-table-column label="时长(天)" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-input type="number" v-if="scope.row.isEdit" v-model="scope.row.advertDay" placeholder="时长"></el-input>
                        <span v-else>{{scope.row.advertDay}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="价格(元)" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-input type="number" v-if="scope.row.isEdit" v-model="scope.row.advertPrice" placeholder="价格"></el-input>
                        <span v-else>{{scope.row.advertPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="排序" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-input type="number" v-if="scope.row.isEdit" v-model="scope.row.advertOrder" placeholder="排序"></el-input>
                        <span v-else>{{scope.row.advertOrder}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="updeData(scope)">修改</el-button>
                        <el-button type="text" @click="deleteData(scope)" style="color: #F56C6C;">删除</el-button>
                        <el-button @click="saveData(scope)" type="text">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            adType: '1',
            tableData: [],
            isrRefresh: true
        }
    },
    watch: {
        adType() {
            this.getTableData()
        }
    },
    methods: {
        addData() {
            let arr = []
            this.tableData.forEach(item => {
                arr.push(parseInt(item.advertOrder))
            })
            this.tableData.push({
                advertType: this.adType,
                advertDay: 10,
                advertPrice: 1.0,
                advertOrder: arr.length? Math.max(...arr) + 1 : 1,
                isEdit: true
            })
        },
        updeData(scope) {
            scope.row.isEdit = true
            this.isrRefresh = false
            this.$nextTick(_ => { this.isrRefresh = true })
        },
        deleteData(scope) {
            this.$confirm('确认删除该, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (scope.row.id) {
                    this.http({
                        url: 'admin/TAdvertPriceType/tAdvertPriceTypeDelById',
                        method: 'get',
                        data: { id: scope.row.id }
                    }, res => {
                        if (res.data.code == 200) {
                            this.tableData.splice(scope.$index, 1)
                            this.$message.success('删除成功')
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }else {
                    this.tableData.splice(scope.$index, 1)
                }
            }).catch(() => {})
        },
        getTableData() {
            this.http({
                url: 'admin/TAdvertPriceType/tAdvertPriceTypeSelAll',
                method: 'get',
                data: {
                    query: this.adType
                }
            }, res => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data
                }
            })
        },
        saveData(scope) {
            let row = scope.row
            if (row.advertDay && row.advertPrice && row.advertOrder) {
                if (row.id) {
                    this.http({
                        url: 'admin/TAdvertPriceType/tAdvertPriceTypeUpd',
                        method: 'post',
                        data: {
                            id: row.id,
                            advertType: this.adType,
                            advertDay: parseInt(row.advertDay),
                            advertPrice: parseFloat(row.advertPrice),
                            advertOrder: parseInt(row.advertOrder)
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            row.isEdit = false
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }else {
                    this.http({
                        url: 'admin/TAdvertPriceType/tAdvertPriceTypeAdd',
                        method: 'post',
                        data: {
                            advertType: this.adType,
                            advertDay: parseInt(row.advertDay),
                            advertPrice: parseFloat(row.advertPrice),
                            advertOrder: parseInt(row.advertOrder)
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            row.isEdit = false
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            }else {
                this.$message.info('所有参数必填！')
            }
        }
    },
    mounted() {
        this.getTableData()
    }
}
</script>

<style lang="scss" scoped>
.top-operate{
    display: flex;
    justify-content: space-between;
}
.table-box{
    margin-top: 20px;
}
</style>