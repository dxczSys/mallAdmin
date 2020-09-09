<template>
    <div class="upload-file-wrapper">
        <div class="upload-file-box">
            <viewer title="点击预览" :images="imageArr" @inited="inited" ref="viewer">
                <div class="show-imgs-list" v-if="imageArr.length">
                    <div class="img-item" v-for="(item, index) in imageArr" :key="index">
                        <img :src="item.url">
                        <div class="delete-layer">
                            <div>
                                <span @click="imgPreview(item)" class="el-icon-zoom-in"></span>
                                <span @click="remove(item)" v-if="!disabled" class="el-icon-delete"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </viewer>
            <el-upload
                v-if="refresh"
                class="avatar-uploader" :action="actionUrl"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :limit="limit"
                :accept="accept">
                <i v-if="imageArr.length < limit" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="limit-tip">{{limitTip}}</div>
    </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
import { Loading } from 'element-ui'
Vue.use(Viewer)
export default {
    props: {
        disabled: { default: false },
        limit: { default: 1 },
        size: { default: false },
        accept: { default: 'image/*' },
        limitTip: { default: '' },
        value: {
            type: [Object, String],
            default: () => { return {} }
        },
        urlType: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
            baseUrl: window.SITE_CONFIG['baseUrl'] + 'merchant/tShop/fileUploads',
            fileUrl: window.SITE_CONFIG['fileUrl'],
            uploadUrl: window.SITE_CONFIG['uploadUrl'],
            imageArr: [],
            loadingInstance: '',
            refresh: true
        }
    },
    watch: {
        value: {
            handler(n) {
                if ((typeof n == 'object' && Object.keys(n).length) || (typeof n == 'string' && n)) {
                    this.imageArr = [{
                        url: this.fileUrl + n.url
                    }]
                }
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        actionUrl() {
            if (this.urlType == '1') {
                return this.baseUrl
            } else {
                return this.uploadUrl
            }
        }
    },
    methods: {
        inited (viewer) {
            this.$viewer = viewer
        },
        beforeUpload(file) {
            if (this.size && file.size / 1024 / 1024 > this.size) {
                this.$message.error('文件大小超出限制!')
                return false
            }
            this.loadingInstance = Loading.service({
                lock: true,
                text: '图片上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            })
        },
        handleSuccess(res, file, fileList) {
            this.loadingInstance.close()
            if (res.code == 200) {
                this.imageArr = [{
                    url: this.fileUrl + res.data.url
                }]
                this.$emit('input', res.data)
            } else {
                this.imageArr = []
                this.$emit('input', {})
            }
        },
        imgPreview(item) {
            this.$viewer.show()
        },
        remove(item) {
            this.imageArr = []
            this.$emit('input', {})
            this.refresh = false
            this.$nextTick(_ => {
                this.refresh = true
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.upload-file-box{
    display: flex;
}
.show-imgs-list{
    display: flex;
    flex-wrap: wrap;
}
.avatar-uploader{
    /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
}
.limit-tip{
    font-size: 12px;
    color: #999;
    line-height: 20px;
}
.img-item {
    position: relative;
    border: 1px solid #c0ccda;
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    margin: 0 8px 8px 0;
    cursor: pointer;
    width: 148px;
    height: 148px;
    img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }
    &:hover{
        .delete-layer{
            display: flex;
        }
    }
    .delete-layer{
        position: absolute;
        top: 0;
        left: -1px;
        width: 148px;
        height: 148px;
        border-radius: 6px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
        display: none;
        align-items: center;
        z-index: 999;
        div{
            flex-grow: 1;
            span{
                padding: 0 5px;
            }
        }
        .el-icon-zoom-in:hover{
            color: #17B3A3;
        }
        .el-icon-delete:hover{
            color: #F56C6C;
        }
    }
}
</style>