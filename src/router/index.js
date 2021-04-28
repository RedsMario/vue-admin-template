import Vue from 'vue'
import VueRouter from 'vue-router'
import { constactRoutes } from '@/router/routes'

Vue.use(VueRouter)

// 重写router的push方法
// Beacuse the old `push` method may throw an Error
// When the to attribute is changed in `beforeEach`
const cachePush = VueRouter.prototype.push
const cacheReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return cachePush.call(this, location, onResolve, onReject)
  }
  return cachePush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return cacheReplace.call(this, location, onResolve, onReject)
  }
  return cacheReplace.call(this, location).catch(err => err)
}

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constactRoutes]
  })

const router = createRouter()

export default router
