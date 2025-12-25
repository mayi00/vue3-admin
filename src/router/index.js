import { loadingFadeOut } from 'virtual:app-loading'
import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './modules/index.js'
import { initDynamicRoutes } from '@/tools/route.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

const whiteList = ['/screen/fit']

router.beforeEach(async (to, from, next) => {
  // 路由发生变化修改页面 title
  document.title = to.meta.title ? `${to.meta.title} | Vue` : 'Vue'

  const token = localStorage.getItem('TOKEN')
  if (token) {
    if (to.path.includes('/login')) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path) || to.path.includes('/login')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {})
router.isReady().then(() => {
  loadingFadeOut()
})

// 全局注册 router
export function setupRouter(app) {
  app.use(router)
}
export default router

initDynamicRoutes(router)
