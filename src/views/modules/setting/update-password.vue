<template>
  <div class="update-password-wrapper">
    <div style="display: flex; align-items: center">
      <div
        style="
          width: 5px;
          height: 15px;
          background-color: #409eff;
          border-radius: 1px;
          margin-right: 3px;
        "
      ></div>
      <div style="font-weight: 600">修改密码</div>
    </div>
    <el-form
      ref="updatePasswordForm"
      :rules="rule"
      :model="updatePasswordForm"
      label-width="0px"
      style="margin-top: 20px; margin-left: 20px"
    >
      <el-form-item required>
        <el-input
          :disabled="true"
          v-model="updatePasswordForm.phone"
          placeholder="手机号"
          size="large"
          prefix-icon="iconfont iconshoujihao"
          style="width: 360px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" required>
        <el-input
          v-model="updatePasswordForm.code"
          placeholder="验证码"
          size="large"
          prefix-icon="iconfont iconyanzhengma"
          style="width: 244px"
        ></el-input>
        <el-button @click="getCode" v-if="codeTiming == 0" size="large"
          >获取验证码</el-button
        >
        <span style="color: #999; margin-left: 5px" v-else
          >重新发送({{ codeTiming }}s)</span
        >
      </el-form-item>
      <el-form-item prop="password" required>
        <el-input
          type="password"
          show-password
          v-model="updatePasswordForm.password"
          size="large"
          placeholder="新密码"
          prefix-icon="iconfont iconmima"
          style="width: 360px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="againPassword" required>
        <el-input
          type="password"
          show-password
          v-model="updatePasswordForm.againPassword"
          size="large"
          placeholder="确认密码"
          prefix-icon="iconfont iconmima"
          style="width: 360px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sha256 from "js-sha256"
import { mapState } from "vuex"
export default {
  data() {
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"))
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能少于6位"))
        }
        callback()
      }
    };
    return {
      updatePasswordForm: {
        phone: "",
        code: "",
        password: "",
        againPassword: "",
      },
      codeTiming: 0,
      rule: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: checkPassword, trigger: "blur" },
        ],
        againPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
        ],
      },
    }
  },
  computed: {
      ...mapState('user', ['user_id', 'phone'])
  },
  methods: {
    getCode() {
      //获取验证码
      this.codeTiming = 59;
      let timer = setInterval(() => {
        if (this.codeTiming > 0) {
          --this.codeTiming;
        } else {
          clearTimeout(timer);
          timer = null;
        }
      }, 1000);
      this.http(
        {
          url: "merchant/sendPasswordMessage",
          method: "get",
          data: {
            phone: this.updatePasswordForm.phone,
          },
        },
        (res) => {
          if (res.data.code == 200) {
            this.$message.success("验证码已发送,请注意查收!");
          }
        }
      );
    },
    updatePassword() {
      this.$refs.updatePasswordForm.validate((valid) => {
        if (valid) {
          if (
            this.updatePasswordForm.password ===
            this.updatePasswordForm.againPassword
          ) {
            this.http(
              {
                url: "merchant/updateUserPassWord",
                method: "post",
                data: {
                  id: this.user_id,
                  userTel: this.updatePasswordForm.phone,
                  code: this.updatePasswordForm.code,
                  userPassWord: sha256(this.updatePasswordForm.password),
                },
              },
              (res) => {
                if (res.data.code == 200) {
                  this.$refs.updatePasswordForm.resetFields();
                  this.$message.success("修改成功");
                } else {
                  this.$message.info(res.data.msg);
                }
              }
            );
          } else {
            this.$message.info("俩次密码输入不一致");
          }
        }
      });
    },
  },
  mounted() {
    this.updatePasswordForm.phone = this.phone
  },
};
</script>
