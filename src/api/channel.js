import request from '@/utils/request'

// 获取所有频道列表
export const reqAllChannels = () => request({ url: '/v1_0/channels', method: 'get' })
// 添加用户频道
export const addUserChannel = data => request({ url: '/v1_0/user/channels', method: 'PATCH', data })
// 删除指定的用户频道
export const deleteUserChannel = channelId => request({ url: `/v1_0/user/channels/${channelId}`, method: 'delete' })
