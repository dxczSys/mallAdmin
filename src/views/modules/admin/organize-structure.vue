<template>
    <div class="organize-wrapper">
        <div class="organize-box">
            <div class="organize-left">
                <el-input v-model="filterText" placeholder="输入关键字过滤" style="width: 360px;"></el-input>
                <div class="organize-left-bottom">
                    <el-tree class="organize-tree" :data="treeData" node-key="id" :expand-on-click-node="false" 
                        @node-click="treeNodeClick" :render-content="renderTree" :default-expanded-keys="['1']">
                    </el-tree>
                    <el-dropdown class="organize-left-bottom-dropdown">
                        <span class="el-dropdown-link">
                            <i class="iconfont iconcaidan"></i>编辑
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="$router.push({ name: 'admin-add-mall'})">新增商城</el-dropdown-item>
                            <el-dropdown-item @click.native="dialogVisible=true">授权中心</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="organize-right">
                <div style="display: flex;align-items: center;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div style="font-weight: 600;">当前节点:{{currentLabel}}</div>
                </div>
                <div class="mall-box" v-if="currentLevel == 1">
                    <div class="mall-item-box">
                        <div class="mall-item" v-for="(item, index) in mallList" :key="index">
                            <div class="mall-item-left">
                                <img :src="item.url">
                            </div>
                            <div class="mall-item-right">
                                <div class="mall-item-right-top">
                                    <span>{{item.label}}</span>
                                    <span>{{item.company}}</span>
                                </div>
                                <div style="margin-bottom: 10px;">{{item.phone}}</div>
                                <div>{{item.address}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="floor-box" v-if="currentLevel == 2 || currentLevel == 3">
                    <div class="floor-item" v-for="(item, index) in floorList" :key="index">
                        <div class="floor-title">
                            <icon-svg name="louceng"></icon-svg>
                            <span>{{item.label}}</span>
                        </div>
                        <div v-if="!item.children || !item.children.length" style="text-align: center; padding: 20px 0; color: #999;">*当前楼层暂无商家入驻</div>
                        <div class="shop-item-box">
                            <el-row :gutter="10">
                                <el-col :span="4" v-for="(value, j) in item.children" :key="j">
                                    <div class="shop-item">
                                        <img :src="value.url">
                                        <div>{{value.label}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="授权中心" :visible.sync="dialogVisible" width="400px">
            <div></div>
            <div slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
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
                            label: '开元商城(钟楼店)',
                            address: '西安市碑林区解放市场6号',
                            url: require('@/assets/img/avatar.png'),
                            phone: '029-86300000',
                            company: '开元商业有限公司',
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
                                            label: 'rampo乱步旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//a9/6d/TB1vNGBRpXXXXbdaXXXSutbFXXX.jpg_140x140Q90.jpg'
                                        },
                                        {
                                            id: '6',
                                            label: '优衣库官方旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//a4/6e/TB15wg4viMnBKNjSZFCSut0KFXa.jpg_140x140Q90.jpg',
                                        },
                                        {
                                            id: '61',
                                            label: 'ASURA大码男装',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//f7/5e/TB1P.U2FFXXXXXsXFXXwu0bFXXX.png_140x140Q90.jpg',
                                        },
                                        {
                                            id: '62',
                                            label: 'Champion官方旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//47/51/TB1GAe_xNuTBuNkHFNRSuw9qpXa.jpg_140x140Q90.jpg',
                                        },
                                        {
                                            id: '63',
                                            label: '异至男装旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//ed/24/TB1ztyioA9WBuNjSspe1rmz5VXa.JPG_140x140Q90.jpg',
                                        },
                                        {
                                            id: '63',
                                            label: '异至男装旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//ed/24/TB1ztyioA9WBuNjSspe1rmz5VXa.JPG_140x140Q90.jpg',
                                        },
                                        {
                                            id: '63',
                                            label: '异至男装旗舰店',
                                            url: 'https://g-search1.alicdn.com/img/bao/uploaded/i4//ed/24/TB1ztyioA9WBuNjSspe1rmz5VXa.JPG_140x140Q90.jpg',
                                        }
                                    ]
                                }
                            ]
                        },{
                            id: '7',
                            label: '赛格国际购物中心',
                            address: '西安市雁塔区长安中路123号',
                            url: require('@/assets/img/saige.png'),
                            phone: '029-86300000',
                            company: '西安赛格商业运营管理有限公司',
                        }
                    ]
                }
            ],
            currentLabel: '易码商城',
            currentLevel: 1,
            mallList: [],
            floorList: [],
            dialogVisible: false,
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
        },
        treeNodeClick(data, node, el) {
            this.currentLabel = data.label
            this.currentLevel = node.level
            if (node.level == 2) {
                let arr = []
                data.children.forEach(item => {
                    if (item.type != 'admin') {
                        arr.push(item)
                    }
                })
                this.floorList = arr
            }else if(node.level == 3 && data.type != 'admin') {
                this.currentLabel = node.parent.label + data.label
                this.floorList = [data]
            }else {
                this.floorList = []
            }
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
.organize-right{
    flex-grow: 1;
    margin-left: 20px;
}
.mall-item-box{
    margin-top: 20px;
}
.mall-item{
    display: flex;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 4px;
    background-color: #EEEBDE;
    .mall-item-left{
        margin-right: 20px;
        img{
            border-radius: 4px;
            height: 90px;
            object-fit: scale-down;
        }
    }
    .mall-item-right-top{
        margin-bottom: 10px;
        span:first-child{
            font-size: 20px;
        }
    }
}
.floor-box{
    margin-top: 20px;
}
.shop-item-box{
    padding: 10px 20px;
}
.shop-item{
    text-align: center;
    margin-bottom: 20px;
    img{
        width: 70px;
        height: 70px;
        object-fit: cover;
        margin-bottom: 8px;
        background-color: #fff;
        border: 1px solid #eee;
    }
    div{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>