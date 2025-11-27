import axiosInstance from '@/http/request'
import MockAdapter from 'axios-mock-adapter'
import { fakerZH_CN as faker } from '@faker-js/faker'
import { getRandomInt, getRandomString, generateUUID } from '@/utils/utils'

// 创建 mock 实例（参数为 axios 实例）
const mock = new MockAdapter(axiosInstance, {
  basePath: '/mock',
  delayResponse: getRandomInt(1, 1000 * 2)
})

export function startMock() {
  console.log('【Mock】模拟数据接口已启动')

  mock.onPost('/auth/login').reply(config => {
    console.log('【Mock】/auth/login', config)
    return [200, { code: 0, message: 'success', token: faker.string.alphanumeric(32) }]
  })

  mock.onPost('/user/list').reply(config => {
    console.log('【Mock】/user/list', config)

    // 生成动态用户列表
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10

    // 生成随机用户数据
    const list = Array.from({ length: pageSize }, (_, index) => ({
      id: faker.string.uuid(),
      account: faker.string.alphanumeric({ length: { min: 4, max: 10 } }),
      name: faker.person.fullName(),
      gender: faker.person.sex(),
      age: faker.number.int({ min: 18, max: 65 }),
      status: faker.string.fromCharacters([0, 1]),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'national' }),
      mobile: faker.helpers.fromRegExp(/[1][3-9][0-9]{9}/),
      avatar: faker.image.avatar(),
      address: faker.location.city()
    }))
    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage,
          pageSize,
          total: 100000,
          list
        }
      }
    ]
  })
}
