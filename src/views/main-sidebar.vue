<template>
    <aside class="site-sidebar-wrapper" :class="{'side-folder': sidebarFold}">
        <div class="site-sidebar__inner" :class="{'side-folder': sidebarFold}">
            <el-menu :default-active="menuActiveName || 'home'" :collapse="sidebarFold" :default-openeds="openeds" active-text-color="#3E8EF7" 
                unique-opened :collapseTransition="false" class="site-sidebar__menu">
                <el-menu-item index="home" @click="$router.push({ name: 'home' })">
                    <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="demo">
                    <template slot="title">
                        <icon-svg name="shoucang" class="site-sidebar__menu-icon"></icon-svg>
                        <span>demo</span>
                    </template>
                    <el-menu-item index="demo-echarts" @click="$router.push({ name: 'demo-echarts' })">
                        <icon-svg name="tubiao" class="site-sidebar__menu-icon"></icon-svg>
                        <span slot="title">echarts</span>
                    </el-menu-item>
                    <el-menu-item index="demo-ueditor" @click="$router.push({ name: 'demo-ueditor' })">
                        <icon-svg name="editor" class="site-sidebar__menu-icon"></icon-svg>
                        <span slot="title">ueditor</span>
                    </el-menu-item>
                </el-submenu>
                <sub-menu v-for="menu in menuList" :key="menu.menuId" :menu="menu" :dynamicMenuRoutes="dynamicMenuRoutes"></sub-menu>
                <el-submenu index="设置">
                    <template slot="title">
                        <icon-svg name="shezhi" class="site-sidebar__menu-icon"></icon-svg>
                        <span>设置</span>
                    </template>
                    <el-menu-item index="update-password" @click="$router.push({ name: 'setting-update-password' })">
                        <icon-svg name="jiesuo" class="site-sidebar__menu-icon"></icon-svg>
                        <span slot="title">修改密码</span>
                    </el-menu-item>
                    <el-menu-item index="update-personInfo" @click="$router.push({ name: 'setting-update-personInfo' })">
                        <icon-svg name="gerenziliao" class="site-sidebar__menu-icon"></icon-svg>
                        <span slot="title">个人资料</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="collapse-box" @click="sidebarFold = !sidebarFold">
            <icon-svg v-if="sidebarFold" name="right"></icon-svg>
            <icon-svg v-else name="left"></icon-svg>
        </div>
    </aside>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'
import { isURL } from '@/utils/validate'
export default {
    data () {
        return {
            dynamicMenuRoutes: [],
            openeds: ['1']
        }
    },
    components: {
        SubMenu
    },
    computed: {
        sidebarLayoutSkin: {
            get () { return this.$store.state.common.sidebarLayoutSkin }
        },
        sidebarFold: {
            get () { return this.$store.state.common.sidebarFold },
            set (val) { this.$store.commit('common/updateSidebarFold', val) }
        },
        menuList: {
            get () { return this.$store.state.common.menuList },
            set (val) { this.$store.commit('common/updateMenuList', val) }
        },
        menuActiveName: {
            get () { return this.$store.state.common.menuActiveName },
            set (val) { this.$store.commit('common/updateMenuActiveName', val) }
        },
        mainTabs: {
            get () { return this.$store.state.common.mainTabs },
            set (val) { this.$store.commit('common/updateMainTabs', val) }
        },
        mainTabsActiveName: {
            get () { return this.$store.state.common.mainTabsActiveName },
            set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
        }
    },
    watch: {
        $route: 'routeHandle'
    },
    created () {
        this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
        this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
        this.routeHandle(this.$route)
    },
    methods: {
        // 路由操作
        routeHandle (route) {
            if (route.meta.isTab) {
                // tab选中, 不存在先添加
                let tab = this.mainTabs.filter(item => item.name === route.name)[0]
                if (!tab) {
                    if (route.meta.isDynamic) {
                        route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
                        if (!route) {
                            return console.error('未能找到可用标签页!')
                        }
                    }
                    tab = {
                        menuId: route.meta.menuId || route.name,
                        name: route.name,
                        title: route.meta.title,
                        type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
                        iframeUrl: route.meta.iframeUrl || '',
                        params: route.params,
                        query: route.query
                    }
                    this.mainTabs = this.mainTabs.concat(tab)
                }
                this.menuActiveName = tab.menuId + ''
                this.mainTabsActiveName = tab.name
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.site-sidebar-wrapper{
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    width: 240px;
    overflow: hidden;
    background-color: #f1f4f5;
}
.site-sidebar__inner{
    padding-top: 5px;
    height: 100%;
    width: 230px;
    .site-sidebar__menu{
        height: 100%;
    }
}
.site-sidebar__menu-icon{
    font-size: 16px;
    margin-right: 3px;
}
.side-folder{
    width: 73px !important;
}
.collapse-box{
    position: absolute;
    cursor: pointer;
    top: 42%;
    right: 2px;
    z-index: 9999;
    svg{
        font-size: 18px;
    }
}
</style>