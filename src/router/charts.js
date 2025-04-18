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
        meta: { title: 'ECharts', icon: 'simple-icons:apacheecharts' },
        children: [
          {
            path: 'population-chart',
            name: 'PopulationChart',
            component: () => import('@/views/Charts/ECharts/PopulationChart/index.vue'),
            meta: { title: '我国人口统计', icon: 'mdi:chart-line' },
          },
        ],
      },
      {
        path: 'relation-graph',
        name: 'RelationGraph',
        component: () => import('@/views/Charts/RelationGraph/index.vue'),
        meta: { title: 'RelationGraph', icon: '' },
      },
      {
        path: 'ant-v',
        name: 'AntV',
        meta: { title: 'AntV', icon: 'simple-icons:antv' },
        children: [
          {
            path: 'g6',
            name: 'G6',
            component: () => import('@/views/Charts/AntV/G6/index.vue'),
            meta: { title: 'G6', icon: '' },
          },
        ],
      },
    ],
  },
]
