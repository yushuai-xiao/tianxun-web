import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './types'

import Cache from '@/utils/cache'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,

      roleList: [],
      roleCount: 0,

      goodsList: [],
      goodsCount: 0,

      menuList: [],
      menuCount: 0,
      // 部门信息
      departmentList: [],
      departmentCount: 0,
      // 商品分类信息
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    // 用户信息
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    // 角色信息
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    // 部门信息
    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },
    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    },
    // 商品信息
    changeProductList(state, list: any[]) {
      state.goodsList = list
    },
    changeProductCount(state, count: number) {
      state.goodsCount = count
    },
    // 菜单信息
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    // 菜单信息
    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      // console.log('123321')
      let pageName = payload.pageName
      if (payload.pageName === 'goods') {
        pageName = 'product'
      }

      let pageUrl = `/${pageName}/list`

      // 当请求的是menu菜单的时候要进行处理
      if (pageName === 'menu') {
        pageUrl = '/permission/view'
      } else if (pageName === 'category') {
        pageUrl = '/product/category/list'
      }
      // 返回的时间格式处理一下
      // console.log(payload.queryInfo)

      // 1.对页面发送请求
      if (!Cache.getCache('token')) {
        return
      }

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      // console.log(pageResult)
      const { data, total } = pageResult
      // console.log(data)
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, data)
      commit(`change${changePageName}Count`, total)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName->/user
      // id->/user/id
      const { pageName, id } = payload
      // console.log(id)
      let pageUrl = `${pageName}/${id}`

      if (pageName === 'menu') {
        pageUrl = '/permission/view'
      } else if (pageName === 'category') {
        pageUrl = '/product/category/' + id
      } else if (pageName === 'goods') {
        pageUrl = '/product/' + id
      }
      // 2.调用删除网络请求
      await deletePageData(pageUrl)

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          current: 1,
          pageSize: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      // console.log(newData)
      let pageUrl = `/${pageName}`
      if (pageName === 'menu') {
        pageUrl = '/permission/view'
      } else if (pageName === 'category') {
        pageUrl = '/product/category'
      } else if (pageName === 'goods') {
        pageUrl = '/product'
      }
      await createPageData(pageUrl, newData)

      // 2.请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          current: 1,
          pageSize: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 编辑数据请求
      // console.log(payload)
      const { pageName, editData, id } = payload
      console.log(editData)
      // let id = ''
      // if (pageName === 'user') {
      //   const { userId } = payload
      //   id = userId
      // } else {
      //   id = payload.id
      // }
      let pageUrl = `/${pageName}/${id}`

      if (pageName === 'menu') {
        pageUrl = '/permission/view'
      } else if (pageName === 'category') {
        pageUrl = '/product/category/' + id
      } else if (pageName === 'product') {
        pageUrl = '/product/' + id
      }
      await editPageData(pageUrl, editData)

      // 2.请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          current: 1,
          pageSize: 10
        }
      })
    }
  }
}

export default systemModule
