<template>
    <div class="filter-tree-wrapper" v-clickoutside="handleClose">
        <div class="drop-list-input-box" @click="handleFocus">
            <el-input :disabled="disabled" v-model="selectedLabel" :placeholder="placeholder" @blur="handleBlur" @keydown.enter.native="filterTree"
                ref="reference" class="drop-list-input" :style="{'width' : width + 'px'}" :prefix-icon="iconName">
            </el-input>
            <el-button v-if="!disabled" @click="filterTree">搜索</el-button>
        </div>
        <transition name="el-zoom-in-top" @after-leave="doDestroy">
            <dropDown ref="popper" v-show="visible" :defaultProps="defaultProps" :append-to-body="popperAppendToBody"
                :data="data" :showCheckbox="showCheckbox" @checkChange="handleCheckChange" @selectChange="handleSelectChange">
            </dropDown>
        </transition>   
    </div>
</template>

<script>
import dropDown from './dropdown.vue'
import Emitter from 'element-ui/src/mixins/emitter'
export default {
    mixins: [Emitter],
    props : {
        data : { type : Array, default : [] },
        popperAppendToBody: { type: Boolean, default: true },
        width : { default : 200},
        placeholder : { default : '请选择'},
        value : { },
        iconName: { type: String, default: 'el-icon-search'},
        defaultProps: {
            default() {
                return {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        showCheckbox: { type: Boolean, default: false},
        disabled: { default: false }
    },
    data() {
        return {
            visible : false,
            selectedLabel : '',
            selectValue : null,
            selectData : [],
        }
    },
    components : { dropDown },
    computed : {

    },
    watch : {
        visible(n) {
            if (!n) {
                this.broadcast('dropDownList', 'destroyPopper');
            }else {
                this.broadcast('dropDownList', 'updatePopper');
            }
        },
        selectValue(n) {
            this.$emit('input', n);
        },
        value : {
            handler(n) {
                if (typeof n == 'object') {
                    let _label = [], ids = []
                    n.forEach(item => {
                        _label.push(item.name)
                        ids.push(item.id)
                    })
                    this.handleSelectChange(_label, ids)
                }
                
            },
            deep: true,
            immediate: true
        },
    },
    methods : {
        handleFocus(event) {
            !this.disabled && (this.visible = true)
        },
        handleBlur(event) {
            // this.visible = false;
        },
        doDestroy() {
            this.$refs.popper && this.$refs.popper.doDestroy();
        },
        handleClose() {
            this.visible = false
        },
        handleCheckChange(arr, value) {
            this.selectedLabel = arr.join(',')
            this.selectValue = value
        },
        handleSelectChange(label, id) {
            this.selectedLabel = label.join('>')
            this.selectValue = id.join(',')
            this.visible = false
        },
        filterTree() {
            if (this.selectedLabel) {
                this.$refs.popper.handleFilter(this.selectedLabel)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.filter-tree-wrapper{
    display: inline-block;
}
.drop-list-input{
    /deep/ input{
        cursor: pointer;
    }
}
</style>


