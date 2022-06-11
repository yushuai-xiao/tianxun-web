export const contentTableConfig = {
  title: '角色列表',
  createBtn: '新建角色',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'introduction', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createdTime',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'lastModifiedTime',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
