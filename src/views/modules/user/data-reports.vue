<template>
  <div class="reports-wrapper">
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
      <div style="font-weight: 600">销售报表</div>
    </div>
    <el-card class="chat-box">
      <div class="filter-by-time">
        <span
          class="fix-option"
          :class="{ 'current-label': index == 1 }"
          @click="switchTime(15, 1)"
          >近15天</span
        >
        <span
          class="fix-option"
          :class="{ 'current-label': index == 2 }"
          @click="switchTime(30, 2)"
          >近30天</span
        >
        <span
          class="fix-option"
          :class="{ 'current-label': index == 3 }"
          @click="switchTime(1, 3)"
          style="margin-right: 10px"
          >近1年</span
        >
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          range-separator="——"
          size="small"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div id="sales-total" class="sales-total"></div>
    </el-card>
    <el-card class="chat-box order-chat">
      <div id="good-rank" class="good-rank"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  data() {
    let self = this;
    return {
      index: 1,
      chartBar: null,
      orderChat: null,
      timeRange: [],
      pickerMinDate: "",
      pickerOptions: {
        disabledDate(time) {
          if (self.pickerMinDate !== "") {
            const day30 = (30 - 1) * 24 * 3600 * 1000;
            let maxTime = self.pickerMinDate + day30;
            if (maxTime > new Date()) {
              maxTime = new Date();
            }
            return time.getTime() > maxTime;
          }
          return time.getTime() > Date.now();
        },
        onPick({ maxDate, minDate }) {
          self.pickerMinDate = minDate.getTime();
          if (maxDate) {
            self.pickerMinDate = "";
          }
        },
      },
      dateArr: [],
      monthArr: [],
    };
  },
  watch: {
    timeRange(n) {
      if (n.length == 2) {
        this.getdiffdate(new Date(n[0]), new Date(n[1]));
      }
    },
  },
  computed: {
    ...mapState('mall', ['shop_id'])
  },
  methods: {
    initChatBar(date = [], salesNum = [], ordersNum = []) {
      let option = {
        color: ["#6faaf7", "#c23531"],
        title: {
          text: "销售额-订单量",
          subtext: "近10天",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        grid: {
          left: 80,
          right: 80,
          top: 80,
          bottom: 20,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
          },
        ],
        legend: {
          data: ["销售额", "订单量"],
        },
        xAxis: [
          {
            type: "category",
            data: date,
            axisPointer: {
              type: "line",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "销售额",
            min: 0,
            max: "dataMax",
            minInterval: 1,
            axisLabel: {
              formatter: "{value} 元",
            },
          },
          {
            type: "value",
            name: "订单量",
            min: 0,
            max: "dataMax",
            minInterval: 1,
            axisLabel: {
              formatter: "{value} 单",
            },
          },
        ],
        series: [
          {
            name: "销售额",
            type: "bar",
            data: salesNum,
            barMaxWidth: 30,
          },
          {
            name: "订单量",
            type: "line",
            yAxisIndex: 1,
            data: ordersNum,
          },
        ],
      };
      this.chartBar = echarts.init(document.getElementById("sales-total"));
      this.chartBar.setOption(option);
      window.addEventListener("resize", () => {
        this.chartBar.resize();
      });
    },
    initOrderChat(goods = [], orders = []) {
      let option = {
        title: {
          text: "商品销售排名前十",
          subtext: "按订单量排名",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 单",
          },
          // boundaryGap: [0, 1]
        },
        yAxis: {
          type: "category",
          data: goods,
        },
        series: [
          {
            name: "",
            type: "bar",
            data: orders,
            barMaxWidth: 30,
          },
        ],
      };
      this.orderChat = echarts.init(document.getElementById("good-rank"));
      this.orderChat.setOption(option);
      window.addEventListener("resize", () => {
        this.orderChat.resize();
      });
    },
    formmatDay(num) {
      let arr = [],
        dateArr = [],
        i = 0;
      while (i < num) {
        let time = new Date().getTime() - i * 1000 * 60 * 60 * 24,
          month = new Date(time).getMonth() + 1,
          currDate = new Date(time).getDate();
        arr.unshift(`${month}月${currDate}日`);
        dateArr.unshift(new Date(time));
        i++;
      }
      this.dateArr = dateArr;
      return arr;
    },
    formmateYear() {
      let arr = [],
        monthArr = [],
        data = new Date(),
        i = 0;
      data.setMonth(data.getMonth() + 1, 1);
      while (i < 12) {
        data.setMonth(data.getMonth() - 1, 1);
        let m = data.getMonth() + 1;
        monthArr.unshift(new Date(data));
        arr.unshift(`${data.getFullYear()}/${m}`);
        i++;
      }
      this.monthArr = monthArr;
      return arr;
    },
    switchTime(num, index) {
      this.index = index;
      if (num != 1) {
        let timeArr = this.formmatDay(num);
        this.http(
          {
            url: "merchant/chart/getChartData",
            method: "post",
            data: {
              dates: this.dateArr,
              type: 1,
              shopId: this.shop_id,
            },
          },
          (res) => {
            if (res.data.code == 200) {
              this.initChatBar(
                timeArr,
                res.data.data.salesNum,
                res.data.data.ordersNum
              );
              this.initOrderChat(
                res.data.data.goodsName,
                res.data.data.goodsOrders
              );
            }
          }
        );
      } else if (num == 1) {
        let month = this.formmateYear();
        this.http(
          {
            url: "merchant/chart/getChartData",
            method: "post",
            data: {
              dates: this.monthArr,
              type: 2,
              shopId: this.shop_id,
            },
          },
          (res) => {
            if (res.data.code == 200) {
              this.initChatBar(
                month,
                res.data.data.salesNum,
                res.data.data.ordersNum
              );
              this.initOrderChat(
                res.data.data.goodsName,
                res.data.data.goodsOrders
              );
            }
          }
        );
      }
    },
    getdiffdate(stime, etime) {
      this.index = -1;
      let arr = [],
        timeArr = [];
      while (stime <= etime) {
        arr.push(new Date(stime));
        timeArr.push(`${stime.getMonth() + 1}月${stime.getDate()}日`);
        stime.setDate(stime.getDate() + 1);
      }
      this.http(
        {
          url: "merchant/chart/getChartData",
          method: "post",
          data: {
            dates: arr,
            type: 1,
            shopId: this.shop_id,
          },
        },
        (res) => {
          if (res.data.code == 200) {
            this.initChatBar(
              timeArr,
              res.data.data.salesNum,
              res.data.data.ordersNum
            );
            this.initOrderChat(
              res.data.data.goodsName,
              res.data.data.goodsOrders
            );
          }
        }
      );
    },
  },

  mounted() {
    this.switchTime(10, 1);
  },
};
</script>

<style lang="scss" scoped>
.sales-total {
  height: 460px;
}
.good-rank {
  height: 400px;
}
.filter-by-time {
  padding-bottom: 15px;
  .fix-option {
    padding: 5px 8px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: #6faaf7;
      color: #fff;
    }
  }
}
.order-chat {
  margin-top: 20px;
}
.current-label {
  background-color: #6faaf7;
  color: #fff;
}
</style>