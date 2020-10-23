<template>
  <div class="coupon">
    <tabs-title tabs-name="优惠券"></tabs-title>
    <coupon-search></coupon-search>
    <div class="add">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">新制优惠券</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券名称" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券类型" width="120" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponType | coupon_type_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠形式" width="120" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponModus | preferential_form_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券面值" width="120" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponParPrice }}
            <span>{{ scope.row.couponModus == 1 ? '￥' : '折'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="优惠券发放形式" width="160" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponDistributionForm | coupon_modus_filter }}
          </template>
        </el-table-column>
        <el-table-column label="使用门槛" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponCondition | coupon_condition_filter }}
          </template>
        </el-table-column>
        <el-table-column label="每人限领" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponLimit | coupon_limit_filter }}
          </template>
        </el-table-column>
        <el-table-column label="领取截止时间" prop="receiveEndTime" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券生效时间" prop="effectDate" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券过期时间" prop="expiredDate" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券所属商城" prop="" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="使用说明" prop="" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="发布总量" prop="" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="是否立即发布" prop="" width="200" align="center" header-align="center"></el-table-column>
        
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

    <el-dialog v-if="dialogVisible" title="新制优惠券" center :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
      <add-coupon :dialog-visible.sync="dialogVisible" @addCoupon="addCoupon"></add-coupon>
    </el-dialog>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import couponSearch from './components/coupon-search'
import addCoupon from './components/add-coupon'
import * as couponFilter from '@/filters/coupon'
export default {
  components: { tabsTitle, couponSearch, addCoupon },
  filters: { ...couponFilter },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    cancelAdd() {
      this.dialogVisible = false
    },
    addCoupon(res) {
      if (res.code === 200) {
        this.dialogVisible = false
        this.$message.success('新制优惠券成功！')
      }
    },
    getTableData() {
      this.http({
        url: 'market/coupon/queryCouponList',
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          t: {}
        }
      }, res => {
        if (res.data.code === 200) {
          const obj = res.data.data
          this.tableData = obj.rows
          this.total = obj.total
        }
      })
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
}
</script>
<style lang="scss" scoped>
.add{
  margin-bottom: 20px;
}
</style>
