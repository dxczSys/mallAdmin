export default {
  namespaced: true,
  state: {
    mall: {},
    mall_name: '',
    mall_id: '',
    floor_name: '',
    floor_id: '',
    shop: {},
    shop_name: '',
    shop_id: ''
  },
  mutations: {
    SET_MALL(state, val) {
      state.mall = Object.assign({}, val)
    },
    SET_MALL_NAME(state, val) {
      state.mall_name = val
    },
    SET_MALL_ID(state, val) {
      state.mall_id = val
    },
    SET_FLOOR_NAME(state, val) {
      state.floor_name = val
    },
    SET_FLOOR_ID(state, val) {
      state.floor_id = val
    },
    SET_SHOP(state, val) {
      state.shop = Object.assign({}, val)
    },
    SET_SHOP_NAME(state, val) {
      state.shop_name = val
    },
    SET_SHOP_ID(state, val) {
      state.shop_id = val
    }
  }
}
