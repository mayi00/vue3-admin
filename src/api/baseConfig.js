export const getProxyConfig = () => {
  const env = import.meta.env.VITE_NODE_ENV

  // 代理路径配置
  const proxyConfig = {
    development: {
      jisuapi: '/proxy-jisuapi'
    },
    test: {
      jisuapi: 'https://api.jisuapi.com'
    },
    production: {
      jisuapi: 'https://api.jisuapi.com'
    }
  }

  return proxyConfig[env]
}
