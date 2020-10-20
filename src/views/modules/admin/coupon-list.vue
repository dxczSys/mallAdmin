<template>
  <div class="coupon">
    <tabs-title tabs-name="优惠券"></tabs-title>
    <coupon-search></coupon-search>
    <div class="add">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">新制优惠券</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column v-for="col in columns"
          :prop="col.id"
          :key="col.id"
          :label="col.label"
          :width="col.width">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-if="dialogVisible" title="新制优惠券" center :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
      <add-coupon></add-coupon>
    </el-dialog>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import couponSearch from './components/coupon-search'
import addCoupon from './components/add-coupon'
export default {
  components: { tabsTitle, couponSearch, addCoupon },
  data() {
    return {
      tableData: [],
      dialogVisible: false
    }
  },
  methods: {
    cancelAdd() {
      this.dialogVisible = false
    },
    addCoupon() {}
  }
}
</script>
<style lang="scss" scoped>
.add{
  margin-bottom: 20px;
}
</style>
