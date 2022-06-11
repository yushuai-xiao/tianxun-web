import xsRequest from '../index'
import {
  workIDataType,
  workConfigType,
  workType,
  holidayType,
  leaveType
} from './type'
// 获取工作列表
export function requestWorkInfoById(params: {
  user_id?: string
  time?: string
  userName?: string
  department?: string
  type?: string
  remark?: string
}) {
  return xsRequest.get<workIDataType>({
    url: '/attendance/work/list',
    showLoading: false,
    params: params
  })
}

// 获取工作时间配置
export function getWorkConfig() {
  return xsRequest.get<workConfigType>({
    url: '/attendance/work/config'
  })
}

// 设置工作时间配置
export function setWorkConfig(editData: { start: string; end: string }) {
  return xsRequest.patch<workConfigType>({
    url: '/attendance/work/config',
    data: editData
  })
}

// 获取假期工作列表

export function getWorkHoliday() {
  return xsRequest.get({
    url: '/attendance/holiday/list'
  })
}

// 上班打卡

export function addWork(data: workType) {
  return xsRequest.post<workConfigType>({
    url: '/attendance/work',
    data: data
  })
}

// 下班打卡
export function updateWork(data: workType) {
  return xsRequest.patch<workConfigType>({
    url: '/attendance/work',
    data: data
  })
}

// 获取请假列表
export function getHolidayList(params: holidayType) {
  return xsRequest.get<workIDataType>({
    url: '/attendance/leave/list',
    params: params
  })
}

// 提交请假申请
export function addleave(data: leaveType) {
  return xsRequest.post<workConfigType>({
    url: '/attendance/leave',
    data: data
  })
}

// 请假批准接口
export function leavaStatus(data: { id: string; status: string }) {
  return xsRequest.patch<workConfigType>({
    url: '/attendance/leave/' + data.id,
    data: { status: data.status }
  })
}

// 删除申请
export function delLeave(id: string) {
  return xsRequest.delete<workConfigType>({
    url: '/attendance/leave/' + id
  })
}

// 获取出差列表
export function getBusinessList(params: holidayType) {
  return xsRequest.get<workIDataType>({
    url: '/attendance/business/list',
    params: params
  })
}

// 提交出差申请
export function addBusiness(data: leaveType) {
  return xsRequest.post<workConfigType>({
    url: '/attendance/business',
    data: data
  })
}

// 出差批准接口
export function businessStatus(data: { id: string; status: string }) {
  return xsRequest.patch<workConfigType>({
    url: '/attendance/business/' + data.id,
    data: { status: data.status }
  })
}

// 删除申请
export function delBusiness(id: string) {
  return xsRequest.delete<workConfigType>({
    url: '/attendance/business/' + id
  })
}
