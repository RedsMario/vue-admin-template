/*
 * @Author: Mario
 * @Date: 2021-04-23 18:12:15
 * @Last Modified by: Mario
 * @Last Modified time: 2021-04-27 19:02:03
 */
import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import { tokenKey, routerWhiteList, authentication } from '@/config/setting'
import { getItem } from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 关闭加载器
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getItem(tokenKey, false)
  // has token
  if (hasToken) {
    const hasRoles = store.getters?.roles && store.getters?.roles?.length > 0
    // if has token and is login status, redirect `/`
    if (hasRoles && to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if has role info
      if (hasRoles) {
        next()
      } else {
        // 根据角色信息，动态生成路由表
        try {
          const roles = await store.dispatch('user/getUserInfo')
          let routes = []
          if (authentication === 'FrontEnd') {
            // 如果权限由前端控制
            routes = await store.dispatch('permission/generateFrontEndRoutes', roles)
          } else if (authentication === 'RearEnd') {
            // 如果权限由后端控制
            routes = await store.dispatch('permission/generateRearEndRoutes')
          }
          routes.forEach(route => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
          // next()
        } catch (error) {
          console.log(error)
          // token is not valid must be remove token
          await store.dispatch('user/removeToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // no has token
    // 如果在白名单内，直接放行
    if (routerWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // progress bar finish
  NProgress.done()
})
