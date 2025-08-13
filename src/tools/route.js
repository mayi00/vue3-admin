import router from '../router'

const modules = import.meta.glob('../views/**/**.vue')
const Layout = () => import('@/layout/Layout.vue')
const IframeView = () => import('@/views/basic/iframeView/index.vue')

// 初始化动态路由
export function initDynamicRoutes() {
  const tempDynamicRoutes = JSON.parse(localStorage.getItem('allDynamicRoutes')) || []
  const allDynamicRoutes = parseDynamicRoutes(tempDynamicRoutes)
  if (allDynamicRoutes && allDynamicRoutes.length > 0) {
    allDynamicRoutes.forEach(route => {
      router.addRoute(route)
    })
  }
}

// 递归解析动态路由，将路由组件路径转换为实际的组件对象
export function parseDynamicRoutes(rawRoutes) {
  const parsedRoutes = []

  rawRoutes.forEach(route => {
    const normalizedRoute = { ...route }

    switch (normalizedRoute.menuType) {
      case 'MODULE':
        normalizedRoute.component = Layout
        break
      case 'CATALOG':
      case 'EXT_LINK':
        normalizedRoute.component = ''
        break
      case 'IFRAME_LINK':
        normalizedRoute.component = IframeView
        break
      case 'MENU':
        normalizedRoute.component = modules[`../views/${normalizedRoute.component}.vue`]
        break
      default:
        normalizedRoute.component = modules[`../views/${normalizedRoute.component}.vue`]
        break
    }

    // 处理组件路径
    // switch (normalizedRoute.component) {
    //   case 'Layout':
    //     normalizedRoute.component = Layout
    //     break
    //   case 'subLayout':
    //     normalizedRoute.component = ''
    //     break
    //   default:
    //     normalizedRoute.component = modules[`../views/${normalizedRoute.component}.vue`]
    //     break
    // }

    // 递归解析子路由
    if (normalizedRoute.children && normalizedRoute.children.length > 0) {
      normalizedRoute.children = parseDynamicRoutes(route.children)
    }

    parsedRoutes.push(normalizedRoute)
  })

  return parsedRoutes
}
