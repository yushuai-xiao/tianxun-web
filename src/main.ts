import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store, { setupStore } from './store'
import 'normalize.css'
import './assets/css/index.less'

import { globalRegister } from './global'
// import './service/axios_demo'

// import xsRequest from './service'
const app = createApp(App)

// import localCache from '@/utils/cache'
// 注册
app.use(globalRegister)

app.use(store)

setupStore()

app.use(router)

app.mount('#app')
// const token = localCache.getCache('token')

// console.log(xsRequest)
// xsRequest.get({
//   url: '/user/list',
//   params: {
//     realName: '徐帅'
//   },
//   interceptors: {
//     requestInterceptor: (config: any) => {
//       // console.log('单独请求的config')
//       // const token = localCache.getCache('token')
//       // console.log(token)
//       // if (token) {
//       //   // console.log(config.headers.Authorization)
//       //   config.headers.Authorization = `Bearer ${token}`
//       // }
//       // console.log('test')
//       return config
//     },
//     responseInterceptor: (res) => {
//       // console.log('单独响应的response')
//       console.log(res)
//       return res
//     }
//   }
// })

// const userMenus = [
//   {
//     id: 1,
//     name: '系统管理',
//     url: '/system',
//     superId: null,
//     // 菜单是否启用
//     status: 1,
//     button: null,
//     children: [
//       {
//         id: 101,
//         name: '角色管理',
//         url: '/main/system/role',
//         superId: 1,
//         status: 1,
//         button: null,
//         children: [
//           {
//             id: 10101,
//             name: '创建角色',
//             url: null,
//             superId: 101,
//             status: 1,
//             permission: 'create',
//             children: []
//           }
//         ]
//       }
//     ]
//   }
// ]

// import { RouteRecordRaw } from 'vue-router'
// function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
//   const routes: RouteRecordRaw[] = []

//   // 1.先去加载默认所有的routes
//   const allRoutes: RouteRecordRaw[] = []
//   const routeFiles = require.context('./router/main', true, /\.ts/)
//   routeFiles.keys().forEach((key) => {
//     const route = require('./router/main' + key.split('.')[1])
//     allRoutes.push(route.default)
//   })
//   console.log(allRoutes)
// console.log(allRoutes)
// 2.根据菜单获取需要添加的routes
// userMenus:
// type === 1 -> children -> type === 1
// type === 2 -> url -> route

// const _recurseGetRoute = (menus: any[]) => {
//   for (const menu of menus) {
//     if (menu.type === 2) {
//       const route = allRoutes.find((route) => route.path === menu.url)
//       if (route) routes.push(route)
//     } else {
//       _recurseGetRoute(menu.children)
//     }
//   }
// }

//   const _recurseGetRoute = (menus: any[]) => {
//     for (const menu of menus) {
//       if (menu.superId !== null && menu.children) {
//         const route = allRoutes.find((route) => route.path === menu.url)
//         if (route) routes.push(route)
//       } else {
//         _recurseGetRoute(menu.children)
//       }
//     }
//   }

//   _recurseGetRoute(userMenus)
//   return routes
// }
// const routes = mapMenusToRoutes(userMenus)
// console.log(routes)
