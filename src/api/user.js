import request from '@/request/http'

// 登录
export function login (data) {
  return request({
    url: '/api/users/login',
    method: 'post',
    data: data
  })
}
// 注册
export function registry (data) {
  return request({
    url: '/api/users/registry',
    method: 'post',
    data: data
  })
}

// 获取用户信息
export function getUserInfo (data) {
  return request({
    url: '/api/users/getUserInfo',
    method: 'post',
    data: data
  })
}

// 编辑用户信息
export function updateUserInfo (data) {
  return request({
    url: '/api/users/updateUserInfo',
    method: 'post',
    data: data
  })
}

// 关注用户 {userId,targetUserId}
export function followUser (data) {
  return request({
    url: '/api/users/followUser',
    method: 'post',
    data: data
  })
}

// 获取关注用户列表 {userId,targetUserId}
export function getFollowUsers (data) {
  return request({
    url: '/api/users/getFollowUsers',
    method: 'post',
    data: data
  })
}

// 获取id获取用户列表 {ids}
export function getUsersByIds (data) {
  return request({
    url: '/api/users/getUsersByIds',
    method: 'post',
    data: data
  })
}

// 模糊查询用户（id或name）
export function searchUser (data) { // keyword
  return request({
    url: '/api/users/searchUser',
    method: 'post',
    data: data
  })
}

// 更新草稿箱
export function updateDraft (data) { // {content,userId}
  return request({
    url: '/api/users/updateDraft',
    method: 'post',
    data: data
  })
}

// 获取上次保存草稿
export function getDraft (data) { // {userId}
  return request({
    url: '/api/users/getDraft',
    method: 'post',
    data: data
  })
}
