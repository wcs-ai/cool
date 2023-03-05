import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { Loading } from 'element-ui'
import router from '@/router'
import { encryptedSM4 } from "@/utils/jsencrypt.js";

// 全屏的弹出提示框401 true：已显示一次，不用再次重复显示
window.messageBoxDialog = false;
// 全屏loading
var loadinginstace;
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 20000
});


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// request拦截器
service.interceptors.request.use(config => {
  // TODO 报文加密 encryptedSM4
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  if (getToken() && !isToken) {
    config.headers['Authorization'] = getToken();
  }
  // 判断是否需要开启全屏loading
  if (config.load) {
    loadinginstace = Loading.service({
      fullscreen: true,
      text: config.load,
      background: 'rgba(0, 0, 0, 0.8)',
      spinner: 'el-icon-loading'
    })
  }

  return config;
}, error => {
  if (loadinginstace) {
    loadinginstace.close();
  }

  Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(res => {
  if (loadinginstace) {
    loadinginstace.close()
  }

  const code = res.data.code;
  const respCode = res.data.respCode;
  // 获取错误信息
  const msg = errorCode[code] || res.data.respMsg || errorCode['default'];
  if (respCode == '00') {
    return res.data;
  }else if (respCode == 401 && location.href.indexOf('/login') == -1) {
    if (window.messageBoxDialog) {
      return Promise.reject('登录状态过期')
    } else {
      window.messageBoxDialog = true
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          store.dispatch('tagsView/delAllViews')
          router.push('/login')
        }).catch(() => {
          store.dispatch('tagsView/delAllViews')
          router.push('/login')
        })
      }).catch(() => {
      })
    }
  } else if (res.config.errorTip) {
    // 是否使用业务码错误时的提示
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg));
  } else {
    return res.data;
  }
},
error => {

  if (loadinginstace) {
    loadinginstace.close()
  }

  let { message } = error
  if (message === 'Network Error') {
    message = '网络异常'
  } else if (message.includes('timeout')) {
    message = '系统请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = '系统' + message.substr(message.length - 3) + '异常'
  }
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
