// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      userInfo: {
        id: '',
        name: '',
        token: ''
      },
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  }
}
