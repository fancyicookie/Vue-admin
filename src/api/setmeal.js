/*
 * @Date: 2023-02-14 17:33:09
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function getSetmeal(params) {
  return request({
    url: '/setmeal/page',
    method: 'get',
    params
  })
}

export function deleteSetmeal(params) {
  return request({
    url: '/setmeal',
    method: 'delete',
    params
  })
}

export function post0Status(params) {
  return request({
    url: '/setmeal/status/0',
    method: 'post',
    params
  })
}

export function post1Status(params) {
  return request({
    url: '/setmeal/status/1',
    method: 'post',
    params
  })
}

export function getCateList(params) {
  return request({
    url: '/category/list',
    method: 'get',
    params
  })
}
export function getDishList(params) {
  return request({
    url: '/dish/list',
    method: 'get',
    params
  })
}

export function addSetmeal(data) {
  return request({
    url: '/setmeal',
    method: 'post',
    data
  })
}

export function editSetmeal(id) {
  return request({
    url: '/setmeal/' + id,
    method: 'get'
  })
}
