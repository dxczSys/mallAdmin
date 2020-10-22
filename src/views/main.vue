<template>
    <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }" element-loading-text="拼命加载中">
        <template v-if="!loading">
            <main-navbar />
            <main-sidebar />
            <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
                <main-content v-if="!$store.state.common.contentIsNeedRefresh" />
                <my-footer></my-footer>
            </div>
        </template>
    </div>
</template>

<script>
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import MainContent from './main-content'
import myFooter from '../views/common/footer'
import { mapState, mapMutations } from 'vuex'
export default {
    provide () {
        return {
            // 刷新
            refresh () {
                this.$store.commit('common/updateContentIsNeedRefresh', true)
                this.$nextTick(() => {
                    this.$store.commit('common/updateContentIsNeedRefresh', false)
                })
            }
        }
    },
    data () {
        return {
            loading: false
        }
    },
    components: {
        MainNavbar,
        MainSidebar,
        MainContent,
        myFooter
    },
    computed: {
        ...mapState('common', ['sidebarFold', 'documentClientHeight'])
    },
    mounted () {
        this.resetDocumentClientHeight()
    },
    methods: {
        ...mapMutations('common', ['updateDocumentClientHeight']),
        resetDocumentClientHeight () {
            this.updateDocumentClientHeight(document.documentElement['clientHeight'])
            window.onresize = () => {
                this.updateDocumentClientHeight(document.documentElement['clientHeight'])
            }
        }
    }
}
</script>