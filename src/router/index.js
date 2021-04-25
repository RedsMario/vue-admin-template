import Vue from 'vue'
import VueRouter from 'vue-router'
import { constactRoutes } from '@/router/routes'

Vue.use(VueRouter)

// 重写router的push方法
// Beacuse the old `push` method may throw an Error
// When the to attribute is changed in `beforeEach`
const cacheMethod = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return cacheMethod.call(this, location, onResolve, onReject)
  }
  return cacheMethod.call(this, location).catch(err => err)
}

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constactRoutes]
  })

const router = createRouter()

export default router
