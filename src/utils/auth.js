/**
 *  @param {Object} 路由匹配规则
 *  @param {Array} 当前角色
 *  @description 判断当前路由是否需要权限
 */
function hasPermission(routes, roles) {
  if (routes.meta?.roles && routes.meta?.roles.length > 0) {
    return roles.some(role => routes.meta.roles.includes(role))
  } else {
    return true
  }
}
/**
 *  @param {Array} 前端异步路由表   (src/router)
 *  @param {Array} 当前角色
 *  @description 根据角色筛选路由  (前端路由的筛选)
 */
export const filterFrontEndAsyncRoutes = (asyncRoutes, roles) => {
  const newRoutes = []
  asyncRoutes.map(routes => {
    const route = { ...routes }
    if (hasPermission(route, roles)) {
      if (route.children) {
        route.children = filterFrontEndAsyncRoutes(route.children, roles)
      }
      if (route.children && route.children.length === 0) delete route.children
      newRoutes.push(route)
    }
  })
  return newRoutes
}

/**
 *  @param {Array} 后端返回的路由表
 *  @description 后端控制权限   (后端路由的筛选)
 *  @return {Array} 返回一个新的路由表
 */
export const filterRearEndAsyncRoutes = asyncRoutes => {
  // create a new Routes
  const newRoutes = asyncRoutes.map(routes => {
    const route = { ...routes }
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = resolve => require(['@/Layouts'], resolve)
      } else {
        const path = route.component
        route.component = resolve => require([`@/views/${path}`], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterRearEndAsyncRoutes(route.children)
    }
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
  return newRoutes
}
