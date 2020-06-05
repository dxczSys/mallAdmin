<template>
    <div class="add-mall-wrapper">
        <div style="display: flex;align-items: center;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">基本信息</div>
        </div>
        <div class="mall-mess">
            <el-form ref="mallForm" :model="mallForm" :rules="rules" label-width="100px">
                <el-form-item label="商城地址" prop="mallAdress" required>
                    <div class="mall-adress" :class="{ 'mall-adress-selected': mallForm.mallLng}">
                        <span>{{mallForm.mallAdress}}</span>
                        <span style="padding-left: 10px;" v-if="mallForm.mallLng">经度：{{mallForm.mallLng}}</span>
                        <span style="padding-left: 5px;" v-if="mallForm.mallLat">纬度：{{mallForm.mallLat}}</span>
                    </div>
                    <baidu-map @getPoints="getPoints" style="margin-top: 10px;"></baidu-map>
                </el-form-item>
                <el-form-item label="商城名称" prop="mallName" required>
                    <el-input v-model="mallForm.mallName" placeholder="请输入商城名称" style="width: 360px;"></el-input>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商城标志" required>
                            <upload-file :filelist="logoImg"></upload-file>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照" required>
                            <upload-file :size="5" limitTip="图片大小不能超过5M" :filelist="permitImg"></upload-file>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="商场负责人" prop="companyName" required>
                            <el-input v-model="mallForm.companyName" placeholder="物业公司" style="width: 360px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone" required>
                            <el-input v-model="mallForm.phone" placeholder="联系电话(固话(029)62******或手机)" style="width: 360px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="楼层设定" prop="floor" required>
                    <el-tag v-for="(item, index) in mallForm.floor" :key="index" :closable="!isUpdate" 
                    @close="deleteFloor(index)" style="margin-right: 10px; color: #409eff;">{{item}}楼</el-tag>
                    <span v-if="!mallForm.floor.length" style="color: #999; font-size: 13px;">*请设置楼层</span>
                    <el-input type="number" v-if="isAddFloor" v-model="newFloor" placeholder="1" class="add-input" size="mini"></el-input>
                    <span class="add-floor-button" v-if="!isAddFloor" @click="isAddFloor = !isAddFloor">
                        <span class="el-icon-plus" style="font-weight: 600;"></span>
                        <span>新增</span>
                    </span>
                    <span v-if="isAddFloor" class="add-floor-button" @click="addFloor">
                        <span class="el-icon-check" style="font-weight: 600;"></span>
                        <span>保存</span>
                    </span>
                </el-form-item>
                <el-form-item label="商城简介">
                    <el-input type="textarea" v-model="mallForm.mallInfo" rows="5" style="width: 60%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="isUpdate" type="primary" @click="handleAddMall">保存修改</el-button>
                    <el-button v-else type="primary" @click="handleAddMall">立即创建</el-button>
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
        let checkPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('联系电话不能为空'))
            }else {
                if (!(/^1[3456789]\d{9}$/.test(value)) && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
                    callback(new Error('请输入正确联系电话'));
                }
                callback();
            }
        }
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            isUpdate: false,
            mallId: '',
            mallForm: {
                mallName: '',
                mallAdress: '*请在地图中搜索定位商城位置',
                mallLng: '',
                mallLat: '',
                companyName: '',
                phone: '',
                floor: [-1, 1, 2],
                mallInfo: '',
            },
            mallFloors: [],
            isAddFloor: false,
            newFloor: null,
            logoImg: [],
            permitImg: [],
            rules: {
                mallName: [ { required: true, message: '商城名称不能为空', trigger: 'blur'} ],
                mallAdress: [ { required: true, message: '商城地址不能为空', trigger: 'blur'} ],
                companyName: [ { required: true, message: '物业公司不能为空', trigger: 'blur'} ],
                phone: [
                    { required: true, message: '联系电话不能为空', trigger: 'blur'},
                    { validator: checkPhone, trigger:'blur' }
                ],
                floor: [ { required: true, message: '请设定楼层', trigger: 'change'} ],
            }
        }
    },
    methods: {
        getPoints(item) {
            this.mallForm.mallAdress = item.address
            this.mallForm.mallLng = item.point.lng
            this.mallForm.mallLat = item.point.lat
            this.mallForm.mallName = item.title
            if (item.phoneNumber) {
                if (item.phoneNumber.indexOf(',') > -1) {
                    this.mallForm.phone = item.phoneNumber.split(',')[0]
                }else {
                    this.mallForm.phone = item.phoneNumber
                }
            }
        },
        deleteFloor(index) {
            this.mallForm.floor.splice(index, 1)
        },
        addFloor() {
            let num = parseInt(this.newFloor)
            if (this.newFloor && this.mallForm.floor.indexOf(num) == -1) {
                let arr = this.mallForm.floor
                arr.push(num)
                this.mallForm.floor = arr.sort((x, y) => {
                    return x - y
                })
            }
            this.newFloor = null
            this.isAddFloor = false
        },
        handleAddMall() {
            if (!this.logoImg.length) {
                this.$message.info('请上传商城标志')
                return
            }
            if (!this.permitImg.length) {
                this.$message.info('请上传营业执照')
                return
            }
            this.$refs.mallForm.validate(valid => {
                if (valid) {
                    if (this.isUpdate) {
                        this.updateMall()
                    }else {
                        this.$upload({
                            data: [this.logoImg[0].raw]
                        }, res => {
                            if (res.data.code == 200) {
                                this.$upload({
                                    data: [this.permitImg[0].raw]
                                }, permitRes => {
                                    if (permitRes.data.code == 200) {
                                        this.http({
                                            url: 'merchant/shopMall/tShopMallSave',
                                            method: 'post',
                                            data: {
                                                shopName: this.mallForm.mallName,
                                                shopAddress: this.mallForm.mallAdress,
                                                shopLongitude: this.mallForm.mallLng,
                                                shopLatitude: this.mallForm.mallLat,
                                                shopIcon: res.data.data,
                                                shopBusinessLicense: permitRes.data.data,
                                                shopPropertyCompany: this.mallForm.companyName,
                                                shopTel: this.mallForm.phone,
                                                floor: this.mallForm.floor,
                                                shopInfo: this.mallForm.mallInfo,
                                            }
                                        }, addRes => {
                                            if (addRes.data.code == 200) {
                                                this.$message.success('创建成功！')
                                                this.$router.push({ name: 'admin-organize-structure' })
                                            }else {
                                                this.$message.info(addRes.data.msg)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
        getUpdateFloor() {
            let floorArr = []
            this.mallForm.floor.forEach(item => {
                let _obj = {
                    id: '',
                    shop: '',
                    shopName: item,
                }
                this.mallFloors.forEach(value => {
                    if (item == parseInt(value.shopName)) {
                        _obj.id = value.id
                        _obj.shop = value.shop
                    }
                })
                floorArr.push(_obj)
            })
            return floorArr
        },
        updateMall() {
            let _floorArr = this.getUpdateFloor()
            if (this.logoImg[0].raw && this.permitImg[0].raw) {
                this.$upload({
                    data: [this.logoImg[0].raw]
                }, res => {
                    if (res.data.code == 200) {
                        this.$upload({
                            data: [this.permitImg[0].raw]
                        }, permitRes => {
                            if (permitRes.data.code == 200) {
                                this.http({
                                    url: 'merchant/shopMall/tShopMallSave',
                                    method: 'post',
                                    data: {
                                        id: this.mallId,
                                        shopName: this.mallForm.mallName,
                                        shopAddress: this.mallForm.mallAdress,
                                        shopLongitude: this.mallForm.mallLng,
                                        shopLatitude: this.mallForm.mallLat,
                                        shopIcon: res.data.data,
                                        shopBusinessLicense: permitRes.data.data,
                                        shopPropertyCompany: this.mallForm.companyName,
                                        shopTel: this.mallForm.phone,
                                        tShopMallFloors: _floorArr,
                                        shopInfo: this.mallForm.mallInfo,
                                    }
                                }, addRes => {
                                    if (addRes.data.code == 200) {
                                        this.$message.success('修改成功！')
                                        this.$router.push({ name: 'admin-organize-structure' })
                                    }else {
                                        this.$message.info(addRes.data.msg)
                                    }
                                })
                            }
                        })
                    }
                })
            }else if (this.logoImg[0].raw && !this.permitImg[0].raw) {
                this.$upload({
                    data: [this.logoImg[0].raw]
                }, res => {
                    if (res.data.code == 200) {
                        this.http({
                            url: 'merchant/shopMall/tShopMallSave',
                            method: 'post',
                            data: {
                                id: this.mallId,
                                shopName: this.mallForm.mallName,
                                shopAddress: this.mallForm.mallAdress,
                                shopLongitude: this.mallForm.mallLng,
                                shopLatitude: this.mallForm.mallLat,
                                shopIcon: res.data.data,
                                shopBusinessLicense: this.permitImg[0].url.split('filename=')[1],
                                shopPropertyCompany: this.mallForm.companyName,
                                shopTel: this.mallForm.phone,
                                tShopMallFloors: _floorArr,
                                shopInfo: this.mallForm.mallInfo,
                            }
                        }, addRes => {
                            if (addRes.data.code == 200) {
                                this.$message.success('修改成功！')
                                this.$router.push({ name: 'admin-organize-structure' })
                            }else {
                                this.$message.info(addRes.data.msg)
                            }
                        })
                    }
                })
            }else if(!this.logoImg[0].raw && this.permitImg[0].raw) {
                this.$upload({
                    data: [this.permitImg[0].raw]
                }, res => {
                    if (res.data.code == 200) {
                        this.http({
                            url: 'merchant/shopMall/tShopMallSave',
                            method: 'post',
                            data: {
                                id: this.mallId,
                                shopName: this.mallForm.mallName,
                                shopAddress: this.mallForm.mallAdress,
                                shopLongitude: this.mallForm.mallLng,
                                shopLatitude: this.mallForm.mallLat,
                                shopIcon: this.logoImg[0].url.split('filename=')[1],
                                shopBusinessLicense: res.data.data,
                                shopPropertyCompany: this.mallForm.companyName,
                                shopTel: this.mallForm.phone,
                                tShopMallFloors: _floorArr,
                                shopInfo: this.mallForm.mallInfo,
                            }
                        }, addRes => {
                            if (addRes.data.code == 200) {
                                this.$message.success('修改成功！')
                                this.$router.push({ name: 'admin-organize-structure' })
                            }else {
                                this.$message.info(addRes.data.msg)
                            }
                        })
                    }
                })
            }else {
                this.http({
                    url: 'merchant/shopMall/tShopMallSave',
                    method: 'post',
                    data: {
                        id: this.mallId,
                        shopName: this.mallForm.mallName,
                        shopAddress: this.mallForm.mallAdress,
                        shopLongitude: this.mallForm.mallLng,
                        shopLatitude: this.mallForm.mallLat,
                        shopIcon: this.logoImg[0].url.split('filename=')[1],
                        shopBusinessLicense: this.permitImg[0].url.split('filename=')[1],
                        shopPropertyCompany: this.mallForm.companyName,
                        shopTel: this.mallForm.phone,
                        tShopMallFloors: _floorArr,
                        shopInfo: this.mallForm.mallInfo,
                    }
                }, addRes => {
                    if (addRes.data.code == 200) {
                        this.$message.success('修改成功！')
                        this.$router.push({ name: 'admin-organize-structure' })
                    }else {
                        this.$message.info(addRes.data.msg)
                    }
                })
            }
        },
        getMall(id) {
            this.http({
                url: `merchant/shopMall/tShopMallSelById?id=${id}`,
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    let _obj = res.data.data
                    this.mallForm.mallName = _obj.shopName
                    this.mallForm.mallAdress = _obj.shopAddress
                    this.mallForm.mallLng = _obj.shopLongitude
                    this.mallForm.mallLat = _obj.shopLatitude
                    this.logoImg = [{
                        url: this.fileUrl + _obj.shopIcon
                    }]
                    this.permitImg = [{
                        url: this.fileUrl + _obj.shopBusinessLicense
                    }]
                    this.mallForm.companyName = _obj.shopPropertyCompany
                    this.mallForm.phone = _obj.shopTel
                    let arr = []
                    _obj.tShopMallFloors.forEach(item => {
                        arr.push(parseInt(item.shopName))
                    })
                    this.mallForm.floor = arr
                    this.mallFloors = _obj.tShopMallFloors
                    this.mallForm.mallInfo = _obj.shopInfo
                }
            })
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.isUpdate = true
            this.mallId = this.$route.query.id
            this.getMall(this.$route.query.id)
        }
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
.add-floor-button{
    color: #409eff;
    cursor: pointer;
    &:hover{
        color: #2285eb;
    }
}
.add-input{
    width: 60px;
    margin-right: 6px;
    /deep/ .el-input__inner{
        padding: 0 10px;
    }
}
</style>