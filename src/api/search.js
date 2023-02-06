import request from '@/utils/request'

// 获取搜索联想建议
export const reqSearchSuggestions = (params) => request({ url: '/v1_0/suggestion', method: 'get', params })
// 获取搜索结果
export const reqSearchResult = (params) => request({ url: '/v1_0/search', method: 'get', params })
