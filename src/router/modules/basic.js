import Layout from '@/layouts/index.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Basic/Login/Login0/index.vue'),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/login1',
    name: 'Login1',
    component: () => import('@/views/Basic/Login/Login1/index.vue'),
    meta: { title: '登录1', hidden: true },
  },
  {
    path: '/:all(.*)*',
    name: '404',
    component: () => import('@/views/Basic/Error/404.vue'),
    meta: { title: '404', hidden: true },
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', hidden: true, icon: '' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: { title: '首页', icon: 'mdi:home' },
      },
    ],
  },
]
