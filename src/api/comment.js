import request from '@/utils/request'
// 获取评论或评论回复
export const reqGetComments = params => request({ url: '/v1_0/comments', method: 'get', params })
// 对文章或者评论进行评论
export const reqSendComments = data => request({ url: '/v1_0/comments', method: 'post', data })
// 对文章或者评论点赞
export const reqCommentsLike = target => request({ url: '/v1_0/comment/likings', method: 'post', data: { target } })
// 取消对文章或者评论点赞
export const reqCancleCommentsLike = target => request({ url: `/v1_0/comment/likings/${target}`, method: 'delete' })
