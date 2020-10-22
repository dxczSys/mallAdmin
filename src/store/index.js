import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import mall from './modules/mall'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        common,
        user,
        mall
    },
    strict: process.env.NODE_ENV !== 'production'
})
