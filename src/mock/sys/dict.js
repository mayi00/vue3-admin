import { DICT_TYPE } from '@/constant/sys/dict'

export function setupDictMock(mock, faker) {
  mock.onGet('/dict/list').reply(config => {
    console.log('【Mock】/dict/list', config)
    return [200, { code: 0, message: 'success', data: DICT_TYPE }]
  })
}
