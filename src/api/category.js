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
