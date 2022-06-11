export const contentTableConfig = {
  title: '商品列表',
  createBtn: '新建商品',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    {
      prop: 'originPrice',
      label: '原价格',
      minWidth: '10',
      slotName: 'oldPrice'
    },
    { prop: 'currentPrice', label: '现价格', minWidth: '40' },
    { prop: 'url', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
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
      slotName: 'lastModifiedTimeeAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
