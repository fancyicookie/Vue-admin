/*
 * @Date: 2023-02-14 17:22:35
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function getDish(params) {
  return request({
    url: '/dish/page',
    method: 'get',
    params
  })
}

export function addDish(data) {
  return request({
    url: '/dish',
    method: 'post',
    data
  })
}

export function addDishCate(data) {
  return request({
    url: '/category/list',
    method: 'get',
    data
  })
}

export function getDishImage(params) {
  return request({
    url: '/common/download',
    method: 'get',
    params
  })
}

export function postDishImage(params) {
  return request({
    url: '/common/download',
    method: 'post',
    params
  })
}

export function deleteDish(params) {
  return request({
    url: '/dish',
    method: 'delete',
    params
  })
}
