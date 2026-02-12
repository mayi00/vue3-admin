import axiosInstance from '@/http/request'
import MockAdapter from 'axios-mock-adapter'
import { fakerZH_CN as faker } from '@faker-js/faker'
import { getRandomInt } from '@/utils/utils'
import { setupSysMock } from './sys/index.js'

// 创建 mock 实例（参数为 axios 实例）
const mock = new MockAdapter(axiosInstance, {
  basePath: '/mock',
  delayResponse: getRandomInt(1, 1000)
})

export function startMock() {
  console.log('【Mock】模拟数据接口已启动')

  setupSysMock(mock, faker)
}
