<template>
    <div class="img-view-wrapper">
        <viewer title="点击预览" :images="imgUrls" @inited="inited" ref="viewer">
            <div class="img-box" :style="{width: `${width}px`, height: `${height}px`}">
                <img v-for="(item, index) in imgUrls" :src="item" :key="index">
                <div class="zoom-layer" @click="openZoom">
                    <span class="el-icon-zoom-in"></span>
                </div>
            </div>
        </viewer>
    </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
export default {
    props: {
        images: [ Array, String],
        width: { default: 100 },
        height: { default: 120 }
    },
    computed: {
        imgUrls() {
            if (typeof this.images == 'string') {
                if (this.images.indexOf('undefined') > -1) {
                    return []
                }else {
                    return [this.images]
                }
            }else {
                return this.images
            }
        }
    },
    methods: {
        inited (viewer) {
            this.$viewer = viewer
        },
        openZoom() {
            this.$viewer.show()
        }
    }
}
</script>

<style lang="scss" scoped>
.view-box{
    cursor: pointer;
    width: 100%;
    height: 100%;
}
.img-box{
    position: relative;
    &:hover{
        .zoom-layer{
            display: flex;
        }
    }
    img{
        max-width: 100%;
        max-height: 100%;
        object-fit: scale-down;
    }
    .zoom-layer{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        span{
            font-size: 20px;
            &:hover{
                color: #17B3A3;
            }
        }
    }
}
</style>