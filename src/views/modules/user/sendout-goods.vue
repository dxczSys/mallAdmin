<template>
    <div class="sendout-goods-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">订单管理--发货</div>
        </div>
        <el-form
            ref="sendoutForm"
            :model="sendoutForm"
            :rules="rules"
            label-width="140px"
            style="margin-top: 20px;"
        >
            <el-form-item
                label="运送方式"
                prop="sendType"
                required
            >
                <el-select
                    v-model="sendoutForm.sendType"
                    placeholder="发货方式"
                    style="width: 360px;"
                >
                    <el-option
                        v-for="(item, index) in sendTypeList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="sendoutForm.sendType == '3'"
                label="快递公司"
                prop="deliveryCompany"
                required
            >
                <el-select
                    v-model="sendoutForm.deliveryCompany"
                    placeholder="请选择快递公司"
                    style="width: 360px;"
                >
                    <el-option
                        v-for="(item, index) in deliveryCompanyList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="sendoutForm.sendType == '2'"
                label="跑腿公司"
                prop="deliveryCompany"
                required
            >
                <el-select
                    v-model="sendoutForm.deliveryCompany"
                    placeholder="请选择跑腿公司"
                    style="width: 360px;"
                >
                    <el-option
                        v-for="(item, index) in errandCompanyList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="sendoutForm.sendType != '1'"
                label="配送单号"
            >
                <el-input
                    v-model="sendoutForm.deliveryNumber"
                    placeholder="配送单号"
                    style="width: 360px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="运单照片/取货照片">
                <upload-file
                    :filelist="sendoutForm.deliveryPic"
                    :size="5"
                    limitTip="图片大小不能超过5M"
                ></upload-file>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push({ name: 'user-order-manage' })">取消</el-button>
                <el-button
                    @click="sendGood"
                    type="primary"
                >立即发货</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import uploadFile from "@/components/upload-file";
export default {
  components: { uploadFile },
  data() {
    return {
      priId: "",
      sendoutForm: {
        sendType: "",
        deliveryCompany: "",
        deliveryNumber: "",
        deliveryPic: []
      },
      rules: {
        sendType: [
          { required: true, message: "请选择运送方式", trigger: "change" }
        ],
        deliveryCompany: [
          { required: true, message: "请选择公司", trigger: "change" }
        ]
      },
      sendTypeList: [
        {
          label: "自提",
          value: "1"
        },
        {
          label: "跑腿",
          value: "2"
        },
        {
          label: "快递",
          value: "3"
        },
        {
          label: "其他",
          value: "4"
        }
      ],
      deliveryCompanyList: [
        {
          label: "顺丰速运",
          value: "顺丰速运"
        },
        {
          label: "中通快递",
          value: "中通快递"
        },
        {
          label: "圆通快递",
          value: "圆通快递"
        },
        {
          label: "韵达快递",
          value: "韵达快递"
        },
        {
          label: "邮政EMS",
          value: "邮政EMS"
        },
        {
          label: "德邦物流",
          value: "德邦物流"
        },
        {
          label: "天天快递",
          value: "天天快递"
        },
        {
          label: "其他快递",
          value: "其他快递"
        }
      ],
      errandCompanyList: [
        {
          label: "UU跑腿",
          value: "UU跑腿"
        },
        {
          label: "美团外卖",
          value: "美团外卖"
        },
        {
          label: "蜂鸟配送",
          value: "蜂鸟配送"
        },
        {
          label: "爱跑腿",
          value: "爱跑腿"
        },
        {
          label: "其他配送",
          value: "其他配送"
        }
      ]
    };
  },
  methods: {
    checkData() {
      let is = true;
      this.$refs.sendoutForm.validate(valid => {
        if (valid) {
          if (
            this.sendoutForm.sendType == "2" ||
            this.sendoutForm.sendType == "3"
          ) {
            if (
              !this.sendoutForm.deliveryNumber &&
              !this.sendoutForm.deliveryPic.length
            ) {
              this.$message.info("请输入配送单号或上传照片");
              is = false;
            }
          }
        } else {
          is = false;
        }
      });
      return is;
    },
    sendGood() {
      if (this.checkData()) {
        if (this.sendoutForm.deliveryPic.length) {
          this.$upload(
            {
              data: [this.sendoutForm.deliveryPic[0].raw]
            },
            res => {
              if (res.data.code == 200) {
                this.handleSend(res.data.data);
              }
            }
          );
        } else {
          this.handleSend();
        }
      }
    },
    handleSend(url) {
      this.http(
        {
          url: "merchant/deliver/tCustomerOrderDeliverSave",
          method: "post",
          data: {
            deliverMethod: this.sendoutForm.sendType,
            deliverCompany: this.sendoutForm.deliveryCompany,
            deliverCode: this.sendoutForm.deliveryNumber,
            deliverPic: url,
            orderIds: [this.priId]
          }
        },
        res => {
          if (res.data.code == 200) {
            this.$message.success("发货成功");
            this.$router.push({ name: "user-order-manage" });
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    }
  },
  mounted() {
    this.priId = this.$route.query.id;
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>