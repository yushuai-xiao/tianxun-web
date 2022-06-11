import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建拦截器接口
export interface XSRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface XSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XSRequestInterceptors<T>
  showLoading?: boolean
}
export interface resData {
  code: number
  message: string
}
