<template>
  <div class="add-coupon">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" size="small">
      <el-form-item label="优惠券名称">
        <el-input v-model="form.coupon_name" placeholder="请输入优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-radio-group v-model="form.coupon_type">
          <el-radio v-for="item in coupon_type_add_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠券面值">
        <el-input v-number="2" v-model="form.coupon_par_price" style="width: 180px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="优惠形式">
        <el-radio-group v-model="form.coupon_modus">
          <el-radio v-for="item in coupon_modus_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.coupon_modus === '2'" label="优惠券价格">
        <el-input v-number="2" v-model="form.coupon_price" style="width: 180px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛">
        <el-radio-group v-model="form.coupon_condition">
          <el-radio v-for="item in coupon_condition_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.coupon_condition === '2'" label="满减金额">
        <el-input v-number="2" v-model="form.coupon_full_price" style="width: 180px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领">
        <el-select v-model="form.coupon_amount">
          <el-option v-for="item in coupon_amount_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取截止时间">
        <el-date-picker v-model="form.end_date" :picker-options="pickerOptions" type="datetime" placeholder="领取结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券生效时间">
        <el-date-picker v-model="form.effect_date" :picker-options="pickerOptions" type="datetime" placeholder="优惠券生效时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券过期时间">
        <el-date-picker v-model="form.expired_date" :picker-options="pickerOptions" type="datetime" placeholder="优惠券过期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券所属商城">
        <el-select v-model="form.mall_id" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in mall_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!-- 品类券 -->
      <template v-if="form.coupon_type === '2'">
        <el-form-item label="选择类目">
          <el-select v-model="form.category_id" multiple placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in category_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- 商品券 -->
      <template v-if="form.coupon_type === '3'">
        <el-form-item label="优惠券所属商品">
          <el-popover placement="bottom-start" width="400" trigger="click">
            <el-tree :load="loadNode" lazy show-checkbox></el-tree>
            <el-input slot="reference" v-model="form.goods_id" readonly placeholder="请选择商品" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
        </el-form-item>
      </template>
      
      <el-form-item label="是否立即发布">
        <el-radio-group v-model="form.is_all_kinds">
          <el-radio v-for="item in is_release_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="使用说明">
        <el-input v-model="form.coupon_instructions" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">立即制券</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { coupon_type_add_options, coupon_modus_options, coupon_condition_options, coupon_amount_options, is_release_options } from '@/enumerate/coupon'
import { number } from '@/directives/number/index'
export default {
  directives: { number },
  data() {
    return {
      coupon_type_add_options,
      coupon_modus_options,
      coupon_condition_options,
      coupon_amount_options,
      is_release_options,
      form: {
        coupon_name: '',
        coupon_type: '1',
        coupon_par_price: '',
        coupon_modus: '1',
        coupon_price: '',
        coupon_condition: '1',
        coupon_full_price: '',
        coupon_amount: '1',
        end_date: '',
        effect_date: '',
        expired_date: '',
        coupon_instructions: '',
        mall_id: '',
        is_release: '1',
        is_all_kinds: '1',
        category_id: '',
        goods_id: ''
      },
      rules: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      mall_list: [],
      category_list: []
    }
  },
  methods: {
    onSubmit() {},
    loadNode() {},
  }
}
</script>
<style lang="scss" scoped>
</style>
