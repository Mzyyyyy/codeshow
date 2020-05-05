import request from '@/request/http'

// 登录
export function createTeam (data) {
  return request({
    url: '/api/team/createTeam',
    method: 'post',
    data: data
  })
}

// 查询团队列表
export function getTeamList (data) {
  return request({
    url: '/api/team/getTeamList',
    method: 'post',
    data: data
  })
}

// 退出团队
export function quitTeam (data) {
  return request({
    url: '/api/team/quitTeam',
    method: 'post',
    data: data
  })
}

// 解散团队
export function deleteTeam (data) {
  return request({
    url: '/api/team/deleteTeam',
    method: 'post',
    data: data
  })
}

// getTeamDetail
export function getTeamDetail (data) {
  return request({
    url: '/api/team/getTeamDetail',
    method: 'post',
    data: data
  })
}

// 添加团队成员
export function addUserInTeam (data) { // {userId,teamId}
  return request({
    url: '/api/team/addUserInTeam',
    method: 'post',
    data: data
  })
}

// 获取章节列表
export function getSectionList (data) { // {teamId}
  return request({
    url: '/api/team/getSectionList',
    method: 'post',
    data: data
  })
}

// 新增当前团队下的章节
export function addSectionToTeam (data) { // {teamId，name}
  return request({
    url: '/api/team/addSectionToTeam',
    method: 'post',
    data: data
  })
}
