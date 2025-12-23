export const DICT_TYPE = [
  {
    label: '系统通用',
    value: 'SYSTEM_COMMON',
    children: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    label: '性别',
    value: 'GENDER',
    children: [
      { label: '男', value: 'M' },
      { label: '女', value: 'F' }
    ]
  },
  {
    label: '用户状态',
    value: 'USER_STATUS',
    children: [
      { label: '正常', value: '1' },
      { label: '禁用', value: '0' }
    ]
  },
  {
    label: '角色状态',
    value: 'ROLE_STATUS',
    children: [
      { label: '正常', value: '1' },
      { label: '禁用', value: '0' }
    ]
  },
  {
    label: '菜单类型',
    value: 'MENU_TYPE',
    children: [
      { label: '模块', value: 'MODULE' },
      { label: '目录', value: 'CATALOG' },
      { label: '菜单', value: 'MENU' },
      { label: '外部链接', value: 'EXT_LINK' },
      { label: '内链', value: 'IFRAME_LINK' }
    ]
  }
]
