import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import { basicRoutes } from './basic'
import { routes as systemRoutes } from './system'
import { exampleRoutes } from './example'
import { routes as chartsRoutes } from './charts'
import { routes as iopRoutes } from './iop'
import { decrypt } from '@/utils/aesUtils'

export const routes = [...basicRoutes, ...systemRoutes, ...exampleRoutes, ...chartsRoutes, ...iopRoutes]

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

  const token = localStorage.getItem('token')
  if (token) {
    const plaintext = decrypt(token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
    const currentTime = new Date().getTime()
    const expirationTime = plaintext.split('-')[3]
    if (currentTime > expirationTime) {
      localStorage.removeItem('token')
      next({ path: '/login' })
    } else if (to.path === '/login') {
      next({ path: '/' })
    } else {
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
