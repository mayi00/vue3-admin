export const basicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
    hidden: true,
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: { title: 'Redirect', hidden: true },
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/const/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/student-class-hours',
    name: 'StudentClassHours',
    component: () => import('@/views/studentClassHours/studentClassHours.vue'),
    meta: { title: '学生课时' },
    hidden: true,
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
        meta: { title: '404', icon: 'form' },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/const/error/404.vue'),
    meta: { title: '404' },
    hidden: true,
  },
]
