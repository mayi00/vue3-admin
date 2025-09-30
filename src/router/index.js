import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './constantRoutes'
import { initDynamicRoutes } from '@/tools/route'
import { versionCheck } from '@/plugins/refreshPlugin'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  await versionCheck()
  // 路由发生变化修改页面 title
  if (to.meta.title) {
    document.title = `${to.meta.title} | Vue`
  } else {
    document.title = 'Vue'
  }

  const token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
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
