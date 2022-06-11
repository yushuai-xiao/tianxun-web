import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'

import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: {}
    }
  },
  getters: {},
  mutations: {
    // 由action提交
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      const proxyMenus = []
      for (const item of userMenus) {
        // console.log(item)
        proxyMenus.push(...item.children)
      }
      state.userMenus = proxyMenus
      // 注册动态路由，
      //  userMenus => routes
      const routes = mapMenusToRoutes(proxyMenus)
      console.log(routes, 'rotes')
      // routes = > router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)

      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // console.log(payload)
      const loginResult = await accountLoginRequest(payload)
      let id, token
      try {
        id = loginResult.id
        token = loginResult.token
        commit('changeToken', token)
        localCache.setCache('token', token)
      } catch (e) {
        console.log(e)
      }

      if (!token) {
        return
      }

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id || '')

      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // console.log(userInfo)
      // 发送初始化的请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId()

      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)

      localCache.setCache('userMenus', userMenus)

      // 跳到首页
      router.push('./main')
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
