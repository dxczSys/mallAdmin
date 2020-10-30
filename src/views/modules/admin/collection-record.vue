<template>
  <div class="receive-record">
    <tabs-title tabs-name="领取记录"></tabs-title>
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" label-width="100px" :inline="true" size="small">
        <el-form-item label="优惠券名称">
          <el-input v-model="searchForm.couponName" clearable placeholder="优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="优惠券状态">
          <el-select v-model="searchForm.couponStatus" clearable @change="handleSearch" placeholder="请选择">
            <el-option v-for="item in coupon_search_status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-select v-model="searchForm.useStatus" clearable @change="handleSearch" placeholder="请选择">
            <el-option v-for="item in use_states_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领取人">
          <el-input v-model="searchForm.receiveUser" clearable placeholder="领取人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券名称" prop="couponName" min-width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="领取人" prop="phone" width="150" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券面值" width="150" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponParPrice }}
            <span>{{ scope.row.couponModus == 1 ? '￥' : '折'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用门槛" width="120" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponCondition | coupon_condition_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券生效时间" prop="effectDate" width="180" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券过期时间" prop="expiredDate" width="180" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券状态" width="150" align="center" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.couponStatus | coupon_status_filter }}
          </template>
        </el-table-column>
        <el-table-column label="使用状态" width="150" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.isUse === 0 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="领取时间" prop="createTime" width="180" align="center" header-align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import { coupon_search_status_options, use_states_options } from '@/enumerate/coupon'
import * as couponFilter from '@/filters/coupon'
export default {
  components: { tabsTitle },
  filters: { ...couponFilter },
  data() {
    return {
      coupon_search_status_options,
      use_states_options,
      searchForm: {
        couponName: '',
        couponStatus: '',
        useStatus: '',
        receiveUser: ''
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.http({
        url: `market/coupon/queryCouponReceiveDetail`,
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          t: {
            couponName: this.searchForm.couponName || undefined,
            couponStatus: this.searchForm.couponStatus || undefined,
            useStatus: this.searchForm.useStatus || undefined,
            receiveUser: this.searchForm.receiveUser || undefined
          }
        }
      }, res => {
        if (res.data.code === 200) {
          let obj = res.data.data
          this.tableData = obj.rows
          this.total = obj.total
        }
      })
    },
    handleSearch() {
      this.getTableData()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    }
  }
}
</script>
