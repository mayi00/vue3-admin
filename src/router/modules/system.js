import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统', icon: '' },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        meta: { title: '概览', icon: 'carbon:dashboard' },
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/System/Overview/Dashboard/index.vue'),
            meta: { title: '工作台', icon: 'carbon:dashboard' },
          },
        ],
      },
      {
        path: 'user-manage',
        name: 'UserManage',
        component: () => import('@/views/System/UserManage/index.vue'),
        meta: { title: '用户管理', icon: 'carbon:user' },
      },
      {
        path: 'role-manage',
        name: 'RoleManage',
        component: () => import('@/views/System/RoleManage/index.vue'),
        meta: { title: '角色管理', icon: 'carbon:user-role' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/System/About/index.vue'),
        meta: { title: '关于', icon: 'mdi:information-outline' },
      },
    ],
  },
]
