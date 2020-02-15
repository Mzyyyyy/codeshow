import request from '@/request/http'

export function login (data) {
  return request({
    url: '/api/login',
    method: 'get',
    data: data
  })
}
