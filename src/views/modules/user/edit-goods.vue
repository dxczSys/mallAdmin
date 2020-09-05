<template>
    <div class="release-goods-wrapper">
        <el-form ref="releaseForm" :model="releaseForm" :rules="rules" label-width="120px">
            <div style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">商品管理--编辑</div>
            </div>
            <div class="base-mess-box">
                <el-form-item label="商品类目" prop="kindsId" required>
                    <filter-tree :disabled="true" v-model="releaseForm.kindsId" :data="kindsTree" placeholder="类目搜索" width="400"></filter-tree>
                    <div class="wran-word">*提示：请选择商品类目，获取要发布商品的规格条件</div>
                </el-form-item>
                <el-form-item label="商品标题" prop="goodsTitle" required>
                    <el-input v-model="releaseForm.goodsTitle" placeholder="最多允许输入60个汉字" 
                        style="width:700px;" maxlength="60" show-word-limit></el-input>
                    <div class="wran-word">*温馨提示：标题请勿使用敏感词，否则会被强制下架</div>
                </el-form-item>
                <el-form-item label="商品主图" prop="mainUrl" required>
                    <upload-file :filelist="releaseForm.mainUrl"></upload-file>
                </el-form-item>
                <el-form-item label="商品图片">
                    <upload-file :filelist="releaseForm.assistUrls" :multiple="true" :limit="5"></upload-file>
                </el-form-item>
            </div>
            <div v-if="releaseForm.kindsId" style="display: flex;align-items: center;">
                <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                <div style="font-weight: 600;">销售信息</div>
                <div style="margin-left: 20px;" class="wran-word">*提示：销售信息是根据商品类目下的规格条件来组装数据，请依据必填项，填写所有信息，方可发布商品</div>
            </div>
            <div v-if="releaseForm.kindsId" class="base-mess-box">
                <el-form-item label="颜色分类" v-if="formatList.isColorPicker == 1" required>
                    <div class="color-picker-custom">
                        <div class="color-picker-custom-item" v-for="(item, index) in colorPickerTable" :key="index">
                            <color-picker width="200" v-model="item.nomalColor"></color-picker>
                            <el-input v-model="item.customColor" placeholder="自定义" style="width: 200px;"></el-input>
                            <el-button @click="addOneColorTable" type="primary" :disabled="!item.nomalColor && !item.customColors" icon="el-icon-plus"></el-button>
                        </div>
                    </div>
                    <div class="wran-word">*温馨提示：请尽量选择标准色系，如果自定义颜色，请谨慎，以免客户难以辨识</div>
                </el-form-item>
                <el-form-item required v-for="(item, index) in formatList.formatArr" :key="index" :label="item.formatName">
                    <el-checkbox-group v-model="item.modelValue">
                        <el-checkbox v-for="(i, j) in item.valueList" :key="j" :label="i.name"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="商品销售规格" v-if="assemTableData.length">
                    <el-table :data="assemTableData" style="width: 100%;" border>
                        <el-table-column v-for="(item, index) in coloumNameArr" :key="index" 
                            :prop="item.value" :label="item.label" width="180">
                        </el-table-column>
                        <el-table-column header-align="center" align="center" label="*价格(元)" width="150">
                            <template slot-scope="scpoe">
                                <money-input v-model="scpoe.row.price"></money-input>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="amount" label="*数量(件)" width="150">
                            <template slot-scope="scpoe">
                                <el-input type="number" v-model="scpoe.row.amount" placeholder="数量"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="coding" label="商品编码" min-width="150">
                            <template slot-scope="scpoe">
                                <el-input v-model="scpoe.row.coding" placeholder="商品编码"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="一口价" prop="onePrice" required>
                            <money-input v-model="releaseForm.onePrice" style="width: 360px;"></money-input>
                            <span>元</span>
                            <div class="wran-word">*温馨提示：一口价一般是其中一件商品的最低价，博取客户的眼球</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总数量" prop="total" required>
                            <el-input :disabled="assemTableData.length != 0" type="number" v-model="releaseForm.total" style="width: 360px;"></el-input>
                            <span>件</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="邮费规则" required>
                            <span>大于</span>
                            <money-input v-model="releaseForm.postageMore"></money-input>
                            <span>元免邮，否则收取</span>
                            <money-input v-model="releaseForm.postage"></money-input>
                            <span>元</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品编码">
                            <el-input v-model="releaseForm.barCode" style="width: 360px;" placeholder="自主商品编码(如：YM355210012)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-form-item label="商品描述" prop="description" required>
                    <el-input type="textarea" v-model="releaseForm.description" rows="10" maxlength="1000"
                        show-word-limit placeholder="商品描述"></el-input>
                </el-form-item>
                <el-form-item label="特别说明">
                    <el-input type="textarea" v-model="releaseForm.specialDescription" rows="4" maxlength="200"
                        show-word-limit placeholder="商品特别说明，例如：尺码非标准尺码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleRelease" type="primary">立即修改</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import filterTree from '@/components/filter-tree'
import colorPicker from '@/components/color-picker'
import uploadFile from '@/components/upload-file'
import moneyInput from '@/components/money-input'
export default {
    components: { filterTree, colorPicker, uploadFile, moneyInput },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            goodId: '',
            tempObj: {},
            releaseForm: {
                kindsId: '',
                goodsTitle: '',
                mainUrl: [],
                assistUrls: [],
                onePrice: '',
                total: '',
                barCode: '',
                postageMore: '',
                postage: '',
                description: '',
                specialDescription: '',
            },
            colorPickerTable: [{
                nomalColor: '',
                customColor: ''
            }],
            formatList: {
                isColorPicker: 1,
                formatArr: []
            },
            coloumNameArr: [],
            assemTableData: [],
            kindsTree: [],
            kindsTempData: [],
            rules: {
                kindsId: [ { required: true, message: '请选择类目', trigger: 'blur' } ],
                goodsTitle: [ { required: true, message: '请填写商品标题', trigger: 'blur' } ],
                mainUrl: [ { required: true, message: '请填写上传商品主图', trigger: 'blur' } ],
                onePrice: [ { required: true, message: '请填写商品一口价', trigger: 'blur' } ],
                total: [ { required: true, message: '请填写总数量', trigger: 'blur' } ],
                postageMore: [ { required: true, message: '请填写邮费规则', trigger: 'blur' } ],
                postage: [ { required: true, message: '请填写邮费规则', trigger: 'blur' } ],
                description: [ { required: true, message: '请填写商品描述', trigger: 'blur' } ],
            },
            mainPic: '',
            assisPics: ''
        }
    },
    watch: {
        'releaseForm.kindsId'(n) {
            if (typeof n == 'string') {
                let arr = n.split(',')
                let id = arr[arr.length - 1]
                this.findCondition(id)
            }
        },
        colorPickerTable: {
            handler(n) {
                if (this.judgeIsSelect()) {
                    this.assembleTable()
                }
            },
            deep: true
        },
        formatList: {
            handler(n) {
                if (this.judgeIsSelect()) {
                    this.assembleTable()
                }
            },
            deep: true,
            immediate: true
        },
        assemTableData: {
            handler(n) {
                let num = 0
                n.forEach(item => {
                    item.amount && (num = num + parseInt(item.amount))
                })
                this.releaseForm.total = num
            },
            deep: true
        }
    },
    methods: {
        addOneColorTable() {
            this.colorPickerTable.push({
                nomalColor: '',
                customColor: ''
            })
        },
        //判断每个属性都至少选了一个
        judgeIsSelect() {
            let isAll = true
            for (let i = 0; i < this.formatList.formatArr.length; i ++) {
                if (this.formatList.formatArr[i].modelValue.length == 0) {
                    isAll = false
                    break
                }
            }
            return isAll
        },
        //组装数据
        assembleTable() {
            let _arr = [], resArr = [], labelArr = [], _tableData = []
            if (this.formatList.isColorPicker == 1) {
                labelArr.push({
                    label: '颜色分类',
                    value: 'colorType'
                })
                this.colorPickerTable.forEach(item => {
                    let str = item.nomalColor || item.customColor
                    if (str) {
                        _arr.push(str)
                    }
                })
            }
            
            resArr.push(_arr)
            this.formatList.formatArr.forEach(value => {
                labelArr.push({
                    label: value.formatName,
                    value: value.formatNameEN
                })
                resArr = resArr.concat([value.modelValue])
            })

            let results = [], result = []
            let doExchange = (arr, index) => {
                for (var i = 0; i < arr[index].length; i ++) {  
                    result[index] = arr[index][i]; 
                    if (index != arr.length - 1) {
                        doExchange(arr, index + 1)
                    } else {
                        results.push(result.join(','))
                    }
                }
            }
            doExchange(resArr, 0)
            results.forEach(m => {
                let _list = m.split(','), obj = {}
                labelArr.forEach((n, j) => {
                    obj[n.value] = _list[j]
                })
                _tableData.push(obj)
            })
            this.coloumNameArr = labelArr
            if (this.assemTableData.length) {
                let _att = []       //规格条件的属性
                labelArr.forEach(a => {
                    _att.push(a.value)
                })
                
                //遍历老数组，是否在新数组中存在，存在加入，不存在跳过
                this.assemTableData.forEach(oldItem => {
                    let _v1 = []  //原数组规格条件值遍历
                    _att.forEach(c => {
                        _v1.push(oldItem[c])
                    })
                    for (let i = 0; i < _tableData.length; i ++) {
                        let _v2 = []  //原数组规格条件值遍历
                        _att.forEach(c => {
                            _v2.push(_tableData[i][c])
                        })
                        if (this.getArrDifference(_v1, _v2) == 0) {
                            _tableData[i] = oldItem
                            break
                        }
                    }

                })
            }
            this.assemTableData = _tableData
        },
        getArrDifference(arr1, arr2) {
            return arr1.concat(arr2).filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v)
            }).length
        },
        //根据类目id，查找规格条件
        findCondition(id) {
            this.http({
                url: 'merchant/tGoodAttrKey/selGoodSpecByShopCategory',
                method: 'get',
                data: { categoryId: id }
            }, res => {
                if (res.data.code) {
                    let arr = res.data.data
                    arr.forEach(item => {
                        if (item.name != 'isColor') {
                            this.kindsTempData.push(item)
                        }
                    })
                }
            })
        },
        //校验数据
        checkData() {
            if (this.formatList.isColorPicker == 1 || this.formatList.formatArr.length) {
                if (!this.assemTableData.length) {
                    this.$message.info('请正确填写销售信息！')
                    return false
                }else {
                    for (let i = 0; i < this.assemTableData.length; i ++) {
                        if (!this.assemTableData[i].price || !this.assemTableData[i].amount) {
                            this.$message.info('请正确填写商品销售规格表中各项值！')
                            return false
                        }
                    }
                    return true
                }
            }else {
                return true
            }
        },
        assembleGoodsData() {
            let arr = [], ids = this.releaseForm.kindsId.split(','), self = this
            this.assemTableData.forEach(item => {
                let _arr1 = []
                for (let key in item) {
                    //遍历表格一条数据的所有属性，除了颜色，价格，数量，编码
                    let _obj = {}
                    if (key != 'price' && key != 'amount' && key != 'coding') {
                        //根据规格的key和value，查找规格属性的key
                        for (let i = 0; i < self.kindsTempData.length; i ++) {
                            let _kindsArr = self.kindsTempData[i].values
                            if ( self.kindsTempData[i].id == key ) {
                                for (let j = 0; j < _kindsArr.length; j ++) {
                                    if (_kindsArr[j].name == item[key]) {
                                        _obj.goodValue = _kindsArr[j].id
                                    }
                                }
                                _obj.goodColor = item.colorType
                                _obj.goodKey = key
                                _arr1.push(_obj)
                            }
                        }
                    }
                }
                arr.push({
                    id: item.id,
                    good: item.good,
                    goodDetailName: '',
                    goodDetailTitle: '',
                    goodDetailSubheading: '',
                    goodDetailPrice: parseFloat(item.price),
                    goodDetailNumber: parseFloat(item.amount),
                    goodDetailCode: item.coding,
                    goodClassOne: ids[0],
                    goodClassTwo: ids[1],
                    goodClassThree: ids[2],
                    tGoodDetailAttrKeyValues: _arr1
                })
            })
            return arr
        },
        handleRelease() {
            let self = this
            this.$refs.releaseForm.validate(valid => {
                if (valid) {
                    if (this.checkData()) {
                        let mainUrl = null, assUrls = null
                        if (self.releaseForm.mainUrl[0].raw) {
                            mainUrl = new Promise((resolve, reject) => {
                                this.$upload({
                                    data: [this.releaseForm.mainUrl[0].raw]
                                }, res => {
                                    if (res.data.code == 200) {
                                        resolve({name: 'mainUrl', url: res.data.data})
                                    }
                                })
                            })
                        }
                        let _tempArr = [], noChange = []
                        this.releaseForm.assistUrls.forEach(item => {
                            if (item.raw) {
                                _tempArr.push(item.raw)
                            }else {
                                noChange.push(item.url.split('filename=')[1])
                            }
                        })
                        if (_tempArr.length) {
                            assUrls = new Promise((resolve, reject) => {
                                if (_tempArr.length) {
                                    this.$upload({
                                        data: _tempArr
                                    }, res => {
                                        if (res.data.code == 200) {
                                            resolve({name: 'assUrls', url: res.data.data})
                                        }
                                    })
                                }
                            })
                        }
                        let pArr = []
                        mainUrl && (pArr.push(mainUrl))
                        assUrls && (pArr.push(assUrls))
                        if (pArr.length) {
                            Promise.all(pArr).then(res => {
                                let oneUrl = '', twoUrls = []
                                res.forEach(value => {
                                    if (value.name == 'mainUrl') {
                                        oneUrl = value.url
                                    }
                                    if (value.name == 'assUrls') {
                                        twoUrls = value.url.split(',')
                                    }
                                })
                                if (!oneUrl) {
                                    oneUrl = this.mainPic
                                }
                                twoUrls = twoUrls.concat(noChange)

                                let ids = this.releaseForm.kindsId.split(',')
                                this.http({
                                    url: 'merchant/good/tGoodUpd',
                                    method: 'post',
                                    data: {
                                        id: this.goodId,
                                        goodCreateTime: this.tempObj.goodCreateTime,
                                        goodIsUpperShelf: this.tempObj.goodIsUpperShelf,
                                        goodSales: this.tempObj.goodSales,
                                        goodShopMall: this.$cookie.get('mallId'),
                                        goodShop: this.$cookie.get('shopId'),
                                        goodShopFloor: this.$cookie.get('floorId'),
                                        goodUser: this.tempObj.goodUser,
                                        goodClassOne: ids[0],
                                        goodClassTwo: ids[1],
                                        goodClassThree: ids[2],
                                        goodTitle: this.releaseForm.goodsTitle,
                                        goodPic: oneUrl,
                                        listImg: twoUrls,
                                        goodPrice: this.releaseForm.onePrice,
                                        goodCode: this.releaseForm.barCode,
                                        goodNumber: this.releaseForm.total,
                                        goodPostage: this.releaseForm.postage,
                                        goodIsPostage: this.releaseForm.postageMore,
                                        tGoodInfo: {
                                            goodDescription: this.releaseForm.description,
                                            goodSpecialDescription: this.releaseForm.specialDescription,
                                        },
                                        tGoodDetails: self.assembleGoodsData()
                                    }
                                }, releaseRes => {
                                    if (releaseRes.data.code == 200) {
                                        this.$message.success('修改成功！')
                                        this.$router.push({ name: 'user-goods-manager'})
                                    }
                                })
                            })
                        }else {
                            let ids = this.releaseForm.kindsId.split(',')
                            this.http({
                                url: 'merchant/good/tGoodUpd',
                                method: 'post',
                                data: {
                                    id: this.goodId,
                                    goodCreateTime: this.tempObj.goodCreateTime,
                                    goodIsUpperShelf: this.tempObj.goodIsUpperShelf,
                                    goodSales: this.tempObj.goodSales,
                                    goodShopMall: this.$cookie.get('mallId'),
                                    goodShop: this.$cookie.get('shopId'),
                                    goodShopFloor: this.$cookie.get('floorId'),
                                    goodUser: this.tempObj.goodUser,
                                    goodClassOne: ids[0],
                                    goodClassTwo: ids[1],
                                    goodClassThree: ids[2],
                                    goodTitle: this.releaseForm.goodsTitle,
                                    goodPic: this.mainPic,
                                    listImg: noChange,
                                    goodPrice: this.releaseForm.onePrice,
                                    goodCode: this.releaseForm.barCode,
                                    goodNumber: this.releaseForm.total,
                                    goodPostage: this.releaseForm.postage,
                                    goodIsPostage: this.releaseForm.postageMore,
                                    tGoodInfo: {
                                        goodDescription: this.releaseForm.description,
                                        goodSpecialDescription: this.releaseForm.specialDescription,
                                    },
                                    tGoodDetails: self.assembleGoodsData()
                                }
                            }, releaseRes => {
                                if (releaseRes.data.code == 200) {
                                    this.$message.success('修改成功！')
                                    this.$router.push({ name: 'user-goods-manager'})
                                }
                            })
                        }
                        
                    }
                }
            })
        },
        getGoodInfo() {
            this.http({
                url: 'merchant/good/selectGoodAllById',
                method: 'get',
                data: {
                    goodId: this.goodId
                }
            }, res => {
                if (res.data.code == 200) {
                    let obj = res.data.data
                    this.tempObj = obj
                    this.releaseForm.kindsId = [{
                        id: obj.goodClassOne,
                        name: obj.goodClassOneName
                    }, {
                        id: obj.goodClassTwo,
                        name: obj.goodClassTwoName
                    }, {
                        id: obj.goodClassThree,
                        name: obj.goodClassThreeName
                    }]
                    this.releaseForm.goodsTitle = obj.goodTitle
                    this.releaseForm.mainUrl = [{ url: this.fileUrl + obj.goodPic}]
                    this.mainPic = obj.goodPic
                    this.assisPics = obj.listImg
                    let _img = []
                    obj.listImg.forEach(item => {
                        _img.push({
                            url: this.fileUrl + item
                        })
                    })
                    this.releaseForm.assistUrls = _img
                    this.releaseForm.onePrice = obj.goodPrice
                    this.releaseForm.total = obj.goodNumber
                    this.releaseForm.postageMore = obj.goodIsPostage
                    this.releaseForm.postage = obj.goodPostage
                    this.releaseForm.barCode = obj.goodCode || ''
                    this.releaseForm.description = obj.tGoodInfo.goodDescription
                    this.releaseForm.specialDescription = obj.tGoodInfo.goodSpecialDescription || ''
                    this.colorPickerTable = obj.bigGood.colorPickerTable
                    this.assemTableData = obj.bigGood.assemTableData
                    this.formatList = obj.bigGood.formatList
                }
            })
        }
    },
    mounted() {
        this.goodId = this.$route.query.id
        this.getGoodInfo()
    }
}
</script>

<style lang="scss" scoped>
.base-mess-box{
    margin-top: 20px;
}
.color-picker-custom-item{
    margin-bottom: 10px;
}
.wran-word{
    color: #E6A23C;
    font-size: 13px;
}
</style>