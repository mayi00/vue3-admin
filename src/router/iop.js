import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/iop',
    component: Layout,
    meta: { title: 'IOP', icon: '' },
    children: [
      {
        path: 'sys',
        name: 'Sys',
        meta: { title: '系统管理', icon: 'icon-park-outline:system' },
        children: [
          {
            path: 'login',
            name: 'IopLogin',
            component: () => import('@/views/Iop/Sys/Login/index.vue'),
            meta: { title: '登录', icon: 'material-symbols:login' },
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/Iop/Sys/User/index.vue'),
            meta: { title: '用户管理', icon: 'mdi:user' },
          },
        ],
      },
    ],
  },
]
