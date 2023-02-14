/*
 * @Date: 2023-02-14 17:46:03
 * @Author: Fancyicookie
 */
import request from '@/utils/request'

export function getOrder(params) {
  return request({
    url: '/order/page',
    method: 'get',
    params
  })
}
