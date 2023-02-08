import JSONbig from 'json-bigint'
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (error) {
      console.log('转换失败', error)
      return data
    }
  }]
})
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default request
