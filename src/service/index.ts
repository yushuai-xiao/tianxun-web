// service统一出口
import XSRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
const xsRequest = new XSRequest({
  // 类传入参数
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 传入axios拦截器
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      // console.log(config)
      const token = localCache.getCache('token')
      if (token) {
        // console.log(config)
        config.headers.Authorization = `${token}`
      }
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log(res)
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})
// 导出实例
export default xsRequest
