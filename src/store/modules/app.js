/*
 * @Description : 系统相关
 * @Author      : huazf
 * @Date        : 2022-07-05
 * @LastEditors : huazf
 * @LastEditTime: 2022-07-05
 * @FilePath    : \vue3-vite-pc\src\store\modules\app.js
 */

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
