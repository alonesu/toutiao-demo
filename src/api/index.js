import axios from 'axios'

import local from '@/utils/local'
import router from '@/router'
import BIGINT from 'json-bigint'

// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
//  transformResponse: [function (data) {
//    // 对 data 进行任意转换处理
//    return data;
//  }],
axios.defaults.transformResponse = function (data) {
  try {
    return BIGINT.parse(data)
  } catch (error) {
    return data
  }
}

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
//   拦截成功 往headers中加token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  // 对请求 错误做些什么
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取响应状态码 err.response 响应对象 err.response.status 状态码
  if (err.response.status === 401) {
    // 如果是401跳转登录
    //   麻烦 window.location.href = 'http://localhost:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    // 使用vue-router进行跳转
    return router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
