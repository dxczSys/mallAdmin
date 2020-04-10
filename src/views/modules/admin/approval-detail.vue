<template>
    <div class="approval-detail-wrapper">
        <el-form ref="detailForm" :model="detailForm" label-width="120px">
            <div class="detail-box">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">审批详情-商户认证</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称">
                            <span>{{shopMess.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属商场">
                            <span>{{shopMess.belongMall}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层">
                            <span>{{shopMess.flooor}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业">
                            <span>{{shopMess.profession}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <span>{{shopMess.phone}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信">
                            <span>{{shopMess.chat}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="店铺标志">
                            <img class="logo-img" :src="shopMess.logoUrl">
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照">
                            <div class="card-img">
                                <img :src="shopMess.permitUrl">
                                <div class="el-icon-zoom-in" @click="zoomImg(shopMess.permitUrl)"></div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人/经营者">
                            <span>{{shopMess.hostName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号">
                            <span>{{shopMess.cardNum}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="身份证正面">
                            <div class="card-img">
                                <img :src="shopMess.idCardUrl">
                                <div class="el-icon-zoom-in" @click="zoomImg(shopMess.idCardUrl)"></div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证反面">
                            <div class="card-img">
                                <img :src="shopMess.idCardOverUrl">
                                <div class="el-icon-zoom-in" @click="zoomImg(shopMess.idCardOverUrl)"></div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="商铺简介">
                    <span>{{shopMess.introduction}}</span>
                </el-form-item>
            </div>
            <div class="ad-box">
                <div style="display: flex;align-items: center; margin-bottom: 20px;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">审批详情-广告位申请</div>
                </div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商铺名称">
                            <span>{{shopMess.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属商场">
                            <span>{{shopMess.belongMall}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所在楼层">
                            <span>{{shopMess.flooor}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业">
                            <span>{{shopMess.profession}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="法人/经营者">
                            <span>{{shopMess.hostName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <span>{{shopMess.phone}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="广告位类型">
                            <span>{{shopMess.adType}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请时长">
                            <span>{{shopMess.applyTimeLong}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="促销商品">
                    <img class="goods-img" :src="shopMess.goodsUrl">
                    <div class="goods-mess">{{shopMess.goodsDes}}</div>
                </el-form-item>
                <el-form-item label="已付款">
                    <span>{{shopMess.paidMoney}}元</span>
                </el-form-item>
                <el-form-item>
                    <el-button>拒绝</el-button>
                    <el-button type="primary">同意</el-button>
                </el-form-item>
            </div>
        </el-form>  
        <el-dialog :visible.sync="dialogVisible" @close="handleDialogClose" class="view-img" top="10px">
            <div class="button-translate">
                <span @click="handleTansform">
                    <span style="font-size: 20px;" class="iconfont iconxuanzhuan"></span>
                    <span>旋转</span>
                </span>
            </div>
            <img width="80%" :src="dialogImageUrl" :style="{transform: `rotate(${deg * 90}deg)`}">
        </el-dialog>     
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            dialogImageUrl: '',
            deg: 0,
            detailForm: {
                rejectReason: '',
            },
            shopMess: {
                name: '',
                belongMall: '',
                flooor: '',
                profession: '',
                phone: '',
                chat: '',
                logoUrl: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//a9/6d/TB1vNGBRpXXXXbdaXXXSutbFXXX.jpg_140x140Q90.jpg',
                permitUrl: require('@/assets/img/permit.jpg'),
                hostName: '郭福建',
                cardNum: '612728199501120432',
                idCardUrl: require('@/assets/img/card2.png'),
                idCardOverUrl: require('@/assets/img/card1.png'),
                introduction: '你还是得放声大哭粉红色的开发和开始交电话费卡萨丁反，你还是得放声大哭粉红色的开发和开始交电话费卡萨丁反。你还是得放声大哭粉红色的开发和开始交电话费卡萨丁反你还是得放声大哭粉红色的开发和开始交电话费卡萨丁反',
                adType: '',
                applyTimeLong: '',
                goodsUrl: 'https://img.alicdn.com/simba/img/TB1qXqEtQUmBKNjSZFOSuub2XXa.jpg',
                goodsDes: '清仓大放送 感恩大回馈清仓大放送 感恩大回馈清仓大放送 感恩大回馈',
                paidMoney: '220.00'
            },
        }
    },
    methods: {
        zoomImg(url) {
            this.dialogVisible = true
            this.dialogImageUrl = url
        },
        handleTansform() {
            this.deg ++
        },
        handleDialogClose() {
            this.deg = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.logo-img{
    width: 100px;
    height: 100px;
    object-fit: scale-down;
    border-radius: 4px;
}
.card-img{
    position: relative;
    width: 120px;
    height: 150px;
    &:hover{
        .el-icon-zoom-in{
            display: flex;
        } 
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }
    .el-icon-zoom-in{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .1);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        display: none;
        font-size: 20px;
        color: #fff;
        align-items: center;
        justify-content: center;
        z-index: 999;
        cursor: pointer;
    }
    
}
.goods-img{
    max-width: 300px;
    max-height: 350px;
    object-fit: scale-down;
}
.goods-mess{
    text-align: center;
    max-width: 300px;
    margin-top: 10px;
    line-height: 22px;
}
.button-translate{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    cursor: pointer;
    color: #fff;
    &:hover{
        color: #17B3A3;
    }
}
.view-img{
    /deep/ .el-dialog{
        background: transparent;
        box-shadow: none;
    }
    /deep/ .el-icon-close{
        color: #fff;
    }
}
</style>