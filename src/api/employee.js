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
