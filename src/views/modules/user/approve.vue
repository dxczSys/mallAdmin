<template>
    <div class="approve-wrapper">
        <el-steps :active="1" align-center style="border-bottom: 1px solid #eee;">
            <el-step title="申请" description="商户自主填写相关资料"></el-step>
            <el-step title="审核" description="发送商城管理员审核"></el-step>
            <el-step title="通过" description="审核通过即可发布商品"></el-step>
        </el-steps>
        <div class="base-mess-wrapper">
            <el-form ref="infoForm" :model="infoForm" label-width="120px" class="base-form">
                <el-form-item label="商铺名称" required>
                    <el-input v-model="infoForm.shopName" placeholder="商铺名称"></el-input>
                </el-form-item>
                <el-form-item label="所属商场" required>
                    <el-select v-model="infoForm.shopCityName" placeholder="所属商场">
                        <el-option v-for="(item, index) in shopCityList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在楼层" required>
                    <el-select v-model="infoForm.floor" placeholder="所在楼层">
                        <el-option v-for="(item, index) in floorList" :key="index" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属行业" required>
                    <el-select v-model="infoForm.businessType" placeholder="所属行业">
                        <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店铺标志" required>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            infoForm: {
                shopName: '',
                shopCityName: '',
                floor: '',
                businessType: '',
                shopLogo: '',
                shopPermit: '',
                shopOwner: '',
                ownerCard: '',
                phone: '',
                chat: '',
                introduction: '',
            },
            shopCityList: [{
                id: '1',
                name: '赛格国际',
            }],
            floorList: [{
                label: '-1楼',
            }],
            businessTypeList: [{
                id: '1',
                label: '服装'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.base-mess-wrapper{
    padding: 20px;
    .base-form{
        width: 600px;
        padding-right: 20px;
        /deep/ .el-form-item__content .el-select{
            width: 100%;
        }
    }
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>