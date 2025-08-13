export const system = {
  id: '1',
  menuType: 'MODULE',
  sort: 1,
  visible: 1,
  name: 'System',
  path: '/system',
  component: '',
  meta: { title: '系统管理', icon: '' },
  children: [
    {
      id: '1-1',
      menuType: 'MENU',
      sort: 1,
      visible: 1,
      name: 'UserManage',
      path: '/userManage',
      component: 'system/userManage/index',
      meta: { title: '用户管理', icon: '', keepAlive: true }
    },
    {
      id: '1-2',
      menuType: 'MENU',
      sort: 2,
      visible: 1,
      name: 'RoleManage',
      path: '/roleManage',
      component: 'system/roleManage/index',
      meta: { title: '角色管理', icon: '', keepAlive: true }
    }
  ]
}
