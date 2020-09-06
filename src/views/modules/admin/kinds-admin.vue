<template>
    <div class="kinds-admin-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">类目管理</div>
        </div>
        <div class="kinds-admin-box">
            <div class="kinds-left">
                <el-card>
                    <el-tree ref="myTree" class="kinds-tree" node-key="id" :expand-on-click-node="false" lazy :default-expanded-keys="expandedKeys" v-if="refreshTree"
                        :load="loadTree" :render-content="renderTree" @node-click="handleTreeNodeClick" @node-expand="expandTree" @node-collapse="collapseTree">
                    </el-tree>
                </el-card>
            </div> 
            <div v-if="currentLevel > 2" class="kinds-right">
                <el-card>
                    <div style="display: flex;align-items: center;">
                        <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                        <div style="font-weight: 600;">当前节点:{{currentLabel}}--规格条件设置</div>
                    </div>
                    <el-form ref="conditionForm" :model="conditionForm" label-width="140px" style="margin-top: 15px;">
                        <el-form-item label="是否有颜色规格" required>
                            <el-radio v-model="conditionForm.isColor" label="1">是</el-radio>
                            <el-radio v-model="conditionForm.isColor" label="2">否</el-radio>
                        </el-form-item>
                        <div>
                            <el-button @click="handleNewCondition" type="primary" size="mini">新增规格</el-button>
                            <span style="font-size: 13px; color: #999;">可新增多个规格</span>
                        </div>
                        <div class="condition-item" v-for="(item, index) in conditionList" :key="index">
                            <el-form-item label="规格名称" required>
                                <el-input v-model="item.conditionName" placeholder="请输入规格名称" style="width: 300px;"></el-input>
                            </el-form-item>
                            <el-form-item label="规格条件" required>
                                <el-tag v-for="(value, j) in item.conditionArr1" :key="j" closable 
                                    @close="deleteItem(index, j, value)" style="margin-right: 10px; color: #409eff;">{{value.name}}</el-tag>
                                <span v-if="!item.conditionArr.length" style="color: #999; font-size: 13px;">*请设置规格条件</span>
                                <el-input v-if="item.isAddItem" v-model="newConditionName" placeholder="规格条件值" class="add-input" size="mini"></el-input>
                                <span class="add-floor-button" v-if="!item.isAddItem" @click="openAdd(item, index)">
                                    <span class="el-icon-plus" style="font-weight: 600;"></span>
                                    <span>新增</span>
                                </span>
                                <span v-if="item.isAddItem" class="add-floor-button" @click="handleAddItem(item)">
                                    <span class="el-icon-check" style="font-weight: 600;"></span>
                                    <span>完成</span>
                                </span>
                            </el-form-item>
                            <span @click="deleteCondition(item, index)" class="delete-condition-item el-icon-delete"></span>
                        </div>
                        <div style="padding-left: 20px; text-align: right; margin-top: 20px;">
                            <el-button @click="handleSaveCondition" type="primary" size="small">保存</el-button>
                        </div>
                    </el-form>
                </el-card>
            </div>
            <div v-if="currentLevel === 1" class="kinds-right">
                <el-card>
                    <div class="kinds-right-header" slot="header">
                        <span>当前商场({{currentLabel}})：选择已存在的类目</span>
                        <el-button type="primary" size="small" @click="saveSelectKinds">保存</el-button>
                    </div>
                    <div class="kinds-list">
                        <div class="search-box">
                            <el-autocomplete v-model="keywords" :fetch-suggestions="querySearchAsync" clearable prefix-icon="el-icon-search" placeholder="请输入关键字过滤"></el-autocomplete>
                        </div>
                        <el-checkbox-group v-model="kindsCheckbox" class="kinds-list-checkbox">
                            <el-checkbox v-for="(item, index) in kindsList" :key="index" :label="item.id" :disabled="!!item.shopMallName">
                                <span :class="{'content-checkbox': item.shopMallName}">
                                    <span>{{ item.label }}</span>
                                    <span v-if="item.shopMallName">(已绑定)</span>
                                </span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleIds: JSON.parse(this.$cookie.get('roleId')) || [],
            filterText: '',
            refreshTree: true,
            expandedKeys: [],
            treeData: [],
            currentLabel: '',
            currentLevel: '',
            currentId: '',
            conditionForm: {
                isColor: '1'
            },
            conditionList: [],
            newConditionName: '',
            kindsList: [],
            kindsCheckbox: [],
            keywords: '',
        }
    },
    watch: {
        filterText(val) {
            this.$refs.myTree.filter(val)
        }
    },
    methods: {
        expandTree(data, node, el) {
            document.getElementById(`new${data.id}`) && (document.getElementById(`new${data.id}`).style.display = 'inline-block')
        },
        collapseTree(data, node, el) {
            document.getElementById(`new${data.id}`) && (document.getElementById(`new${data.id}`).style.display = 'none')
        },
        renderTree(h, { node, data, store }) {
            if (node.level === 1) {
                return (
                    <div class="nomal-level">
                        <span class="nomal-level-label" id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`new${data.id}`} class="el-icon-circle-plus-outline" on-click={ () => {this.addChild(node, data)}}></span>
                        </span>
                    </div>)
            } else if (node.level === 2 || node.level === 3) {
                return (
                    <div class="nomal-level">
                        <span class="nomal-level-label" id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`new${data.id}`} class="el-icon-circle-plus-outline" on-click={ () => {this.addChild(node, data)}}></span>
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            { this.roleIds.some(this.checkIsSuperAdmin)? <span class="el-icon-delete" on-click={ () => {this.deleteTreeNode(node, data)}}></span> : '' }
                        </span>
                    </div>)
            } else {
                return (
                    <div class="nomal-level">
                        <span class="nomal-level-label" id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            { this.roleIds.some(this.checkIsSuperAdmin)? <span class="el-icon-delete" on-click={ () => {this.deleteTreeNode(node, data)}}></span> : ''}
                        </span>
                    </div>)
            }
        },
        handleTreeNodeClick(data, node, el) {
            this.kindsCheckbox = []
            this.currentId = data.id
            this.currentLabel = data.label
            this.currentLevel = node.level
            this.currentLevel == 1 && (this.getCheckboxList())
            this.currentLevel > 2 && this.getConditionList()
        },
        getConditionList() {
            this.http({
                url: `merchant/tGoodAttrKey/TGoodCategoryAttrSel?id=${this.currentId}`,
                method: 'get',
            }, res => {
                if (res.data.code) {
                    this.conditionForm.isColor = res.data.data.isColor || '1'
                    this.conditionList = res.data.data.conditionList
                }
            })
        },
        doEdit(data) {
            let input = document.getElementById(`input${data.id}`),
                span = document.getElementById(`span${data.id}`),
                edit = document.getElementById(`edit${data.id}`),
                save = document.getElementById(`save${data.id}`)
            input.style.display = 'inline-block'
            span.style.display = 'none'
            edit.style.display = 'none'
            save.style.display = 'inline'
        },
        deleteTreeNode(node, data) {
            this.$confirm('此操作将删除当前类目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                this.http({
                    url: `merchant/tGoodCategory/tGoodCategoryDelById?id=${data.id}`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        this.$refs.myTree.remove(data.id)
                        this.$message.success('删除成功！')
                    }else {
                        this.$message.info(res.data.msg)
                    }
                })
            }).catch(() => {})
        },
        doSave(node, data) {
            let input = document.getElementById(`input${data.id}`),
                span = document.getElementById(`span${data.id}`),
                edit = document.getElementById(`edit${data.id}`),
                save = document.getElementById(`save${data.id}`)
            if (input.value) {
                if (data.isNew) {
                    let obj = {
                        categoryName: input.value,
                        categoryGrade: node.level - 1
                    }
                    if (node.level === 2) {
                        obj.categoryShopMall = node.parent.key
                        obj.categoryParent = undefined
                    } else {
                        obj.categoryParent = node.parent.key
                    }
                    this.http({
                        url: 'merchant/tGoodCategory/tGoodCategorySave',
                        method: 'post',
                        data: obj
                    }, res => {
                        if (res.data.code == 200) {
                            this.currentLevel = -1
                            this.expandedKeys = [node.parent.key]
                            this.refreshTree = false
                            this.$nextTick(_ => {
                                this.refreshTree = true
                            })
                            this.$message.success('添加成功！')
                        }else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }else {
                    //保存
                    this.http({
                        url: 'merchant/tGoodCategory/tGoodCategoryUpd',
                        method: 'post',
                        data: {
                            id: data.id,
                            categoryName: input.value,
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            data.label = input.value
                            input.style.display = 'none'
                            span.style.display = 'inline'
                            edit.style.display = 'inline'
                            save.style.display = 'none'
                            this.$message.success('更新成功！')
                        }
                    })
                }
            }else {
                this.$message.info('类目名不能为空！')
            }
        },
        addChild(node, data) {
            let tempId = (Math.random()*10000000000000 + '').split('.')[0]
            if (data.children && data.children.length) {
                data.children.forEach(item => {
                    this.$refs.myTree.remove(item.id)
                })
            }
            this.$refs.myTree.append({ id: tempId, label: '', isNew: 1, children: [] }, data.id)
            this.$nextTick(_ => {
                let input = document.getElementById(`input${tempId}`),
                span = document.getElementById(`span${tempId}`),
                edit = document.getElementById(`edit${tempId}`),
                save = document.getElementById(`save${tempId}`)
                if (input) {
                    input.style.display = 'inline-block'
                    span.style.display = 'none'
                    edit.style.display = 'none'
                    save.style.display = 'inline'
                }
            })
        },
        deleteItem(index, j, value) {
            this.$confirm('确认删除该条件?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (value.id) {
                    this.http({
                        url: `merchant/tGoodCategory/tGoodCategoryValueById?valueId=${value.id}`,
                        method: 'get'
                    }, res => {
                        if (res.data.code == 200) {
                            this.conditionList[index].conditionArr1.splice(j, 1)
                            this.$message.success('删除成功！')
                        } else {
                            this.$message.info(res.data.msg)
                        }
                    })
                } else {
                    this.conditionList[index].conditionArr1.splice(j, 1)
                }
                
            }).catch(() => {})
        },
        openAdd(item, index) {
            if (item.isAddItem == undefined) {
                this.$set(this.conditionList[index], 'isAddItem', true)
            }else {
                this.conditionList[index].isAddItem = true
            }
        },
        handleAddItem(item) {
            if (this.newConditionName) {
                let flag = true
                for (let i = 0; i < item.conditionArr1.length; i++) {
                    if (this.newConditionName === item.conditionArr1[i].name) {
                        flag = false
                        break; 
                    }
                }
                if (flag) {
                    item.conditionArr1.push({
                        name: this.newConditionName,
                        id: ''
                    })
                    item.conditionArr.push(this.newConditionName)
                    this.newConditionName = ''
                    item.isAddItem = false
                }else {
                    this.$message.info('条件重复！')
                }
            }
        },
        deleteCondition(item, index) {
            this.$confirm('确认删除该规格?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.http({
                    url: `merchant/tGoodCategory/tGoodCategoryKeyById?keyId=${item.id}`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        this.conditionList.splice(index, 1)
                        this.$message.success('删除成功！')
                    } else {
                        this.$message.info(res.data.msg)
                    }
                })
            }).catch(() => {})
        },
        handleNewCondition() {
            this.conditionList.push({
                conditionName: '',
                conditionArr: [],
                conditionArr1: []
            })
        },
        handleSaveCondition() {
            this.http({
                url: 'merchant/tGoodAttrKey/TGoodAttrKeySave',
                method: 'post',
                data: {
                    id: this.currentId,
                    conditionList: this.conditionList,
                    isColor: this.conditionForm.isColor
                }
            }, res => {
                if (res.data.code == 200) {
                    this.$message.success('保存成功')
                }
            })
        },
        loadTree(node, resolve) {
            if (node.level === 0) {
                this.http({
                    url: `merchant/shopMall/tShopMallSelTree?id=&type=1`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        this.mallList = res.data.data
                        return resolve(res.data.data)
                    }
                })
            }else if (node.level === 1) {
                this.http({
                    url: `merchant/tGoodCategory/selectTGoodCategoryAsTree?shopMallId=${node.data.id}`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        return resolve(res.data.data)
                    }
                })
            }else if (node.level === 2 || node.level === 3) {
               this.http({
                    url: `merchant/tGoodCategory/tGoodCategoryById?categoryId=${node.data.id}`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        return resolve(res.data.data)
                    }
                })
            }else {
                return resolve([])
            }
            
        },
        saveSelectKinds() {
            if (this.kindsCheckbox.length) {
                this.http({
                    url: 'merchant/tGoodCategory/tGoodCategoryAuthorize',
                    method: 'post',
                    data: {
                        shopMallId: this.currentId,
                        categoryIds: this.kindsCheckbox
                    }
                }, res => {
                    if (res.data.code == 200) {
                        this.$message.closeAll()
                        this.$message.success('保存成功！')
                        this.refreshTree = false
                        this.expandedKeys = [this.currentId]
                        this.$nextTick(_ => {
                            this.refreshTree = true
                        })
                    } else {
                        this.$message.info(res.data.msg)
                    }
                })
            }else {
                this.$message.closeAll()
                this.$message.info('请选择类目')
            }
            
        },
        getCheckboxList() {
            this.http({
                url: `merchant/tGoodCategory/selectTGoodCategoryAsTree1?shopMallId=${this.currentId}`,
                method: 'get',
            }, res => {
                if (res.data.code == 200) {
                    this.kindsList = res.data.data
                }
            })
        },
        querySearchAsync(val, cb) {
            this.http({
                url: `merchant/tGoodCategory/selectTGoodCategoryAsTree1?queryName=${val}&shopMallId=${this.currentId}`,
                method: 'get',
            }, res => {
                if (res.data.code == 200) {
                    this.kindsList = res.data.data
                    cb([])
                }
            })
        },
        checkIsSuperAdmin(item) {
            if (item == '1') {
                return true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.kinds-left{
    width: 480px;
    .kinds-left-tree{
        margin-top: 10px;
    }
}
.kinds-admin-box{
    display: flex;
    .kinds-right{
        flex-basis: 0;
        flex-grow: 1;
        margin-left: 30px;
    }
}
.kinds-tree{
    height: 560px;
    overflow-y: auto;
    padding-right: 6px;
    /deep/ .el-tree-node__content{
        height: 36px;
    }
    /deep/ .nomal-level-label{
        width: 20em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    /deep/ .nomal-level{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .edit-input{
            display: none;
            width: 260px;
            border: 1px solid #eee;
            line-height: 30px;
            padding: 0 5px;
            border-radius: 4px;
        }
        .nomal-level-operate{
            span{
                padding: 0 2.5px;
                cursor: pointer;
            }
            .el-icon-edit:hover{
                color: #17B3A3;
            }
            .el-icon-circle-plus-outline{
                display: none;
            }
            .el-icon-circle-plus-outline:hover{
                color: #17B3A3;
            }
            .el-icon-check{
                display: none;
                &:hover{
                    color: #17B3A3;
                }
            }
            .el-icon-delete{
                color: #F56C6C;
                &:hover{
                    font-weight: 400;
                    color: #e70e0e;
                }
            }
        }
    }
}
.condition-item{
    position: relative;
    margin-top: 20px;
    border: 1px solid #eee;
    padding-top: 20px;
    border-radius: 4px;
    .delete-condition-item{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #f56c6c;
        font-size: 18px;
        &:hover{
            color: #f13a3a;
            font-weight: 300;
        }
    }
}
.add-floor-button{
    color: #409eff;
    cursor: pointer;
    &:hover{
        color: #2285eb;
    }
}
.add-input{
    width: 150px;
    margin-right: 6px;
    /deep/ .el-input__inner{
        padding: 0 10px;
    }
}
.kinds-right-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.kinds-list-checkbox{
    height: 491px;
    overflow-y: auto;
    /deep/ .el-checkbox{
        width: 50%;
        margin-left: 0;
        margin-bottom: 6px;
        margin-right: 0;
    }
    .content-checkbox{
        color: #E6A23C;
    }
}
.search-box{
    margin-bottom: 16px;
    /deep/ .el-autocomplete{
        width: 50%;
    }
}
</style>