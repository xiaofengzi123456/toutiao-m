import request from '@/utils/request'

// 获取文章列表
export const reqArticles = params => request({ url: '/v1_0/articles', method: 'get', params })
