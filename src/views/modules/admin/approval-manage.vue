<template>
    <div class="approval-manage-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">审批管理</div>
        </div>
        <div class="count-wrapper">
            <el-row :gutter="0" justify="center">
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>商户认证审批</div>
                                    <div>共3条</div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                            <div class="count-box-bottom">
                                2020-04-08 13:50
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>商户认证审批</div>
                                    <div>共3条</div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                            <div class="count-box-bottom">2020-04-08 13:50</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ padding: '15px' }" class="card-item">
                        <div class="count-box">
                            <div class="count-box-top">
                                <div class="count-box-top-left">
                                    <div>商户认证审批</div>
                                    <div>共3条</div>
                                </div>
                                <div class="count-box-top-right">
                                    <icon-svg name="dianji"></icon-svg>
                                </div>
                            </div>
                            <div class="count-box-bottom">
                                2020-04-08 13:50
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div class="approval-table">
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="index" align="center" header-align="center" width="50"></el-table-column>
                <el-table-column prop="" label="审批类型" align="center" header-align="center" width="200"></el-table-column>
                <el-table-column prop="" label="所在商场" align="center" header-align="center" min-width="220"></el-table-column>
                <el-table-column prop="" label="申请商户" align="center" header-align="center" width="220"></el-table-column>
                <el-table-column prop="" label="申请时间" align="center" header-align="center" width="200"></el-table-column>
                <el-table-column label="操作" align="center" header-align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleApproval(scope.row)">批复</el-button>
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
            tableData: [{
                id: '1'
            }],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        }
    },
    methods: {
        handleCurrentChange(v) {
            this.currentPage = v
        },
        handleSizeChange(v) {
            this.pageSize = v
        },
        handleApproval(row) {
            this.$router.push({
                name: 'admin-approval-detail'
            })
        }
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
.count-box-bottom{
    color: #999;
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
</style>