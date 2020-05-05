<template>
    <div class="approval-manage-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">审批管理</div>
        </div>
        <div class="count-wrapper">
            <el-row :gutter="0" justify="center">
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" @click.native="index=1" :class="{currentBox: index == 1}" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>商户认证</div>
                                    <div>
                                        <span>共3条</span>
                                        <span style="font-size: 14px; color: #999;">待审批</span>
                                    </div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" @click.native="index=2" :class="{currentBox: index == 2}" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>广告位申请</div>
                                    <div>
                                        <span>共3条</span>
                                        <span style="font-size: 14px; color: #999;">待审批</span>
                                    </div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" @click.native="index=3" :class="{currentBox: index == 3}" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>历史审批</div>
                                    <div>共3条</div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="approval-table">
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="index" align="center" header-align="center" width="50"></el-table-column>
                <el-table-column label="审批类型" align="center" header-align="center" width="200">
                    <template slot-scope="scope">
                        <span v-if="scope.row.approvalType == '1'">商户认证</span>
                        <span v-if="scope.row.approvalType == '2'">广告位申请</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shopMall" label="所在商场" align="center" header-align="center" min-width="220" show-overflow-tooltip></el-table-column>
                <el-table-column prop="shop" label="申请商户" align="center" header-align="center" width="220" show-overflow-tooltip></el-table-column>
                <el-table-column label="申请时间" align="center" header-align="center" width="200">
                    <template slot-scope="scope">
                        <span>{{_dateFormat('YYYY-mm-dd HH:MM', scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审批状态" align="center" header-align="center" width="120">
                    <template slot-scope="scope">
                        <span  v-if="scope.row.approvalStatus == '1'">待审核</span>
                        <span  v-if="scope.row.approvalStatus == '2'">审核通过</span>
                        <span  v-if="scope.row.approvalStatus == '3'">已拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" header-align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleApproval(scope.row)">详情</el-button>
                        <el-button v-if="scope.row.approvalStatus == '1'" type="text" @click="handleApproval(scope.row)">批复</el-button>
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
            index: 0,
            roleId: [],
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        }
    },
    watch: {
        index() {
            this.getTableData()
        }
    },
    methods: {
        handleCurrentChange(v) {
            this.currentPage = v
            this.getTableData()
        },
        handleSizeChange(v) {
            this.pageSize = v
            this.getTableData()
        },
        getTableData() {
            let obj = {}
            if (this.index != 3) {
                obj.approvalStatus = 1
                this.index == 0? obj.approvalType = undefined : obj.approvalType = this.index
            }
            if (this.roleId.includes('1')) {
                this.http({
                    url: 'merchant/tShop/tApprovalDetailFindByPage',
                    method: 'post',
                    data: {
                        currentPage: this.currentPage,
                        pagesize: this.pageSize,
                        t: obj
                    }
                }, res => {
                    if (res.data.code == 200) {
                        this.total = res.data.data.total
                        this.tableData = res.data.data.rows
                    }
                })
            }else {
                this.http({
                    url: 'merchant/tShop/tApprovalDetailFindByPageAsUser',
                    method: 'post',
                    data: {
                        currentPage: this.currentPage,
                        pagesize: this.pageSize,
                        t: obj
                    }
                }, res => {
                    if (res.data.code == 200) {
                        this.total = res.data.data.total
                        this.tableData = res.data.data.rows
                    }
                })
            }
            
        },
        handleApproval(row) {
            this.$router.push({
                name: 'admin-approval-detail',
                query: {
                    id: row.id,
                    iidd: row.iidd,
                    type: row.approvalType,
                    index: this.index
                }
            })
        }
    },
    mounted() {
        this.roleId = JSON.parse(this.$cookie.get('roleId'))
        if (this.$route.query.index) {
            this.index = this.$route.query.index
        }
        this.getTableData()
    }
}
</script>

<style lang="scss" scoped>
.count-box-top{
    display: flex;
    .count-box-top-left{
        flex-grow: 1;
        div:first-child{
            font-size: 16px;
            padding: 5px 0;
        }
        div:last-child{
            font-size: 20px;
            padding-top: 5px;
        }
    }
    .count-box-top-right{
        font-size: 60px;
    }
}
.card-item{
    width: 240px;
    margin: 0 auto;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        box-shadow: 0 5px 12px 0 rgba(23, 179, 163, .5);
    }
}
.approval-table{
    margin-top: 20px;
}
.currentBox{
    border: 1px solid #17B3A3;
}
</style>