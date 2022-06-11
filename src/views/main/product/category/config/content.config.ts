export const contentTableConfig = {
  title: '商品分类列表',
  createBtn: '新建分类',
  propList: [
    {
      prop: 'name',
      label: '类别名称',
      minWidth: '100'
    },
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
      slotName: 'createdTime'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
