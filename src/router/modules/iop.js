import Layout from '@/layout/Layout.vue'

export const iopRoutes = [
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
      {
        path: 'oprdiff',
        name: 'Oprdiff',
        meta: { title: '运营差异化管理', icon: 'codicon:diff' },
        children: [
          {
            path: 'agentWhite',
            name: 'AgentWhite',
            component: () => import('@/views/Iop/Oprdiff/AgentWhite/index.vue'),
            meta: { title: '代理人白名单', icon: 'gg:list' },
          },
        ],
      },
    ],
  },
]
