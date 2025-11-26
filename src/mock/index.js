import axiosInstance from '@/utils/request'
import MockAdapter from 'axios-mock-adapter'
import { getRandomInt } from '@/utils/utils'
import { generateToken } from '@/tools/auth.js'

// 创建 mock 实例（参数为 axios 实例）
const mock = new MockAdapter(axiosInstance, {
  basePath: '/mock',
  delayResponse: getRandomInt(1, 1000 * 2)
})

export function startMock() {
  console.log('【Mock】模拟数据接口已启动')

  mock.onPost('/auth/login').reply(config => {
    console.log('【Mock】/auth/login', config)
    return [200, { token: generateToken(config.data.account) }]
  })

  mock.onPost('/user/list').reply(config => {
    console.log('【Mock】/user/list', config)
    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage: 1,
          pageSize: 10,
          total: 2,
          list: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ]
        }
      }
    ]
  })
}
