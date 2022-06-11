import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  width: '50%',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'originPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入旧价格'
    },
    {
      field: 'currentPrice',
      type: 'input',
      label: '新价格',
      placeholder: '请输入新价格'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { title: '可用', value: 1 },
        { title: '下架', value: 0 }
      ]
    },
    {
      field: 'url',
      type: 'input',
      label: '图片地址',
      placeholder: '请输入图片地址'
    },
    {
      field: 'categoryName',
      type: 'select',
      label: '所属分类',
      placeholder: '请选择分类',
      options: []
    },
    {
      field: 'introduction',
      type: 'textarea',
      label: '商品描述',
      placeholder: '请输入商品描述'
    }
  ],
  colLayout: { span: 12 },
  itemStyle: {}
}
