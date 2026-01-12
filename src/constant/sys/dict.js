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
      { dictLabel: '外链', dictValue: 'EXT_LINK' },
      { dictLabel: '内链', dictValue: 'IFRAME_LINK' }
    ]
  },
  {
    dictLabel: '菜单是否显示',
    dictValue: 'MENU_VISIBLE',
    children: [
      { dictLabel: '显示', dictValue: '1' },
      { dictLabel: '隐藏', dictValue: '0' }
    ]
  },
  {
    dictLabel: '性别',
    dictValue: 'GENDER',
    children: [
      { dictLabel: '男', dictValue: 'M' },
      { dictLabel: '女', dictValue: 'F' }
    ]
  },
  {
    dictLabel: '机构分类',
    dictValue: 'ORG_TYPE',
    children: [
      { dictLabel: '总公司', dictValue: 'COMPANY' },
      { dictLabel: '子公司', dictValue: 'SUBCORP' },
      { dictLabel: '分公司', dictValue: 'BRANCH' },
      { dictLabel: '部门', dictValue: 'DEPARTMENT' }
    ]
  },
  {
    dictLabel: '通知类型',
    dictValue: 'NOTICE_TYPE',
    children: [
      { dictLabel: '系统', dictValue: 'SYS' },
      { dictLabel: '放假通知', dictValue: 'HOLIDAY_NOTICE' },
      { dictLabel: '其他通知', dictValue: 'OTHER_NOTICE' }
    ]
  }
]
