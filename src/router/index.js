import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import { useUserStore, useAppStore } from '@/store'
import routes from './modules'

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
  const userStore = useUserStore()
  if (token) {
    if (!userStore.validateToken(token)) {
      userStore.logout()
      next({ path: '/login' })
    } else if (to.path === '/login') {
      next({ path: '/' })
    } else {
      useAppStore().addTag(to)
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
export { routes }
