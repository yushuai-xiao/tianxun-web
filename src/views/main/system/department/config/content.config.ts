export const contentTableConfig = {
  title: '部门列表',
  createBtn: '新建部门',
  propList: [
    { prop: 'id', label: '部门id', minWidth: '100' },
    { prop: 'depName', label: '部门名称', minWidth: '100' },
    { prop: 'leaderId', label: '主管Id', minWidth: '100' },
    { prop: 'leaderName', label: '主管名称', minWidth: '100' },
    {
      prop: 'createdTime',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createdTime'
    },
    {
      prop: 'lastModifiedTime',
      label: '更新时间',
      minWidth: '250',
      slotName: 'lastModifiedTime'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
