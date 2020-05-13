<template>
    <div class="filter-tree-wrapper" v-clickoutside="handleClose">
        <div class="drop-list-input-box" @click="handleFocus">
            <el-input readonly v-model="selectedLabel" :placeholder="placeholder" @blur="handleBlur"
                ref="reference" class="drop-list-input" :style="{'width' : width + 'px'}" :prefix-icon="iconName">
            </el-input>
        </div>
        <span @click="clearValue" class="el-icon-close"></span>
        <transition name="el-zoom-in-top" @after-leave="doDestroy">
            <dropDown ref="popper" v-show="visible" :append-to-body="popperAppendToBody" @colorPicker="colorPicker">
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
        popperAppendToBody: { type: Boolean, default: true },
        width : { default : 200},
        placeholder : { type : String, default : '请选择颜色'},
        value : { },
        iconName: { type: String, default: ''},
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
                this.broadcast('popperLayer', 'destroyPopper');
            }else {
                this.broadcast('popperLayer', 'updatePopper');
            }
        },
        selectValue(n) {
            this.$emit('input', n);
        },
        value : {
            handler(n) {
                this.selectedLabel = n
            },
            deep: true,
            immediate: true
        },
    },
    methods : {
        handleFocus(event) {
            if (!this.selectedLabel) {
                this.visible = !this.visible
            }
        },
        handleBlur(event) {
            // this.visible = false;
        },
        doDestroy() {
            this.$refs.popper && this.$refs.popper.doDestroy();
        },
        handleClose() {
            this.visible = false;
        },
        colorPicker(label) {
            this.selectedLabel = label
            this.selectValue = label
            this.visible = false
        },
        clearValue() {
            this.selectedLabel = ''
            this.selectValue = ''
        }
    },
}
</script>

<style lang="scss" scoped>
.filter-tree-wrapper{
    display: inline-block;
    position: relative;
    &:hover{
        .el-icon-close{
            display: inline-block;
        }
    }
    .el-icon-close{
        display: none;
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 999;
        font-size: 16px;
        cursor: pointer;
        &:hover{
            color: #409eff;
        }
    }
}
.drop-list-input{
    /deep/ input{
        cursor: pointer;
    }
}
</style>


