import JSONbig from 'json-bigint'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

const reqRefreshToken = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

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

request.interceptors.response.use(response => {
  return response
},async error => {
  const status = error.response.status 
  if (status === 400) {
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    const { user } = store.state
    if (!user || !user.token) {
      return redirect()
    } 
    try {
      const result = await reqRefreshToken({
        url: '/v1_0/authorizations',
        method: 'put',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = result.data.data.token
      store.commit('SETUSER', user)
      return request(error.config) 
    } catch (error) {
      redirect()
    }
  }else if (status === 403) {
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})

function redirect () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
