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
      {
        path: 'relation-graph',
        name: 'RelationGraph',
        component: () => import('@/views/Charts/RelationGraph/RelationGraph.vue'),
        meta: { title: 'RelationGraph', icon: '' },
      },
    ],
  },
]
