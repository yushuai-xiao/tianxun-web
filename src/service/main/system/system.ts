import xsRequest from '@/service'

import { IDataType } from '@/service/login/type'
// 请求页面数据，list
export function getPageListData(url: string, queryInfo: any) {
  return xsRequest.get<IDataType>({
    url: url,
    params: queryInfo
  })
}
// urL: /users/id
export function deletePageData(url: string) {
  return xsRequest.delete<IDataType>({
    url: url
  })
}

// 创建数据请求
export function createPageData(url: string, newData: any) {
  return xsRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 修改数据

export function editPageData(url: string, editData: any) {
  // console.log(url)
  return xsRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
