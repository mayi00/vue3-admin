export const example = {
  id: '2',
  menuType: 'MODULE',
  sort: 2,
  visible: 1,
  name: 'Example',
  path: '/example',
  component: '',
  meta: { title: '示例', icon: '' },
  children: [
    {
      id: '2-1',
      menuType: 'CATALOG',
      sort: 0,
      visible: 1,
      name: 'Outside',
      path: '/example/outside',
      component: '',
      meta: { title: '外部页面', icon: '', keepAlive: true },
      children: [
        {
          id: '2-1-1',
          menuType: 'CATALOG',
          sort: 0,
          visible: 1,
          name: 'Iframe',
          path: '/example/outside/iframe',
          component: '',
          meta: { title: '内嵌', icon: '', keepAlive: true },
          children: [
            {
              id: '2-1-1-1',
              menuType: 'MENU',
              sort: 1,
              visible: 1,
              name: 'ElementPlus',
              path: '/example/outside/iframe/element-plus',
              component: 'example/outside/iframe/elementPlus/elementPlus',
              meta: { title: 'ElementPlus', icon: '', keepAlive: true }
            },
            {
              id: '2-1-1-2',
              menuType: 'IFRAME_LINK',
              sort: 2,
              visible: 1,
              name: 'Vite',
              path: '/example/outside/iframe/vite',
              component: '',
              meta: { title: 'Vite', icon: '', keepAlive: true, link: 'https://cn.vite.dev' }
            }
          ]
        },
        {
          id: '2-1-2',
          menuType: 'CATALOG',
          sort: 1,
          visible: 1,
          name: 'ExternalLink',
          path: '/example/outside/external-link',
          component: '',
          meta: { title: '外链', icon: '', keepAlive: true },
          children: [
            {
              id: '2-1-2-1',
              menuType: 'EXT_LINK',
              sort: 0,
              visible: 1,
              name: '',
              path: 'https://cn.vuejs.org',
              component: '',
              meta: { title: 'Vue.js', icon: '' }
            },
            {
              id: '2-1-2-2',
              menuType: 'EXT_LINK',
              sort: 1,
              visible: 1,
              name: '',
              path: 'https://vueuse.org',
              component: '',
              meta: { title: 'VueUse', icon: '' }
            }
          ]
        }
      ]
    },
    {
      id: '2-1',
      menuType: 'MENU',
      sort: 1,
      visible: 1,
      name: 'Curd',
      path: '/example/curd',
      component: 'example/curd/curd',
      meta: { title: '增删改查', icon: '', keepAlive: true }
    }
  ]
}
