<template>
  <div class="quota">
    <tabs-title tabs-name="商场优惠券额度"></tabs-title>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="商场名称" prop="bankName" align="center" header-align="center"></el-table-column>
        <el-table-column label="商场地址" prop="bankName" align="center" header-align="center"></el-table-column>
        <el-table-column label="已使用总金额" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.toBeSettledMoney }}￥
          </template>
        </el-table-column>
        <el-table-column label="剩余总额度" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.toBeSettledMoney }}￥
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            <el-button type="text" @click="increaseQuota(scope.row)">充值</el-button>
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

    <el-dialog v-if="dialogVisible" title="充值" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="充值金额">
          <el-input v-model="form.money" v-number="2" placeholder="请输入充值金额">
            <template slot="append">￥</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmQuota">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import { number } from '@/directives/number'
export default {
  components: { tabsTitle },
  directives: { number },
  data() {
    return {
      tableData: [{}],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      currentRow: {},
      form: {
        money: ''
      },
      rules: {}
    }
  },
  methods: {
    getTableData() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    increaseQuota(row) {
      this.currentRow = row
      this.dialogVisible = true
    },
    confirmQuota() {}
  }
}
</script>
<style lang="scss" scoped>

</style>


