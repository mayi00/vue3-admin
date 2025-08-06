export const system = {
  id: '1',
  type: 0,
  sort: 1,
  visible: 1,
  name: 'System',
  path: '/system',
  component: 'Layout',
  meta: { title: '系统管理', icon: '' },
  children: [
    {
      id: '1-1',
      type: 1,
      sort: 1,
      visible: 1,
      name: 'UserManage',
      path: '/userManage',
      component: 'system/userManage/index',
      meta: { title: '用户管理', icon: '', keepAlive: true }
    },
    {
      id: '1-2',
      type: 1,
      sort: 2,
      visible: 1,
      name: 'RoleManage',
      path: '/roleManage',
      component: 'system/roleManage/index',
      meta: { title: '角色管理', icon: '', keepAlive: true }
    }
  ]
}
