<template>
  <div class="search">
    <el-form :model="searchForm" label-width="100px" size="small" inline>
      <el-form-item label="优惠券名称">
        <el-input v-model="searchForm.coupon_name" placeholder="请输入优惠券名称" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="searchForm.coupon_type" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券状态">
        <el-select v-model="searchForm.coupon_status" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商城">
        <el-select v-model="searchForm.coupon_mall" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_mall_options" :key="item.id" :label="item.shopName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker v-model="searchForm.release_date" type="datetime" placeholder="请选择发布时间" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="领券结束时间">
        <el-date-picker v-model="searchForm.end_date" type="datetime" placeholder="请选择领券结束时间" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="失效时间至">
        <el-date-picker v-model="searchForm.lose_date" type="datetime" placeholder="请选择失效时间至" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { coupon_type_options, coupon_status_options } from '@/enumerate/coupon'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      coupon_type_options,
      coupon_status_options,
      coupon_mall_options: [],
      searchForm: {
        coupon_name: '',
        coupon_type: '',
        coupon_status: '',
        coupon_mall: '',
        release_date: '',
        end_date: '',
        lose_date: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['role_id'])
  },
  created() {
    this.getMallList()
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchForm)
    },
    getMallList() {
      this.http({
        url: 'merchant/shopMall/findTShopMallAll',
        method: 'post',
        data: {
          roles: this.role_id
        }
      }, res => {
        if (res.data.code == 200) {
          this.coupon_mall_options = res.data.data
          this.coupon_mall_options.unshift({
            shopName: '全部',
            id: ''
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.search{
  margin-bottom: 20px;
}
</style>
