export default {
  namespaced: true,
  state: {
    user_id: '',
    role_id: '',
    role_name: '',
    user_name: '',
    real_user_name: '',
    phone: '',
    url: ''
  },
  mutations: {
    SET_USER_ID (state, val) {
      state.user_id = val
    },
    SET_ROLE_ID (state, val) {
      state.role_Id = val
    },
    SET_ROLE_NAME (state, val) {
      state.role_Name = val
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
  }
}
