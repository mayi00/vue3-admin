import axiosInstance from '@/http/request'
import MockAdapter from 'axios-mock-adapter'
import { fakerZH_CN as faker } from '@faker-js/faker'
import { setupAuthMock } from './auth'
import { setupMenuMock } from './menu'
import { setupUserMock } from './user'
import { getRandomInt } from '@/utils/utils'

// 创建 mock 实例（参数为 axios 实例）
const mock = new MockAdapter(axiosInstance, {
  basePath: '/mock',
  delayResponse: getRandomInt(1, 1000)
})

export function startMock() {
  console.log('【Mock】模拟数据接口已启动')

  setupAuthMock(mock, faker)
  setupMenuMock(mock, faker)
  setupUserMock(mock, faker)
}
