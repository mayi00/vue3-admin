import Layout from '@/layout/Layout.vue'

export const constantRoutes = [
  {
    path: '/login',
    redirect: '/login0',
    meta: { title: '登录' }
  },
  {
    path: '/login0',
    name: 'Login0',
    alias: '/login',
    component: () => import('@/views/login/login0/index.vue'),
    meta: { title: '登录0' }
  },
  {
    path: '/login1',
    name: 'Login1',
    component: () => import('@/views/login/login1/index.vue'),
    meta: { title: '登录1' }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: { title: '首页' }
      }
    ]
  }
]
