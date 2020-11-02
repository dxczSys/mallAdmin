<template>
  <div class="finance">
    <tabs-title tabs-name="财务管理"></tabs-title>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px' }" :class="{'current-box': index === 1}" @click.native="index = 1" class="card-item">
          <div class="info-item">
            <div class="item-top">
              <div class="item-top-left">
                <div class="block-title">今日应结金额</div>
                <div class="primary-info">￥{{ today_sent_money }}</div>
              </div>
              <div class="item-top-right">
                <icon-svg name="yue"></icon-svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px' }" :class="{'current-box': index === 2}" @click.native="index = 2" class="card-item">
          <div class="info-item">
            <div class="item-top">
              <div class="item-top-left">
                <div class="block-title">待结总金额</div>
                <div class="primary-info">￥{{ total_money }}</div>
              </div>
              <div class="item-top-right">
                <icon-svg name="totalmoney"></icon-svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '15px' }" :class="{'current-box': index === 3}" @click.native="index = 3" class="card-item">
          <div class="info-item">
            <div class="item-top">
              <div class="item-top-left">
                <div class="block-title">已验总金额</div>
                <div class="primary-info">￥{{ all_money }}</div>
              </div>
              <div class="item-top-right">
                <icon-svg name="totalmoney"></icon-svg>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="search">
      <el-form :model="searchForm" ref="searchForm" label-width="70px" :inline="true" size="small">
        <el-form-item label="所属商城">
          <el-select v-model="searchForm.shopMallId" clearable @change="handleSearch" placeholder="请选择" style="width: 324px;">
            <el-option v-for="item in coupon_mall_options" :key="item.id" :label="item.shopName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺名称">
          <el-input v-model="searchForm.shoopName" clearable placeholder="请输入商铺名称" style="width: 324px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" width="50" type="index" align="center" header-align="center"></el-table-column>
        <el-table-column label="商铺名称" prop="couponName" min-width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="商铺所属商城" prop="couponName" width="220" align="center" header-align="center"></el-table-column>
        <el-table-column label="商铺账户名" prop="couponName" width="200" align="center" header-align="center"></el-table-column>
        <el-table-column label="商铺账户号" prop="couponName" width="240" align="center" header-align="center"></el-table-column>
        <el-table-column label="待结总金额" width="220" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.couponParPrice }}
            <span>{{ scope.row.couponModus == 1 ? '￥' : '折'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="划账时间" prop="couponName" width="240" align="center" header-align="center"></el-table-column>
        <el-table-column label="是否已划账" width="130" align="center" header-align="center">
          <template slot-scope="scope"> 
            {{ scope.row.isPay === 1? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" header-align="center">
          <template slot-scope="scope"> 
            <el-button type="text">已划账</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import tabsTitle from '@/components/tabs-title'
import { mapState } from 'vuex'
export default {
  components: { tabsTitle },
  data() {
    return {
      index: 1,
      today_sent_money: '0',
      total_money: '0',
      all_money: '0',
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      searchForm: {
        shopMallId: '',
        shoopName: ''
      },
      coupon_mall_options: []
    }
  },
  computed: {
    ...mapState('user', ['role_id'])
  },
  created() {
    this.getMallList()
  },
  methods: {
    getTableData() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    handleSearch() {},
    getMallList() {
      this.http({
        url: 'merchant/shopMall/findTShopMallAll',
        method: 'post',
        data: {
          roles: this.role_id
        }
      }, res => {
        if (res.data.code == 200) {
          this.coupon_mall_options = res.data.data
          this.coupon_mall_options.unshift({
            shopName: '所有',
            id: ''
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  cursor: pointer;
  &:hover {
    box-shadow: 0 5px 12px 0 rgba(23, 179, 163, 0.5);
  }
  height: 114px;
  margin-bottom: 10px;
}
.item-top {
  display: flex;
  .item-top-left {
    flex-grow: 1;
  }
  .item-top-right {
    font-size: 50px;
    margin-left: 10px;
  }
  .block-title {
    font-size: 16px;
    padding-top: 5px;
  }
  .primary-info {
    padding: 15px 0 5px;
    font-weight: 600;
  }
}
.current-box{
  border: 1px solid #409eff;
}
.search{
  margin-top: 15px;
}
</style>

