<template>
  <div class="verification">
    <tabs-title tabs-name="验券"></tabs-title>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" inline>
      <el-form-item label="优惠码" prop="coupon_identify">
        <el-input v-model="form.coupon_identify" placeholder="请输入优惠码" style="width: 260px;"></el-input>
        <div style="color: #E6A23C; font-size: 12px;">请输入易码众城微信小程序中提供的优惠券码</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">验证</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
export default {
  components: { tabsTitle },
  data() {
    return {
      form: {
        coupon_identify: ''
      },
      rules: {
        coupon_identify: [ { required: true, message: '请输入优惠码', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.http({
            url: `market/coupon/checkCoupon/${ this.form.coupon_identify }`,
            method: 'get'
          }, res => {
            if (res.data.code === 200) {
              this.$message.success('验证成功！')
              this.$refs.form.resetFields()
            } else {
              this.$message.info(res.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


