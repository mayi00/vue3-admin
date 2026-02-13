import { getProxyConfig } from '@/api/baseConfig.js'

const { screen } = getProxyConfig()

export function setupFdmMock(mock, faker) {
  // 获取概览数据
  mock.onGet(`${screen}/fdm/getGroupInfo`).reply(config => {
    console.log('【Mock】/fdm/getGroupInfo', config)
    const data = {
      deviceTotal: 2190,
      seasonNew: 190,
      operatingDevice: 3001,
      exceptionDevice: 108
    }
    return [200, { code: 0, message: 'success', data }]
  })
}
