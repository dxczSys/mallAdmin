<template>
  <div class="search">
    <el-form :model="searchForm" label-width="110px" size="small" inline>
      <el-form-item label="优惠券名称">
        <el-input v-model="searchForm.couponName" clearable placeholder="请输入优惠券名称" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-select v-model="searchForm.couponType" clearable @change="handleSearch" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券状态">
        <el-select v-model="searchForm.couponStatus" clearable @change="handleSearch" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_status_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商城">
        <el-select v-model="searchForm.shopMallId" clearable @change="handleSearch" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in coupon_mall_options" :key="item.id" :label="item.shopName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领券截止时间">
        <el-date-picker v-model="searchForm.receiveEndTime" type="datetime" clearable @change="handleSearch" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择领取截止时间" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券生效时间">
        <el-date-picker v-model="searchForm.effectDate" type="datetime" clearable @change="handleSearch" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择优惠券生效时间" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券过期时间">
        <el-date-picker v-model="searchForm.expiredDate" type="datetime" clearable @change="handleSearch" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择优惠券过期时间" style="width: 220px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <div v-if="!role_id.some(checkIsSuperAdmin)" class="quota">
      <div class="title">剩余额度：</div>
      <div v-for="item in quota" :key="item.id" class="quota-item">
        <span class="mall">{{ item.shopName }}</span>
        <span class="money">{{ Math.floor((item.couponTotalMoney - item.couponUseMoney) * 100) / 100 }}￥</span>
      </div>
    </div>
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
        couponName: '',
        couponType: '',
        couponStatus: '',
        shopMallId: '',
        receiveEndTime: '',
        effectDate: '',
        expiredDate: ''
      },
      quota: []
    }
  },
  computed: {
    ...mapState('user', ['role_id'])
  },
  created() {
    this.getMallList()
    this.getQuota()
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
            shopName: '所有',
            id: ''
          })
        }
      })
    },
    getQuota() {
      this.http({
        url: 'merchant/shopMall/queryShopMallCouponMoney',
        method: 'get'
      }, res => {
        if (res.data.code === 200) {
          this.quota = res.data.data
        }
      })
    },
    checkIsSuperAdmin(item) {
      if (item == '1') {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search{
  margin-bottom: 20px;
}
.quota{
  display: flex;
  align-items: center;
  color: #E6A23C;
  font-weight: 600;
  &-item{
    margin-right: 20px;
  }
}
</style>
