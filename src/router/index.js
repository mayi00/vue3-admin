import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './constantRoutes'
import { initDynamicRoutes } from '@/tools/route'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

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
    if (to.path.includes('/login')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {})

// 全局注册 router
export function setupRouter(app) {
  app.use(router)
}
export default router

initDynamicRoutes(router)
