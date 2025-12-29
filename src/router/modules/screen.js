export const screenRoutes = [
  {
    path: '/screen/fdm',
    name: 'FdmScreen',
    component: () => import('@/views/screen/fdm/index.vue'),
    meta: { title: '立可得·智能看板' }
  },
  {
    path: '/screen/fit',
    name: 'FitScreen',
    component: () => import('@/views/screen/fit/index.vue'),
    meta: { title: '数据大屏' }
  }
]
