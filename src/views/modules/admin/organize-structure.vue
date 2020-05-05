<template>
    <div class="organize-wrapper">
        <div class="organize-box">
            <div class="organize-left">
                <el-input v-model="filterText" placeholder="输入关键字过滤" style="width: 360px;"></el-input>
                <div class="organize-left-bottom">
                    <el-tree class="organize-tree" node-key="id" :expand-on-click-node="false" lazy ref="myTree" v-if="refreshTree"
                        :load="loadTree" @node-click="treeNodeClick" :render-content="renderTree" :default-expanded-keys="expandedId">
                    </el-tree>
                    <el-dropdown class="organize-left-bottom-dropdown">
                        <span class="el-dropdown-link">
                            <i class="iconfont iconcaidan"></i>编辑
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="$router.push({ name: 'admin-add-mall'})">新增商城</el-dropdown-item>
                            <el-dropdown-item @click.native="getAllMall">授权中心</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="organize-right">
                <div style="display: flex;align-items: center;">
                    <div style="width: 5px; height: 15px; background-color: #409eff;border-radius: 1px;margin-right: 3px;"></div>
                    <div v-if="currentLevel == 3 && isAdmin" style="font-weight: 600;">
                        <span>{{currentParentLabel}}</span>
                        <span style="padding-left: 8px;">{{currentLabel}}</span>
                    </div>
                    <div v-if="currentLevel == 3 && !isAdmin" style="font-weight: 600;">
                        <span>{{currentParentLabel}}</span>
                        <span style="padding-left: 8px;">{{currentLabel}}楼</span>
                    </div>
                    <div v-if="currentLevel == 1 || currentLevel == 2 || currentLevel == 4" style="font-weight: 600;">{{currentLabel}}</div>
                </div>
                <div class="mall-box" v-if="currentLevel == 1">
                    <div class="mall-item-box">
                        <div class="mall-item" v-for="(item, index) in mallList" :key="index">
                            <div class="mall-item-left">
                                <img :src="fileUrl + item.url">
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
                <div class="admin-person-mess" v-if="currentLevel == 3 && isAdmin">
                    <div class="admin-person-avatar">
                        <img v-if="adminMess.userPic" :src="fileUrl + adminMess.userPic">
                        <img v-else src="~@/assets/img/avatar_default.png">
                    </div>
                    <div class="admin-person-row">
                        <label>姓名：</label>
                        <span>{{adminMess.realUserName}}</span>
                    </div>
                    <div class="admin-person-row">
                        <label>手机号：</label>
                        <span>{{adminMess.userTel}}</span>
                    </div>
                </div>
                <div class="floor-box" v-if="(currentLevel == 2 || currentLevel == 3) && !isAdmin">
                    <div class="floor-item" v-for="(item, index) in floorList" :key="index">
                        <div class="floor-title">
                            <icon-svg name="louceng"></icon-svg>
                            <span>{{item.label}}楼</span>
                        </div>
                        <div v-if="!item.children || !item.children.length" style="text-align: center; padding: 20px 0; color: #999;">*当前楼层暂无商家入驻</div>
                        <div class="shop-item-box" v-if="item.children">
                            <el-row :gutter="10">
                                <el-col :span="4" v-for="(value, j) in item.children" :key="j">
                                    <div class="shop-item">
                                        <img :src="fileUrl + value.url">
                                        <div>{{value.label}}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="shop-mess-box" v-if="currentLevel == 4">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>商铺名称：</label>
                                <span>{{shopMessData.shopName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>所属商场：</label>
                                <span>{{shopMessData.shopToPart}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>所在楼层：</label>
                                <span>{{shopMessData.shopToFloor}}楼</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>所属行业：</label>
                                <span>{{shopMessData.shopToIndustry}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>联系电话：</label>
                                <span>{{shopMessData.shopTel}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>微信：</label>
                                <span>{{shopMessData.shopPersonVx}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>店铺标志：</label>
                                <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMessData.shopSign]"></img-view>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>营业执照：</label>
                                <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMessData.shopBusinessLicense]"></img-view>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>法人/经营者：</label>
                                <span>{{shopMessData.shopLegalPerson}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>身份证号：</label>
                                <span>{{shopMessData.shopLegalPersonId}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>身份证正面：</label>
                                <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMessData.idCardPicPositive]"></img-view>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="shop-mess-row">
                                <label>身份证反面：</label>
                                <img-view style="width: 100px; height: 120px;" :images="[fileUrl + shopMessData.idCardPicSide]"></img-view>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <div class="shop-mess-row">
                                <label>商铺简介：</label>
                                <div>{{shopMessData.shopInfo}}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <el-dialog title="授权中心" :visible.sync="dialogVisible" width="400px">
            <div>
                <el-form ref="authorizeForm" :model="authorizeForm" :rules="rules" label-width="80px">
                    <el-form-item label="授权商城" prop="mallId" required>
                        <el-select v-model="authorizeForm.mallId" placeholder="请选择授权商城" style="width: 100%;">
                            <el-option v-for="(item, index) in mallIdList" :key="index" :label="item.shopName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授予人" prop="userId" required>
                        <el-select v-model="authorizeForm.userId" filterable remote placeholder="手机号、真实姓名、邮箱、昵称搜索"
                            :remote-method="remoteMethod" clearable style="width: 100%;">
                            <el-option v-for="item in remoteUserList" :key="item.id" :label="item.value" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授予" required>
                        <el-select v-model="authorizeForm.roleId" placeholder="请选择角色" style="width: 100%;">
                            <el-option label="商城管理员" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="handleAuthorize">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import imgView from '@/components/img-view'
export default {
    components: { imgView },
    data() {
        return {
            fileUrl: window.SITE_CONFIG.fileUrl,
            roleId: JSON.parse(this.$cookie.get('roleId')),
            refreshTree: true,
            expandedId: ['a1'],
            filterText: '',
            currentParentLabel: '',
            currentLabel: '易码商城',
            currentLevel: 1,
            isAdmin: false,
            adminMess: {},
            mallList: [],
            floorList: [],
            dialogVisible: false,
            authorizeForm: {
                mallId: '',
                userId: '',
                roleId: '1',
            },
            mallIdList: [],
            remoteUserList: [],
            shopMessData: {},
            rules: {
                mallId: [ { required: true, message: '授权商城不能为空', trigger: 'blur'} ],
                userId: [ { required: true, message: '授予人不能为空', trigger: 'blur'} ],
            }
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
                            <span class="el-icon-delete delete-tree-node" onClick={() => this.deleteTreeNode(data.id, node) }></span>
                        </span>
                    </div>)
            }else if (node.level == 3) {
                let iconName = '', _label = '', name = ''
                if (data.type == 'admin') {
                    iconName = 'administraor'
                    _label = data.label
                    name = data.realName
                }else {
                    iconName = 'louceng'
                    _label = data.label + '楼'
                }
                return (
                    <div class="others-level">
                        <span class="others-level-label">
                            <icon-svg name={iconName}></icon-svg>
                            <span>{_label}&nbsp;&nbsp;{name}</span>
                        </span>
                        <span class="others-level-operate">
                            {data.type == 'admin'? this.roleId.includes('1')? <span title="取消授权" onClick={() => this.cancelAuthriod(data, node) } class="iconfont iconshouquan edit-tree-node"></span> :
                            <span></span> :
                            <span class="el-icon-delete delete-tree-node" onClick={() => this.deleteTreeNode(data.id, node) }></span>}
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
                            <span class="el-icon-delete delete-tree-node" onClick={() => this.deleteTreeNode(data.id, node) }></span>
                        </span>
                    </div>)
            }
        },
        loadTree(node, resolve) {
            if (node.level === 0) {
                return resolve([{ id: 'a1', label: '易码商城' }])
            }else if (node.level === 1) {
                this.http({
                    url: `admin/shopMall/tShopMallSelTree?id=&type=1`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        this.mallList = res.data.data
                         return resolve(res.data.data)
                    }
                })
            }else if (node.level === 2) {
                this.http({
                    url: `admin/shopMall/tShopMallSelTree?id=${node.data.id}&type=2`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        return resolve(res.data.data)
                    }
                })
            }else if (node.level === 3) {
                if (node.data.type == 'admin') {
                    return resolve([])
                }else {
                    this.http({
                        url: `merchant/tShop/selShopByFloorId?floorId=${node.data.id}`,
                        method: 'get'
                    }, res1 => {
                        if (res1.data.code == 200) {
                            return resolve(res1.data.data)
                        }
                    })
                }
            }else {
                return resolve([])
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
        deleteTreeNode(id, node) {
            if (node.childNodes.length) {
                this.$message.info('该节点下有子节点，禁止删除，请先删除子节点！')
            }else {
                this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.http({
                        url: `admin/shopMall/tShopMallDelById?id=${id}&type=${node.level - 1}`,
                        method: 'get'
                    }, res => {
                        if (res.data.code == 200) {
                            this.$refs.myTree.remove(node)
                            this.$message.success('删除成功！')
                        }
                    })
                }).catch(() => {})
            }           
        },
        treeNodeClick(data, node, el) {
            this.currentLabel = data.label
            this.currentLevel = node.level
            node.level != 1 && (this.currentParentLabel = node.parent.data.label)
            data.type == 'admin'? this.isAdmin = true : this.isAdmin = false
            if (node.level == 2) {
                this.http({
                    url: `admin/shopMall/selShopAllByShopMallId?shopMallId=${data.id}`,
                    method: 'get',
                }, res => {
                    if (res.data.code == 200) {
                        this.floorList = res.data.data
                    }
                })
            }else if(node.level == 3) {
                if (data.type == 'admin') {
                    this.http({
                        url: `user/selById?userId=${data.id}`,
                        method: 'get',
                    }, res => {
                        if (res.data.code == 200) {
                            this.adminMess = res.data.data
                        }
                    })
                }else {
                    let _arr = [], obj = JSON.parse(JSON.stringify(data))
                    node.childNodes.forEach(item => {
                        _arr.push(item.data)
                    })
                    obj.children = _arr
                    this.floorList = [obj]
                }
                
            }else if (node.level == 4){
                this.http({
                    url: `admin/shopMall/selTShopInfoByShopId?shopId=${data.id}`,
                    method: 'get',
                }, res => {
                    if (res.data.code == 200) {
                        this.shopMessData = res.data.data
                    }
                })
            }
        },
        getAllMall() {
            this.http({
                url: 'admin/shopMall/tShopMallSelByAllAuthorization',
                method: 'get'
            }, res => {
                if (res.data.code == 200) {
                    this.mallIdList = res.data.data
                    this.dialogVisible = true
                }
            })
        },
        remoteMethod(query) {
            if (query) {
                this.http({
                    url: `user/dynamicFind?query=${query}`,
                    method: 'get'
                }, res => {
                    if (res.data.code == 200) {
                        this.remoteUserList = res.data.data
                    }
                })
            }else {
                this.remoteUserList = []
            }
        },
        handleAuthorize() {
            this.$refs.authorizeForm.validate(valid => {
                if (valid) {
                    this.http({
                        url: `admin/shopMall/shopAuthorization?type=1&userId=${this.authorizeForm.userId}&shopId=${this.authorizeForm.mallId}`,
                        method: 'get'
                    }, res => {
                        if (res.data.code == 200) {
                            this.expandedId.push(this.authorizeForm.mallId)
                            this.$refs.authorizeForm.resetFields()
                            this.dialogVisible = false
                            this.refreshTree = false
                            this.$nextTick(_ => { this.refreshTree = true })
                            this.$message.success('授权成功！')
                        }
                    })
                }
            })
        },
        cancelAuthriod(data, node) {
            const h = this.$createElement;
            this.$msgbox({
                title: '取消授权',
                message: h('div', null, [
                    h('span', null, '确认取消'),
                    h('span', { style: 'padding: 0 5px; font-weight: 600;'}, node.parent.data.label),
                    h('span', { style: 'color: #409EFF; padding-right: 5px;' }, data.realName),
                    h('span', null, '的管理员权限?')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        this.http({
                            url: `admin/shopMall/shopAuthorization?type=2&userId=${data.id}&shopId=${node.parent.data.id}`,
                            method: 'get',
                        }, res => {
                            if (res.data.code == 200) {
                                this.$refs.myTree.remove(node)
                                done()
                            }
                        })
                    }else {
                        done()
                    }
                }
            }).then(action => {})
        }
    },
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
    margin-left: 5px;
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
.admin-person-mess{
    margin-top: 20px;
    margin-left: 10px;
    .admin-person-avatar{
        margin-bottom: 10px;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
        }
    }
    .admin-person-row{
        display: flex;
        line-height: 30px;
        label{
            width: 4em;
            text-align: right;
        }
    }
}
.shop-mess-box{
    margin-left: 10px;
    margin-top: 20px;
    .shop-mess-row{
        padding: 10px 0;
        display: flex;
        label{
            margin-right: 10px;
            flex-shrink: 0;
        }
    }
}
</style>