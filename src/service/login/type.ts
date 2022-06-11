export interface IAccount {
  account: string
  password: string
}

export interface ILoginResult {
  id: string
  account: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
  total: number
  token: string
  id: string
}
