<template>
    <div class="release-goods-wrapper">
        <el-form ref="releaseForm" :model="releaseForm" label-width="120px">
            <span style="font-weight: 600;">基本信息</span>
            <div class="base-mess-box">
                <el-form-item label="商品类目" required>
                    <filter-tree :data="kindsList" width="360"></filter-tree>
                </el-form-item>
                <el-form-item label="商品标题" required>
                    <el-input v-model="releaseForm.goodsTitle" placeholder="最多允许输入60个汉字" style="width:600px;" maxlength="60"></el-input>
                    <span style="color: #999;">*标题和描述关键词请避免违规</span>
                </el-form-item>
                <el-form-item label="商品主图" required>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                        :on-success="handleUploadSuccess" :before-upload="beforeUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品图片" required>
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <span style="font-weight: 600;">销售信息</span>
            <div class="base-mess-box">
                <el-form-item label="颜色分类" v-if="formatList.isColorPicker == 1" required>
                    <div class="color-picker-custom">
                        <div class="color-picker-custom-item" v-for="(item, index) in colorPickerTable" :key="index">
                            <color-picker width="200" v-model="item.nomalColor"></color-picker>
                            <el-input v-model="item.customColor" placeholder="自定义" style="width: 200px;"></el-input>
                            <el-button @click="addOneColorTable" type="primary" :disabled="!item.nomalColor && !item.customColors" icon="el-icon-plus"></el-button>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item required v-for="(item, index) in formatList.formatArr" :key="index" :label="item.formatName">
                    <el-checkbox-group v-model="item.modelValue">
                        <el-checkbox v-for="(i, j) in item.valueList" :key="j" :label="i.label"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="商品销售规格">
                    <el-table :data="assemTableData" style="width: 100%;" border>
                        <el-table-column v-for="(item, index) in coloumNameArr" :key="index" :prop="item.value" :label="item.label" width="200">
                        </el-table-column>
                        <el-table-column header-align="center" align="center" label="价格(元)" >
                            <template slot-scope="scpoe">
                                <el-input v-model="scpoe.row.price" placeholder="价格"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="amount" label="数量" >
                            <template slot-scope="scpoe">
                                <el-input v-model="scpoe.row.amount" placeholder="数量"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" prop="coding" label="商品编码" >
                            <template slot-scope="scpoe">
                                <el-input v-model="scpoe.row.coding" placeholder="商品编码"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import filterTree from '@/components/filter-tree'
import colorPicker from '@/components/color-picker'
export default {
    components: { filterTree, colorPicker },
    data() {
        return {
            releaseForm: {
                goodsType: '',
                goodsTitle: '',
            },
            colorPickerTable: [{
                nomalColor: '',
                customColor: ''
            }],
            formatList: {
                isColorPicker: 1,
                formatArr: [{
                    formatName: '尺码',
                    formatNameEN: 'sizeType',
                    modelValue: [],
                    valueList: [{
                        id: '1',
                        label: '40',
                    },{
                        id: '2',
                        label: '40.5',
                    }]
                },{
                    formatName: '重量',
                    formatNameEN: 'weightType',
                    modelValue: [],
                    valueList: [{
                        id: '1',
                        label: '50g',
                    },{
                        id: '2',
                        label: '100g',
                    }]
                }]
            },
            coloumNameArr: [],
            assemTableData: [],
            kindsList: [],
            imageUrl: '',
        }
    },
    watch: {
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
            deep: true
        }
    },
    methods: {
        handleUploadSuccess() {},
        beforeUpload() {},
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
            this.assemTableData = _tableData
            
        }
    }
}
</script>

<style lang="scss" scoped>
.base-mess-box{
    margin-top: 10px;
}
.color-picker-custom-item{
    margin-bottom: 10px;
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