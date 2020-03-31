<template>
    <div class="ad-manager-wrapper">
        <div class="apply-button">
            <el-button type="primary" @click="$router.push({ name: 'user-apply-ad' })">立即申请</el-button>
        </div>
        <div class="ad-list-box">
            <el-row :gutter="10">
                <el-col :span="6" v-for="(item, index) in adList" :key="index">
                    <el-card class="ad-list-item" :body-style="{ padding: '0px' }">
                        <img class="card-image" :src="item.url">
                        <div style="padding: 14px;">
                            <span>{{ item.adType == '1' ? '置顶广告位' : '促销广告位' }}</span>
                            <div class="current-state">
                                <span v-if="item.expireNum != 0 && item.applyState == 0" class="el-icon-time" :class="{'reminder-expires': item.expireNum < 3 }">
                                    <span>剩余时长:{{item.expireNum}}天0小时</span>
                                    <span style="font-size: 12px;">即将到期,请及时续费</span>
                                </span>
                                <span v-if="item.expireNum == 0 && item.applyState == 0" class="haved-expires">已到期</span>
                                <span v-if="item.applyState == 1" class="haved-expires">申请失败：{{item.faildReason}}</span>
                                <span v-if="item.applyState == 2">申请已受理,审核中...</span>
                            </div>
                            <div class="bottom clearfix">
                                <el-button @click="deleteAd" v-if="item.expireNum == 0" type="text" style="color: #F56C6C;">删除</el-button>
                                <el-button v-if="item.applyState == 1" type="text">重新申请</el-button>
                                <el-button v-if="item.applyState == 2" type="text">查看</el-button>
                                <el-button v-if="item.expireNum < 3 && item.applyState == 0" type="text">续费</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
               
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            adList: []
        }
    },
    methods: {
        dealAdList(arr) {
            let _arr = arr || []
            _arr.forEach(item => {
                item.url = item.adType == '1'? require("@/assets/img/zhiding-ad.png") : require("@/assets/img/cuxiao-ad.png")
                item.expireNum = this.getOverDay(item.expireDate)
            })
            this.adList = _arr
        },
        //计算剩余天数
        getOverDay(time) {
            let curtime = new Date(), stopTime = new Date(time), str = ''
            let num = Math.floor((stopTime - curtime)/1000/60/60/24)
            return num > 0 ? num : 0
        },
        deleteAd() {
            this.$confirm('确认删除此记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                }).catch(() => {         
            });
        }
    },
    mounted() {
        this.dealAdList([{
                adType: '1',
                expireDate: '2020/04/01',
                applyState: 1,
                faildReason: '图片使用不当图片使用不当图片使用不当图片使用不当'
            },
            {
                adType: '1',
                expireDate: '202/04/01',
                applyState: 0,
                faildReason: ''
            },{
                adType: '1',
                expireDate: '2020/04/01',
                applyState: 0,
                faildReason: ''
            },{
                adType: '1',
                expireDate: '2020/04/01',
                applyState: 2,
                faildReason: ''
            },{
                adType: '2',
                expireDate: '2020/04/01',
                applyState: 0,
                faildReason: ''
            }])
    }
}
</script>

<style lang="scss" scoped>
.ad-list-box{
    margin-top: 20px;
    .current-state{
        padding: 5px 0;
        color: #409eff;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .reminder-expires{
            color: #E6A23C;
        }
        .haved-expires{
            color: #F56C6C;
        }
    }
}
.ad-list-item{
    margin-bottom: 10px;
}
.card-image{
    height: 200px;
    width: 100%;
    padding-top: 5px;
    object-fit: contain;
}
</style>