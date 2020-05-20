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
        <div class="bar-box">
            <div id="ad-money" class="ad-money"></div>
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
                awaitApproval: 3,
                dataMap: {},
            }
        },
        methods: {
            initChart() {
                let option = {
                    baseOption: {
                        timeline: {
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 1000,
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        },
                        title: {
                            subtext: '所有商城总收入'
                        },
                        legend: {
                            left: 'right',
                            data: ['置顶广告位', '促销广告位']
                        },
                        calculable : true,
                        grid: {
                            top: 80,
                            bottom: 100,
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                    label: {
                                        show: true,
                                        formatter: function (params) {
                                            return params.value.replace('\n', '');
                                        }
                                    }
                                }
                            }
                        },
                        xAxis: [
                            {
                                'type': 'category',
                                'axisLabel': {'interval': 0},
                                'data': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '广告收入(元)'
                            }
                        ],
                        series: [
                            {name: '置顶广告位', type: 'bar'},
                            {name: '促销广告位', type: 'bar'},
                            {
                                name: 'GDP占比',
                                type: 'pie',
                                center: ['75%', '35%'],
                                radius: '28%',
                                z: 100
                            }
                        ]
                    },
                    options: [
                        {
                            title: {text: '2002全国宏观经济指标'},
                            series: [
                                {data: dataMap.dataGDP['2002']},
                                {data: dataMap.dataFinancial['2002']},
                                {data: dataMap.dataEstate['2002']},
                                {data: dataMap.dataPI['2002']},
                                {data: dataMap.dataSI['2002']},
                                {data: dataMap.dataTI['2002']},
                                {data: [
                                    {name: '第一产业', value: dataMap.dataPI['2002sum']},
                                    {name: '第二产业', value: dataMap.dataSI['2002sum']},
                                    {name: '第三产业', value: dataMap.dataTI['2002sum']}
                                ]}
                            ]
                        },
                        {
                            title : {text: '2003全国宏观经济指标'},
                            series : [
                                {data: dataMap.dataGDP['2003']},
                                {data: dataMap.dataFinancial['2003']},
                                {data: dataMap.dataEstate['2003']},
                                {data: dataMap.dataPI['2003']},
                                {data: dataMap.dataSI['2003']},
                                {data: dataMap.dataTI['2003']},
                                {data: [
                                    {name: '第一产业', value: dataMap.dataPI['2003sum']},
                                    {name: '第二产业', value: dataMap.dataSI['2003sum']},
                                    {name: '第三产业', value: dataMap.dataTI['2003sum']}
                                ]}
                            ]
                        }
                    ]
                };
            },
            dataFormatter(obj) {
                let pList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                let temp
                for (let year = 2002; year <= 2011; year++) {
                    var max = 0;
                    var sum = 0;
                    temp = obj[year];
                    for (var i = 0, l = temp.length; i < l; i++) {
                        max = Math.max(max, temp[i]);
                        sum += temp[i];
                        obj[year][i] = {
                            name: pList[i],
                            value: temp[i]
                        };
                    }
                    obj[year + 'max'] = Math.floor(max / 100) * 100;
                    obj[year + 'sum'] = sum;
                }
                return obj;
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
.ad-money{
    height: 460px;
}
</style>
