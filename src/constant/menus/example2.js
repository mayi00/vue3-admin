export const example2 = {
  id: '3',
  menuType: 'MODULE',
  sort: 3,
  visible: 1,
  name: 'Example2',
  path: '/example2',
  component: 'Layout',
  meta: { title: '示例2', icon: '' },
  children: [
    {
      id: '3-1',
      menuType: 'CATALOG',
      sort: 2,
      visible: 1,
      name: 'WhiteManage',
      path: '/whiteManage',
      component: '',
      meta: { title: 'WhiteManage', icon: '', keepAlive: true },
      children: [
        {
          id: '3-1-1',
          menuType: 'CATALOG',
          sort: 2,
          visible: 1,
          name: 'WhiteList1',
          path: '/whiteList1',
          component: '',
          meta: { title: 'WhiteList', icon: '', keepAlive: true },
          children: [
            {
              id: '3-1-1-1',
              menuType: 'MENU',
              sort: 1,
              visible: 1,
              name: 'WhiteList',
              path: '/whiteList',
              component: 'example2/whiteManage/whiteList/index',
              meta: { title: 'WhiteList', icon: '', keepAlive: true },
              children: []
            }
          ]
        },
        {
          id: '3-1-2',
          menuType: 'MENU',
          sort: 1,
          visible: 1,
          name: 'WhiteList2',
          path: '/whiteList2',
          component: 'example2/whiteManage/whiteList2/index',
          meta: { title: 'WhiteList2', icon: '', keepAlive: true }
        },
        {
          id: '3-1-3',
          menuType: 'MENU',
          sort: 3,
          visible: 1,
          name: 'WhiteList3',
          path: '/whiteList3',
          component: 'example2/whiteManage/whiteList3/index',
          meta: { title: 'WhiteList3', icon: '', keepAlive: true }
        },
        {
          id: '3-1-4',
          menuType: 'MENU',
          sort: 1,
          visible: 4,
          name: 'WhiteList4',
          path: '/whiteList4',
          component: 'example2/whiteManage/whiteList4/index',
          meta: { title: 'WhiteList4', icon: '', keepAlive: true }
        },
        {
          id: '3-1-5',
          menuType: 'MENU',
          sort: 5,
          visible: 1,
          name: 'WhiteList5',
          path: '/whiteList5',
          component: 'example2/whiteManage/whiteList5/index',
          meta: { title: 'WhiteList5', icon: '', keepAlive: true }
        },
        {
          id: '3-1-6',
          menuType: 'MENU',
          sort: 6,
          visible: 1,
          name: 'WhiteList6',
          path: '/whiteList6',
          component: 'example2/whiteManage/whiteList6/index',
          meta: { title: 'WhiteList6', icon: '', keepAlive: true }
        },
        {
          id: '3-1-7',
          menuType: 'MENU',
          sort: 7,
          visible: 1,
          name: 'WhiteList7',
          path: '/whiteList7',
          component: 'example2/whiteManage/whiteList7/index',
          meta: { title: 'WhiteList7', icon: '', keepAlive: true }
        },
        {
          id: '3-1-8',
          menuType: 'MENU',
          sort: 8,
          visible: 1,
          name: 'WhiteList8',
          path: '/whiteList8',
          component: 'example2/whiteManage/whiteList8/index',
          meta: { title: 'WhiteList8', icon: '', keepAlive: true }
        },
        {
          id: '3-1-9',
          menuType: 'MENU',
          sort: 9,
          visible: 1,
          name: 'WhiteList9',
          path: '/whiteList9',
          component: 'example2/whiteManage/whiteList9/index',
          meta: { title: 'WhiteList9', icon: '', keepAlive: true }
        },
        {
          id: '3-1-10',
          menuType: 'MENU',
          sort: 1,
          visible: 1,
          name: 'WhiteList10',
          path: '/whiteList10',
          component: 'example2/whiteManage/whiteList10/index',
          meta: { title: 'WhiteList10', icon: '', keepAlive: true }
        }
      ]
    },
    {
      id: '3-2',
      menuType: 'MENU',
      sort: 0,
      visible: 1,
      name: 'Demo',
      path: '/demo',
      component: 'example2/demo/index',
      meta: { title: 'Demo', icon: '', keepAlive: true }
    },
    {
      id: '3-3',
      menuType: 'EXT_LINK',
      sort: 2,
      visible: 1,
      name: 'Baidu',
      path: 'https://www.baidu.com',
      component: '',
      meta: { title: 'Baidu', icon: '' }
    },
    {
      id: '3-4',
      menuType: 'IFRAME_LINK',
      sort: 3,
      visible: 1,
      name: 'Juejin',
      path: '/juejin',
      component: '',
      meta: { title: '掘金', icon: '', keepAlive: true, link: 'https://juejin.cn/' }
    },
    {
      id: '3-5',
      menuType: 'IFRAME_LINK',
      sort: 5,
      visible: 1,
      name: 'CSDN',
      path: '/csdn',
      component: '',
      meta: { title: 'CSDN', icon: '', keepAlive: true, link: 'https://www.csdn.net/' }
    }
  ]
}
