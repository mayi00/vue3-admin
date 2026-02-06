export const example = {
  id: '2',
  menuType: 'MODULE',
  sort: 20,
  visible: 1,
  name: 'Example',
  path: '/example',
  component: '',
  meta: { title: '示例', icon: '' },
  children: [
    {
      id: '2-0',
      menuType: 'MENU',
      sort: 0,
      visible: 1,
      name: 'Demo',
      path: '/example/demo',
      component: 'example/demo/index',
      meta: { title: 'Demo', icon: '', keepAlive: true }
    },
    {
      id: '2-1',
      menuType: 'CATALOG',
      sort: 1,
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
            },
            {
              id: '2-1-1-3',
              menuType: 'IFRAME_LINK',
              sort: 3,
              visible: 1,
              name: 'Juejin',
              path: '/example/outside/iframe/juejin',
              component: '',
              meta: { title: '掘金', icon: '', link: 'https://juejin.cn/' }
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
            },
            {
              id: '2-1-2-3',
              menuType: 'EXT_LINK',
              sort: 2,
              visible: 1,
              name: '',
              path: 'https://gitee.com',
              component: '',
              meta: { title: 'Gitee', icon: '' }
            },
            {
              id: '2-1-2-4',
              menuType: 'EXT_LINK',
              sort: 3,
              visible: 1,
              name: '',
              path: 'https://github.com',
              component: '',
              meta: { title: 'GitHub', icon: '' }
            }
          ]
        }
      ]
    },
    {
      id: '2-2',
      menuType: 'MENU',
      sort: 2,
      visible: 1,
      name: 'Gold',
      path: '/example/gold',
      component: 'example/gold/index',
      meta: { title: '黄金价格', icon: '', keepAlive: true }
    }
  ]
}
