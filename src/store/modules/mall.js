export default {
  namespaced: true,
  state: {
    mall: localStorage.getItem('MALL')
  },
  mutations: {
    SET_MALL(state, val) {
      localStorage.setItem('MALL', JSON.stringify(val))
      state.mall = val
    }
  }
}
