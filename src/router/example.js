import Layout from '@/layout/Layout.vue'

export const exampleRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Example/Home/Home.vue'),
        meta: { title: '首页', icon: '' },
      },
    ],
  },
  {
    path: '/example',
    redirect: '/example/index',
    component: Layout,
    meta: { title: '示例' },
    children: [
      {
        path: 'index',
        name: 'Example',
        component: () => import('@/views/Example/index.vue'),
        meta: { title: 'Example', icon: 'form' },
      },
      {
        path: 'student-class-hours',
        name: 'StudentClassHours',
        component: () => import('@/views/Example/StudentClassHours/StudentClassHours.vue'),
        meta: { title: '学生课时' },
      },
    ],
  },
]
