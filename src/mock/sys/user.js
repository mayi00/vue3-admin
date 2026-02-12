import { roleList } from '@/constant/sys/role'
import { getProxyConfig } from '@/api/baseConfig.js'

const { sys } = getProxyConfig()

export function setupUserMock(mock, faker) {
  // 获取用户列表
  mock.onPost(`${sys}/user/list`).reply(config => {
    console.log('【Mock】/user/list', config)

    // 生成动态用户列表
    const currentPage = parseInt(config.params?.currentPage) || 1
    const pageSize = parseInt(config.params?.pageSize) || 10
    const total = 101

    // 计算总页数
    const totalPages = Math.ceil(total / pageSize)
    // 计算当前页实际应该生成的数据条数
    let currentPageSize = pageSize
    if (currentPage === totalPages) {
      // 如果是最后一页，计算剩余数据条数
      currentPageSize = total - (currentPage - 1) * pageSize
    }

    // 生成随机用户数据
    const list = Array.from({ length: currentPageSize }, (_, index) => {
      // 为每个用户随机生成 n 个角色
      const userRoles = []
      const roleCount = faker.number.int({ min: 0, max: roleList.length - 1 })
      const availableRoles = [...roleList]

      for (let i = 0; i < roleCount && availableRoles.length > 0; i++) {
        const randomIndex = faker.number.int({ min: 0, max: availableRoles.length - 1 })
        userRoles.push(availableRoles.splice(randomIndex, 1)[0])
      }

      return {
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        account: faker.string.alphanumeric({ length: { min: 4, max: 10 } }),
        name: faker.person.fullName(),
        nickname: faker.person.fullName(),
        roleCode: userRoles.map(item => item.roleCode),
        roleName: userRoles.map(item => item.roleName),
        gender: faker.string.fromCharacters(['M', 'F']),
        status: faker.helpers.weightedArrayElement([
          { weight: 9, value: 'ENABLED' },
          { weight: 2, value: 'DISABLED' }
        ]),
        mobile: faker.helpers.fromRegExp(/[1][3-9][0-9]{9}/),
        phone: faker.phone.number({ style: 'national' }),
        email: faker.internet.email(),
        address: faker.location.city(),
        age: faker.number.int({ min: 18, max: 65 })
      }
    })
    console.log('【Mock】/user/list', list)
    return [
      200,
      {
        code: 0,
        message: 'success',
        data: {
          currentPage,
          pageSize,
          totalPages,
          total,
          list
        }
      }
    ]
  })
  // 新增用户
  mock.onPost(`${sys}/user/add`).reply(config => {
    console.log('【Mock】/user/add', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 编辑用户
  mock.onPost(`${sys}/user/edit`).reply(config => {
    console.log('【Mock】/user/edit', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 删除用户
  mock.onPost(`${sys}/user/delete`).reply(config => {
    console.log('【Mock】/user/delete', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 批量导入用户
  mock.onPost(`${sys}/user/batchImport`).reply(config => {
    console.log('【Mock】/user/batchImport', config)
    return [200, { code: 0, message: 'success' }]
  })

  // 获取用户角色
  mock.onGet(new RegExp(`${sys}/user/getUserRoles/.*`)).reply(config => {
    console.log('【Mock】/user/getUserRoles', config)
    const userRoles = roleList.filter(() => faker.datatype.boolean())
    return [200, { code: 0, message: 'success', data: userRoles }]
  })

  // 保存用户角色
  mock.onPost(`${sys}/user/saveRoles`).reply(config => {
    console.log('【Mock】/user/saveRoles', config)
    return [200, { code: 0, message: 'success' }]
  })
}
