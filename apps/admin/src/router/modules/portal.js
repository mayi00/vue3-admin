export const portalRoutes = [
  {
    path: '/portal/login',
    name: 'PortalLogin',
    component: () => import('@/views/portal/login/index.vue'),
    meta: { title: '登录' }
  }
]
