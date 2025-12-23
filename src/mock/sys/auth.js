import { userMap } from '@/constant/user/user'

export function setupAuthMock(mock, faker) {
  // 登录
  mock.onPost('/auth/login').reply(config => {
    console.log('【Mock】/auth/login', config)
    return [200, { code: 0, message: 'success', data: faker.string.alphanumeric(32) }]
  })
  // 登出
  mock.onPost('/auth/logout').reply(config => {
    console.log('【Mock】/auth/logout', config)
    return [200, { code: 0, message: 'success' }]
  })
  // 获取用户信息
  mock.onGet('/auth/getUserInfo').reply(config => {
    console.log('【Mock】/auth/getUserInfo', config)
    const account = config.params?.account
    let userData = {}
    if (account === 'admin') {
      userData = { ...userMap.admin }
    } else {
      userData = { ...userMap.testUser, avatar: faker.image.avatar() }
    }
    return [200, { code: 0, message: 'success', data: userData }]
  })
}
