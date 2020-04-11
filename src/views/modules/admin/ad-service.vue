<template>
    <div class="ad-service-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">广告位管理</div>
        </div>
        <div class="filter-box">
            <el-row :gutter="40">
                <el-col class="filter-col" :span="8">
                    <label>所属商场</label>
                    <el-select v-model="mallId" placeholder="所属商场">
                        <el-option v-for="item in mallList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col class="filter-col" :span="8">
                    <label>广告位类型</label>
                    <el-select v-model="adType" placeholder="广告位类型">
                        <el-option v-for="item in adList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col class="filter-col" :span="5">
                    <label>是否到期</label>
                    <el-select v-model="isExpired" placeholder="是否到期">
                        <el-option v-for="item in expireList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" size="small">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table-box">
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
                <el-table-column header-align="center" align="center" prop="prop" label="广告位类型"></el-table-column>
                <el-table-column header-align="center" align="center" prop="prop" label="所在商场"></el-table-column>
                <el-table-column header-align="center" align="center" prop="prop" label="商铺名称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="prop" label="剩余时长"></el-table-column>
                <el-table-column header-align="center" align="center" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text">提醒到期</el-button>
                        <el-button type="text" style="color: #F56C6C;">强制下架</el-button>
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
            mallId: '',
            adType: '',
            isExpired: '',
            mallList: [],
            tableData: [{
                id: '1'
            }],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            adList: [
                {
                    id: '1',
                    label: '置顶广告位',
                },
                {
                    id: '2',
                    label: '促销广告位',
                },
            ],
            expireList: [
                {
                    id: '0',
                    label: '是'
                },
                {
                    id: '1',
                    label: '否'
                }
            ]
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
.filter-col{
    display: flex;
    align-items: center;
    label{
        margin-right: 10px;
        flex-shrink: 0;
    }
    /deep/ .el-select{
        flex-grow: 1;
    }
}
.table-box{
    margin-top: 20px;
}
</style>