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
                <el-form-item label="商城地址">
                    <el-input v-model="mallForm.mallAdress" :disabled="true" placeholder="地图上搜索商城" style="width: 360px;"></el-input>
                    <baidu-map @getPoints="getPoints" style="margin-top: 10px;"></baidu-map>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>

<script>
import baiduMap from '@/components/baidu-map'
export default {
    components: { baiduMap },
    data() {
        return {
            mallForm: {
                mallName: '',
                mallAdress: '',
            }
        }
    },
    methods: {
        getPoints(item) {
            this.mallForm.mallAdress = item.address
        }
    }
}
</script>

<style lang="scss" scoped>
.mall-mess{
    margin-top: 20px;
}
</style>