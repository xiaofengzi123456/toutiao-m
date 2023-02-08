import request from '@/utils/request'

export const reqLogin = (data) => request({ url: '/v1_0/authorizations', method: 'post', data })
export const reqSendSms = (mobile) => request({ url: `/v1_0/sms/codes/${mobile}`, method: 'get' })
// 获取登录用户信息
export const reqCurrentUser = () => request({ url: '/v1_0/user', method: 'get' })
// 获取用户的频道列表
export const reqUserChannels = () => request({ url: '/v1_0/user/channels', method: 'get' })
// 关注用户
export const reqFollowUser = (target) => request({ url: '/v1_0/user/followings', method: 'post', data: { target } })
// 取消关注用户
export const reqCancelFollow = (target) => request({ url: `/v1_0/user/followings/${target}`, method: 'delete' })
