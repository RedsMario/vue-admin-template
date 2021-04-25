import Vue from 'vue'
import VueRouter from 'vue-router'
import { constactRoutes } from '@/router/routes'

// 重写router的push方法
// Beacuse the old `push` method may throw an Error
// When the to attribute is changed in `beforeEach`
const cacheMethod = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return cacheMethod.call(this.location, onResolve, onReject)
  }
  return cacheMethod.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // require service support
  routes: [...constactRoutes]
})

export default router
