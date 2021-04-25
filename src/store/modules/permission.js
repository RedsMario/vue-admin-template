/* eslint-disable no-async-promise-executor */
import { constactRoutes, asyncRoutes } from '@/router/routes'
import { getMenu } from '@/api/Routes'
import { filterFrontEndAsyncRoutes, filterRearEndAsyncRoutes } from '@/utils/auth'

const state = {
  // The pages that users can see
  routes: [],
  // dynaic add routes
  addRoutes: []
}
const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = [...constactRoutes, ...routes]
    state.addRoutes = routes
  }
}
const actions = {
  /**
   *  @param {commit}
   *  @param {Array} 当前角色
   *  @description 根据角色生成匹配该角色的路由  (前端控制)
   */
  generateFrontEndRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessRoutes = []
      // if user is admin return all routes
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterFrontEndAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  },
  /**
   *  @description 处理由后端控制的路由表
   */
  generateRearEndRoutes({ commit, rootState }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: res } = await getMenu({ token: rootState.user.token })
        let accessRoutes = res.data
        accessRoutes = filterRearEndAsyncRoutes(accessRoutes)
        commit('SET_ROUTES', accessRoutes)
        resolve(accessRoutes)
      } catch (error) {
        reject(error)
      }
    })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
