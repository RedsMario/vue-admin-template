/*
 * @Author: Mario
 * @Date: 2021-04-25 10:01:24
 * @Last Modified by: Mario
 * @Last Modified time: 2021-04-25 10:02:52
 */
import request from '@/utils/request'

export const getMenu = params => {
  return request({
    method: 'GET',
    url: '/api/menu',
    params
  })
}
