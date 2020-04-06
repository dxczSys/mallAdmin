<template>
    <div class="organize-wrapper">
        <div class="organize-box">
            <div class="organize-left">
                <el-input v-model="filterText" placeholder="输入关键字过滤" style="width: 360px;"></el-input>
                <div class="organize-left-bottom">
                    <el-tree class="organize-tree" :data="treeData" node-key="id" :expand-on-click-node="false" 
                        :render-content="renderTree" :default-expanded-keys="['1']">
                    </el-tree>
                    <el-dropdown class="organize-left-bottom-dropdown">
                        <span class="el-dropdown-link">
                            <i class="iconfont iconcaidan"></i>编辑
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="$router.push({ name: 'admin-add-mall'})">新增商城</el-dropdown-item>
                            <el-dropdown-item>授权中心</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="organize-right">
                <div class="mall-box">
                    <div style="display: flex;align-items: center;">
                        <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                        <div style="font-weight: 600;">当前节点:{{currentLabel}}</div>
                    </div>
                    <div class="mall-item-box">
                        <div class="mall-item" v-for="(item, index) in mallList" :key="index">
                            <img :src="item.url">
                        </div>
                    </div>
                </div>
                <div class="floor-box"></div>
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
                    label: '易码商城',
                    children: [
                        {
                            id: '2',
                            label: '开元商城',
                            url: require('@/assets/img/kaiyuan.png'),
                            children: [
                                {
                                    id: 'a1',
                                    label: '管理员1',
                                    type: 'admin'
                                },
                                {
                                    id: '3',
                                    label: '1楼'
                                },
                                {
                                    id: '4',
                                    label: '2楼',
                                    children: [
                                        {
                                            id: '5',
                                            label: '香奈儿香奈儿香奈儿香奈儿香奈儿香奈儿'
                                        },
                                        {
                                            id: '6',
                                            label: '迪奥'
                                        }
                                    ]
                                }
                            ]
                        },{
                            id: '7',
                            label: '赛格国际购物中心'
                        }
                    ]
                }
            ],
            currentLabel: '易码商城',
            mallList: []
        }
    },
    methods: {
        renderTree(h, { node, data, store }) {
            if (node.level == 1) {
                return (
                    <div class="first-level">
                        <icon-svg name="company"></icon-svg>
                        <span>{data.label}</span>
                    </div>)
            }else if (node.level == 2) {
                return (
                    <div class="others-level">
                        <span class="others-level-label">
                            <icon-svg name="mall"></icon-svg>
                            <span>{data.label}</span>
                        </span>
                        <span class="others-level-operate">
                            <span class="el-icon-edit edit-tree-node" onClick={() => this.editMall(data.id) }></span>
                            <span class="el-icon-delete delete-tree-node"></span>
                        </span>
                    </div>)
            }else if (node.level == 3) {
                let iconName = '', font = ''
                data.type == 'admin'? iconName = 'administraor' : iconName = 'louceng'
                return (
                    <div class="others-level">
                        <span class="others-level-label">
                            <icon-svg name={iconName}></icon-svg>
                            <span>{data.label}</span>
                        </span>
                        <span class="others-level-operate">
                            {data.type == 'admin'? <span title="授权管理" class="iconfont iconshouquan edit-tree-node"></span> : 
                            <span class="el-icon-delete delete-tree-node"></span>}
                        </span>
                    </div>)
            }else {
                return (
                    <div class="others-level">
                        <span class="others-level-label">
                            <icon-svg name="dianpu"></icon-svg>
                            <span>{data.label}</span>
                        </span>
                        <span class="others-level-operate">
                            <span class="el-icon-delete delete-tree-node"></span>
                        </span>
                    </div>)
            }
        },
        editMall(id) {
            this.$router.push({
                name: 'admin-add-mall',
                query: {
                    id: id
                }
            })
        }
    },
    mounted() {
        this.mallList = this.treeData[0].children
    }
}
</script>

<style lang="scss" scoped>
.organize-box{
    display: flex;
    .organize-left{
        width: 380px;
        padding-right: 20px;
        .organize-left-bottom{
            position: relative;
            margin-top: 10px;
            &-dropdown{
                position: absolute;
                top: 7px;
                right: 0;
                cursor: pointer;
                z-index: 999;
                &:hover{
                    color: #17B3A3;
                }
            }
        }
        
    }
}
.organize-tree{
    /deep/ .el-tree-node__content{
        height: 36px;
    }
    /deep/ .first-level{
        font-weight: 600;
        display: flex;
        align-items: center;
        span{
            margin-left: 5px;
        }
    }
    /deep/ .others-level{
        display: flex;
        width: 100%;
        justify-content: space-between;
        .others-level-label{
            flex-grow: 1;
            display: flex;
            align-items: center;
            span{
                margin-left: 5px;
                width: 15em;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
        .others-level-operate{
            padding-left: 6px;
        }
        .edit-tree-node{
            color: #17B3A3;
            cursor: pointer;
            padding: 0 3px;
            &:hover{
                color: #0eecd5;
            }
        }
        .delete-tree-node{
            color: #F56C6C;
            cursor: pointer;
            padding: 0 5px;
            &:hover{
                color: #f24242;
            }
        }
    }
}

</style>