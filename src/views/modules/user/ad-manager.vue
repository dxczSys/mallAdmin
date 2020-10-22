<template>
  <div class="ad-manager-wrapper">
    <div style="display: flex; align-items: center; margin-bottom: 20px">
      <div
        style="
          width: 5px;
          height: 15px;
          background-color: #409eff;
          border-radius: 1px;
          margin-right: 3px;
        "
      ></div>
      <div style="font-weight: 600">广告位管理</div>
    </div>
    <div class="apply-button">
      <div class="apply-button-left">
        <div class="current-mall">当前商城：{{ mall_name || '易码商城' }}</div>
        <div class="last-ad-num">
          <span>剩余广告位：</span>
          <div class="ad-last-box">
            <span v-if="topAdTotal > 3" class="green-light"></span>
            <span v-else class="red-light"></span>
            <span>置顶广告位：</span>
            <span>{{ topAdTotal }}</span>
          </div>
          <div class="ad-last-box">
            <span v-if="topAdTotal > 3" class="green-light"></span>
            <span v-else class="red-light"></span>
            <span>促销广告位：</span>
            <span>{{ saleAdTotal }}</span>
          </div>
        </div>
      </div>
      <div class="apply-button-right">
        <el-button
          v-if="topAdTotal > 0 || saleAdTotal > 0"
          type="primary"
          size="small"
          @click="$router.push({ name: 'user-apply-ad' })"
          >立即申请</el-button
        >
      </div>
    </div>
    <div class="ad-list-box">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in adList" :key="index">
          <el-card class="ad-list-item" :body-style="{ padding: '0px' }">
            <img
              class="card-image"
              :src="item.advertType == '1' ? urlTop : urlSale"
            />
            <div style="padding: 14px">
              <div class="card-title">
                {{ item.advertType == "1" ? "置顶广告位" : "促销广告位" }}
              </div>
              <div style="font-size: 12px; text-align: center">
                申请时间：{{
                  _dateFormat("YYYY-mm-dd HH:MM", item.advertCreateTime)
                }}
              </div>
              <div class="current-state">
                <span
                  v-if="
                    item.advertExpireTime &&
                    item.advertIsExpire == '2' &&
                    item.advertApprovalStatus == '2'
                  "
                  class="el-icon-time"
                  :class="{
                    'reminder-expires': getOverDay(item.advertExpireTime) < 3,
                  }"
                >
                  <span
                    >剩余时长:{{ getOverDay(item.advertExpireTime) }}天</span
                  >
                  <span
                    v-if="getOverDay(item.advertExpireTime) < 3"
                    style="font-size: 12px"
                    >即将到期,请及时续费</span
                  >
                </span>
                <span v-if="item.advertIsExpire == '1'" class="haved-expires"
                  >已到期</span
                >
                <span
                  v-if="item.advertApprovalStatus == '3'"
                  class="haved-expires"
                  >失败：费用已退至原账户</span
                >
                <span
                  v-if="item.advertApprovalStatus == '4'"
                  class="haved-expires"
                  >强制下架</span
                >
                <span v-if="item.advertApprovalStatus == '1'">审核中...</span>
              </div>
              <div class="bottom-operate">
                <el-button
                  @click="deleteAd(item, index)"
                  v-if="
                    item.advertIsExpire == '1' ||
                    item.advertApprovalStatus == '3'
                  "
                  type="text"
                  style="color: #f56c6c"
                  >删除</el-button
                >
                <el-button @click="viewDetail(item)" type="text"
                  >查看</el-button
                >
                <el-button
                  @click="lengthenTime(item)"
                  v-if="
                    item.advertIsExpire == '2' &&
                    item.advertApprovalStatus == '2'
                  "
                  type="text"
                  >续费</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :hide-on-single-page="total / pageSize < 1"
        :page-sizes="[8, 16, 24]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      adList: [],
      currentPage: 1,
      pageSize: 8,
      total: 0,
      urlTop: require("@/assets/img/zhiding-ad.png"),
      urlSale: require("@/assets/img/cuxiao-ad.png"),
      topAdTotal: 0,
      saleAdTotal: 0,
    };
  },
  computed: {
    ...mapState('mall', ['mall_name', 'mall_id'])
  },
  methods: {
    handleCurrentChange(v) {
      this.currentPage = v;
      this.getTableData();
    },
    handleSizeChange(v) {
      this.pageSize = v;
      this.getTableData();
    },
    //计算剩余天数
    getOverDay(time) {
      let curtime = new Date(),
        stopTime = new Date(time),
        str = "";
      let num = (stopTime - curtime) / 1000 / 60 / 60 / 24;
      if (num > 0) {
        if (num < 1) {
          return 1;
        } else {
          return Math.floor(num);
        }
      } else {
        return 0;
      }
    },
    viewDetail(item) {
      this.$router.push({
        name: "user-apply-ad",
        query: { id: item.id, type: 1 },
      });
    },
    deleteAd(item, index) {
      this.$confirm("确认删除此广告位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http(
            {
              url: "merchant/advert/advertDelById",
              method: "get",
              data: { id: item.id },
            },
            (res) => {
              if (res.data.code == 200) {
                this.adList.splice(index, 1);
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.data.msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    getTableData() {
      this.http(
        {
          url: "merchant/advert/selByPageAndUser",
          method: "post",
          data: {
            currentPage: this.currentPage,
            pagesize: this.pageSize,
          },
        },
        (res) => {
          if (res.data.code == 200) {
            this.total = res.data.data.total;
            this.adList = res.data.data.rows;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },
    getLastAd() {
      this.http(
        {
          url: `merchant/chart/advertRent?id=${this.mall_id}`,
          method: "get",
        },
        (res) => {
          if (res.data.code == 200) {
            let obj = res.data.data;
            this.topAdTotal = obj[0].topAdvertNumber;
            this.saleAdTotal = obj[0].advertNumber;
          } else {
            this.$message.error(res.data.msg || "");
          }
        }
      );
    },
    lengthenTime(item) {
      this.$router.push({
        name: "user-apply-ad",
        query: { id: item.id, type: 2 },
      });
    },
  },
  mounted() {
    this.getLastAd();
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
.ad-list-box {
  margin-top: 20px;
  .current-state {
    font-size: 13px;
    padding: 10px 0;
    color: #409eff;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    .reminder-expires {
      color: #e6a23c;
    }
    .haved-expires {
      color: #f56c6c;
    }
  }
}
.ad-list-item {
  margin-bottom: 10px;
}
.card-title {
  text-align: center;
  padding: 5px 0;
}
.card-image {
  height: 200px;
  width: 100%;
  padding-top: 10px;
  object-fit: contain;
}
.bottom-operate {
  text-align: right;
  /deep/ .el-button {
    padding: 2px 0;
  }
}
.apply-button {
  display: flex;
  align-items: flex-end;
  .apply-button-left {
    color: #606266;
    margin-left: 10px;
  }
  .apply-button-right {
    padding-bottom: 3px;
  }
}
.current-mall {
  line-height: 30px;
}
.last-ad-num {
  display: flex;
  line-height: 30px;
}
.ad-last-box {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.red-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #f56c6c;
  margin-right: 5px;
  animation: breatheRed 1500ms infinite alternate;
}
.green-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #67c23a;
  margin-right: 5px;
  animation: breathe 1500ms infinite alternate;
}
@keyframes breathe {
  0% {
    opacity: 0.6;
    box-shadow: 0 1px 2px rgba(103, 194, 58, 0.4),
      0 1px 1px rgba(103, 194, 58, 0.1) inset;
  }

  100% {
    opacity: 1;
    box-shadow: 0 1px 30px #54b324, 0 1px 20px #54b324 inset;
  }
}
@keyframes breatheRed {
  0% {
    opacity: 0.6;
    box-shadow: 0 1px 2px rgba(245, 108, 108, 0.4),
      0 1px 1px rgba(245, 108, 108, 0.1) inset;
  }

  100% {
    opacity: 1;
    box-shadow: 0 1px 30px #f56c6c, 0 1px 20px #f56c6c inset;
  }
}
</style>