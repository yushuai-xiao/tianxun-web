export interface workIDataType<T = any> {
  code: number
  message: string
  data: T
  total: number
  pages: number
  curreng: number
  pageSize: number
}

export interface workConfigType<T = any> {
  code: number
  message: string
  data?: T
}

export interface workType {
  date?: string
  type?: string
  start?: string
  end?: string
  start_check?: string
  end_check?: string
  work_time?: number
  remark?: string
  user_id?: string
  work_id?: string
}

export interface holidayType {
  user_id?: ''
  department?: string
  user_name?: string
  reason?: string
  status?: string
}
export interface leaveType {
  user_id?: ''
  reason?: string
  start?: string
  end?: string
}
