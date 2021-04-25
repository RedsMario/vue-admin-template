import axios from 'axios'
import { Message, Notification } from 'element-ui'
import { successStatusCode } from '@/config/setting'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    console.dir(error)
    const { response } = error
    // 请求错误码
    const statusCode = response.status
    // 请求地址
    const { url, baseURL } = response.config
    // 判断服务器状态码是否为200、201
    if (!successStatusCode.includes(status)) {
      switch (statusCode) {
        case 400:
          Message.error('客户端请求的参数错误，服务器无法理解！')
          break
        case 401:
          Message.error('Authrization已过期或无效！')
          break
        // case 403:
        //   Message.error('服务器已接受到客户端的请求，但是拒绝执此请求!')
        //   break
        case 404:
          Notification({
            title: '请求错误',
            type: 'error',
            message: `找不到该资源! <br/> ${baseURL}${url}`,
            dangerouslyUseHTMLString: true,
            duration: 0
          })
          break
        case 500:
          Message.error('服务器内部错误，无法完成请求！')
          break
        case 503:
          Message.error('由于超载或系统维护，服务器暂时的无法处理客户端的请求。')
          break
        default:
          // eslint-disable-next-line no-case-declarations
          const { data } = response
          if (data?.code !== 0) {
            Message.error(data?.msg || '未知的错误')
          }
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
