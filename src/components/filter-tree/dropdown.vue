<template>
    <div class="drop-down el-select-dropdown el-popper" :style="{'width' : $parent.width + 'px'}">
        <el-tree class="filter-tree" :data="data" :props="defaultProps" :show-checkbox="showCheckbox" 
            ref="filterTree" @check-change="handleCheckChange">
        </el-tree>
    </div>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
export default {
    name : 'dropDownList',
    componentName : 'dropDownList',
    mixins: [Popper],
    props: {
        data : { type : Array, default: () => [] },
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
        defaultProps: {
            default() {
                return {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        showCheckbox: { type: Boolean, default: false}
    },

    data() {
        return {
        }
    },

    computed : {
        
    },
    watch : {
        
    },

    methods : {
        handleCheckChange(data, checked, indeterminate) {
            let allChecked = this.$refs.filterTree.getCheckedNodes()
            let labelName = [], value = []
            allChecked.forEach(item => {
                if (item.level == 3) {
                    labelName.push(item.label)
                    value.push(item.id)
                }
            })
            this.$emit('checkChange', labelName, value)
        },
    },

    mounted() {
        this.referenceElm = this.$parent.$refs.reference.$el;
        this.$parent.popperElm = this.popperElm = this.$el;
        this.$on('updatePopper', () => {
            if (this.$parent.visible) this.updatePopper();
        });
        this.$on('destroyPopper', this.destroyPopper);
        
    }
    
}
</script>

<style lang="scss" scoped>
.drop-down{
    min-height: 200px;
    overflow: auto;
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


