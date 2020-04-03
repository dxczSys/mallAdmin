<template>
    <div class="sendout-goods-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">物流信息</div>
        </div>
        <el-form ref="sendoutForm" :model="sendoutForm" label-width="100px" style="margin-top: 20px;">
            <el-form-item label="运送方式" required>
                <el-select v-model="sendoutForm.sendType" placeholder="请选择发货方式" style="width: 360px;">
                    <el-option v-for="(item, index) in sendTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递公司">
                <el-select v-model="sendoutForm.deliveryCompany" placeholder="请选择快递公司" style="width: 360px;">
                    <el-option v-for="(item, index) in deliveryCompanyList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="跑腿公司">
                <el-select v-model="sendoutForm.deliveryCompany" placeholder="请选择快递公司" style="width: 360px;">
                    <el-option v-for="(item, index) in errandCompanyList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递单号">
                <el-input v-model="sendoutForm.deliveryNumber" placeholder="快递或UU跑腿订单号" style="width: 360px;"></el-input>
            </el-form-item>
            <el-form-item label="运单照片">
                <el-upload class="avatar-uploader" action=""
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.push({ name: 'user-order-manage' })">取消</el-button>
                <el-button type="primary">确定</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            sendoutForm: {
                sendType: '',
                deliveryCompany: '',
                deliveryNumber: '',
                waybillUrl: ''
            },
            imageUrl: '',
            sendTypeList: [
                {
                    label: '自提',
                    value: '1',
                },
                {
                    label: '跑腿',
                    value: '2',
                },
                {
                    label: '快递',
                    value: '3',
                },{
                    label: '其他',
                    value: '4',
                }
            ],
            deliveryCompanyList: [
                {
                    label: '顺丰快递',
                    value: '顺丰快递'
                },
                {
                    label: '申通快递',
                    value: '申通快递'
                },
                {
                    label: '其他快递',
                    value: '其他快递'
                },
            ],
            errandCompanyList: [
                {
                    label: 'UU跑腿',
                    value: 'UU跑腿'
                },
                {
                    label: '其他跑腿',
                    value: '其他跑腿'
                },
            ]
        }
    },
    methods: {
        handleAvatarSuccess() {},
        beforeAvatarUpload() {}
    }
}
</script>

<style lang="scss" scoped>
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
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
}
</style>