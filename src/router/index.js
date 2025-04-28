import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import { decryptCBC } from '@/utils/aesUtils'
import { useUserStore } from '@/store'
import * as routes from './modules'

export * from './modules'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 路由发生变化修改页面 title
  if (to.meta.title) {
    document.title = `${to.meta.title} | Vue3-admin`
  } else {
    document.title = 'Vue3-admin'
  }

  const token = useUserStore().token
  if (token) {
    const plaintext = decryptCBC(token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
    const currentTime = new Date().getTime()
    const expirationTime = plaintext.split('-')[3]
    if (currentTime > expirationTime) {
      useUserStore().logout()
      next({ path: '/login' })
    } else if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 仅在过期时间剩余10分钟内时才刷新token
      if (expirationTime - currentTime <= 10 * 60 * 1000) {
        useUserStore().generateToken(useUserStore().userInfo.username)
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
