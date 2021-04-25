import { login, getRoleInfo } from '@/api/Login'
import { getItem, setItem, removeItem } from '@/utils/storage'
import { tokenKey } from '@/config/setting'

const state = {
  token: getItem(tokenKey, false),
  roles: []
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  REMOVE_TOKEN(state) {
    state.token = ''
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  REMOVE_ROLES(state) {
    state.roles = []
  }
}
const actions = {
  // user login
  login({ commit }, formInfo) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: { token }
        } = await login(formInfo)
        // save token in vuex
        commit('SET_TOKEN', token)
        // save token in cookie
        setItem(tokenKey, token)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  // get user info
  getUserInfo({ state, commit }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: { roles }
        } = await getRoleInfo({ token: state.token })
        if (!roles || roles.length <= 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('roles must be a Array!')
        }
        commit('SET_ROLES', roles)
        resolve(roles)
      } catch (error) {
        reject(error)
      }
    })
  },
  // remove token
  removeToken({ commit }) {
    return new Promise((resolve, reject) => {
      // 清空vuex中的token
      commit('REMOVE_TOKEN')
      // 清空角色信息
      commit('REMOVE_ROLES')
      // 清空本地存储中的token
      removeItem(tokenKey)
      resolve()
    })
  }
  // user logout
  // TODO
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
