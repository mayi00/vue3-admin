export const getProxyConfig = () => {
  const env = import.meta.env.VITE_NODE_ENV
  const BSEE_URL = import.meta.env.VITE_MOCK === 'true' ? '/mock' : ''

  /**
   * 代理路径配置
   */
  const proxyConfig = {
    development: {
      jisuapi: '/proxy-jisuapi',
      // screen: 'https://m1.apifoxmock.com/m1/7834477-7582702-default/screen-api',
      screen: '/proxy-apifox/screen-api',
      // screen: `${BSEE_URL}/proxy-apifox/screen-api`,
      sys: `${BSEE_URL}/proxy-apifox/sys-api`
    },
    test: {
      jisuapi: 'https://api.jisuapi.com',
      screen: '/proxy-apifox/screen-api',
      sys: `${BSEE_URL}/proxy-apifox/sys-api`
    },
    production: {
      jisuapi: 'https://api.jisuapi.com',
      screen: '/proxy-apifox/screen-api',
      sys: `${BSEE_URL}/proxy-apifox/sys-api`
    }
  }

  return proxyConfig[env]
}
