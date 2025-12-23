export const userMap = {
  admin: {
    id: '1234567890',
    avatar: 'https://avatars.githubusercontent.com/u/15024754',
    account: 'admin',
    name: '超级管理员',
    nickname: '超管',
    gender: 'M',
    status: '1',
    mobile: '13012345678',
    phone: '13012345678',
    email: 'superAdmin@foxmail.com',
    address: '北京市',
    age: 18,
    nation: '汉族',
    roleCodes: ['admin', 'supperAdmin', 'sysAdmin'],
    buttonCodes: [
      'sys:user:add',
      'sys:user:edit',
      'sys:user:delete',
      'sys:user:batchDelete',
      'sys:user:download',
      'sys:user:downloadAll',
      'sys:user:batchImport',
      'sys:user:downloadTemplate',
      'sys:user:role'
    ]
  },
  testUser: {
    id: '1234567891',
    avatar: '',
    account: 'testUser',
    name: '测试用户',
    nickname: '测',
    gender: 'M',
    status: '1',
    mobile: '13012345679',
    phone: '13012345679',
    email: 'testUser@foxmail.com',
    address: '北京市',
    age: 18,
    nation: '汉族',
    roleCodes: ['testUserAdmin'],
    buttonCodes: ['sys:user:downloadTemplate', 'sys:user:role']
  }
}
