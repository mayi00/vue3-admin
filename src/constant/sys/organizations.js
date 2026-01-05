export const organizations = [
  {
    id: '1',
    orgName: '总公司',
    orgType: 'COMPANY',
    sort: 1,
    orgCode: 'COMPANY_01',
    parentId: '',
    children: [
      {
        id: '1-1',
        orgName: '北京子公司',
        orgType: 'SUBCORP',
        sort: 1,
        orgCode: 'SUBCORP_01',
        parentId: '1',
        children: [
          {
            id: '1-1-1',
            orgName: '北京分公司财务部',
            orgType: 'DEPARTMENT',
            sort: 1,
            orgCode: 'DEPT_01',
            parentId: '1-1'
          },
          {
            id: '1-1-2',
            orgName: '北京分公司人力资源部',
            orgType: 'DEPARTMENT',
            sort: 2,
            orgCode: 'DEPT_02',
            parentId: '1-1'
          }
        ]
      },
      {
        id: '1-2',
        orgName: '上海分公司',
        orgType: 'BRANCH',
        sort: 2,
        orgCode: 'BRANCH_02',
        parentId: '1',
        children: [
          {
            id: '1-2-1',
            orgName: '上海分公司财务部',
            orgType: 'DEPARTMENT',
            sort: 1,
            orgCode: 'DEPT_03',
            parentId: '1-2'
          }
        ]
      }
    ]
  }
]
