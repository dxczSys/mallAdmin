<template>
  <div class="coupon">
    <tabs-title tabs-name="优惠券"></tabs-title>
    <coupon-search @search="handleSearch"></coupon-search>
    <div class="add">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">新制优惠券</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券名称" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券类型" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponType | coupon_type_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠形式" width="120" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponModus | preferential_form_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券面值" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponParPrice }}
            <span>{{ scope.row.couponModus == 1 ? '￥' : '折'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布总量" prop="couponNumber" width="100" align="center" header-align="center"></el-table-column>
        <el-table-column label="发布总金额" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.pushTotalMoney }}￥
          </template>
        </el-table-column>
        <el-table-column label="剩余数量" prop="couponSurplusNumber" width="100" align="center" header-align="center"></el-table-column>
        <el-table-column label="剩余总金额" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.surplusTotalMoney }}￥
          </template>
        </el-table-column>
        <el-table-column label="优惠券发放形式" width="160" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponDistributionForm | coupon_modus_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券价格" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            <span v-if="scope.row.couponDistributionForm === 2">{{ scope.row.couponPrice }}￥</span>
            <span v-else>免费</span>
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
        <el-table-column label="优惠券状态" prop="" width="100" align="center" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.couponStatus | coupon_status_filter }}
          </template>
        </el-table-column>
        <el-table-column label="优惠券适用商城" width="150" align="center" header-align="center">
          <template slot-scope="scope">
            <pre class="coupon-instructions">{{ scope.row.shopMallName.replace(/(,)/g, '\n') }}</pre>
          </template>
        </el-table-column>
        <!-- <el-table-column label="优惠券适用商品" width="150" align="center" header-align="center">
          <template slot-scope="scope">
            <pre v-if="scope.row.couponType == 3" class="coupon-instructions">{{ scope.row.goodName && (scope.row.goodName.replace(/(,)/g, '\n')) }}</pre>
          </template>
        </el-table-column> -->
        <el-table-column label="领取截止时间" prop="receiveEndTime" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券生效时间" prop="effectDate" width="160" align="center" header-align="center"></el-table-column>
        <el-table-column label="优惠券过期时间" prop="expiredDate" width="160" align="center" header-align="center"></el-table-column>
        <!-- <el-table-column label="使用说明" width="200" align="center" header-align="center">
          <template slot-scope="scope">
            <pre class="coupon-instructions">{{ scope.row.couponInstructions }}</pre>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" align="center" header-align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetail(scope.row)">查看</el-button>
            <el-button v-if="scope.row.couponStatus === 4" type="text" size="small" @click="handleRelease(scope.row)">发布</el-button>
            <el-button v-if="scope.row.couponStatus === 1" type="text" size="small" @click="handleExpired(scope.row, 2)" style="margin-left: 0;">立即关闭</el-button>
            <el-button v-if="scope.row.couponStatus === 1 || scope.row.couponStatus === 3" type="text" size="small" @click="handleExpired(scope.row, 1)" style="margin-left: 0;">立即失效</el-button>
            <el-button v-if="scope.row.couponStatus === 2" type="text" size="small" @click="handleDelete(scope.row)" style="margin-left: 0;">删除</el-button>
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

    <el-dialog v-if="dialogVisible" title="新制优惠券" center :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
      <add-coupon :dialog-visible.sync="dialogVisible" @addCoupon="addCoupon"></add-coupon>
    </el-dialog>

    <el-dialog v-if="viewDialogVisible" title="查看优惠券" center :visible.sync="viewDialogVisible" width="40%">
      <add-coupon :coupon-detail="couponDetail" :is-view="true"></add-coupon>
    </el-dialog>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import couponSearch from './components/coupon-search'
import addCoupon from './components/add-coupon'
import * as couponFilter from '@/filters/coupon'
import { mapState } from 'vuex'
export default {
  components: { tabsTitle, couponSearch, addCoupon },
  filters: { ...couponFilter },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      viewDialogVisible: false,
      couponDetail: {}
    }
  },
  computed: {
    ...mapState('mall', ['mall_id'])
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
        this.currentPage = 1
        this.pagesize = 10
        this.getTableData()
      } else {
        this.$message.info(res.data.msg)
      }
    },
    getTableData(form = {}) {
      this.http({
        url: 'market/coupon/queryCouponList1',
        method: 'post',
        data: {
          currentPage: this.currentPage,
          pagesize: this.pagesize,
          t: {
            ...this.form,
            shopMallId: this.mall_id
          }
        }
      }, res => {
        if (res.data.code === 200) {
          const obj = res.data.data
          this.tableData = obj.rows
          this.total = obj.total
        }
      })
    },
    handleDelete(row) {
      this.http({
        url: `market/coupon/couponDelete/${row.id}`,
        method: 'get'
      }, res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功！')
          this.getTableData()
        } else {
          this.$message.info(res.data.msg)
        }
      })
    },
    handleExpired(row, type) {
      this.http({
        url: `market/coupon/couponStatusUpd/${row.id}/${type}`,
        method: 'get'
      }, res => {
        if (res.data.code === 200) {
          type === 1 && (this.$message.success('已失效！'))
          type === 2 && (this.$message.success('已关闭！'))
          this.getTableData()
        } else {
          this.$message.info(res.data.msg)
        }
      })
    },
    handleRelease(row) {
      this.http({
        url: `market/coupon/couponRelease/${row.id}`,
        method: 'get'
      }, res => {
        if (res.data.code === 200) {
          this.$message.success('发布成功')
          this.getTableData()
        } else {
          this.$message.info(res.data.msg)
        }
      })
    },
    viewDetail(row) {
      this.http({
        url: `market/coupon/getCouponInfo/${row.id}`,
        method: 'get'
      }, res => {
        if (res.data.code === 200) {
          this.couponDetail = res.data.data
          this.viewDialogVisible = true
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    handleSearch(form) {
      let params = {}
      for (let key in form) {
        if (form[key]) {
          params[key] = form[key]
        }
      }
      this.getTableData(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.add{
  margin-bottom: 20px;
}
.coupon-instructions{
  max-height: 100px;
  overflow: auto;
  text-align: left;
}
.table{
  /deep/ .el-table{
    ::-webkit-scrollbar{  
      width: 3px;  
      height: 6px;  
      background-color: #F5F5F5;  
    }   
    ::-webkit-scrollbar-track{  
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);  
      border-radius: 4px;  
      background-color: #F5F5F5;  
    }    
    ::-webkit-scrollbar-thumb{  
      border-radius: 4px;  
      box-shadow: inset 0 0 6px #eee;  
      background-color: #bdbdbd;  
    }  
    ::-webkit-scrollbar-thumb:hover{
      border-radius: 4px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
