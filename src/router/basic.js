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
]
