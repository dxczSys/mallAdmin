<template>
    <div class="add-mall-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">基本信息</div>
        </div>
        <div class="mall-mess">
            <el-form ref="mallForm" :model="mallForm" label-width="100px">
                <el-form-item label="商城名称" required>
                    <el-input v-model="mallForm.mallName" placeholder="请输入商城名称" style="width: 360px;"></el-input>
                </el-form-item>
                <el-form-item label="商城地址" required>
                    <div class="mall-adress" :class="{ 'mall-adress-selected': mallForm.mallLng}">
                        <span>{{mallForm.mallAdress}}</span>
                        <span style="padding-left: 10px;" v-if="mallForm.mallLng">经度：{{mallForm.mallLng}}</span>
                        <span style="padding-left: 5px;" v-if="mallForm.mallLat">纬度：{{mallForm.mallLat}}</span>
                    </div>
                    <baidu-map @getPoints="getPoints" style="margin-top: 10px;"></baidu-map>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商城标志" required>
                            <upload-file :filelist="logoImg"></upload-file>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照" required>
                            <upload-file :filelist="permitImg"></upload-file>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="物业公司" required>
                            <el-input v-model="mallForm.companyName" placeholder="物业公司" style="width: 360px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" required>
                            <el-input v-model="mallForm.phone" placeholder="联系电话" style="width: 360px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="楼层设定" required>
                    <el-tag v-for="(item, index) in mallForm.floor" :key="index" closable @close="deleteFloor(index)" style="margin-right: 10px;">{{item}}</el-tag>
                    
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddMall">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import baiduMap from '@/components/baidu-map'
import uploadFile from '@/components/upload-file'
export default {
    components: { baiduMap, uploadFile },
    data() {
        return {
            mallForm: {
                mallName: '',
                mallAdress: '*请在地图中搜索定位商城位置',
                mallLng: '',
                mallLat: '',
                companyName: '',
                phone: '',
                floor: ['1楼', '2楼']
            },
            logoImg: [],
            permitImg: []
        }
    },
    methods: {
        getPoints(item) {
            this.mallForm.mallAdress = item.address
            this.mallForm.mallLng = item.point.lng
            this.mallForm.mallLat = item.point.lat
        },
        deleteFloor(index) {
            this.mallForm.floor.splice(index, 1)
        },
        handleAddMall() {
            this.isBeginUpload = true
        },
    }
}
</script>

<style lang="scss" scoped>
.mall-mess{
    margin-top: 20px;
}
.mall-adress{
    color: #999;
    font-size: 13px;
}
.mall-adress-selected{
    color: #333 !important;
}
.avatar-uploader{
    /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
            border-color: #409EFF;
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }
}
</style>