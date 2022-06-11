import { ILoginState } from './login/type'
import { IDashboardState } from './main/analysis/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
  entireCategory: any[]
  entireLeader: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
