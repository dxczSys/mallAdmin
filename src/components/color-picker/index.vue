<template>
    <div class="filter-tree-wrapper" v-clickoutside="handleClose">
        <div class="drop-list-input-box" @click="handleFocus">
            <el-input readonly v-model="selectedLabel" :placeholder="placeholder" @blur="handleBlur"
                ref="reference" class="drop-list-input" :style="{'width' : width + 'px'}" :prefix-icon="iconName">
            </el-input>
        </div>
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
            },
            deep: true,
            immediate: true
        },
    },
    methods : {
        handleFocus(event) {
            this.visible = !this.visible
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


