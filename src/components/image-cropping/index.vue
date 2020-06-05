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
            <el-upload v-if="refreInput"
                class="avatar-uploader" action=""
                :show-file-list="false"
                :on-change="handleChange"
                :auto-upload="false"
                :multiple="multiple"
                :limit="limit"
                :accept="accept">
                <i v-if="imageArr.length < limit" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="limit-tip">{{limitTip}}</div>
        <el-dialog title="图片裁剪" :visible.sync="dialogVisible">
            <div class="cropper-wrapper">
                <div class="cropper" style="text-align:center">
                    <VueCropper
                        ref="cropper"
                        :img="options.img"
                        :outputSize="options.outputSize"
                        :outputType="options.outputType"
                        :autoCrop="options.autoCrop"
                        :autoCropWidth="options.autoCropWidth"
                        :autoCropHeight="options.autoCropHeight"
                        :fixedBox="options.fixedBox"
                        @realTime="realTime">
                    </VueCropper>
                </div>
                <div class="cropper-preview">
                    <div v-if="previews" class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                        <div :style="previews.div">
                            <img :src="previews.url" :style="previews.img">
                        </div>
                    </div>
                    <div class="operate-box">
                        <el-button size="small" @click="dialogVisible=false">取消</el-button>
                        <el-button type="primary" @click="finish" size="small">确定</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import VueCropper from 'vue-cropper'
import Vue from 'vue'
Vue.use(Viewer)
Vue.use(VueCropper)
export default {
    // components: { VueCropper },
    props: {
        'show-file-list': { default: false },
        filelist: { 
            type: Array, 
            default() {
                return []
            } 
        },
        disabled: { default: false },
        multiple: { default: false },
        limit: { default: 1 },
        size: { default: 2 },
        accept: { default: 'image/*' },
        limitTip: { default: '图片大小不能超过2M' }
    },
    data() {
        return {
            imageArr: [],
            beginNum: 0,
            refreInput: true,
            dialogVisible: false,
            options: {
                img: '',
                outputSize: 0.8,
                outputType: 'png',
                autoCrop: true,
                autoCropWidth: 148,
                autoCropHeight: 148,
                fixedBox: true,
            },
            previews: '',
        }
    },
    watch: {
        filelist: {
            handler(n) {
                if (this.beginNum == 1) {
                    n.map(item => {
                        item.uid = (Math.random()*10000000000 + '').split('.')[0]
                    })
                    if (this.filelist.length > this.limit) {
                        let arr = this.filelist.slice(0, this.limit)
                        this.imageArr = JSON.parse(JSON.stringify(arr))
                    }else {
                        this.imageArr = JSON.parse(JSON.stringify(this.filelist))
                    }
                }
                this.beginNum ++
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        inited (viewer) {
            this.$viewer = viewer
        },
        handleChange(file, fileList) {
            this.beginNum ++
            if (file.size / 1024 / 1024 < this.size) {
                if (file.raw.type.split('/')[0] == this.accept.split('/')[0]) {
                    this.options.img = URL.createObjectURL(file.raw)
                    console.log('源文件', file.raw)
                    this.dialogVisible = true
                }else {
                    this.$message.error('文件类型不符!')
                }
            }else {
                this.$message.error('文件大小超出限制!')
            } 
            this.refreInput = false
            this.$nextTick(_ => {
                this.refreInput = true
            })
        },
        imgPreview(item) {
            this.$viewer.show()
        },
        remove(item) {
            for (let j = 0; j < this.filelist.length; j ++) {
                if (this.filelist[j].uid == item.uid) {
                    this.filelist.splice(j, 1)
                    break
                }
            }
            for (let i = 0; i < this.imageArr.length; i ++) {
                if (this.imageArr[i].uid == item.uid) {
                    this.imageArr.splice(i, 1)
                    break
                }
            }
        },
        realTime(data) {
            this.previews = data
        },
        finish() {
            this.$refs.cropper.getCropBlob(data => {
                let raw = new window.File([data], 'logo.png', {type: data.type})
                let files = {
                    uid: (Math.random()*10000000000 + '').split('.')[0],
                    raw: raw,
                    url: URL.createObjectURL(data),
                }
                this.filelist.push(files)
                this.imageArr.push({
                    uid: files.uid,
                    url: files.url
                })
                this.dialogVisible = false
            })
        },
        Base64toFile(dataurl, filename) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
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
        border-radius: 50%;
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
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
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
.cropper{
    width: 500px;
    height: 500px;
    /deep/ .cropper-view-box{
        border-radius: 50%;
    }
}
.cropper-preview{
    margin-left: 20px;
    .show-preview{
        border-radius: 50%;
    }
}
.cropper-wrapper{
    display: flex;
}
.operate-box{
    margin-top: 20px;
    text-align: center;
}
</style>