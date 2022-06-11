import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建部门',
  formItems: [
    {
      field: 'depName',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门'
    },
    {
      field: 'leaderId',
      type: 'select',
      label: '主管ID',
      placeholder: '请选择主管id',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
