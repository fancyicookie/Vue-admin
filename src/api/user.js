/*
 * @Date: 2023-02-03 11:16:41
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/employee/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/employee/logout',
    method: 'post'
  })
}
