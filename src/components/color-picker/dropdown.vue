<template>
    <div class="drop-down el-select-dropdown el-popper" :style="{'width' : 600 + 'px'}">
        <div class="color-picker-box">
            <div class="color-system-left">
                <div class="color-system-left-item" @mouseover="switchSystem(item.id)" v-for="(item, index) in colorSystem" :key="index">
                    <div :style="{'background-color': item.colorValue}"></div>
                    <div>{{item.label}}</div>
                </div>
            </div>
            <div class="color-value-right">
                <div style="font-size: 12px; line-height: 24px;">常用标准颜色</div>
                <el-row :gutter="10">
                    <el-col :span="6" v-for="(i, j) in currentSystem" :key="j">
                        <div class="color-value-right-item" @click="handleColorPicker(i)">
                            <div class="color-box" :style="{'background-color': i.colorValue}"></div>
                            <div>{{i.label}}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
export default {
    name : 'popperLayer',
    componentName : 'popperLayer',
    mixins: [Popper],
    props: {
        placement: { default: 'bottom-start' },
        boundariesPadding: { default: 0 },
        popperOptions: {
            default() {
                return {
                    gpuAcceleration: false
                }
            }
        },
        visibleArrow: { default: true },
        appendToBody: { type: Boolean, default: true },
    },

    data() {
        return {
            colorSystem: [
                {
                    id: 'a1',
                    label: '白色系',
                    colorValue: '#fff'
                },{
                    id: 'a2',
                    label: '灰色系',
                    colorValue: '#808080'
                },{
                    id: 'a3',
                    label: '黑色系',
                    colorValue: '#000',
                },{
                    id: 'a4',
                    label: '红色系',
                    colorValue: '#ff0000'
                },{
                    id: 'a5',
                    label: '黄色系',
                    colorValue: '#ffff00'
                },{
                    id: 'a6',
                    label: '绿色系',
                    colorValue: '#008000'
                },{
                    id: 'a7',
                    label: '蓝色系',
                    colorValue: '#0000FE'
                },{
                    id: 'a8',
                    label: '紫色系',
                    colorValue: '#800080'
                },{
                    id: 'a9',
                    label: '棕色系',
                    colorValue: '#7C4B00'
                },{
                    id: 'a10',
                    label: '花色系',
                    colorValue: '#fff'
                },{
                    id: 'a11',
                    label: '透明系',
                    colorValue: '#fff'
                }
            ],
            normalValue: {
                'a1': [
                    {
                        id: 'a1a1',
                        label: '白色',
                        colorValue: 'rgb(255, 255, 255)'
                    },
                    {
                        id: 'a1a2',
                        label: '乳白色',
                        colorValue: 'rgb(255, 251, 240)'
                    },
                    {
                        id: 'a1a3',
                        label: '米白色',
                        colorValue: 'rgb(238, 222, 176)'
                    },
                ],
                'a2': [
                    {
                        id: 'a2a1',
                        label: '银色',
                        colorValue: 'rgb(192, 192, 192)'
                    },
                    {
                        id: 'a2a2',
                        label: '浅灰色',
                        colorValue: 'rgb(228, 228, 228)'
                    },
                    {
                        id: 'a2a3',
                        label: '灰色',
                        colorValue: 'rgb(128, 128, 128)'
                    },
                    {
                        id: 'a2a4',
                        label: '深灰色',
                        colorValue: 'rgb(102, 102, 102)'
                    },
                ],
                'a3': [
                    {
                        id: 'a3a1',
                        label: '黑色',
                        colorValue: 'rgb(0, 0, 0)'
                    },
                ],
                'a4': [
                    {
                        id: 'a4a1',
                        label: '红色',
                        colorValue: 'rgb(255, 0, 0)'
                    },
                    {
                        id: 'a4a2',
                        label: '酒红色',
                        colorValue: 'rgb(153, 0, 0)'
                    },
                    {
                        id: 'a4a3',
                        label: '粉红色',
                        colorValue: 'rgb(255, 182, 193)'
                    },
                    {
                        id: 'a4a4',
                        label: '玫红色',
                        colorValue: 'rgb(223, 27, 118)'
                    },
                    {
                        id: 'a4a5',
                        label: '西瓜红',
                        colorValue: 'rgb(240, 86, 84)'
                    },
                    {
                        id: 'a4a6',
                        label: '藕色',
                        colorValue: 'rgb(238, 208, 216)'
                    },
                    {
                        id: 'a4a7',
                        label: '橘红色',
                        colorValue: 'rgb(255, 117, 0)'
                    },
                ],
                'a5': [
                    {
                        id: 'a5a1',
                        label: '黄色',
                        colorValue: 'rgb(255, 255, 0)'
                    },
                    {
                        id: 'a5a2',
                        label: '金色',
                        colorValue: 'rgb(255, 215, 0)'
                    },
                    {
                        id: 'a5a3',
                        label: '卡其色',
                        colorValue: 'rgb(195, 176, 145)'
                    },
                    {
                        id: 'a5a4',
                        label: '杏色',
                        colorValue: 'rgb(247, 238, 214)'
                    },
                    {
                        id: 'a5a5',
                        label: '浅黄色',
                        colorValue: 'rgb(250, 255, 114)'
                    },
                    {
                        id: 'a5a6',
                        label: '橘色',
                        colorValue: 'rgb(255, 165, 0)'
                    },
                    {
                        id: 'a5a7',
                        label: '香槟色',
                        colorValue: 'rgb(255, 255, 255)'
                    },
                    {
                        id: 'a5a8',
                        label: '柠檬黄',
                        colorValue: 'rgb(255, 236, 67)'
                    },
                    {
                        id: 'a5a9',
                        label: '荧光黄',
                        colorValue: 'rgb(234, 255, 86)'
                    },
                    {
                        id: 'a5a10',
                        label: '姜黄色',
                        colorValue: 'rgb(255, 199, 115)'
                    },
                    {
                        id: 'a5a11',
                        label: '明黄色',
                        colorValue: 'rgb(255, 255, 1)'
                    },
                ],
                'a6': [
                    {
                        id: 'a6a1',
                        label: '绿色',
                        colorValue: 'rgb(0, 128, 0)'
                    },
                    {
                        id: 'a6a2',
                        label: '浅绿色',
                        colorValue: 'rgb(152, 251, 152)'
                    },
                    {
                        id: 'a6a3',
                        label: '墨绿色',
                        colorValue: 'rgb(20, 80, 20)'
                    },
                    {
                        id: 'a6a4',
                        label: '军绿色',
                        colorValue: 'rgb(93, 118, 42)'
                    },
                    {
                        id: 'a6a5',
                        label: '青色',
                        colorValue: 'rgb(0, 224, 158)'
                    },
                    {
                        id: 'a6a6',
                        label: '荧光绿',
                        colorValue: 'rgb(35, 250, 7)'
                    },
                    {
                        id: 'a6a7',
                        label: '翠绿色',
                        colorValue: 'rgb(10, 163, 68)'
                    },
                ],
                'a7': [
                    {
                        id: 'a7a1',
                        label: '浅蓝色',
                        colorValue: 'rgb(210, 240, 244)'
                    },
                    {
                        id: 'a7a2',
                        label: '蓝色',
                        colorValue: 'rgb(0, 0, 254)'
                    },
                    {
                        id: 'a7a3',
                        label: '深蓝色',
                        colorValue: 'rgb(4, 22, 144)'
                    },
                    {
                        id: 'a7a4',
                        label: '藏青色',
                        colorValue: 'rgb(46, 78, 126)'
                    },
                    {
                        id: 'a7a5',
                        label: '天蓝色',
                        colorValue: 'rgb(68, 206, 246)'
                    },
                    {
                        id: 'a7a6',
                        label: '宝蓝色',
                        colorValue: 'rgb(75, 92, 196)'
                    },
                    {
                        id: 'a7a7',
                        label: '孔雀蓝',
                        colorValue: 'rgb(0, 164, 197)'
                    },
                    {
                        id: 'a7a8',
                        label: '湖蓝色',
                        colorValue: 'rgb(48, 223, 243)'
                    },
                ],
                'a8': [
                    {
                        id: 'a8a1',
                        label: '紫色',
                        colorValue: 'rgb(128, 0, 128)'
                    },
                    {
                        id: 'a8a2',
                        label: '紫罗兰',
                        colorValue: 'rgb(183, 172, 228)'
                    },
                    {
                        id: 'a8a3',
                        label: '深紫色',
                        colorValue: 'rgb(67, 6, 83)'
                    },
                    {
                        id: 'a8a4',
                        label: '浅紫色',
                        colorValue: 'rgb(237, 224, 230)'
                    },
                    {
                        id: 'a8a5',
                        label: '紫红色',
                        colorValue: 'rgb(139, 0, 98)'
                    },
                ],
                'a9': [
                    {
                        id: 'a9a1',
                        label: '浅棕色',
                        colorValue: 'rgb(179, 92, 68)'
                    },
                    {
                        id: 'a9a2',
                        label: '咖啡色',
                        colorValue: 'rgb(96, 57, 18)'
                    },
                    {
                        id: 'a9a3',
                        label: '褐色',
                        colorValue: 'rgb(133, 91, 0)'
                    },
                    {
                        id: 'a9a4',
                        label: '驼色',
                        colorValue: 'rgb(168, 132, 98)'
                    },
                    {
                        id: 'a9a5',
                        label: '巧克力色',
                        colorValue: 'rgb(210, 105, 30)'
                    },
                    {
                        id: 'a9a6',
                        label: '深卡其布色',
                        colorValue: 'rgb(189, 183, 107)'
                    },
                    {
                        id: 'a9a7',
                        label: '粟色',
                        colorValue: 'rgb(96, 40, 30)'
                    },
                    {
                        id: 'a9a8',
                        label: '深棕色',
                        colorValue: 'rgb(124, 75, 0)'
                    },
                ],
                'a10': [
                    {
                        id: 'a10a1',
                        label: '花色',
                        colorValue: 'rgb(255, 255, 255)'
                    },
                ],
                'a11': [
                    {
                        id: 'a11a1',
                        label: '透明',
                        colorValue: 'rgb(255, 255, 255)'
                    },
                ]
            },
            currentSystem: []
        }
    },

    methods : {
        switchSystem(id) {
            this.currentSystem = this.normalValue[id]
        },
        handleColorPicker(item) {
            this.$emit('colorPicker', item.label)
        }
    },

    mounted() {
        this.referenceElm = this.$parent.$refs.reference.$el;
        this.$parent.popperElm = this.popperElm = this.$el;
        this.$on('updatePopper', () => {
            if (this.$parent.visible) this.updatePopper();
        });
        this.$on('destroyPopper', this.destroyPopper);
        this.currentSystem = this.normalValue.a1
    }
    
}
</script>

<style lang="scss" scoped>
.drop-down{
    min-height: 200px;
    overflow: auto;
}
.color-picker-box{
    display: flex;
    .color-system-left{
        border-right: 1px solid #e5e5e5;
    }
    .color-value-right{
        padding: 10px 20px;
        flex-grow: 1;
    }
}
.color-system-left-item{
    display: flex;
    align-items: center;
    width: 116px;
    font-size: 12px;
    padding: 0 10px;
    line-height: 30px;
    cursor: pointer;
    &:hover{
        background-color: #eee;
    }
    div:first-child{
        border: 1px solid #ddd;
        width: 11px;
        height: 11px;
        margin-right: 5px;
    }
}
.color-value-right-item{
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    padding: 0 10px;
    line-height: 30px;
    &:hover{
        background-color: #eee;
    }
    div:first-child{
        border: 1px solid #ddd;
        width: 11px;
        height: 11px;
        margin-right: 5px;
    }
}
::-webkit-scrollbar{  
    width: 5px;  
    height: 5px;  
    background-color: #F5F5F5;  
}   
::-webkit-scrollbar-track{  
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}    
::-webkit-scrollbar-thumb{  
    border-radius: 10px;  
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #bdbdbd;  
}  
::-webkit-scrollbar-thumb:hover{
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.4);
}
</style>


