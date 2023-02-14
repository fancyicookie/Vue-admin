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
