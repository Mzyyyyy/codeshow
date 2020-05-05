import request from '@/request/http'

// 提交代码
export function submitCode (data) {
  return request({
    url: '/api/article/submitCode',
    method: 'post',
    data: data
  })
}

// 查询代码
export function getCode (data) {
  return request({
    url: '/api/article/getCode',
    method: 'post',
    data: data
  })
}

// 获取文章列表
export function getArticleList (data) {
  return request({
    url: '/api/article/getArticleList',
    method: 'post',
    data: data
  })
}
// 获取文章类型标签
export function getTags (data) {
  return request({
    url: '/api/article/getTags',
    method: 'post',
    data: data
  })
}

// 收藏文章
export function collect (data) {
  return request({
    url: '/api/article/collect',
    method: 'post',
    data: data
  })
}

// 发布评论
export function pulishComments (data) {
  return request({
    url: '/api/article/pulishComments',
    method: 'post',
    data: data
  })
}

// 获取该文章下所有评论
export function getComments (data) {
  return request({
    url: '/api/article/getComments',
    method: 'post',
    data: data
  })
}

// 获取该用户收藏文章列表
export function getCollectList (data) {
  return request({
    url: '/api/article/getCollectList',
    method: 'post',
    data: data
  })
}

// 模糊查询文章标题
export function getLikeArticles (data) { // {keyword}
  return request({
    url: '/api/article/getLikeArticles',
    method: 'post',
    data: data
  })
}

// 查询该用户发布的所有文章
export function getArticlesById (data) { // {authorId}
  return request({
    url: '/api/article/getArticlesById',
    method: 'post',
    data: data
  })
}

// 根据userId，temId，sectionId获取文章
export function getArticleByTeam (data) { // {userId，temId，sectionId}
  return request({
    url: '/api/article/getArticleByTeam',
    method: 'post',
    data: data
  })
}

// 查看当前用户所有未读消息
export function getMessage (data) { // {userId}
  return request({
    url: '/api/article/getMessage',
    method: 'post',
    data: data
  })
}

// 查看当前用户所有未读消息
export function readComment (data) { // {userId||commentId}
  return request({
    url: '/api/article/readComment',
    method: 'post',
    data: data
  })
}
