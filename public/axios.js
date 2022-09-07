import InterceptorManager from './InterceptorManager.js';
import {
  mergeConfig
} from '/util/index.js'


class Axios {
  constructor(config = {}) {
    // 默认配置
    this.defaults = config;
    // 请求响应拦截器
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }

  // 封装ajax
  sendAjax(config) {
    // 默认参数合并
    let configs = mergeConfig(this.defaults, config);

    return new Promise(resolve => {
      const {
        url = '', method = 'get', data = {}
      } = config

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true)
      xhr.onload = () => {
        resolve({
          data: JSON.parse(xhr.responseText),
          status: xhr.status,
          ststusText: xhr.statusText
        })
      }

      // 设置请求头部
      for (const key in config.headers) {
        xhr.setRequestHeader(key, configs.headers[key])
      }
      xhr.send(data);
    })
  }


  request(config) {
    let chain = [this.sendAjax.bind(this), undefined];

    // 请求拦截，在请求之前执行
    this.interceptors.request.handlers.forEach(interceptor => {
      if(interceptor) {
        chain.unshift(interceptor.fullfield, interceptor.rejected)
      }
    })

    // 响应拦截，在请求后执行
    this.interceptors.response.handlers.forEach(interceptor => {
      if(interceptor) {
        chain.push(interceptor.fullfield, interceptor.rejected)
      }
    })

    let promise = Promise.resolve(config);
    // 执行队列，每执行一次，并给promise 赋最新值
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
}

export default new Axios();