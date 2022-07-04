/*
 * @Description : 路由
 * @Author      : huazf
 * @Date        : 2022-06-25
 * @LastEditors : huazf
 * @LastEditTime: 2022-07-04
 * @FilePath    : \vue3-vite-pc\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes = [
  {
    path: '/',
    redirect: 'home',
    component: Layout,
    meta: { title: '首页' },
    // TODO 路由隐藏问题需要解决
    isHidden: true,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: '' }
      },
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: '表格' },
    children: [
      {
        path: '/table/tableA',
        name: 'TableA',
        component: () => import('@/views/table/tableA/index.vue'),
        meta: { title: 'tableA', icon: '' }
      },
      {
        path: '/table/tableB',
        name: 'TableB',
        component: () => import('@/views/table/tableB/index.vue'),
        meta: { title: 'tableB', icon: '' }
      },
    ]
  },
  {
    path: '/example',
    component: Layout,
    meta: { title: 'example' },
    children: [
      {
        path: '/example/index',
        name: 'Example',
        component: () => import('@/views/example/index.vue'),
        meta: { title: 'example', icon: 'form' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(), // createWebHashHistory hash 模式 createWebHistory 历史模式
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
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
