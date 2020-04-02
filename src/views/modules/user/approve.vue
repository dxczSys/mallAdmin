<template>
    <div class="approve-wrapper">
        <div class="step-box">
            <el-steps :active="0" align-center>
                <el-step title="申请" description="商户自主填写相关资料"></el-step>
                <el-step title="审核" description="发送商城管理员审核"></el-step>
                <el-step title="通过" description="审核通过即可发布商品"></el-step>
            </el-steps>
        </div>
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
                    <el-upload class="avatar-uploader" action=""
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="营业执照" required>
                    <el-upload class="avatar-uploader" action=""
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人/经营者" required>
                    <el-input v-model="infoForm.shopOwner" placeholder="法人/经营者"></el-input>
                </el-form-item>
                <el-form-item label="身份证正反面" required>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="联系电话" required>
                    <el-input v-model="infoForm.phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="微信" required>
                    <el-input v-model="infoForm.chat" placeholder="微信"></el-input>
                </el-form-item>
                <el-form-item label="商铺简介" required>
                    <el-input type="textarea" v-model="infoForm.introduction" rows="5" placeholder="商铺简介"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发送审核</el-button>
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
.step-box{
    padding: 10px 0;
    background-color: #fff7eb;
    border: 1px solid #F58B0F;
    border-radius: 4px;
}
.base-mess-wrapper{
    padding: 20px;
    .base-form{
        padding-right: 20px;
        /deep/ .el-form-item__content .el-select{
            width: 360px;
        }
        /deep/ .el-form-item__content .el-input{
            width: 360px;
        }
        /deep/ .el-form-item__content .el-textarea{
            width: 360px;
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
        width: 110px;
        height: 110px;
        line-height: 110px;
        text-align: center;
    }
    .avatar {
        width: 110px;
        height: 110px;
        display: block;
    }
}
</style>