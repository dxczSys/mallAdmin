<template>
    <div class="kinds-admin-wrapper">
        <div style="display: flex;align-items: center; margin-bottom: 20px;">
            <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
            <div style="font-weight: 600;">类目管理</div>
        </div>
        <div class="kinds-admin-box">
            <div class="kinds-left">
                <el-input v-model="filterText" placeholder="输入关键字过滤" prefix-icon="el-icon-search"></el-input>
                <div style="margin-top: 10px;">
                    <el-button type="primary" @click="addChild" icon="el-icon-plus" size="mini">新增一级</el-button>
                </div>
                <div class="kinds-left-tree">
                     <el-tree class="kinds-tree" :data="treeData" node-key="id" @node-click="treeNodeClick" :expand-on-click-node="false"
                        :render-content="renderTree" ref="myTree" :filter-node-method="filterNode" :default-expanded-keys="expandedKeys" v-if="refreshTree">
                    </el-tree>
                </div>
            </div>
            <div class="kinds-right" v-if="currentLevel > 1">
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
                             <el-tag v-for="(value, j) in item.conditionArr" :key="j" closable 
                                @close="deleteItem(index, j)" style="margin-right: 10px; color: #409eff;">{{value}}</el-tag>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterText: '',
            refreshTree: true,
            expandedKeys: [],
            treeData: [],
            currentLabel: '',
            currentLevel: 0,
            currentId: '',
            conditionForm: {
                isColor: '1'
            },
            conditionList: [],
            newConditionName: '',
        }
    },
    watch: {
        filterText(val) {
            this.$refs.myTree.filter(val)
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        renderTree(h, { node, data, store }) {
            if (node.level == 3) {
                return (
                    <div class="nomal-level">
                        <span class="nomal-level-label" id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            <span class="el-icon-delete" on-click={ () => {this.deleteTreeNode(node, data)}}></span>
                        </span>
                    </div>)
            }else {
                return (
                    <div class="nomal-level">
                        <span class="nomal-level-label" id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            <span class="el-icon-circle-plus-outline" on-click={ () => {this.addChild(node, data)}}></span>
                            <span class="el-icon-delete" on-click={ () => {this.deleteTreeNode(node, data)}}></span>
                        </span>
                    </div>)
            }
        },
        treeNodeClick(data, node, el) {
            this.currentId = data.id
            this.currentLabel = data.label
            this.currentLevel = node.level
            this.currentLevel != 1 && this.getConditionList()
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
            if (data.children.length) {
                this.$message.info('该类目下有子类目，请先删除下级类目')
            }else {
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
                            this.$message.success('删除成功！')
                            const parent = node.parent
                            const children = parent.data.children || parent.data
                            const index = children.findIndex(d => d.id === data.id)
                            children.splice(index, 1)
                            this.currentLevel = 0
                        }
                    })
                }).catch(() => {})
            }
        },
        doSave(node, data) {
            let input = document.getElementById(`input${data.id}`),
                span = document.getElementById(`span${data.id}`),
                edit = document.getElementById(`edit${data.id}`),
                save = document.getElementById(`save${data.id}`)
            if (input.value) {
                if (data.isNew) {
                    this.http({
                        url: 'merchant/tGoodCategory/tGoodCategorySave',
                        method: 'post',
                        data: {
                            categoryParent: node.parent.data.id? node.parent.data.id : undefined,
                            categoryName: input.value,
                            categoryGrade: node.level
                        }
                    }, res => {
                        if (res.data.code == 200) {
                            data.id = res.data.data.id
                            data.label = res.data.data.label
                            data.children = res.data.data.children
                            delete data.isNew
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
                        }
                    })
                }
            }else {
                this.$message.info('类目名不能为空！')
            }
        },
        addChild(node, data) {
            let tempId = (Math.random()*10000000000 + '').split('.')[0]
            if (data) {
                if (!data.children) {
                    this.$set(data, 'children', [])
                }
                data.children.push({ id: tempId, label: '', isNew: 1, children: [] })
                this.expandedKeys.push(tempId)
            }else {
                this.treeData.push({ id: tempId, label: '', isNew: 1, children: [] })
            }
            let timer = setTimeout(_ => {
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
                clearTimeout(timer)
                timer = null
            }, 20)
        },
        deleteItem(index, j) {
            this.conditionList[index].conditionArr.splice(j, 1)
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
                if (item.conditionArr.indexOf(this.newConditionName) < 0) {
                    item.conditionArr.push(this.newConditionName)
                    this.newConditionName = ''
                    item.isAddItem = false
                }else {
                    this.$message.info('条件重复！')
                }
            }
        },
        deleteCondition(item, index) {
            this.conditionList.splice(index, 1)
        },
        handleNewCondition() {
            this.conditionList.push({
                conditionName: '',
                conditionArr: []
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
        }
    },
    mounted() {
        this.http({
            url: 'merchant/tGoodCategory/selectTGoodCategoryAsTree',
            method: 'get',
        }, res => {
            if (res.data.code == 200) {
                this.treeData = res.data.data
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.kinds-left{
    width: 400px;
    .kinds-left-tree{
        margin-top: 10px;
    }
}
.kinds-admin-box{
    display: flex;
    .kinds-right{
        flex-grow: 1;
        margin-left: 40px;
    }
}
.kinds-tree{
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
</style>