import { decrypto } from '~/utils/crypto'
import { signApi,reqExcludeSignUrl,resExcludeSignUrl } from '@/settings'
/**
 * 封装请求
 *
 * @param url
 * @param opt
 * @param custom
 */
// new AbortController(); 该参数判断接口是否多次请求，如多次请求，取消后次请求
let controller: any = null
// 排除中断请求的URL
const abortExcludeUrl:string[]=['/getLoginMessage']
const fetch = (url: string, opt: object = {}, custom: object = {}) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  // 初始化AbortController
  controller = new AbortController()
  // 判断是否取消的关键
  const signal = !abortExcludeUrl.some(e => e === url) ? controller.signal : null;//控制取消事件参数
  return new Promise((resolve, reject) => {
    useFetch(url, {
      // method, body, query, ...
      ...opt,
      //请求超时
      timeout:6000,
      // 解决二次请求不更新问题
      // query:{
      // key:new Date().getTime(),
      // },
      // ofetch 库会自动识别请求地址，对于url已包含域名的请求不会再拼接baseURL
      baseURL,
      // onRequest相当于请求拦截
      onRequest({ options,request }) {
        // 根据额外的参数, 判断是否需要登录, 默认需要登录,如果没有 token, 直接重定向到登录
        // console.log('请求头',options.params, options.body)
        // 设置请求头
        options.headers = {
          ...options.headers,
          authorization: decrypto(useCookie<string | undefined>('token').value as string),
          signal:signal,
          'Content-Type':!options.headers['Content-Type']?'application/json':options.headers['Content-Type']
        }
      //  根据请求头处理数据
        if (options.method == 'GET') {
          options.params =  transformRequestData(options.params, options.headers['Content-Type'])
        } else {
          options.body =  transformRequestData(options.body, options.headers['Content-Type'])
        }
      //  加签名sm2
        if (signApi && !reqExcludeSignUrl.some((e) => e == request)) {
          // 加签
          if (options.method == 'POST') {
            options.headers['sign'] = sm2Encrypt(options.body)
          } else if (options.method == 'GET') {
            options.headers['sign'] = sm2Encrypt(options.params)
          }
        }
        // console.log('请求头2',options.params, options.body)

      },
      // onResponse相当于响应拦截
      onResponse({ response,error,request }) {

        /*
         * 接口返回的数据
         */
        const data = response._data
        // 解签名
        if (data != null && signApi && !resExcludeSignUrl.some((e) => e == request)) {
          if (!sm2Decrypt(data.data, data.sign)) {
            //    签名不正确
            Promise.reject('该请求存在被劫持风险，请重新登录！')
          }
        }
        // 处理 http 状态码
        const status = response.status
        console.log(data, 'data',status,'code')
        if (status !== 200){
          // 取消请求
          controller.abort();
          return reject(data)
        }

        // // TODO 这里直接返回数据, 您真实的业务请自行处理状态码
        // return resolve(data)

        // 如果是 20000, 直接返回数据
        if (data.code === 20000) {
          // 恢复请求
          if (controller) {
            controller = null
          }
          // 判断是否为文件流
          let disposition = response.headers.get("content-disposition");
          if (response.headers.get("content-type") === 'application/octet-stream;charset=utf-8') {
            // 从响应头提取文件名
            let filename: string = ''
            if (disposition) {
              filename = decodeURI(disposition.split('=')[disposition.split('=').length - 1])
            }
            const res: any = {
              code: 20000,
              data: data,
              filename: filename
            }
            return resolve(res)
          }else{
            return resolve(data)
          }

        }

        // 判断不同的状态, 执行不同的操作
        if (data.code === 40001) {
          // 重定向到登录
        }

        // 处理错误消息, 请勿使用客户端相关的 api, 否则ssr失效
        console.log(data.message)

        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return reject(data)
        }

        // 否则返回一个pending中的promise，请求不会进入catch中
        return new Promise(() => ({}))
      },
      // error
      onRequestError(e) {
        console.log('500,服务器未启用')
        reject(showError({ statusCode: 403, statusMessage: '禁止访问', }))
      },
      // request, response, options
      onResponseError(e) {
        console.log('Request Error2')
        reject(e)
      }
    })
  })
}

export default {
  get(url: string, params: object = {}, custom: object = {}) {
    return fetch(url, { method: 'get', params }, custom)
  },

  post(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'post', body }, custom)
  },

  put(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'put', body }, custom)
  },

  delete(url: string, body: object = {}, custom: object = {}) {
    return fetch(url, { method: 'delete', body }, custom)
  }
}
