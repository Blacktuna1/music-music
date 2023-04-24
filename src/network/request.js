import axios from 'axios';
import vuex from '../store/index';
import { Message } from 'element-ui';
// 请求库
// 该项目所有请求均为 get请求
//定义一个request方法来请求接口的相应
export function request(url, params) {
  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
  });

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // console.log('请求拦截器');
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  // 响应拦截
        //config是axios响应拦截器放回的一个响应数据对象
        //config.data是相应数据
        //code则是一个状态码
        //这里使用code来判断是否出错，2xx是成功状态码
  instance.interceptors.response.use(
    (config) => {
      const code = config.data.code;
      if (code !== 200 && !(code >= 800 && code <= 803))
        Message.error(config.data.message || '未知错误, 请打开控制台查看');
      return config;
    },
    (err) => {
      console.log([err]);
      if (err.response.data.msg === '需要登录') {
        // cookie过期 退出登录
        // console.log(window.localStorage.getItem("userInfo"));
        // window.localStorage.setItem("userInfo", "");
        // 刷新页面
        // history.go(0)
        // 修改当前的登录状态
        vuex.state.isLogin = false;
      } else {
        // console.log(err.response.data.msg);
        Message.error(err.response.data.message || '未知错误, 请打开控制台查看');
      }
    },
  );

  //是否允许跨域
  instance.defaults.withCredentials = true;

  if (params) {
    const query = { params };
    return instance.get(url, query);
  } else {
    return instance.get(url);
  }
}
