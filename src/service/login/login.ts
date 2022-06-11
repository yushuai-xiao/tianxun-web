import xsRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/account',
  LoginUserInfo = '/user/', //用法: /users/1
  UserMenus = '/permission/view' //用法:role/1/menu
}
// 封装登录请求
export function accountLoginRequest(account: IAccount) {
  return xsRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
// 封装用户信息请求
export function requestUserInfoById(id: string) {
  return xsRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
// 封装用户菜单请求
export function requestUserMenusByRoleId() {
  return xsRequest.get<IDataType>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}
