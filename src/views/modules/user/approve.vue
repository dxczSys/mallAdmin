<template>
  <div class="approve-wrapper">
    <div class="modules-title">
      <div class="modules-title-bar"></div>
      <div class="modules-title-content">商铺认证</div>
    </div>
    <div class="step-box">
      <el-steps
        :active="shopApprovalStatus"
        process-status="success"
        finish-status="wait"
        align-center
      >
        <el-step
          title="申请"
          description="商户自主填写相关资料"
        ></el-step>
        <el-step
          title="审核中"
          description="微信&商城管理员审核"
        ></el-step>
        <el-step
          title="审核通过"
          v-if="shopApprovalStatus == 2"
          description="商铺认证审核已通过"
        ></el-step>
        <el-step
          title="资料已审核"
          v-if="shopApprovalStatus == 3 && tShopVX.applyment_state != 'REJECTED'"
          description="资料已审核"
        ></el-step>
        <el-step
          title="待签约"
          v-if="shopApprovalStatus == 3 && tShopVX.applyment_state != 'REJECTED'"
          :description="tShopVX.applyment_state_desc"
        ></el-step>
        <el-step
          title="拒绝"
          v-if="shopApprovalStatus == 3 && tShopVX.applyment_state == 'REJECTED'"
          status="error"
          :description="refuseInfo"
        ></el-step>
      </el-steps>
    </div>
    <div class="base-mess-wrapper">
      <el-form
        ref="infoForm"
        :model="infoForm"
        :rules="rules"
        label-width="120px"
        class="base-form"
      >
        <div
          v-if="shopApprovalStatus == 3 && tShopVX.applyment_state == 'NEED_SIGN'"
          class="moudules-box"
        >
          <div class="modules-title">
            <div class="modules-title-bar"></div>
            <div class="modules-title-content">待操作</div>
          </div>
          <el-form-item label="微信签约">
            <vue-qr
              :text="tShopVX.sign_url"
              :margin="0"
              colorDark="#333"
              :logoMargin="2"
              :logoCornerRadius="2"
              colorLight="#fff"
              :logoSrc="require('@/assets/img/logo_small.png')"
              :logoScale="0.1"
              :size="230"
            >
            </vue-qr>
            <div class="tip-box">请使用微信扫描二维码进行签约,签约完成之后，请点击发送审核发送下一步审核</div>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="sendCheck"
              type="primary"
            >发送审核</el-button>
          </el-form-item>
        </div>
        <div class="moudules-box">
          <div class="modules-title">
            <div class="modules-title-bar"></div>
            <div class="modules-title-content">商户申请信息</div>
          </div>
          <el-form-item
            label="主体类型"
            prop="organization_type"
            required
          >
            <el-radio-group
              v-model="infoForm.organization_type"
              :disabled="isApproval"
            >
              <el-radio :label="4">个体工商户</el-radio>
              <el-radio :label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="营业执照"
                prop="business_license_copy"
                required
              >
                <upload-img
                  v-model="infoForm.business_license_copy"
                  url-type="1"
                  :disabled="isApproval"
                ></upload-img>
                <div class="tip-box">
                  <div>图片要求:</div>
                  <div>1.请上传证件的彩色扫描件或彩色数码拍摄件，黑白复印件需加盖公章（公章信息需完整）</div>
                  <div>2.不得添加无关水印（非微信支付商户申请用途的其他水印）</div>
                  <div>3.需提供证件的正面拍摄件，完整、照面信息清晰可见。信息不清晰、扭曲、压缩变形、反光、不完整均不接受。</div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="证件注册号"
                prop="business_license_number"
                required
              >
                <el-input
                  v-model="infoForm.business_license_number"
                  maxlength="18"
                  :disabled="isApproval"
                  placeholder="证件注册号"
                ></el-input>
                <div class="tip-box">请填写营业执照上的注册号/统一社会信用代码，须为15位数字或 18位数字|大写字母</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="企业名称"
                prop="merchant_name"
                required
              >
                <el-input
                  v-model="infoForm.merchant_name"
                  maxlength="110"
                  :disabled="isApproval"
                  placeholder="企业名称"
                ></el-input>
                <div class="tip-box">
                  <div>1.请填写营业执照/登记证书的企业名称，2~110个字符，支持括号</div>
                  <div>2.个体工商户，若营业执照上商户名称为空或为“无”，请填写"个体户+经营者姓名"，如“个体户张三”</div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="经营者/法人"
                prop="legal_person"
                required
              >
                <el-input
                  v-model="infoForm.legal_person"
                  :disabled="isApproval"
                  placeholder="经营者/法定代表人姓名"
                ></el-input>
                <div class="tip-box">必须是证件的经营者/法定代表人姓名</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="身份证反面"
                prop="id_card_copy"
                required
              >
                <upload-img
                  v-model="infoForm.id_card_copy"
                  url-type="1"
                  :disabled="isApproval"
                ></upload-img>
                <div class="tip-box">请上传经营者/法定代表人的身份证人像面照片</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="身份证正面"
                prop="id_card_national"
                required
              >
                <upload-img
                  v-model="infoForm.id_card_national"
                  url-type="1"
                  :disabled="isApproval"
                ></upload-img>
                <div class="tip-box">请上传经营者/法定代表人的身份证国徽面照片</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="身份证姓名"
                prop="id_card_name"
                required
              >
                <el-input
                  v-model="infoForm.id_card_name"
                  :disabled="isApproval"
                  placeholder="身份证姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="身份证号码"
                prop="id_card_number"
                required
              >
                <el-input
                  v-model="infoForm.id_card_number"
                  :disabled="isApproval"
                  placeholder="身份证号码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="身份证有效期限"
                prop="id_card_valid_time"
                required
              >
                <el-date-picker
                  v-model="infoForm.id_card_valid_time"
                  type="date"
                  :disabled="isApproval"
                  value-format="yyyy-MM-dd"
                  placeholder="身份证有效期限"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="moudules-box">
          <div class="modules-title">
            <div class="modules-title-bar"></div>
            <div class="modules-title-content">结算银行账户信息</div>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="账户类型"
                prop="bank_account_type"
                required
              >
                <el-select
                  v-model="infoForm.bank_account_type"
                  :disabled="isApproval"
                  placeholder="账户类型"
                >
                  <el-option
                    v-for="(item, index) in bank_account_type_option"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开户银行"
                prop="account_bank"
                required
              >
                <el-select
                  v-model="infoForm.account_bank"
                  :disabled="isApproval"
                  placeholder="开户银行"
                >
                  <el-option
                    v-for="(item, index) in bank"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="开户名称"
                prop="account_name"
                required
              >
                <el-input
                  v-model="infoForm.account_name"
                  :disabled="isApproval"
                  placeholder="开户名称"
                ></el-input>
                <div class="tip-box">
                  <div>1.选择经营者个人银行卡时，开户名称必须与身份证姓名一致</div>
                  <div>2.选择对公账户时，开户名称必须与营业执照上的“商户名称”一致</div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开户银行地区"
                prop="bank_address_code"
                required
              >
                <el-cascader
                  v-if="refreshRegion"
                  ref="region"
                  v-model="infoForm.bank_address_code"
                  :disabled="isApproval"
                  :props="region_props"
                  @change="regionChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="开户银行支行"
                prop="bank_name"
                required
              >
                <el-select
                  v-model="infoForm.bank_name"
                  filterable
                  remote
                  :disabled="isApproval"
                  reserve-keyword
                  placeholder="请输入关键词搜索开户银行支行，如新福路支行"
                  :remote-method="remoteMethodBank"
                >
                  <el-option
                    v-for="(item, index) in bankNameList"
                    :key="index"
                    :label="item.bankName"
                    :value="item.bankName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="银行帐号"
                prop="account_number"
                required
              >
                <el-input
                  v-model="infoForm.account_number"
                  :disabled="isApproval"
                  placeholder="银行帐号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="moudules-box">
          <div class="modules-title">
            <div class="modules-title-bar"></div>
            <div class="modules-title-content">店铺信息</div>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="店铺名称"
                prop="store_name"
                required
              >
                <el-input
                  v-model="infoForm.store_name"
                  :disabled="isApproval"
                  placeholder="店铺名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="店铺简称"
                prop="merchant_shortname"
                required
              >
                <el-input
                  v-model="infoForm.merchant_shortname"
                  maxlength="4"
                  :disabled="isApproval"
                  placeholder="店铺简称"
                ></el-input>
                <div class="tip-box">最多4个字</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="所属商场"
                prop="shopCityName"
                required
              >
                <el-select
                  v-model="infoForm.shopCityName"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  :disabled="isApproval"
                  placeholder="所属商场"
                >
                  <el-option
                    v-for="(item, index) in shopCityList"
                    :key="index"
                    :label="item.shopName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="店铺标志"
                prop="shopLogo"
                required
              >
                <image-cropping
                  v-model="infoForm.shopLogo"
                  :disabled="shopApprovalStatus == 1"
                ></image-cropping>
                <div v-if="isApproval && infoForm.shopLogo && shopApprovalStatus != 1">
                  <el-button
                    @click="updateLogo"
                    size="mini"
                    type="primary"
                  >保存修改</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="所在楼层"
                prop="floor"
                required
              >
                <el-select
                  v-model="infoForm.floor"
                  :disabled="isApproval"
                  placeholder="所在楼层"
                >
                  <el-option
                    v-for="(item, index) in floorList"
                    :key="index"
                    :label="item.shopName + '楼'"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="所属行业"
                prop="businessType"
              >
                <el-select
                  v-model="infoForm.businessType"
                  :disabled="isApproval"
                  placeholder="所属行业"
                >
                  <el-option
                    v-for="(item, index) in businessTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="微信绑定"
                prop="chatCode"
                required
              >
                <span v-if="infoForm.chatCode">已绑定</span>
                <img
                  v-if="!infoForm.chatCode"
                  class="bind-weixin"
                  @click="bindWechat"
                  src="~@/assets/img/weixin.png"
                  alt="绑定微信"
                >
                <div style="color: #E6A23C; font-size: 12px;">提醒:请授权绑定微信，否则无法正常划账</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="微信号"
                prop="chat"
                required
              >
                <el-input
                  v-model="infoForm.chat"
                  :disabled="isApproval"
                  placeholder="微信"
                ></el-input>
                <div style="color: #E6A23C; font-size: 12px;">提醒:请填写正确微信号，而不是手机号，否则无法正常使用客服功能</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="超级管理员姓名"
                prop="contact_name"
                required
              >
                <el-input
                  v-model="infoForm.contact_name"
                  :disabled="isApproval"
                  placeholder="超级管理员姓名"
                ></el-input>
                <div class="tip-box">该姓名需与法人身份证姓名一致</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="超级管理员身份证号码"
                prop="contact_id_card_number"
                required
              >
                <el-input
                  v-model="infoForm.contact_id_card_number"
                  :disabled="isApproval"
                  placeholder="超级管理员身份证号码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                label="超级管理员手机"
                prop="mobile_phone"
                required
              >
                <el-input
                  type="number"
                  v-model="infoForm.mobile_phone"
                  :disabled="isApproval"
                  placeholder="超级管理员手机"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="超级管理员邮箱"
                prop="contact_email"
                required
              >
                <el-input
                  v-model="infoForm.contact_email"
                  :disabled="isApproval"
                  placeholder="超级管理员邮箱"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="店铺简介"
            prop="introduction"
            required
          >
            <el-input
              type="textarea"
              :disabled="isApproval"
              v-model="infoForm.introduction"
              rows="5"
              placeholder="店铺简介"
              style="width: 90%;"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item v-if="!isApproval">
          <el-button
            @click="sendCheck"
            type="primary"
          >发送审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadFile from "@/components/upload-file"
import uploadImg from "@/components/upload-img"
import imageCropping from "@/components/image-cropping"
import bank from "@/enumerate/bank"
import { bank_account_type_option } from "@/enumerate/approval"
import vueQr from "vue-qr"
export default {
  components: { uploadImg, uploadFile, imageCropping, vueQr },
  data() {
    let self = this;
    return {
      fileUrl: window.SITE_CONFIG.fileUrl,
      bank_account_type_option,
      bank,
      bankNameList: [],
      isApproval: false,
      shopApprovalStatus: 0,
      refuseInfo: "",
      shopId: "",
      infoForm: {
        organization_type: 4,
        business_license_copy: {},
        business_license_number: "",
        merchant_name: "",
        legal_person: "",
        id_card_copy: {},
        id_card_national: {},
        id_card_name: "",
        id_card_number: "",
        id_card_valid_time: "",
        bank_account_type: "",
        account_bank: "",
        account_name: "",
        bank_address_code: [],
        bank_name: "",
        account_number: "",
        shopCityName: "",
        floor: "",
        businessType: "",
        chat: "",
        chatCode: "",
        shopLogo: "",
        introduction: "",
        contact_email: "",
        contact_name: "",
        contact_id_card_number: "",
        mobile_phone: "",
        store_name: "",
        merchant_shortname: "",
        tShopId: "",
        tShopVXId: "",
        out_request_no: ""
      },
      tShopVX: {},
      rules: {
        organization_type: [
          { required: true, message: "请选择主体类型", trigger: "change" }
        ],
        business_license_copy: [
          { required: true, message: "请上传营业执照", trigger: "change" }
        ],
        business_license_number: [
          { required: true, message: "请填写证件注册号", trigger: "blur" }
        ],
        merchant_name: [
          { required: true, message: "请填写企业名称", trigger: "blur" }
        ],
        legal_person: [
          { required: true, message: "请填写经营者/法人", trigger: "blur" }
        ],
        id_card_copy: [
          { required: true, message: "请上传身份证正面", trigger: "change" }
        ],
        id_card_national: [
          { required: true, message: "请上传身份证反面", trigger: "change" }
        ],
        id_card_name: [
          { required: true, message: "请填写身份证姓名", trigger: "blur" }
        ],
        id_card_number: [
          { required: true, message: "请填写身份证号码", trigger: "blur" },
          {
            min: 15,
            max: 18,
            message: "请填写正确的身份证号码",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请填写正确的身份证号码",
            trigger: "blur"
          }
        ],
        id_card_valid_time: [
          { required: true, message: "请选择身份证有效期限", trigger: "change" }
        ],
        bank_account_type: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        account_bank: [
          { required: true, message: "请选择开户银行", trigger: "change" }
        ],
        account_name: [
          { required: true, message: "请填写开户名称", trigger: "blur" }
        ],
        bank_address_code: [
          { required: true, message: "请选择开户银行地区", trigger: "change" }
        ],
        bank_name: [
          { required: true, message: "请选择开户银行支行", trigger: "change" }
        ],
        account_number: [
          { required: true, message: "请填写银行帐号", trigger: "blur" }
        ],
        store_name: [
          { required: true, message: "请填写店铺名称", trigger: "blur" }
        ],
        merchant_shortname: [
          { required: true, message: "请填写店铺简称", trigger: "blur" }
        ],
        shopLogo: [
          { required: true, message: "请上传店铺标志", trigger: "change" }
        ],
        shopCityName: [
          { required: true, message: "请选择所属商场", trigger: "change" }
        ],
        floor: [
          { required: true, message: "请选择所在楼层", trigger: "change" }
        ],
        businessType: [
          { required: true, message: "请选择所属行业", trigger: "change" }
        ],
        chatCode: [
          { required: true, message: "请绑定微信", trigger: "change" }
        ],
        chat: [{ required: true, message: "请填写微信号", trigger: "blur" }],
        contact_name: [
          { required: true, message: "请填写超级管理员姓名", trigger: "blur" }
        ],
        contact_id_card_number: [
          {
            required: true,
            message: "请填写超级管理员身份证号码",
            trigger: "blur"
          },
          {
            min: 15,
            max: 18,
            message: "请填写正确的超级管理员身份证号码",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请填写正确的超级管理员身份证号码",
            trigger: "blur"
          }
        ],
        mobile_phone: [
          { required: true, message: "请填写超级管理员手机", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "请填写正确的超级管理员手机",
            trigger: "blur"
          }
        ],
        contact_email: [
          { required: true, message: "请填写超级管理员邮箱", trigger: "blur" },
          {
            required: true,
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请填写正确的超级管理员邮箱",
            trigger: "blur"
          }
        ],
        introduction: [
          { required: true, message: "请填写店铺简介", trigger: "blur" }
        ]
      },
      shopCityList: [],
      shopCityListTemp: [],
      floorList: [],
      businessTypeList: [],
      region_props: {
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            self.http(
              {
                url: "merchant/base/getProvinces",
                method: "get"
              },
              res => {
                if (res.data.code == 200) {
                  resolve(res.data.data);
                }
              }
            );
          } else if (node.level == 1) {
            self.http(
              {
                url: `merchant/base/getCities?id=${node.value}`,
                method: "get"
              },
              res => {
                if (res.data.code == 200) {
                  resolve(res.data.data);
                }
              }
            );
          } else {
            self.http(
              {
                url: `merchant/base/getAreas?id=${node.value}`,
                method: "get"
              },
              res => {
                if (res.data.code == 200) {
                  let arr = res.data.data.map(item => {
                    return {
                      value: item.value,
                      label: item.label,
                      leaf: true
                    };
                  });
                  resolve(arr);
                }
              }
            );
          }
        }
      },
      regionArr: [],
      refreshRegion: true
    };
  },
  watch: {
    "infoForm.shopCityName"(n) {
      if (n) {
        this.getFloorList(n);
        this.getBussinessList(n);
      }
    }
  },
  methods: {
    getMallList() {
      this.http(
        {
          url: "merchant/shopMall/tShopMallSelByAllAuthorization",
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.shopCityList = res.data.data;
            this.shopCityListTemp = JSON.parse(JSON.stringify(res.data.data));
          }
        }
      );
    },
    getFloorList(id) {
      this.http(
        {
          url: `merchant/shopMall/tShopMallFloorSelByShopId?shopId=${id}`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.floorList = res.data.data;
          }
        }
      );
    },
    getBussinessList(id) {
      this.http(
        {
          url: `merchant/tGoodCategory/selectTGoodCategoryAsTree?shopMallId=${id}`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.businessTypeList = res.data.data;
          }
        }
      );
    },
    sendCheck() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (!Object.keys(this.infoForm.business_license_copy).length) {
            this.$message.info("请上传营业执照");
            return;
          }
          if (!Object.keys(this.infoForm.id_card_copy).length) {
            this.$message.info("请上传身份证正面");
            return;
          }
          if (!Object.keys(this.infoForm.id_card_national).length) {
            this.$message.info("请上传身份证反面");
            return;
          }
          let url = "merchant/tShop/tShopAuthentication1";
          if (this.shopApprovalStatus == 3) {
            url = "merchant/tShop/updTShopByShopId1 ";
          }
          this.http(
            {
              url,
              method: "post",
              data: {
                shopVX: {
                  id: this.infoForm.tShopVXId,
                  organization_type: this.infoForm.organization_type,
                  business_license_copy: JSON.stringify(
                    this.infoForm.business_license_copy
                  ),
                  business_license_number: this.infoForm
                    .business_license_number,
                  merchant_name: this.infoForm.merchant_name,
                  legal_person: this.infoForm.legal_person,
                  id_doc_type: "IDENTIFICATION_TYPE_MAINLAND_IDCARD",
                  id_card_copy: JSON.stringify(this.infoForm.id_card_copy),
                  id_card_national: JSON.stringify(
                    this.infoForm.id_card_national
                  ),
                  id_card_name: this.infoForm.id_card_name,
                  id_card_number: this.infoForm.id_card_number,
                  id_card_valid_time: this.infoForm.id_card_valid_time,
                  bank_account_type: this.infoForm.bank_account_type,
                  account_bank: this.infoForm.account_bank,
                  account_name: this.infoForm.account_name,
                  bank_address_code: JSON.stringify(
                    this.infoForm.bank_address_code
                  ),
                  bank_name: this.infoForm.bank_name,
                  account_number: this.infoForm.account_number,
                  contact_type: 65,
                  contact_name: this.infoForm.contact_name,
                  contact_id_card_number: this.infoForm.contact_id_card_number,
                  mobile_phone: this.infoForm.mobile_phone,
                  store_name: this.infoForm.store_name,
                  merchant_shortname: this.infoForm.merchant_shortname,
                  contact_email: this.infoForm.contact_email,
                  out_request_no: this.infoForm.out_request_no
                },
                shop: {
                  id: this.infoForm.tShopId,
                  shopName: this.infoForm.store_name,
                  abbreviation: this.infoForm.merchant_shortname,
                  shopToPart: this.infoForm.shopCityName,
                  shopToFloor: this.infoForm.floor,
                  shopToIndustry: this.infoForm.businessType,
                  shopTel: this.infoForm.mobile_phone,
                  shopPersonVx: this.infoForm.chat,
                  code: this.infoForm.chatCode,
                  shopLegalPerson: this.infoForm.legal_person,
                  shopInfo: this.infoForm.introduction,
                  shopSign: this.infoForm.shopLogo,
                  idCardPicPositive: this.infoForm.id_card_national.url,
                  idCardPicSide: this.infoForm.id_card_copy.url,
                  shopBusinessLicense: this.infoForm.business_license_copy.url
                }
              }
            },
            approvalRes => {
              if (approvalRes.data.code == 200) {
                this.$message.success("申请已发送，等待管理员审核中...");
                localStorage.removeItem("approvalParams");
                this.getApprovalData();
              } else {
                this.$message({
                  type: "info",
                  message: approvalRes.data.msg,
                  duration: 5000
                });
              }
            }
          );
        }
      });
    },
    getApprovalData() {
      this.http(
        {
          url: "merchant/tShop/selTShopByLoginUserId",
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            let tShop = res.data.data.tShop;
            let tShopVX = res.data.data.tShopVX;
            this.tShopVX = res.data.data.tShopVX;
            this.shopId = tShop.id;
            this.shopApprovalStatus = parseInt(tShop.shopApprovalStatus);
            this.refuseInfo =
              "微信拒绝原因：" +
                tShopVX.audit_detail +
                "；" +
                "管理员拒绝原因：" +
                tShop.shopApprovalRefuseInfo || "认证被拒绝，包含违规信息";
            this.isApproval = true;
            this.infoForm.business_license_copy = JSON.parse(
              tShopVX.business_license_copy
            );
            this.infoForm.business_license_number =
              tShopVX.business_license_number;
            this.infoForm.merchant_name = tShopVX.merchant_name;
            this.infoForm.legal_person = tShopVX.legal_person;
            this.infoForm.id_card_copy = JSON.parse(tShopVX.id_card_copy);
            this.infoForm.id_card_national = JSON.parse(
              tShopVX.id_card_national
            );
            this.infoForm.id_card_name = tShopVX.id_card_name;
            this.infoForm.id_card_number = tShopVX.id_card_number;
            this.infoForm.id_card_valid_time = tShopVX.id_card_valid_time;
            this.infoForm.bank_account_type = parseInt(
              tShopVX.bank_account_type
            );
            this.infoForm.account_bank = tShopVX.account_bank;
            this.infoForm.account_name = tShopVX.account_name;
            this.infoForm.bank_address_code = JSON.parse(
              tShopVX.bank_address_code
            );
            this.infoForm.bank_name = tShopVX.bank_name;
            this.infoForm.account_number = tShopVX.account_number;
            this.infoForm.shopCityName = tShop.shopToPart;
            this.infoForm.floor = tShop.shopToFloor;
            this.infoForm.businessType = tShop.shopToIndustry;
            this.infoForm.chat = tShop.shopPersonVx;
            this.infoForm.chatCode = tShop.chatCode;
            this.infoForm.shopLogo = tShop.shopSign;
            this.infoForm.introduction = tShop.shopInfo;
            this.infoForm.contact_email = tShopVX.contact_email;
            this.infoForm.contact_name = tShopVX.contact_name;
            this.infoForm.contact_id_card_number =
              tShopVX.contact_id_card_number;
            this.infoForm.mobile_phone = tShopVX.mobile_phone;
            this.infoForm.store_name = tShopVX.store_name;
            this.infoForm.merchant_shortname = tShopVX.merchant_shortname;
            this.infoForm.tShopId = tShop.id;
            this.infoForm.tShopVXId = tShopVX.id;
            this.infoForm.out_request_no = tShopVX.out_request_no;
            if (
              this.shopApprovalStatus == 3 &&
              tShopVX.applyment_state == "REJECTED"
            ) {
              this.isApproval = false;
            } else {
              this.isApproval = true;
            }
            this.refreshRegion = false;
            this.$nextTick(_ => {
              this.refreshRegion = true;
            });
          } else {
            this.isApproval = false;
          }
        }
      );
    },
    updateLogo() {
      this.http(
        {
          url: "merchant/tShop/updateTShopByShopId",
          method: "post",
          data: {
            id: this.shopId,
            shopSign: this.infoForm.shopLogo
          }
        },
        resovel => {
          if (resovel.data.code == 200) {
            this.$message.success("修改成功!");
            this.getApprovalData();
          }
        }
      );
    },
    remoteMethod(query) {
      if (query) {
        this.http(
          {
            url: `merchant/shopMall/selShopMallLikeName?shopMallName=${query}`,
            method: "get"
          },
          res => {
            if (res.data.code == 200) {
              this.shopCityList = res.data.data;
            }
          }
        );
      } else {
        this.shopCityList = JSON.parse(JSON.stringify(this.shopCityListTemp));
      }
    },
    bindWechat() {
      let approvalParams = this.infoForm;
      localStorage.setItem("approvalParams", JSON.stringify(approvalParams));
      window.open(
        "https://open.weixin.qq.com/connect/qrconnect?appid=wx492cea4884805e00&redirect_uri=https%3a%2f%2fs.yimazhongcheng.com%2f%23%2fuser-approve&response_type=code&scope=snsapi_login&state=auth2#wechat_redirect",
        "_self"
      );
    },
    regionChange(node) {
      this.regionArr = [];
      this.getRegionArr(this.$refs.region.getCheckedNodes()[0]);
      this.http(
        {
          url: `merchant/base/selBankInfo?queryName=${this.regionArr[1]},${
            this.infoForm.account_bank
          }`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.bankNameList = res.data.data;
          }
        }
      );
    },
    getRegionArr(node) {
      this.regionArr.unshift(node.label);
      if (!node.parent) {
        return;
      }
      this.getRegionArr(node.parent);
    },
    remoteMethodBank(v) {
      this.http(
        {
          url: `merchant/base/selBankInfo?queryName=${this.regionArr[1]},${
            this.infoForm.account_bank
          },${v}`,
          method: "get"
        },
        res => {
          if (res.data.code == 200) {
            this.bankNameList = res.data.data;
          }
        }
      );
    }
  },
  async mounted() {
    await this.getMallList()
    await this.getApprovalData()
    if (this.$route.query.state == "auth2") {
      let params = JSON.parse(localStorage.getItem("approvalParams"))
      this.infoForm = params
      this.infoForm.chatCode = this.$route.query.code
    }
  }
};
</script>

<style lang="scss" scoped>
.step-box {
  padding: 10px 0;
  background-color: #fff7eb;
  border: 1px solid #f58b0f;
  border-radius: 4px;
}
.base-mess-wrapper {
  padding: 20px 0;
  .base-form {
    padding-right: 20px;
    /deep/ .el-form-item__content .el-select {
      width: 360px;
    }
    /deep/ .el-form-item__content .el-input {
      width: 360px;
    }
    /deep/ .el-form-item__content .el-textarea {
      width: 360px;
    }
  }
}
.bind-weixin {
  width: 30px;
  cursor: pointer;
}
.tip-box {
  padding-top: 6px;
  color: #e6a23c;
  font-size: 12px;
  line-height: 20px;
}
.modules-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &-bar {
    width: 5px;
    height: 15px;
    background-color: #409eff;
    border-radius: 1px;
    margin-right: 3px;
  }
  &-content {
    font-weight: 600;
  }
}
</style>