<template>
    <div class="home-wrapper">
        <div class="top-box">
            <div class="info-block">
                <el-row :gutter="20">
                    <el-col :span="6" v-if="roleIds.some(checkIsSuperAdmin)">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">本月广告收入(元)</div>
                                        <div class="primary-info">{{Math.floor(totalAdMoney * 100) / 100}}</div>
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
                    <el-col :span="6" v-if="!roleIds.some(checkIsTourist)">
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
                    <el-col :span="6" v-if="roleIds.some(checkIsSuperAdmin) || roleIds.some(checkIsAdmin)">
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
                    <el-col :span="6" v-if="roleIds.some(checkIsSuperAdmin) || roleIds.some(checkIsAdmin)">
                        <el-card @click.native="toApproval" :body-style="{ padding: '15px' }" class="card-item">
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
                    <el-col :span="6" v-if="roleIds.some(checkIsMechant)">
                        <el-card :body-style="{ padding: '15px' }" class="card-item">
                            <div class="info-item">
                                <div class="item-top">
                                    <div class="item-top-left">
                                        <div class="block-title">本月成交订单量</div>
                                        <div class="primary-info">{{totalOrders}}</div>
                                    </div>
                                    <div class="item-top-right">
                                        <icon-svg name="orders"></icon-svg>
                                    </div>
                                </div>
                                <div class="item-bottom">
                                    <div class="scale-line" v-if="totalOrdersCompareLast >= 0">
                                        <icon-svg name="zengzhang"></icon-svg>
                                    </div>
                                    <div class="scale-line" v-if="totalOrdersCompareLast < 0">
                                        <icon-svg name="xiajiang"></icon-svg>
                                    </div>
                                    <div class="ratio-box">{{Math.floor(totalOrdersCompareLast*10000)/100}}%</div>
                                    <div class="compare-last">同比上月</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="bar-box">
            <div class="filter-box">
                <div v-if="roleIds.some(checkIsSuperAdmin) || roleIds.some(checkIsAdmin)" class="filter-row">
                    <span>选择商城：</span>
                    <el-select v-model="mallId" placeholder="请选择商城" style="width: 200px;">
                        <el-option v-for="(item, index) in mallList" :key="index" :label="item.shopName" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div v-if="!roleIds.some(checkIsTourist)" class="filter-row" style="margin-left: 30px">
                    <span>选择月份：</span>
                    <el-date-picker v-model="monthList" type="monthrange" align="left" unlink-panels range-separator="至" style="width: 400px;"
                        :picker-options="pickerOptions" start-placeholder="开始月份" end-placeholder="结束月份"></el-date-picker>
                </div>
            </div>
            <div v-show="roleIds.some(checkIsSuperAdmin)" id="ad-money" class="ad-money"></div>
            <div v-show="roleIds.some(checkIsSuperAdmin) || roleIds.some(checkIsAdmin)" id="sales-users" class="sales-users"></div>
        </div>
        <div v-show="roleIds.some(checkIsMechant)" class="merchant-bar-box">
            <div id="merchant-bar-line" class="merchant-bar-line"></div>
        </div>
        <div v-if="roleIds.some(checkIsTourist)" class="welcome-tab"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            roleIds: JSON.parse(this.$cookie.get('roleId')) || [],
            mallId: '',
            mallList: [],
            totalMoney: '',
            totalMoneyCompareLast: 0,
            totalUser: 0,
            totalUserCompareLast: 0,
            totalAdMoney: '',
            totalAdMoneyCompareLast: 0,
            awaitApproval: 0,
            totalOrders: 0,
            totalOrdersCompareLast: 0.0,
            chartBar: null,
            monthList: [],
            pickerOptions: {
                shortcuts: [{
                    text: '今年至今',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date(new Date().getFullYear(), 0);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            salesLine: null,
            mechantBar: null,
        }
    },
    watch: {
        mallId(n) {
            if (this.monthList && this.monthList.length == 2) {
                let dateArr = this.initDateList(this.monthList[0], this.monthList[1])
                this.getAdvertChartData(dateArr)
                this.getSalesAndUsers(dateArr)
                this.getAdMoney()
                this.getTransaction()
                this.getCustoms()
                this.getApproval()
            }
        },
        monthList(n) {
            if (n && n.length == 2) {
                let dateArr = this.initDateList(n[0], n[1])
                if (this.roleIds.includes('1') || this.roleIds.includes('2')) {
                    this.getAdvertChartData(dateArr)
                    this.getSalesAndUsers(dateArr)
                }else if (this.roleIds.includes('3')) {
                    this.getMerchantSaleAndOrders(dateArr)
                }
            }
        }
    },
    methods: {
        initDate(start, end) {
            let s = new Date(start), e = new Date(end), arr = []
            if (s.getFullYear() == e.getFullYear()) {
                while(s <= e) {
                    arr.push(`${s.getFullYear()}.${s.getMonth() + 1}`)
                    s.setMonth(s.getMonth() + 1)
                }
            }else {
                while(s <= e) {
                    arr.push(`${s.getFullYear()}.${s.getMonth() + 1}`)
                    if ((s.getMonth() + 1) > 11) {
                        s.setFullYear(s.getFullYear() + 1)
                        s.setMonth(0)
                    }else {
                        s.setMonth(s.getMonth() + 1)
                    }
                }
            }
            return arr
        },

        //计算出时间列表
        initDateList(start, end) {
            let s = new Date(start), e = new Date(end), arr = []
            if (s.getFullYear() == e.getFullYear()) {
                while(s <= e) {
                    arr.push(new Date(`${s.getFullYear()}/${s.getMonth() + 1}/01 08:00:00`))
                    s.setMonth(s.getMonth() + 1)
                }
            }else {
                while(s <= e) {
                    arr.push(new Date(`${s.getFullYear()}-${s.getMonth() + 1}-01 08:00:00`))
                    if ((s.getMonth() + 1) > 11) {
                        s.setFullYear(s.getFullYear() + 1)
                        s.setMonth(0)
                    }else {
                        s.setMonth(s.getMonth() + 1)
                    }
                }
            }
            return arr
        },

        //广告位收入报表
        initChart(start, end, topAd, proAd, topAdCopare, proAdCompare) {
            let date = this.initDate(start, end)
            let option = {
                title: [{
                    text: `${start.getFullYear()}年${start.getMonth() + 1}月-${end.getFullYear()}年${end.getMonth() + 1}月广告收入`,
                    left: 10,
                    top: 10,
                    textStyle: {
                        color: '#fff',
                    }
                }, {
                    text: '广告收入占比',
                    left: '91%',
                    top: '6%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                }],
                backgroundColor: '#012366',
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {    
                        type : 'shadow'
                    }
                },
                legend: {
                    x: 400,
                    data:['置顶广告位','促销广告位'],
                    textStyle: {
                        color: 'rgba(55,255,249,1)'
                    },
                    top: 10
                },
                grid: {
                    left: '1%',
                    right: '15%',
                    top: 70,
                    bottom: 20,
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : date,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(55,255,249,1)',
                            }
                        },
                        axisLabel: {
                            color: 'rgba(55,255,249,1)'
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(55,255,249,1)',
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 元'
                        }
                    }
                ],
                series : [
                    {
                        name:'置顶广告位',
                        type:'bar',
                        barWidth: 20,
                        itemStyle: {
                        barBorderRadius: 20, 
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "rgba(55,255,249,1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,222,215,0.2)"
                                }
                            ])
                        },
                        data: topAd
                    },
                    {
                        name:'促销广告位',
                        type:'bar',
                        barWidth: 20,
                        barGap: '-100%',
                        stack: '广告',
                        itemStyle: {
                        barBorderRadius: 20, 
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0.4,
                                    color: "rgba(255,252,0,1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(8,228,222,0.2)"
                                }
                            ])
                        },
                        data: proAd
                    },
                    {
                        type: 'pie',
                        center: ['92%', '33%'],
                        radius: [50, 70],
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [{
                            value: topAdCopare,
                            name: '置顶广告位',
                            tooltip: {
                                trigger: 'item',
                                formatter(params, ticket, callback) {
                                    return `${params.name} ${params.percent}%`
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "rgba(55,255,249,1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,222,215,0.2)"
                                        }
                                    ])
                                }
                            }
                        }, {
                            value: proAdCompare,
                            name: '促销广告位',
                            tooltip: {
                                trigger: 'item',
                                formatter(params, ticket, callback) {
                                    return `${params.name} ${params.percent}%`
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0.4,
                                            color: "rgba(255,252,0,1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(8,228,222,0.2)"
                                        }
                                    ])
                                }
                            }
                        }]
                    },
                ]
            }
            this.chartBar = echarts.init(document.getElementById('ad-money'))
            this.chartBar.setOption(option)
            window.addEventListener('resize', () => {
                this.chartBar.resize()
            })
        },

        //交易额 用户量
        initSales(start, end, sales, users) {
            let _date = this.initDate(start, end)
            let option = {
                backgroundColor: "#1A1835",
                title: {
                    text: `${start.getFullYear()}年${start.getMonth() + 1}月-${end.getFullYear()}年${end.getMonth() + 1}月 交易额-用户量`,
                    left: 10,
                    top: 10,
                    textStyle: {
                        color: '#fff',
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                },
                grid: {
                    borderWidth: 0,
                    top: 60,
                    bottom: 95,
                    left: 80,
                    right: 50,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    x: '46%',
                    top: '8%',
                    textStyle: {
                        color: '#90979c',
                    },
                    data: ['交易额', '用户量']
                },
                calculable: true,
                xAxis: [{
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            color: "rgba(204,187,225,0.5)",
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: _date,
                }],
                yAxis: [{
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(204,187,225,0.5)",
                        }
                    },
                }],
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [0],
                    bottom: 30,
                    "start": 10,
                    "end": 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: "#5B3AAE",
                    },
                    textStyle:{
                        color:"rgba(204,187,225,0.5)",
                    },
                    fillerColor:"rgba(67,55,160,0.4)",
                    borderColor: "rgba(204,187,225,0.5)",

                }, {
                    type: "inside",
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                series: [{
                    name: "交易额",
                    type: "line",
                    symbolSize: 10,
                    symbol: 'circle',
                    itemStyle: {
                        color: "#6f7de3",
                    },
                    markPoint: {
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        data: [{
                            type: 'max',
                            name: '最大值',

                        }, {
                            type: 'min',
                            name: '最小值'
                        }]
                    },
                    data: sales,
                }, {
                    name: "用户量",
                    type: "line",
                    symbolSize: 10,
                    symbol: 'circle',
                    itemStyle: {
                        color: "#c257F6",
                    },
                    markPoint: {
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        data: [{
                            type: 'max',
                            name: '最大值',

                        }, {
                            type: 'min',
                            name: '最小值'
                        }]
                    },
                    data: users
                }]
            }
            this.salesLine = echarts.init(document.getElementById('sales-users'))
            this.salesLine.setOption(option)
            window.addEventListener('resize', () => {
                this.salesLine.resize()
            })
        },

        //商户  交易额
        initMechant(start, end, sales, orders) {
            let _date = this.initDate(start, end)
            let option = {
                title: {
                    text: '交易额-订单量',
                    x: 10,
                    y: 10,
                    textStyle:{
                        color:'#B4B4B4',
                        fontSize:16,
                        fontWeight:'normal',
                    },
                    
                },
                backgroundColor: '#0d235e',
                tooltip: {
                    trigger: 'axis',
                    backgroundColor:'rgba(255,255,255,0.1)',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                            backgroundColor: '#7B7DDC'
                        }
                    }
                },
                legend: {
                    data: ['交易额', '订单量'],
                    textStyle: {
                        color: '#B4B4B4'
                    },
                    top:'7%',
                },
                grid:{
                    top: 60,
                    bottom: 65,
                    left: 120,
                    right: 90,
                },
                xAxis: {
                    data: _date,
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4'
                        }
                    },
                    axisTick:{
                        show: false,
                    },
                },
                yAxis: [{

                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },
                    axisLabel:{
                        formatter:'{value} 元',
                    }
                },
                {
                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },
                    axisLabel:{
                        formatter:'{value} 单',
                    }
                }],
                
                series: [{
                    name: '交易额',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 8,
                    yAxisIndex: 1,
                    itemStyle: {
                            normal: {
                            color:'#F02FC2'},
                    },
                    data: sales
                }, 
                
                {
                    name: '订单量',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#956FD4'},
                                    {offset: 1, color: '#3EACE5'}
                                ]
                            )
                        }
                    },
                    data: orders
                }
            ]
            };
            this.mechantBar = echarts.init(document.getElementById('merchant-bar-line'))
            this.mechantBar.setOption(option)
            window.addEventListener('resize', () => {
                this.mechantBar.resize()
            })
        },
        toApproval() {
            this.$router.push({
                name: 'admin-approval-manage'
            })
        },
        getMallList() {
            this.http({
                url: 'merchant/shopMall/findTShopMallAll',
                method: 'post',
                data: {
                    roles: this.roleIds
                }
            }, res => {
                if (res.data.code == 200) {
                    this.mallList = res.data.data
                    this.mallList.unshift({
                        shopName: '全部',
                        id: ''
                    })
                }
            })
        },
        checkIsSuperAdmin(item) {
            if (item == '1') {
                return true
            }
        },
        checkIsAdmin(item) {
            if (item == '2') {
                return true
            }
        },
        checkIsMechant(item) {
            if (item == '3') {
                return true
            }
        },
        checkIsTourist(item) {
            if (item == '4') {
                return true
            }
        },
        getAdMoney() {
            this.http({
                url: `merchant/chart/advertStatistics?shopMallId=${this.mallId}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.totalAdMoney = res.data.data.totalPrice
                    this.totalAdMoneyCompareLast = res.data.data.totalMouthPrice
                }
            })
        },
        getTransaction() {
            this.http({
                url: `merchant/chart/orderStatistics?shopMallId=${this.mallId}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.totalMoney = res.data.data.totalPrice
                    this.totalMoneyCompareLast = res.data.data.totalMouthPrice
                }
            })
        },
        getCustoms() {
            this.http({
                url: `merchant/chart/customerStatistics`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.totalUser = res.data.data.totalPrice
                    this.totalUserCompareLast = res.data.data.totalMouthPrice
                }
            })
        },
        getApproval() {
            this.http({
                url: `merchant/chart/advertStatisticsData?shopMallId=${this.mallId}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.awaitApproval = res.data.data.length
                }
            })
        },
        //报表 广告位收入
        getAdvertChartData(dateArr) {
            this.http({
                url: 'merchant/chart/getAdvertChartData',
                method: 'post',
                data: {
                    shopMallId: this.mallId,
                    mouths: dateArr
                }
            }, res => {
                if (res.data.code == 200) {
                    let obj = res.data.data
                    this.initChart(this.monthList[0], this.monthList[1], obj.topAvert, obj.advert, obj.topAvertZB, obj.advertZB)
                }
            })
        },

        //交易额和用户量 
        getSalesAndUsers(dateArr) {
            this.http({
                url: 'merchant/chart/getOrderChartData',
                method: 'post',
                data: {
                    shopMallId: this.mallId,
                    mouths: dateArr
                }
            }, res => {
                if (res.data.code == 200) {
                    let obj = res.data.data
                    this.initSales(this.monthList[0], this.monthList[1], obj.paramList, obj.customerChartData)
                }
            })
        },

        //交易额和订单量
        getMerchantSaleAndOrders(dateArr) {
            this.http({
                url: 'merchant/chart/getChartData',
                method: 'post',
                data: {
                    dates: dateArr,
                    type: 2,
                    shopId: this.$cookie.get('shopId')
                }
            }, res => {
                if (res.data.code == 200) {
                    const obj = res.data.data
                    this.totalOrders = parseInt(obj.nowOrderNumber)
                    this.totalOrdersCompareLast = parseFloat(obj.nowOrderNumberBFB)
                    this.totalMoney = obj.nowOrderPrice
                    this.totalMoneyCompareLast = obj.nowOrderPriceBFB
                    this.initMechant(this.monthList[0], this.monthList[1], res.data.data.salesNum, res.data.data.ordersNum)
                }
            }) 
        }
    },
    mounted() {
        this.monthList.push(new Date(`${new Date().getFullYear()}/01`))
        this.monthList.push(new Date(`${new Date().getFullYear()}/12`))
        let dateArr = this.initDateList(this.monthList[0], this.monthList[1])
        if (this.roleIds.some(this.checkIsSuperAdmin) || this.roleIds.some(this.checkIsAdmin)) {
            this.getMallList()
            this.getAdMoney()
            this.getTransaction()
            this.getCustoms()
            this.getApproval()
            this.getAdvertChartData(dateArr)
            this.getSalesAndUsers(dateArr)
        }
        if (this.roleIds.some(this.checkIsMechant)) {
            this.getMerchantSaleAndOrders(dateArr)
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
    height: 114px;
    margin-bottom: 10px;
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
.bar-box{
    margin-top: 10px;
}
.ad-money{
    height: 560px;
    margin-top: 10px;
}
.sales-users{
    height: 500px;
    margin-top: 20px;
}
.filter-box{
    display: flex;
}
.merchant-bar-line{
    height: 500px;
    margin-top: 20px;
}
</style>
