import axiosInstance from '@/http/request'
import MockAdapter from 'axios-mock-adapter'
import { fakerZH_CN as faker } from '@faker-js/faker'
import { getRandomInt } from '@/utils/utils'
import { setupAuthMock } from './sys/auth'
import { setupDictMock } from './sys/dict'
import { setupMenuMock } from './sys/menu'
import { setupRoleMock } from './sys/role'
import { setupUserMock } from './sys/user'

// 创建 mock 实例（参数为 axios 实例）
const mock = new MockAdapter(axiosInstance, {
  basePath: '/mock',
  delayResponse: getRandomInt(1, 1000)
})

export function startMock() {
  console.log('【Mock】模拟数据接口已启动')

  setupAuthMock(mock, faker)
  setupDictMock(mock, faker)
  setupMenuMock(mock, faker)
  setupRoleMock(mock, faker)
  setupUserMock(mock, faker)
}
