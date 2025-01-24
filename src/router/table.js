import Layout from '@/layout/Layout.vue'

export const routes = [
  {
    path: '/table',
    component: Layout,
    meta: { title: '表格', icon: '' },
    children: [
      {
        path: 'table-a',
        name: 'TableA',
        component: () => import('@/views/Table/TableA/TableA.vue'),
        meta: { title: 'tableA', icon: '' },
      },
      {
        path: 'table-b',
        name: 'TableB',
        component: () => import('@/views/Table/TableB/TableB.vue'),
        meta: { title: 'tableB', icon: '' },
      },
    ],
  },
]
