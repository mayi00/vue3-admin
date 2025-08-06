export const component = {
  id: '2',
  type: 0,
  sort: 2,
  visible: 1,
  name: 'Component',
  path: '/component',
  component: 'Layout',
  meta: { title: '组件', icon: '' },
  children: [
    {
      id: '2-1',
      type: 1,
      sort: 0,
      visible: 1,
      name: 'Curd',
      path: '/curd',
      component: 'component/curd/index',
      meta: { title: '增删改查', icon: '', keepAlive: true }
    }
  ]
}
