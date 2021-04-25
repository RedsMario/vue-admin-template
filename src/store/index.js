import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
Vue.use(Vuex)

const modules = {}
/**
 *  @description 导入所有文件，并挂载到modules上
 */
const files = require.context('./modules', true, /\.js$/)
files.keys().forEach(key => {
  const reg = /(\.\/|\.js)/g
  const newKey = key.replace(reg, '')
  modules[newKey] = files(key).default
})
// 开启命名空间
Object.keys(modules).forEach(key => {
  modules[key].namespaced = true
})

export default new Vuex.Store({
  modules,
  getters
})
