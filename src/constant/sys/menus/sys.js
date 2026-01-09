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
      sort: 10,
      visible: 1,
      name: 'UserManage',
      path: '/sys/userManage',
      component: 'sys/userManage/userManage',
      meta: { title: '用户管理', icon: '', keepAlive: true }
    },
    {
      id: '1-2',
      menuType: 'MENU',
      sort: 20,
      visible: 1,
      name: 'RoleManage',
      path: '/sys/roleManage',
      component: 'sys/roleManage/roleManage',
      meta: { title: '角色管理', icon: '', keepAlive: true }
    },
    {
      id: '1-3',
      menuType: 'MENU',
      sort: 30,
      visible: 1,
      name: 'MenuManage',
      path: '/sys/menuManage',
      component: 'sys/menuManage/menuManage',
      meta: { title: '菜单管理', icon: '', keepAlive: true }
    },
    {
      id: '1-4',
      menuType: 'MENU',
      sort: 40,
      visible: 1,
      name: 'OrganizationManage',
      path: '/sys/organizationManage',
      component: 'sys/organizationManage/organizationManage',
      meta: { title: '机构管理', icon: '', keepAlive: true }
    },
    {
      id: '1-5',
      menuType: 'CATALOG',
      sort: 50,
      visible: 1,
      name: 'DictManage',
      path: '/sys/dictManage',
      component: '',
      meta: { title: '字典管理', icon: '', keepAlive: true },
      children: [
        {
          id: '1-5-1',
          menuType: 'MENU',
          sort: 1,
          visible: 1,
          name: 'DictType',
          path: '/sys/dictManage/dictType',
          component: 'sys/dictManage/dictType/dictType',
          meta: { title: '字典类型', icon: '', keepAlive: true }
        },
        {
          id: '1-5-2',
          menuType: 'MENU',
          sort: 2,
          visible: 1,
          name: 'DictData',
          path: '/sys/dictManage/dictData',
          component: 'sys/dictManage/dictData/dictData',
          meta: { title: '字典数据', icon: '', keepAlive: true }
        }
      ]
    },

    {
      id: '1-6',
      menuType: 'MENU',
      sort: 60,
      visible: 1,
      name: 'NoticeManage',
      path: '/sys/noticeManage',
      component: 'sys/noticeManage/index',
      meta: { title: '通知公告', icon: '', keepAlive: true }
    }
  ]
}
