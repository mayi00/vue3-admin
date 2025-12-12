export const loginRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login0/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/login1',
    name: 'Login1',
    component: () => import('@/views/login/login1/index.vue'),
    meta: { title: '登录' }
  }
]
