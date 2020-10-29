<template>
  <div class="receive-record">
    <tabs-title tabs-name="领取记录"></tabs-title>
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" label-width="100px" :inline="true" size="small">
        <el-form-item label="优惠券名称">
          <el-input v-model="searchForm.couponName" placeholder="优惠券名称"></el-input>
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
          <el-input v-model="searchForm.receivePerson" placeholder="领取人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券名称" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="领取人" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券面值" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="使用门槛" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券生效时间" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券过期时间" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券状态" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="使用状态" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="领取时间" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
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
export default {
  components: { tabsTitle },
  data() {
    return {
      coupon_search_status_options,
      use_states_options,
      searchForm: {
        couponName: '',
        couponStatus: '',
        useStatus: '',
        receivePerson: ''
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    getTableData() {
      this.http({
        url: `market/coupon/queryCouponReceiveDetail/${this.currentPage}/${this.pagesize}`,
        method: 'get'
      }, res => {
        if (res.data.code === 200) {

        }
      })
    },
    handleSearch() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
}
</script>
