<template>
    <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
        <div class="site-navbar__header">
            <div class="site-navbar__brand" @click="$router.push({ name: 'home' })">
                <div class="site-navbar__brand-lg">
                    <img class="site-navbar__brand-logo" src="~@/assets/img/logo.png">
                    <font style="font-size: 18px;">易码商城</font>
                </div>
                <div class="site-navbar__brand-mini">
                    <img class="site-navbar__brand-logo" src="~@/assets/img/logo.png">
                </div>
            </div>
        </div>
        <div class="site-navbar__body clearfix">
            <el-menu class="site-navbar__menu" mode="horizontal">
                <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
                    <icon-svg name="zhedie"></icon-svg>
                </el-menu-item>
            </el-menu>
            <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
                <el-menu-item class="site-navbar__avatar" index="3">
                    <el-dropdown :show-timeout="0" placement="bottom">
                    <span class="el-dropdown-link">
                        <img src="~@/assets/img/avatar.png" :alt="userName">{{ userName }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
        </div>
    </nav>
</template>

<script>
import { clearLoginInfo } from '@/utils'
export default {
    data () {
        return {
        
        }
    },
    computed: {
        navbarLayoutType: {
            get () { return this.$store.state.common.navbarLayoutType }
        },
        sidebarFold: {
            get () { return this.$store.state.common.sidebarFold },
            set (val) { this.$store.commit('common/updateSidebarFold', val) }
        },
        mainTabs: {
            get () { return this.$store.state.common.mainTabs },
            set (val) { this.$store.commit('common/updateMainTabs', val) }
        },
        userName: {
            get () { return this.$store.state.user.name }
        }
    },
methods: {
    // 退出
    logoutHandle () {
        this.$confirm(`确定[退出]当前系统?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            clearLoginInfo()
            this.$router.push({ name: 'login' })
            // this.http({
            //     url: '',
            //     method: 'post',
            //     data: this.$http.adornData()
            // }).then(res => {
            //     if (res.code == 0) {
            //         clearLoginInfo()
            //         this.$router.push({ name: 'login' })
            //     }
            // })
        })
    }
}
}
</script>