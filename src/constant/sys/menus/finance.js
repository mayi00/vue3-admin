export const finance = {
  id: '6',
  menuType: 'MODULE',
  sort: 60,
  visible: 1,
  name: 'Finance',
  path: '/finance',
  component: '',
  meta: { title: '财务', icon: '' },
  children: [
    {
      id: '6-1',
      menuType: 'MENU',
      sort: 1,
      visible: 1,
      name: 'Gold',
      path: '/finance/gold',
      component: 'finance/gold/index',
      meta: { title: '黄金价格', icon: '', keepAlive: true }
    }
  ]
}
