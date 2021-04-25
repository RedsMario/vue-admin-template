import request from '@/utils/request'

/**
 *  登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}

/**
 *  获取用户角色信息
 */
export const getRoleInfo = params => {
  return request({
    method: 'GET',
    url: '/api/user/info',
    params
  })
}
