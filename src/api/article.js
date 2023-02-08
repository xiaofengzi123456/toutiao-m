import request from '@/utils/request'

// 获取文章列表
export const reqArticles = params => request({ url: '/v1_0/articles', method: 'get', params })
// 获取文章正文
export const reqArticleContent = articleId => request({ url: `/v1_0/articles/:${articleId}`, method: 'get' })
// 点赞
export const reqLike = articleId => request({ url: '/v1_0/article/likings', method: 'post', data: { target: articleId } })
//  取消点赞
export const reqCancleLike = target => request({ url: `/v1_0/article/likings/:${target}`, method: 'delete' })
// 收藏
export const reqCollect = articleId => request({ url: '/v1_0/article/collections', method: 'post', data: { target: articleId } })
// 取消收藏
export const reqCancleCollect = target => request({ url: `/v1_0/article/collections/:${target}`, method: 'delete' })
