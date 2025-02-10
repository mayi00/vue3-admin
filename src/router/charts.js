import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/charts',
    component: Layout,
    meta: { title: '图表', icon: '' },
    children: [
      {
        path: 'e-charts',
        name: 'ECharts',
        component: () => import('@/views/Charts/ECharts/ECharts.vue'),
        meta: { title: 'ECharts', icon: '' },
      },
    ],
  },
]
