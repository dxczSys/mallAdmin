<template>
  <div class="add-coupon">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px" size="small">
      <el-form-item label="优惠券名称">
        <el-input v-model="form.coupon_name" placeholder="请输入优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-radio-group v-model="form.coupon_type">
          <el-radio v-for="item in coupon_type_add_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠券面值">
        <el-input v-model="form.coupon_price" v-number="2"></el-input>
        <span>￥</span>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { coupon_type_add_options } from '@/enumerate/coupon'
import { number } from '@/directives/number'
export default {
  directives: { number },
  components: { moneyInput },
  data() {
    return {
      coupon_type_add_options,
      form: {
        coupon_name: '',
        coupon_type: '1',
        coupon_price: ''
      },
      rules: {}
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
<style lang="scss" scoped>

</style>
