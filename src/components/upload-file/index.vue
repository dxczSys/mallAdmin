<template>
    <div class="upload-file-wrapper">
        <div class="upload-file-box">
            <div class="show-imgs-list" v-if="imageArr.length">
                <div class="img-item" v-for="(item, index) in imageArr" :key="index">
                    <img :src="item.url">
                    <div class="delete-layer">
                        <div>
                            <span @click="imgPreview(item)" class="el-icon-zoom-in"></span>
                            <span @click="remove(item)" class="el-icon-delete"></span>
                        </div>
                    </div>
                </div>
            </div>
            <el-upload
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
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        'show-file-list': { default: false },
        filelist: { 
            type: Array, 
            default() {
                return []
            } 
        },
        multiple: { default: false },
        limit: { default: 1 },
        size: { default: 2 },
        accept: { default: 'image/*' },
        limitTip: { default: '文件大小不能超过2M' }
    },
    data() {
        return {
            imageArr: [],
            fileLists: [],
            dialogVisible: false,
            dialogImageUrl: '',
            beginNum: 0
        }
    },
    watch: {
        filelist: {
            handler(n) {
                if (!this.beginNum) {
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
        handleChange(file, fileList) {
            if (file.size / 1024 / 1024 < this.size) {
                if (file.raw.type.split('/')[0] == this.accept.split('/')[0]) {
                    this.filelist.push(file)
                    this.imageArr.push({
                        uid: file.uid,
                        url: URL.createObjectURL(file.raw)
                    })
                }else {
                    this.$message.error('文件类型不符!')
                }
            }else {
                this.$message.error('文件大小超出限制!')
            } 
        },
        imgPreview(item) {
            this.dialogVisible = true
            this.dialogImageUrl = item.url
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
        // uploadFile() {
        //     let formData = new FormData()
        //     formData.append('file', this.fileLists[0].raw)
        //     return this.$httpapi({
        //         url: 'https://jsonplaceholder.typicode.com/posts/',
        //         method: 'post',
        //         data: this.$httpapi.adornData(formData, false, 'form')
        //     })
        // }
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