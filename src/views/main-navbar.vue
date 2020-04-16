<template>
    <nav class="site-navbar-wrapper" :class="'site-navbar--' + navbarLayoutType">
        <!-- <div class="site-navbar__header">
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
                        <img :src="avatarUrl" :alt="userName">{{ userName }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-menu>
        </div> -->
        <div class="navbar-left">
            <div class="navbar-logo">
                <img src="~@/assets/img/logo.png" alt="logo">
            </div>
            <div class="mall-name">
                <b>易码商城</b>
            </div>
        </div>
        <div class="navbar-right">
            <el-badge v-if="roleId.includes('1') || roleId.includes('2')" :value="approvalNum" class="mark-tip">
                <icon-svg name="lingdang"></icon-svg>
            </el-badge>
            <div class="navbar-avatar">
                <img :src="avatarUrl" :alt="userName">
                <span>{{ userName }}</span>
            </div>
            <div class="navbar-logout">
                <span class="iconfont iconicon-tuichu"></span>
            </div>
        </div>
    </nav>
</template>

<script>
import { clearLoginInfo } from '@/utils'
export default {
    data () {
        return {
            avatarUrl: require('@/assets/img/avatar_default.png'),
            approvalNum: 0,
            roleId: sessionStorage.getItem('roleId')
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

<style lang="scss" scoped>
.site-navbar-wrapper{
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    background-color: #fff;
}
.navbar-right{
    display: flex;
    align-items: center;
    margin-right: 20px;
    .navbar-avatar{
        display: flex;
        align-items: center;
        margin-right: 15px;
        cursor: pointer;
        img{
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 8px;
        }
    }
    .mark-tip{
        margin-right: 30px;
        margin-top: 6px;
        cursor: pointer;
        svg{
            font-size: 28px;
        }
    }
}
.navbar-logout{
    span{
        font-size: 25px;
        color: #409eff;
        cursor: pointer;
        &:hover{
            color: #3E8EF7;
        }
    }
}
.navbar-left{
    display: flex;
    align-items: center;
    margin-left: 40px;
}
.mall-name{
    margin-left: 8px;
    b{
        font-size: 18px;
    }
}
.navbar-logo{
    img{
        width: 30px;
    }
}
</style>