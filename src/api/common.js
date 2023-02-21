import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    data
  })
}

export const commonImaggeBaseUrl = `${process.env.VUE_APP_BASE_API}/common/download?name=`
