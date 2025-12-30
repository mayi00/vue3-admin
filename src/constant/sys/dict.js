export const DICT_TYPE = [
  {
    dictLabel: '系统通用',
    dictValue: 'SYS_COMMON_STATUS',
    children: [
      { dictLabel: '是', dictValue: '1' },
      { dictLabel: '否', dictValue: '0' }
    ]
  },
  {
    dictLabel: '系统启用状态',
    dictValue: 'SYS_ENABLED_STATUS',
    children: [
      { dictLabel: '启用', dictValue: 'ENABLED' },
      { dictLabel: '禁用', dictValue: 'DISABLED' }
    ]
  },
  {
    dictLabel: '菜单类型',
    dictValue: 'MENU_TYPE',
    children: [
      { dictLabel: '模块', dictValue: 'MODULE' },
      { dictLabel: '目录', dictValue: 'CATALOG' },
      { dictLabel: '菜单', dictValue: 'MENU' },
      { dictLabel: '外部链接', dictValue: 'EXT_LINK' },
      { dictLabel: '内链', dictValue: 'IFRAME_LINK' }
    ]
  },
  {
    dictLabel: '性别',
    dictValue: 'GENDER',
    children: [
      { dictLabel: '男', dictValue: 'M' },
      { dictLabel: '女', dictValue: 'F' }
    ]
  }
]
