import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * hidden: true|false    true-侧边栏不展示该菜单，默认为 false，优先级高于 alwaysShow
 * alwaysShow: true      true-总是展示根目录及子菜单
 *                       此属性只针对一个菜单下只有一个子页面的情况
 *                       如果不设置 alwaysShow，若一个菜单只有一个子页面，侧边栏只渲染根菜单
 */

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/student-class-hours',
    name: 'StudentClassHours',
    component: () => import('@/views/studentClassHours/studentClassHours.vue'),
    meta: { title: '学生课时' },
    hidden: true
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/const/error/404.vue'),
    meta: { title: '404' },
    hidden: true
  },
  {
    path: '/error',
    name: 'Error',
    redirect: '/error/404',
    component: Layout,
    meta: { title: 'Error' },
    hidden: true,
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/const/error/404.vue'),
        meta: { title: '404', icon: 'form' }
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', show: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: '' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    meta: { title: 'example' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'Example',
        component: () => import('@/views/example/index.vue'),
        meta: { title: 'example', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    name: 'Nested',
    component: Layout,
    meta: { title: '二级导航' },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/nested/menu1/index.vue'),
        meta: { title: '导航1', icon: 'form' }
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        meta: { title: '导航2', icon: 'form' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: '表格' },
    children: [
      {
        path: 'tableA',
        name: 'TableA',
        component: () => import('@/views/table/tableA/index.vue'),
        meta: { title: 'tableA', icon: '' }
      },
      {
        path: 'tableB',
        name: 'TableB',
        component: () => import('@/views/table/tableB/index.vue'),
        meta: { title: 'tableB', icon: '' }
      }
    ]
  },
  {
    path: '/externalLink',
    name: 'ExternalLink',
    meta: { title: '外链' },
    children: [
      {
        name: 'Gitee',
        path: 'https://gitee.com/huazf/vue3-admin',
        meta: { title: 'Gitee 仓库', icon: 'form' }
      },
      {
        name: 'Preview',
        path: 'https://huazf.gitee.io/vue3-admin',
        meta: { title: '在线预览', icon: 'form' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面 title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3-admin`
  } else {
    document.title = 'Vue3-admin'
  }
  next()
})

export default router
