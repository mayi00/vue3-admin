export const component = {
  id: '2',
  menuType: 'MODULE',
  sort: 2,
  visible: 1,
  name: 'Component',
  path: '/component',
  component: '',
  meta: { title: '组件', icon: '' },
  children: [
    {
      id: '2-1',
      menuType: 'MENU',
      sort: 0,
      visible: 1,
      name: 'Curd',
      path: '/curd',
      component: 'component/curd/index',
      meta: { title: '增删改查', icon: '', keepAlive: true }
    }
  ]
}
