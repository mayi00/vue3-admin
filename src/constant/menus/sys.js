export const sys = {
  id: '1',
  menuType: 'MODULE',
  sort: 1,
  visible: 1,
  name: 'Sys',
  path: '/sys',
  component: '',
  meta: { title: '系统管理', icon: '' },
  children: [
    {
      id: '1-1',
      menuType: 'MENU',
      sort: 1,
      visible: 1,
      name: 'UserManage',
      path: '/sys/userManage',
      component: 'sys/userManage/userManage',
      meta: { title: '用户管理', icon: '', keepAlive: true }
    },
    {
      id: '1-2',
      menuType: 'MENU',
      sort: 2,
      visible: 1,
      name: 'RoleManage',
      path: '/sys/roleManage',
      component: 'sys/roleManage/roleManage',
      meta: { title: '角色管理', icon: '', keepAlive: true }
    }
  ]
}
