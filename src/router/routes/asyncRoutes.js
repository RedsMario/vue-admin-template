import Layout from '@/Layouts'
/**
 *  @description 动态路由表，将根据后端返回角色进行动态添加
 */

export const asyncRoutes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]
