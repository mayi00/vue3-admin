import Layout from '@/layout/Layout.vue'

export const demoRoutes = [
  {
    path: '/demo',
    component: Layout,
    meta: { title: 'DEMO', icon: '' },
    children: [
      {
        path: 'national-flag',
        name: 'NationalFlag',
        component: () => import('@/views/Demo/NationalFlag/index.vue'),
        meta: { title: '国旗', icon: 'carbon:user' },
      },
    ],
  },
]
