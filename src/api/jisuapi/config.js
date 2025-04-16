export const getProxyConfig = () => {
  const env = import.meta.env.VITE_NODE_ENV || 'production'

  // 代理路径配置
  const proxyConfig = {
    development: {
      jisuapi: '/proxy-jisuapi',
    },
    test: {
      jisuapi: '/proxy-jisuapi',
    },
    production: {
      jisuapi: '/proxy-jisuapi',
    },
  }

  // 使用环境变量获取配置，默认使用 production 配置
  return proxyConfig[env] || proxyConfig.production
}
