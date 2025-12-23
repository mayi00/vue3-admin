export const screenRoutes = [
  {
    path: '/screen/fit',
    name: 'FitScreen',
    component: () => import('@/views/screen/fit/index.vue'),
    meta: { title: '数据大屏' }
  }
]
