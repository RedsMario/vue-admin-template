/**
 *  @description 默认路由表，任何用户都可以访问
 */
export const constactRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/Error/401')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/404')
  }
]
