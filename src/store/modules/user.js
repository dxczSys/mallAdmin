import cloneDeep from 'lodash/cloneDeep'
export default {
  namespaced: true,
  state: {
    user_id: '',
    role_id: [],
    role_name: '',
    user_name: '',
    real_user_name: '',
    phone: '',
    url: '',
    menu_list: [],
    dynamic_menu_routes: []
  },
  mutations: {
    SET_USER_ID (state, val) {
      state.user_id = val
    },
    SET_ROLE_ID (state, val) {
      state.role_id = val.slice()
    },
    SET_ROLE_NAME (state, val) {
      state.role_name = val
    },
    SET_USER_NAME (state, val) {
      state.user_name = val
    },
    SET_REAL_USER_NAME (state, val) {
      state.real_user_name = val
    },
    SET_PHONE (state, val) {
      state.phone = val
    },
    SET_URL (state, val) {
      state.url = val
    },
    SET_MENU_LIST (state, val) {
      state.menu_list = cloneDeep(val)
    },
    SET_DYNAMIC_MENU_ROUTES (state, val) {
      state.dynamic_menu_routes = cloneDeep(val)
    }
  }
}
