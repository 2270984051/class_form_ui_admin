import axios from 'axios'
import Router from '@/router'
import {
  removeToken,
  getToken
} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  timeout: 500000
})


// axios请求拦截器
service.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


//axios响应拦截器
service.interceptors.response.use(res => {
  // 如果有其他成功的逻辑处理，可以在这里添加
  return res;
}, error => {
  const {
    response
  } = error;
  if (response) {
    switch (response.status) {
      case 401:
        console.log('用户未登录, 直接跳转至登录页面');
        alert("当前用户已过期,请重新登录")
        removeToken(); // 移除token
      //  if (this.$route.path !== '/login') {
          Router.push('/login');
          // this.$router.push('/login');
     //   }
        break;
      default:
        // 根据其他错误状态码进行处理
        const errorMessage = handleErrorMessage(response.data.message || response.statusText);
        return Promise.reject(new Error(errorMessage));
    }
  } else if (!window.navigator.onLine) {
    // 处理断网情况
    return Promise.reject(new Error('网络连接异常'));
  } else {
    // 网络请求发生异常，但没有得到响应（如请求被阻止）
    return Promise.reject(new Error('请求失败，请稍后再试'));
  }
});

function handleErrorMessage(message) {
  if (message == "Network Error") {
    return "后端接口连接异常";
  } else if (message.includes("timeout")) {
    return "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    return "系统接口" + message.substr(message.length - 3) + "异常";
  }
  return message; // 默认返回原始错误信息
}

export default service