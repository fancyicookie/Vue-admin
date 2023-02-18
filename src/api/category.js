/*
 * @Date: 2023-02-14 16:47:28
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function getCategory(params) {
  return request({
    url: '/category/page',
    method: 'get',
    params
  })
}

export function saveCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

export function editCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data
  })
}

export function delCategory(params) {
  return request({
    url: '/category',
    method: 'delete',
    params
  })
}
