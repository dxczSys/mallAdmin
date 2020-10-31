<template>
  <div class="add-coupon">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" size="small" :disabled="isView">
      <el-form-item label="优惠券名称" prop="coupon_name">
        <el-input v-model="form.coupon_name" maxlength="10" @input="autoInstructions" placeholder="请输入优惠券名称(最多10个字)"></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型" prop="coupon_type">
        <el-radio-group v-model="form.coupon_type" @change="autoInstructions">
          <el-radio v-for="item in coupon_type_add_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠形式" prop="preferential_form">
        <el-radio-group v-model="form.preferential_form" @change="autoInstructions">
          <el-radio v-for="item in preferential_form_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.preferential_form === '1'" label="优惠券面值" prop="coupon_par_price">
        <el-input v-number="2" v-model="form.coupon_par_price" @input="autoInstructions" style="width: 220px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item v-else label="优惠券面值" prop="coupon_par_price">
        <el-input v-number="2" v-model="form.coupon_par_price" @input="autoInstructions" style="width: 220px;">
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
        <el-radio-group v-model="form.coupon_condition" @change="autoInstructions">
          <el-radio v-for="item in coupon_condition_options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.coupon_condition === '2'" label="需满减金额" prop="coupon_full_price">
        <el-input v-number="2" v-model="form.coupon_full_price" @input="autoInstructions" style="width: 220px;">
          <template slot="append">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领" prop="coupon_limit">
        <el-select v-model="form.coupon_limit" style="width: 220px;">
          <el-option v-for="item in coupon_limit_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券生效时间" prop="effect_date">
        <el-date-picker v-model="form.effect_date" :picker-options="pickerOptions" @change="effectDateChange" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="优惠券生效时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="领取截止时间" prop="end_date">
        <el-date-picker v-model="form.end_date" :picker-options="pickerOptions" @change="endDateChange" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="领取结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券过期时间" prop="expired_date">
        <el-date-picker v-model="form.expired_date" :picker-options="pickerOptions" @change="expiredDateChange" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="优惠券过期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券适用商城" prop="mall_id">
        <el-select v-model="form.mall_id" multiple placeholder="请选择" @change="mallChange" style="width: 220px;">
          <el-option v-for="item in mall_list" :key="item.id" :label="item.shopName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 品类券 -->
      <template v-if="form.coupon_type === '2'">
        <el-form-item label="优惠券适用类目" prop="category_id">
          <el-popover placement="bottom-start" width="400" trigger="click">
            <el-tree :load="loadKindsNode" empty-text="请先选择优惠券适用商城" lazy show-checkbox></el-tree>
            <el-input slot="reference" v-model="form.category_id" readonly placeholder="请选择商品" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
        </el-form-item>
      </template>

      <!-- 商品券 -->
      <template v-if="form.coupon_type === '3'">
        <el-form-item label="优惠券适用商品" prop="goods_id">
          <el-popover placement="bottom-start" width="400" trigger="click">
            <el-tree ref="goodsTree" :load="loadNode" node-key="id" :check-strictly="true" class="goods-tree" @check-change="handleGoodsChange" empty-text="请先选择优惠券适用商城" lazy show-checkbox></el-tree>
            <el-input slot="reference" v-model="form.goods_name" readonly placeholder="请选择商品" suffix-icon="el-icon-arrow-down"></el-input>
          </el-popover>
        </el-form-item>
      </template>
  
      <el-form-item label="使用说明" prop="coupon_instructions">
        <el-input v-model="form.coupon_instructions" type="textarea" :rows="6" placeholder="请输入内容"></el-input>
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
      <el-form-item v-if="!isView">
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
    },
    couponDetail: {
      type: Object,
      default: () => { return {} }
    },
    isView: {
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
        effect_date: this._dateFormat('YYYY-mm-dd HH:MM:SS', new Date()),
        expired_date: '',
        mall_id: [],
        mall_name: [],
        category_id: [],
        goods_id: '',
        goods_name: '',
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
      mall_list: []
    }
  },
  watch: {
    couponDetail: {
      handler(v) {
        if (this.isView && v && Object.keys(v).length) {
          this.form.coupon_name = this.couponDetail.couponName
          this.form.coupon_type = this.couponDetail.couponType + ''
          this.form.preferential_form = this.couponDetail.couponModus + ''
          this.form.coupon_par_price = this.couponDetail.couponParPrice
          this.form.coupon_price = this.couponDetail.couponPrice
          this.form.coupon_modus = this.couponDetail.couponDistributionForm + ''
          this.form.coupon_condition = this.couponDetail.couponCondition + ''
          this.form.coupon_full_price = this.couponDetail.couponFullPrice
          this.form.coupon_limit = this.couponDetail.couponLimit + ''
          this.form.end_date = this.couponDetail.receiveEndTime
          this.form.effect_date = this.couponDetail.effectDate
          this.form.expired_date = this.couponDetail.expiredDate
          this.form.mall_id = this.couponDetail.shopMallId.split(',')
          this.form.mall_name = this.couponDetail.shopMallName.split(',')
          this.form.goods_id = this.couponDetail.goodId
          this.form.goods_name = this.couponDetail.goodName
          this.form.coupon_instructions = this.couponDetail.couponInstructions
          this.form.total = this.couponDetail.couponNumber
          this.form.is_release = this.couponDetail.isRelease + ''
        }
      },
      deep: true,
      immediate: true
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.http({
            url: 'market/coupon/addCoupon',
            method: 'post',
            data: {
              couponName: this.form.coupon_name,
              couponType: this.form.coupon_type,
              couponModus: this.form.preferential_form,
              couponParPrice: this.form.coupon_par_price,
              couponPrice: this.form.coupon_price,
              couponDistributionForm: this.form.coupon_modus,
              couponCondition: this.form.coupon_condition,
              couponFullPrice: this.form.coupon_full_price,
              couponLimit: this.form.coupon_limit,
              receiveEndTime: this.form.end_date,
              effectDate: this.form.effect_date,
              expiredDate: this.form.expired_date,
              shopMallId: this.form.mall_id.join(),
              shopMallName: this.form.mall_name.join(),
              goodId: this.form.goods_id || undefined,
              goodName: this.form.goods_name || undefined,
              couponInstructions: this.form.coupon_instructions,
              couponNumber: this.form.total,
              isRelease: this.form.is_release
            }
          }, res => {
            this.$emit('addCoupon', res.data)
          })
        }
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
          if (this.mall_list.length) {
            this.form.mall_id = [this.mall_list[0].id]
            this.form.mall_name = [this.mall_list[0].shopName]
          }
        }
      })
    },
    mallChange(val) {
      this.form.mall_name= []
      if (val.length) {
        val.forEach(item => {
          this.mall_list.forEach(mall => {
            if (mall.id === item) {
              this.form.mall_name.push(mall.shopName)
            }
          })
        })
      }
    },
    effectDateChange() {
      if (this.form.expired_date) {
        if (new Date(this.form.expired_date) < new Date(this.form.effect_date)) {
          this.form.effect_date = ''
          this.$message.info('优惠券生效时间应小于过期时间')
        }
      }
      this.autoInstructions()
    },
    expiredDateChange() {
      if (this.form.end_date) {
        if (new Date(this.form.expired_date) < new Date(this.form.end_date)) {
          this.form.expired_date = ''
          this.$message.info('优惠券过期时间应大于领取截止时间')
        }
      }
      if (this.form.effect_date) {
        if (new Date(this.form.expired_date) < new Date(this.form.effect_date)) {
          this.form.effect_date = ''
          this.$message.info('优惠券生效时间应小于过期时间')
        }
      }
      this.autoInstructions()
    },
    endDateChange() {
      if (this.form.expired_date) {
        if (new Date(this.form.expired_date) < new Date(this.form.end_date)) {
          this.form.end_date = ''
          this.$message.info('领取截止时间应小于优惠券过期时间')
        }
      }
    },
    loadNode(node, resolve) {
      if (this.form.mall_id.length) {
        this.http({
          url: `merchant/shopMall/selShopMallTree`,
          method: 'post',
          data: {
            level: node.level + 1,
            id: node.level === 0 ? this.form.mall_id : [node.key]
          }
        }, res => {
          if (res.data.code === 200) {
            let arr = res.data.data
            if (node.level === 0 || node.level === 1 || node.level === 2) {
              arr.forEach(item => {
                item.disabled = true
              })
            }
            if (node.level === 1) {
              arr.forEach(item => {
                item.label = item.label + '楼'
              })
            }
            resolve(arr)
          }
        })
      }
    },
    handleGoodsChange(nodes, current, leaf) {
      let arr = this.$refs.goodsTree.getCheckedNodes()
      let id = []
      let name = []
      arr.forEach(item => {
        id.push(item.id)
        name.push(item.label)
      })
      this.form.goods_id = id.join()
      this.form.goods_name = name.join()
    },
    loadKindsNode(node, resolve) {},
    handleCancel() {
      this.$emit('update:dialogVisible', false)
    },
    autoInstructions(content, type) {
      let arr = []
      if (this.form.coupon_name) {
        arr.push(`${ this.form.coupon_name }`)
      }
      if (this.form.effect_date && this.form.expired_date) {
        arr.push(`活动时间：${ this.form.effect_date }到${ this.form.expired_date }`)
      }
      if (this.form.coupon_type && this.form.preferential_form && parseFloat(this.form.coupon_par_price) && this.form.coupon_modus && this.form.coupon_condition) {
        let str = '优惠内容：'
        if (this.form.coupon_modus == '2' && !parseFloat(this.form.coupon_price)) {
          return
        }
        if (this.form.coupon_condition == '2' && !parseFloat(this.form.coupon_full_price)) {
          return
        }
        if (this.form.coupon_type == '1') {
          str += '全部商品可用，'
        } else {
          str += '部分商品可用，'
        }
        if (this.form.preferential_form == '1') {
          str += `${this.form.coupon_par_price}元优惠券，`
        } else {
          str += `${this.form.coupon_par_price}折优惠券，`
        }
        if (this.form.coupon_condition == '1') {
          str += '满任意金额可用'
        } else {
          str += `消费满${this.form.coupon_full_price}元可用`
        }
        arr.push(str)
      }
      this.form.coupon_instructions = arr.join('\n')
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-tree{
  /deep/ .el-checkbox.is-disabled{
    display: none;
  }
}
</style>
