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
