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
                     <el-tree class="kinds-tree" :data="treeData" node-key="id"  
                        @node-click="treeNodeClick" :render-content="renderTree">
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
                    <div style="padding-left: 20px;">
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
                            <el-input v-if="isAddItem" v-model="newConditionName" placeholder="规格条件值" class="add-input" size="mini"></el-input>
                            <span class="add-floor-button" v-if="!isAddItem" @click="isAddItem = !isAddItem">
                                <span class="el-icon-plus" style="font-weight: 600;"></span>
                                <span>新增</span>
                            </span>
                            <span v-if="isAddItem" class="add-floor-button" @click="handleAddItem(item)">
                                <span class="el-icon-check" style="font-weight: 600;"></span>
                                <span>完成</span>
                            </span>
                        </el-form-item>
                    </div>
                    <div v-if="conditionList.length" style="padding-left: 20px; margin-top: 20px;">
                        <el-button type="primary" size="small">保存</el-button>
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
            treeData: [
                {
                    id: '1',
                    label: '男装',
                    children: [
                        {
                            id: '2',
                            label: '风衣',
                            conditionList: [],
                            children: [
                                {
                                    id: '3',
                                    label: '快鱼',
                                    conditionList: []
                                }
                            ]
                        }
                    ]
                }
            ],
            currentLabel: '',
            currentLevel: 0,
            conditionForm: {
                isColor: '1'
            },
            conditionList: [],
            isAddItem: false,
            newConditionName: '',
        }
    },
    methods: {
        renderTree(h, { node, data, store }) {
            if (node.level == 3) {
                return (
                    <div class="nomal-level">
                        <span id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            <span class="el-icon-delete"></span>
                        </span>
                    </div>)
            }else {
                return (
                    <div class="nomal-level">
                        <span id={`span${data.id}`}>{data.label}</span>
                        <input class="edit-input" placeholder="请输入类目名称" id={`input${data.id}`} value={data.label}></input>
                        <span class="nomal-level-operate">
                            <span id={`edit${data.id}`} class="el-icon-edit" on-click={ () => {this.doEdit(data)}}></span>
                            <span id={`save${data.id}`} class="el-icon-check" on-click={ () => {this.doSave(node, data)}}></span>
                            <span class="el-icon-circle-plus-outline" on-click={ () => {this.addChild(node, data)}}></span>
                            <span class="el-icon-delete"></span>
                        </span>
                    </div>)
            }
        },
        treeNodeClick(data, node, el) {
            this.currentLabel = data.label
            this.currentLevel = node.level
            this.conditionList = JSON.parse(JSON.stringify(data.conditionList))
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
        doSave(node, data) {
            let input = document.getElementById(`input${data.id}`),
                span = document.getElementById(`span${data.id}`),
                edit = document.getElementById(`edit${data.id}`),
                save = document.getElementById(`save${data.id}`)
            console.log(input.value)
            if (data.isNew) {
                //新增
            }else {
                //保存
                data.label = input.value
                input.style.display = 'none'
                span.style.display = 'inline'
                edit.style.display = 'inline'
                save.style.display = 'none'
            }
        },
        addChild(node, data) {
            let tempId = (Math.random()*10000000000 + '').split('.')[0]
            if (data) {
                if (!data.children) {
                    this.$set(data, 'children', [])
                }
                data.children.push({ id: tempId, label: '', isNew: 1 })
            }else {
                this.treeData.push({ id: tempId, label: '', isNew: 1 })
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
        handleAddItem(item) {
            if (this.newConditionName) {
                item.conditionArr.push(this.newConditionName)
                this.newConditionName = ''
                this.isAddItem = false
            }
        },
        handleNewCondition() {
            this.conditionList.push({
                conditionName: '',
                conditionArr: []
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.kinds-left{
    width: 400px;
    .kinds-left-tree{
        margin-top: 5px;
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
            .el-icon-delete:hover{
                color: #F56C6C;
            }
        }
    }
}
.condition-item{
    margin-top: 20px;
    border-bottom: 1px solid #eee;
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