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
        component: () => import('@/views/System/UserManage/UserManage.vue'),
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'role-manage',
        name: 'RoleManage',
        component: () => import('@/views/System/RoleManage/RoleManage.vue'),
        meta: { title: '角色管理', icon: 'UserFilled' },
      },
    ],
  },
]
