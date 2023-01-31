import request from '@/utils/request'

export const reqLogin = (data) => request({ url: '/v1_0/authorizations', method: 'post', data })
export const reqSendSms = (mobile) => request({ url: `/v1_0/sms/codes/${mobile}`, method: 'get' })
// 获取登录用户信息
export const reqCurrentUser = () => request({ url: '/v1_0/user', method: 'get' })
