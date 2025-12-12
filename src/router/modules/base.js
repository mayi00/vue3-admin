import Layout from '@/layout/Layout.vue'

export const baseRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '首页' }
      }
    ]
  }
  // 404页面必须放在最后
  // {
  //   path: '/404',
  //   name: 'NotFound',
  //   component: () => import('@/views/error/404.vue'),
  //   meta: { title: '不存在' }
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   meta: {  }
  // }
]
