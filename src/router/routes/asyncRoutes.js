/**
 *  @description 动态路由表，将根据后端返回角色进行动态添加
 */

export const asyncRoutes = [
  {
    path: '/',
    redirect: 'dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard'),
    meta: {
      title: '首页',
      roles: ['editor']
    }
  }
]
