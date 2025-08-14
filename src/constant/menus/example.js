export const example = {
  id: '2',
  menuType: 'MODULE',
  sort: 2,
  visible: 1,
  name: 'Example',
  path: '/example',
  component: '',
  meta: { title: '示例', icon: '' },
  children: [
    {
      id: '2-1',
      menuType: 'MENU',
      sort: 0,
      visible: 1,
      name: 'Curd',
      path: '/example/curd',
      component: 'example/curd/index',
      meta: { title: '增删改查', icon: '', keepAlive: true }
    },
    {
      id: '2-2',
      menuType: 'MENU',
      sort: 3,
      visible: 1,
      name: 'ElementPlus',
      path: '/example/elementPlus',
      component: 'example/elementPlus/index',
      meta: { title: 'ElementPlus', icon: '', keepAlive: true }
    }
  ]
}
