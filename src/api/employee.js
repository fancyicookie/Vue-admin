/*
 * @Date: 2023-02-12 21:59:29
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function getEmployees(params) {
  return request({
    url: '/employee/page',
    method: 'get',
    params
  })
}

export function saveEmployee(data) {
  return request({
    url: '/employee',
    method: 'post',
    data
  })
}

export function editEmployee(id) {
  return request({
    url: '/employee/' + id,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/employee',
    method: 'put',
    data
  })
}
