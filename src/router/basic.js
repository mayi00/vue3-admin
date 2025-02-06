import Layout from '@/layout/Layout.vue'

export const basicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Basic/Login/index.vue'),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/:all(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Basic/Error/404.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', icon: '' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: { title: '首页', icon: '' },
      },
    ],
  },
]
