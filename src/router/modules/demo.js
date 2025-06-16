import Layout from '@/layout/Layout.vue'

export const demoRoutes = [
  {
    path: '/demo',
    component: Layout,
    meta: { title: 'DEMO', icon: '' },
    children: [
      {
        path: 'black-button',
        name: 'BlackButton',
        component: () => import('@/views/Demo/BlackButton/index.vue'),
        meta: { title: 'BlackButton', icon: 'carbon:user' },
      },
      {
        path: 'national-flag',
        name: 'NationalFlag',
        component: () => import('@/views/Demo/NationalFlag/index.vue'),
        meta: { title: '国旗', icon: 'carbon:user' },
      },
    ],
  },
]
