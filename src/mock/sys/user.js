export function setupUserMock(mock, faker) {
  mock.onPost('/user/list').reply(config => {
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

    const roles = ['超级管理员', '系统管理员', '普通用户', '审计员', '财务专员', '人事专员', '技术支持']

    // 生成随机用户数据
    const list = Array.from({ length: currentPageSize }, (_, index) => {
      // 为每个用户随机生成1-3个角色
      const userRoles = []
      const roleCount = faker.number.int({ min: 0, max: roles.length - 1 })
      const availableRoles = [...roles]

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
        roleName: userRoles,
        // gender: faker.person.sex(),
        gender: faker.string.fromCharacters(['M', 'F']),
        status: faker.string.fromCharacters([0, 1]),
        mobile: faker.helpers.fromRegExp(/[1][3-9][0-9]{9}/),
        phone: faker.phone.number({ style: 'national' }),
        email: faker.internet.email(),
        address: faker.location.city(),
        age: faker.number.int({ min: 18, max: 65 })
      }
    })
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
  mock.onPost('/user/add').reply(config => {
    console.log('【Mock】/user/add', config)
    return [200, { code: 0, message: 'success' }]
  })
  mock.onPost('/user/edit').reply(config => {
    console.log('【Mock】/user/edit', config)
    return [200, { code: 0, message: 'success' }]
  })
  mock.onPost('/user/delete').reply(config => {
    console.log('【Mock】/user/delete', config)
    return [200, { code: 0, message: 'success' }]
  })
}
