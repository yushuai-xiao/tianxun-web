export const contentTableConfig = {
  title: '菜单列表',
  createBtn: '新建菜单',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'button', label: '按钮权限', minWidth: '100' },
    {
      prop: 'createdTime',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'lastModifiedTime',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    }
    // { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
