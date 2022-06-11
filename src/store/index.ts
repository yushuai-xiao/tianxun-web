import { getPageListData } from '@/service/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { IRootState, IStoreType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xs',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      entireCategory: [],
      entireLeader: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    },
    changeEntireCategory(state, list) {
      state.entireCategory = list
    },
    changeEntireLeader(state, list) {
      state.entireLeader = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      //  请求所有的菜单数据
      const menuResult = await getPageListData('/permission/view', {})
      const { data: menuList } = menuResult
      // 1.请求部门和角色数据

      const departmentResult = await getPageListData('/department/list', {
        current: 1,
        pageSize: 1000
      })
      const { data: departmentList } = departmentResult

      const roleResult = await getPageListData('/role/list', {
        current: 1,
        pageSize: 1000
      })
      const { data: roleList } = roleResult
      console.log(roleList, 'role')
      // 请求所有商品分类信息
      // const categoryResult = await getPageListData('/product/category/list', {})
      // const { data: categoryList } = categoryResult
      // 请求所有的用户
      const leaderResult = await getPageListData('/user/list', {})
      console.log(leaderResult)
      const { data: leaderList } = leaderResult
      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
      // commit('changeEntireCategory', categoryList)
      commit('changeEntireLeader', leaderList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
  // console.log('123456')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
