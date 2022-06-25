/*
 * @Description : 路由
 * @Author      : huazf
 * @Date        : 2022-06-25
 * @LastEditors : huazf
 * @LastEditTime: 2022-06-25
 * @FilePath    : \vue3-vite-pc\src\route\index.js
 */
import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router'

export const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('../views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' }
  }
]

const router = createRouter({
  // history: createWebHashHistory(), // hash 模式
  history: createWebHistory(), // 历史模式
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面 title
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'vue3-vite-pc'
  }
  next()
})

export default router
