<template>
  <div class="add-coupon">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" size="small">
      <el-form-item label="优惠券名称" prop="coupon_name">
        <el-input v-model="form.coupon_name" placeholder="请输入优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型" prop="coupon_type">
        <el-radio-group v-model="form.coupon_type">
          <el-radio v-for="item in coupon_type_add_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠形式" prop="preferential_form">
        <el-radio-group v-model="form.preferential_form">
          <el-radio v-for="item in preferential_form_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.preferential_form === '1'" label="优惠券面值" prop="coupon_par_price">
        <el-input v-number="2" v-model="form.coupon_par_price" style="width: 220px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item v-else label="优惠券面值" prop="coupon_par_price">
        <el-input v-number="2" v-model="form.coupon_par_price" style="width: 220px;">
          <template slot="append">折</template>
        </el-input>
      </el-form-item>
      <el-form-item label="优惠券发放形式" prop="coupon_modus">
        <el-radio-group v-model="form.coupon_modus">
          <el-radio v-for="item in coupon_modus_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.coupon_modus === '2'" label="优惠券价格" prop="coupon_price">
        <el-input v-number="2" v-model="form.coupon_price" style="width: 220px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛" prop="coupon_condition">
        <el-radio-group v-model="form.coupon_condition">
          <el-radio v-for="item in coupon_condition_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.coupon_condition === '2'" label="需满减金额" prop="coupon_full_price">
        <el-input v-number="2" v-model="form.coupon_full_price" style="width: 220px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领" prop="coupon_limit">
        <el-select v-model="form.coupon_limit" style="width: 220px;">
          <el-option v-for="item in coupon_limit_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取截止时间" prop="end_date">
        <el-date-picker v-model="form.end_date" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="领取结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券生效时间" prop="effect_date">
        <el-date-picker v-model="form.effect_date" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="优惠券生效时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券过期时间" prop="expired_date">
        <el-date-picker v-model="form.expired_date" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="优惠券过期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券所属商城" prop="mall_id">
        <el-select v-model="form.mall_id" placeholder="请选择" style="width: 220px;">
          <el-option v-for="item in mall_list" :key="item.id" :label="item.shopName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 品类券 -->
      <template v-if="form.coupon_type === '2'">
        <el-form-item label="选择类目" prop="category_id">
          <el-select v-model="form.category_id" multiple placeholder="请选择" style="width: 100%;">
            <el-option v-for="item in category_list" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!-- 商品券 -->
      <template v-if="form.coupon_type === '3'">
        <el-form-item label="优惠券所属商品" prop="goods_id">
          <el-popover placement="bottom-start" width="400" trigger="click">
            <el-tree :load="loadNode" lazy show-checkbox></el-tree>
            <el-input slot="reference" v-model="form.goods_id" readonly placeholder="请选择商品" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
        </el-form-item>
      </template>
  
      <el-form-item label="使用说明" prop="coupon_instructions">
        <el-input v-model="form.coupon_instructions" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="发布总量" prop="total">
        <el-input v-number="0" v-model="form.total" placeholder="输入0表示不限量" style="width: 220px;">
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否立即发布" prop="is_release">
        <el-radio-group v-model="form.is_release">
          <el-radio v-for="item in is_release_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">立即制券</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { coupon_type_add_options, coupon_modus_options, coupon_condition_options, coupon_limit_options, is_release_options, preferential_form_options } from '@/enumerate/coupon'
import { number } from '@/directives/number/index'
import { mapState } from 'vuex'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  directives: { number },
  data() {
    const par_price_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入优惠券面值'))
      }
      setTimeout(() => {
        if (!parseFloat(value)) {
          callback(new Error('请输入大于0的值'))
        } else {
          callback()
        }
      }, 300)
    }
    const coupon_price_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入优惠券价格'))
      }
      setTimeout(() => {
        if (!parseFloat(value)) {
          callback(new Error('请输入大于0的值'))
        } else {
          callback()
        }
      }, 300)
    }
    return {
      coupon_type_add_options,
      coupon_modus_options,
      coupon_condition_options,
      coupon_limit_options,
      is_release_options,
      preferential_form_options,
      form: {
        coupon_name: '',
        coupon_type: '1',
        preferential_form: '1',
        coupon_par_price: '',
        coupon_modus: '1',
        coupon_price: '',
        coupon_condition: '1',
        coupon_full_price: '',
        coupon_limit: '1',
        end_date: '',
        effect_date: '',
        expired_date: '',
        mall_id: '',
        category_id: [],
        goods_id: '',
        coupon_instructions: '',
        total: '',
        is_release: '1'
      },
      rules: {
        coupon_name: [ { required: true, message: '请输入优惠券名称', trigger: 'blur' } ],
        coupon_type: [ { required: true, message: '请选择优惠券类型', trigger: 'change' } ],
        preferential_form: [ { required: true, message: '请选择优惠形式', trigger: 'change' } ],
        coupon_par_price: [ { required: true, validator: par_price_check, trigger: 'blur' } ],
        coupon_modus: [ { required: true, message: '请选择优惠券发放形式', trigger: 'change' } ],
        coupon_price: [ { required: true, validator: coupon_price_check, trigger: 'blur' } ],
        coupon_condition: [ { required: true, message: '请选择使用门槛', trigger: 'change' } ],
        coupon_full_price: [ { required: true, message: '请输入需满减金额', trigger: 'blur' } ],
        coupon_limit: [ { required: true, message: '请选择没人限领', trigger: 'change' } ],
        end_date: [ { required: true, message: '请选择领取截止时间', trigger: 'change' } ],
        effect_date: [ { required: true, message: '请选择优惠券生效时间', trigger: 'change' } ],
        expired_date: [ { required: true, message: '请选择优惠券过期时间', trigger: 'change' } ],
        mall_id: [ { required: true, message: '请选择优惠券所属商城', trigger: 'change' } ],
        category_id: [ { required: true, message: '请选择类目', trigger: 'change' } ],
        goods_id: [ { required: true, message: '请选择优惠券所属商品', trigger: 'change' } ],
        coupon_instructions: [ { required: true, message: '请输入使用说明', trigger: 'blur' } ],
        total: [ { required: true, message: '请输入发布总量', trigger: 'blur' } ],
        is_release: [ { required: true, message: '请选择是否立即发布', trigger: 'change' } ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      mall_list: [],
      category_list: []
    }
  },
  computed: {
    ...mapState('user', ['role_id'])
  },
  created() {
    this.getMallList()
  },
  methods: {
    onSubmit() {
      this.http({
        url: 'market/coupon/addCoupon',
        method: 'post',
        data: {
          couponName: this.form.coupon_name,
          couponType: this.form.coupon_type,
          couponModus: this.form.preferential_form,
          couponParPrice: this.form.coupon_par_price,
          couponDistributionForm: this.form.coupon_modus,
          couponCondition: this.form.coupon_condition,
          couponLimit: this.form.coupon_limit,
          receiveEndTime: this.form.end_date,
          effectDate: this.form.effect_date,
          expiredDate: this.form.expired_date,
          shopMallId: this.form.mall_id,
          couponInstructions: this.form.coupon_instructions,
          couponNumber: this.form.total,
          isRelease: this.form.is_release
        }
      }, res => {
        this.$emit('addCoupon', res.data)
      })
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
          this.mall_list = res.data.data
          this.mall_list.unshift({
            shopName: '所有',
            id: ''
          })
        }
      })
    },
    loadNode() {},
    handleCancel() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
