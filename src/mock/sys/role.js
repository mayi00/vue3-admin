import { roleList } from '@/constant/sys/role'

export function setupRoleMock(mock, faker) {
  // 获取所有角色列表
  mock.onGet('/role/allList').reply(config => {
    return [200, { code: 0, message: 'success', data: roleList }]
  })
}
