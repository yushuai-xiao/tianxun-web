import axios from 'axios'
import { AxiosInstance } from 'axios'

import { codeJudge } from '@/utils/code'
// 导入type中定义的接口
import { XSRequestInterceptors, XSRequestConfig, resData } from './type'

import { ElLoading, ILoadingInstance, ElMessageBox } from 'element-plus'

// 设置ElLoading的默认状态
const DEFAULT_LOADING = true

// 封装axios类
class XSRequest {
  // 定义类型
  instance: AxiosInstance
  interceptors?: XSRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: XSRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2.添加所有的实例都有拦截器
    //2.1添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求成功拦截')
        // 请求时加载，ElLoading组件
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    // 2.2添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        let data: resData
        if (res.data) {
          data = res.data
        } else {
          // console.log(res['response'].data, '123test')
          data = res['response'].data
        }
        if (data.code !== 200) {
          console.log(data.code)
          codeJudge(data)
        } else {
          return data
        }
      },
      (err) => {
        console.log('122')
        console.log('err i a', err)
        console.log(err, 'err')
        // 响应失败时，也将loading移除
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误~')
        } else if (err.response.status === 400) {
          console.log('无权限')
        }
      }
    )
  }
  // 请求处理的方法
  request<T>(config: XSRequestConfig<T>): Promise<T> {
    // 利用promise进行处理
    return new Promise((resolve, reject) => {
      // console.log(config)

      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  // 定义get,post,delete,patcj等方法
  get<T>(config: XSRequestConfig<T>): Promise<T> {
    // console.log(11111)
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: XSRequestConfig<T>): Promise<T> {
    // console.log(11111)
    // console.log(config)
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: XSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: XSRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default XSRequest
