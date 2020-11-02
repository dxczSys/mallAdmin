<template>
  <div class="finance">
    <tabs-title tabs-name="财务管理"></tabs-title>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px' }" class="card-item">
          <div class="info-item">
            <div class="item-top">
              <div class="item-top-left">
                <div class="block-title">可提现余额</div>
                <div class="primary-info">￥{{available_amount}}</div>
              </div>
              <div class="item-top-right">
                <icon-svg name="yue"></icon-svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px' }" class="card-item">
          <div class="info-item">
            <div class="item-top">
              <div class="item-top-left">
                <div class="block-title">冻结余额</div>
                <div class="primary-info">￥{{pending_amount}}</div>
              </div>
              <div class="item-top-right">
                <icon-svg name="dongjie"></icon-svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="dialogVisible = true">提现</el-button>
      </el-col>
    </el-row>
    <tabs-title tabs-name="提现记录" :top="10"></tabs-title>
    <div>
      <span style="margin-right: 10px;">提现状态</span>
      <el-select v-model="stateValue">
        <el-option
          v-for="item in withdraw_state_options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%; margin-top: 15px;" border>
      <el-table-column
        type="index"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        label="提现金额(元)"
        prop="withdrawalMoney"
        width="200"
        align="center"
        header-align="center"></el-table-column>
      <el-table-column
        label="提现时间"
        prop="createTime"
        width="200"
        align="center"
        header-align="center">
        <template slot-scope="scope">
          <span>{{_dateFormat('YYYY-mm-dd HH:MM', scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="微信支付提现单号"
        prop="withdrawId"
        width="300"
        align="center"
        header-align="center"
      ></el-table-column>
      <el-table-column
        label="商户提现单号"
        prop="outRequestNo"
        width="200"
        align="center"
        header-align="center"></el-table-column>
      <el-table-column
        label="提现状态"
        width="200"
        align="center"
        header-align="center">
        <template slot-scope="scope">
          {{ scope.row.status | withdraw_state_filter }}
        </template>
      </el-table-column>
      <el-table-column
        label="失败原因"
        prop="reason"
        min-width="200"
        align="center"
        header-align="center"></el-table-column>
      <el-table-column
        label="操作"
        width="100"
        align="center"
        header-align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSearch(scope.row)">查询</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :total="total">
    </el-pagination>

    <el-dialog
      v-if="dialogVisible"
      title="提现"
      width="400px"
      :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="提现金额" :label-width="100" required>
          <el-input v-model="form.money" v-number="2" style="width: 220px;">
            <span slot="append">￥</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { withdraw_state_options } from '@/enumerate/userFinance'
import * as userFinance from '@/filters/userFinance'
import { number } from '@/directives/number/index'
import tabsTitle from '@/components/tabs-title'
export default {
  directives: { number },
  components: { tabsTitle },
  filters: { ...userFinance },
  data() {
    return {
      withdraw_state_options,
      available_amount: '',
      pending_amount: '',
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      stateValue: '',
      dialogVisible: false,
      form: {
        money: ''
      }
    }
  },
  watch: {
    stateValue(n) {
      this.getTableData()
    }
  },
  created() {
    this.getInfo()
    this.getTableData()
  },
  methods: {
    getInfo() {
      this.http(
        {
          url: "merchant/shopMall/getWithdrawalMoney",
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.available_amount = res.data.data.available_amount
            this.pending_amount = res.data.data.pending_amount
          }
        }
      );
    },
    getTableData() {
      this.http(
        {
          url: "merchant/shopMall/getWithdrawalDetail",
          method: "post",
          data: {
            currentPage: this.currentPage,
            pagesize: this.pagesize,
            t: {
              status: this.stateValue || undefined
            }
          }
        },
        res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        }
      );
    },
    handleSizeChange(v) {
      this.pagesize = v
      this.getTableData()
    },
    handleCurrentChange(v) {
      this.currentPage = v
      this.getTableData()
    },
    handleConfirm() {
      if (this.form.money == '') {
        this.$message.info('请输入提现金额')
        return;
      }
      if (parseFloat(this.form.money) > parseFloat(this.available_amount)) {
        this.$message.info('可提现余额不足')
        return;
      }
      this.http(
        {
          url: `merchant/shopMall/autoWithdrawal?money=${this.form.money}`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.$message.success("提现成功！")
            this.getTableData()
            this.getInfo()
            this.dialogVisible = false
          } else {
            this.$message.info(res.data.msg)
          }
        }
      );
    },
    handleSearch(row) {
      this.http(
        {
          url: `merchant/shopMall/queryWithdrawalStatus?id=${row.id}`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.getTableData()
          } else {
            this.$message.info(res.data.msg)
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  cursor: pointer;
  &:hover {
    box-shadow: 0 5px 12px 0 rgba(23, 179, 163, 0.5);
  }
  height: 114px;
  margin-bottom: 10px;
}
.item-top {
  display: flex;
  .item-top-left {
    flex-grow: 1;
  }
  .item-top-right {
    font-size: 50px;
    margin-left: 10px;
  }
  .block-title {
    font-size: 16px;
    padding-top: 5px;
  }
  .primary-info {
    padding: 15px 0 5px;
    font-weight: 600;
  }
}
</style>