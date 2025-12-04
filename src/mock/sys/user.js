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

    // 生成随机用户数据
    const list = Array.from({ length: currentPageSize }, (_, index) => ({
      id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      account: faker.string.alphanumeric({ length: { min: 4, max: 10 } }),
      name: faker.person.fullName(),
      nickname: faker.person.fullName(),
      gender: faker.person.sex(),
      status: faker.string.fromCharacters([0, 1]),
      mobile: faker.helpers.fromRegExp(/[1][3-9][0-9]{9}/),
      phone: faker.phone.number({ style: 'national' }),
      email: faker.internet.email(),
      address: faker.location.city(),
      age: faker.number.int({ min: 18, max: 65 })
    }))
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
  mock.onGet('/user/delete').reply(config => {
    console.log('【Mock】/user/delete', config)
    return [200, { code: 0, message: 'success' }]
  })
}
