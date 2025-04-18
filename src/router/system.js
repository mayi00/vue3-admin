import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/system',
    component: Layout,
    meta: { title: 'System', icon: '' },
    children: [
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
    ],
  },
]
