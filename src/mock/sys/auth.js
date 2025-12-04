import { userInfo } from '@/constant/user/user'

export function setupAuthMock(mock, faker) {
  mock.onPost('/auth/login').reply(config => {
    console.log('【Mock】/auth/login', config)
    return [200, { code: 0, message: 'success', data: faker.string.alphanumeric(32) }]
  })
  mock.onPost('/auth/logout').reply(config => {
    console.log('【Mock】/auth/logout', config)
    return [200, { code: 0, message: 'success' }]
  })
  mock.onGet('/auth/getUserInfo').reply(config => {
    console.log('【Mock】/auth/getUserInfo', config)
    return [200, { code: 0, message: 'success', data: { ...userInfo, avatar: faker.image.avatar() } }]
  })
}
