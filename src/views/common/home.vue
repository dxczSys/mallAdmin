<template>
    <div class="home-wrapper">
        <div class="top-box">
            <div class="info-block">
                <el-row :gutter="20" justify="center">
                    <el-col :span="6">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">本月交易额(元)</div>
                                        <div class="primary-info">{{totalMoney}}</div>
                                    </div>
                                    <div class="item-top-right">
                                        <icon-svg name="jiaoyi"></icon-svg>
                                    </div>
                                </div>
                                <div class="item-bottom">
                                    <div class="scale-line" v-if="totalMoneyCompareLast >= 0">
                                        <icon-svg name="zengzhang"></icon-svg>
                                    </div>
                                    <div class="scale-line" v-if="totalMoneyCompareLast < 0">
                                        <icon-svg name="xiajiang"></icon-svg>
                                    </div>
                                    <div class="ratio-box">{{Math.floor(totalMoneyCompareLast*10000)/100}}%</div>
                                    <div class="compare-last">同比上月</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">商城用户</div>
                                        <div class="primary-info">{{totalUser}}</div>
                                    </div>
                                    <div class="item-top-right">
                                        <icon-svg name="yonghu"></icon-svg>
                                    </div>
                                </div>
                                <div class="item-bottom">
                                    <div class="scale-line" v-if="totalUserCompareLast >= 0">
                                        <icon-svg name="zengzhang"></icon-svg>
                                    </div>
                                    <div class="scale-line" v-if="totalUserCompareLast < 0">
                                        <icon-svg name="xiajiang"></icon-svg>
                                    </div>
                                    <div class="ratio-box">{{Math.floor(totalUserCompareLast*10000)/100}}%</div>
                                    <div class="compare-last">同比上月</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">本月广告收入(元)</div>
                                        <div class="primary-info">{{totalAdMoney}}</div>
                                    </div>
                                    <div class="item-top-right">
                                        <icon-svg name="guanggao"></icon-svg>
                                    </div>
                                </div>
                                <div class="item-bottom">
                                    <div class="scale-line" v-if="totalAdMoneyCompareLast >= 0">
                                        <icon-svg name="zengzhang"></icon-svg>
                                    </div>
                                    <div class="scale-line" v-if="totalAdMoneyCompareLast < 0">
                                        <icon-svg name="xiajiang"></icon-svg>
                                    </div>
                                    <div class="ratio-box">{{Math.floor(totalAdMoneyCompareLast*10000)/100}}%</div>
                                    <div class="compare-last">同比上月</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">待审批</div>
                                        <div class="primary-info">共{{awaitApproval}}条</div>
                                    </div>
                                    <div class="item-top-right">
                                        <icon-svg name="daishenpi"></icon-svg>
                                    </div>
                                </div>
                                <div>请及时审批</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                totalMoney: '3500.00',
                totalMoneyCompareLast: 0.035,
                totalUser: 4352001,
                totalUserCompareLast: -0.01,
                totalAdMoney: '2003.08',
                totalAdMoneyCompareLast: 0.001,
                awaitApproval: 3
            }
        }
    }
</script>

<style lang="scss" scoped>
.card-item{
    cursor: pointer;
    &:hover{
        box-shadow: 0 5px 12px 0 rgba(23, 179, 163, .5);
    }
}
.item-top{
    display: flex;
    .item-top-left{
        flex-grow: 1;
    }
    .item-top-right{
        font-size: 50px;
        margin-left: 10px;
    }
    .block-title{
        font-size: 16px;
        padding-top: 5px;
    }
    .primary-info{
        padding: 6px 0 5px;
        font-weight: 600;
    }
}
.item-bottom{
    display: flex;
    .scale-line{
        font-size: 16px;
        padding-right: 5px;
    }
    .ratio-box{
        color: #17B3A3;
        padding-right: 5px;
    }
    .compare-last{
        color: #999;
    }
}
</style>
