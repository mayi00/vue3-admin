export const getProxyConfig = () => {
  const env = import.meta.env.VITE_NODE_ENV

  /**
   * 代理路径配置
   * 
   */
  const proxyConfig = {
    development: {
      jisuapi: '/proxy-jisuapi',
      screen: '/proxy-apifox/screen-api',
      sys: '/proxy-apifox/sys-api'
    },
    test: {
      jisuapi: 'https://api.jisuapi.com',
      screen: '/proxy-apifox/screen-api',
      sys: '/proxy-apifox/sys-api'
    },
    production: {
      jisuapi: 'https://api.jisuapi.com',
      screen: '/proxy-apifox/screen-api',
      sys: '/proxy-apifox/sys-api'
    }
  }

  return proxyConfig[env]
}
