<template>
  <div class="receive-record">
    <tabs-title tabs-name="验券记录"></tabs-title>
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" label-width="100px" :inline="true" size="small">
        <el-form-item label="优惠券码">
          <el-input v-model="searchForm.couponIdentify" clearable placeholder="优惠券码"></el-input>
        </el-form-item>
        <el-form-item label="是否到账">
          <el-select v-model="searchForm.isPay" clearable @change="handleSearch" placeholder="请选择">
            <el-option v-for="item in arrive_account_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验券时间">
          <el-date-picker v-model="searchForm.checkDate" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions" @change="handleSearch" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" 
            align="right"></el-date-picker>
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
        <el-table-column label="优惠码" prop="couponName" width="220" align="center" header-align="center"></el-table-column>
        <el-table-column label="使用人" prop="customerPhone" width="220" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券面值" width="220" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponParPrice }}
            <span>{{ scope.row.couponModus == 1 ? '￥' : '折'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="验券时间" prop="checkCouponCreateTime" width="260" align="center" header-align="center"></el-table-column>
        <el-table-column label="划账金额" width="220" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponPrice }}￥
          </template>
        </el-table-column>
        <el-table-column label="是否到账" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.isPay === 1? '是' : '否' }}
          </template>
        </el-table-column>
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
import { arrive_account_options } from '@/enumerate/coupon'
import { mapState } from 'vuex'
export default {
  components: { tabsTitle },
  data() {
    return {
      arrive_account_options,
      searchForm: {
        couponIdentify: '',
        isPay: '',
        checkDate: []
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    ...mapState('mall', ['shop_id'])
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.http({
        url: `market/coupon/queryCheckCouponDetail`,
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          t: {
            shopId: this.shop_id,
            couponIdentify: this.searchForm.couponIdentify || undefined,
            isPay: this.searchForm.isPay || undefined,
            startCheckCouponCreateTime: this.searchForm.checkDate[0] || undefined,
            endCheckCouponCreateTime: this.searchForm.checkDate[1] || undefined
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
