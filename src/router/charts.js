import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/charts',
    component: Layout,
    meta: { title: '图表', icon: 'TrendCharts' },
    children: [
      {
        path: 'e-charts',
        name: 'ECharts',
        component: () => import('@/views/Charts/ECharts/ECharts.vue'),
        meta: { title: 'ECharts', icon: 'TrendCharts' },
      },
      {
        path: 'relation-graph',
        name: 'RelationGraph',
        component: () => import('@/views/Charts/RelationGraph/RelationGraph.vue'),
        meta: { title: 'RelationGraph', icon: '' },
      },
      {
        path: 'ant-v',
        name: 'AntV',
        meta: { title: 'AntV', icon: '' },
        children: [
          {
            path: 'g6',
            name: 'G6',
            component: () => import('@/views/Charts/AntV/G6/G6.vue'),
            meta: { title: 'G6', icon: 'PieChart' },
          },
        ],
      },
    ],
  },
]
