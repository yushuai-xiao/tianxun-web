import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单'
    },
    {
      field: 'type',
      type: 'select',
      label: '类型',
      placeholder: '请选择类别'
    },
    {
      field: 'icon',
      type: 'input',
      label: 'icon',
      placeholder: '请输入icon类型'
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单url',
      placeholder: '请输入url'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
