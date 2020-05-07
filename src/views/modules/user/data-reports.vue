<template>
    <div class="reports-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">销售报表</div>
        </div>
        <el-card class="chat-box">
            <div id="sales-total" class="sales-total"></div>
        </el-card>
        <el-card class="chat-box">
            <div id="good-rank" class="good-rank"></div>
        </el-card>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            chartBar: null,
        }
    },
    methods: {
        initChatBar() {
            let option = {
                title: {
                    text: '销售额-订单量',
                    subtext: '近10天'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['销售额', '订单量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.formmatTenDay(),
                        axisPointer: {
                            type: 'line'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '销售额',
                        min: 0,
                        max: 'dataMax',
                        minInterval: 1,
                        axisLabel: {
                            formatter: '{value} 元'
                        }
                    },
                    {
                        type: 'value',
                        name: '订单量',
                        min: 0,
                        max: 'dataMax',
                        minInterval: 1,
                        axisLabel: {
                            formatter: '{value} 单'
                        }
                    }
                ],
                series: [
                    {
                        name: '销售额',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0]
                    },
                    {
                        name: '订单量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5]
                    }
                ]
            }
            this.chartBar = echarts.init(document.getElementById('sales-total'))
            this.chartBar.setOption(option)
            window.addEventListener('resize', () => {
                this.chartBar.resize()
            })
        },
        formmatTenDay() {
            let arr = [], i = 0
            while(i < 10) {
                let time = new Date().getTime() - i * 1000 * 60 * 60 * 24,
                    month = new Date(time).getMonth() + 1,
                    currDate = new Date(time).getDate()
                arr.unshift(`${month}月${currDate}日`)
                i ++
            }
            return arr
        },
    },
    mounted() {
        this.initChatBar()
    }
}
</script>

<style lang="scss" scoped>
.sales-total{
    height: 400px;
}
</style>