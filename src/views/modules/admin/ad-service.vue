<template>
  <div class="ad-service-wrapper">
    <tabs-title tabs-name="广告位管理"></tabs-title>
    <div class="filter-box">
      <el-row :gutter="40">
        <el-col class="filter-col" :span="8">
          <label>所属商场</label>
          <el-select v-model="mallId" placeholder="所属商场" clearable>
            <el-option
              v-for="(item, index) in mallList"
              :key="index"
              :label="item.shopName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col class="filter-col" :span="8">
          <label>广告位类型</label>
          <el-select v-model="adType" placeholder="广告位类型">
            <el-option
              v-for="item in adList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col class="filter-col" :span="5">
          <label>是否到期</label>
          <el-select v-model="isExpired" placeholder="是否到期">
            <el-option
              v-for="item in expireList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button
            @click="getTableData"
            icon="el-icon-search"
            type="primary"
            size="small"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50" align="center" header-align="center"></el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="广告位类型" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.advertType == "1" ? "置顶广告位" : "促销广告位" }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="adveridentify" label="订单编号"></el-table-column>
        <el-table-column header-align="center" align="center" prop="advertShopMall" label="所在商场"></el-table-column>
        <el-table-column header-align="center" align="center" prop="advertShop" label="商铺名称"></el-table-column>
        <el-table-column header-align="center" align="center" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.advertApprovalStatus == '2'">正常使用</span>
            <span v-if="scope.row.advertApprovalStatus == '4'">强制下架</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="下架原因" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.advertIsUpperInfo ? scope.row.advertIsUpperInfo : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="是否到期" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.advertIsExpire == "1" ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="剩余时长" width="90">
          <template slot-scope="scope">
            <span>{{ getOverDay(scope.row.advertExpireTime) }}天</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="已提醒" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.advertTipNums || 0 }}次</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="是否已开发票" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.adverisInvoice === 1? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="120" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.advertApprovalStatus != '4'" @click="warnExpire(scope.row)" type="text">提醒到期</el-button>
            <el-button v-if="scope.row.advertIsExpire == '2' && scope.row.advertApprovalStatus != '4'" @click="handleStop(scope)" type="text" style="color: #f56c6c; margin: 0;">强制下架</el-button>
            <el-button v-if="scope.row.adverisInvoice === 2" @click="handleInvoice(scope)" type="text">已开发票</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="total / pageSize < 1"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tabsTitle from '@/components/tabs-title'
export default {
  components: { tabsTitle },
  data() {
    return {
      mallId: "",
      adType: "",
      isExpired: "2",
      mallList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      adList: [
        {
          id: "1",
          label: "置顶广告位",
        },
        {
          id: "2",
          label: "促销广告位",
        },
      ],
      expireList: [
        {
          id: "1",
          label: "是",
        },
        {
          id: "2",
          label: "否",
        },
      ],
    };
  },
  computed: {
    ...mapState('user', ['role_id'])
  },
  methods: {
    getOverDay(time) {
      let curtime = new Date(),
        stopTime = new Date(time),
        str = ""
      let num = (stopTime - curtime) / 1000 / 60 / 60 / 24
      if (num > 0) {
        if (num < 1) {
          return 1
        } else {
          return Math.floor(num)
        }
      } else {
        return 0
      }
    },
    handleCurrentChange(v) {
      this.currentPage = v
      this.getTableData()
    },
    handleSizeChange(v) {
      this.pageSize = v
      this.getTableData()
    },
    getMallList() {
      this.http(
        {
          url: "merchant/shopMall/findTShopMallAll",
          method: "post",
          data: {
            roles: this.role_id,
          },
        },
        (res) => {
          if (res.data.code == 200) {
            this.mallList = res.data.data
          }
        }
      );
    },
    getTableData() {
      this.http(
        {
          url: "merchant/advert/findAdvertSelByPageAndUser",
          method: "post",
          data: {
            currentPage: this.currentPage,
            pagesize: this.pageSize,
            t: {
              advertType: this.adType,
              advertIsExpire: this.isExpired,
              advertShopMall: this.mallId,
            },
            roles: this.role_id,
          },
        },
        (res) => {
          if (res.data.code == 200) {
            this.total = res.data.data.total
            this.tableData = res.data.data.rows
          }
        }
      );
    },
    warnExpire(row) {
      this.$confirm("此操作将立即发短信给商户，通知到期!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.http(
            {
              url: "merchant/advert/advertExpireTip",
              method: "get",
              data: { advertId: row.id },
            },
            (res) => {
              if (res.data.code == 200) {
                this.$message.success("短信提醒成功！")
              }
            }
          );
        })
        .catch(() => {})
    },
    handleStop(scope) {
      this.$prompt("下架原因", "强制下架", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "强制下架原因不能为空",
      })
        .then(({ value }) => {
          this.http(
            {
              url: "merchant/advert/advertCompelOff",
              method: "post",
              data: {
                id: scope.row.id,
                advertIsUpperInfo: value,
              },
            },
            (res) => {
              if (res.data.code == 200) {
                scope.row.advertIsUpperInfo = value
                scope.row.advertApprovalStatus = "4"
                this.$message.success("已强制下架！")
              } else {
                this.$message.success("短信发送失败")
              }
            }
          );
        })
        .catch(() => {});
    },
    handleInvoice(scope) {
      this.$confirm('确认已开发票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http({
          url: `merchant/advert/updateIsInvoice?advertId=${ scope.row.id }&isInvoice=1`,
          method: 'get'
        }, res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功！')
            scope.row.adverisInvoice = 1
          } else {
            this.$message.info(res.data.msg)
          }
        })
      }).catch(() => {})
    }
  },
  created() {
    this.getMallList()
    this.getTableData()
  },
};
</script>

<style lang="scss" scoped>
.filter-col {
  display: flex;
  align-items: center;
  label {
    margin-right: 10px;
    flex-shrink: 0;
  }
  /deep/ .el-select {
    flex-grow: 1;
  }
}
.table-box {
  margin-top: 20px;
}
</style>