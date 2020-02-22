import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000/api/hy',
    baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    //需要拦截的情况
    //1.若config中的一些消息不符合服务器的要求
    //2.每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.某些网络请求，比如登录，必须携带一些特殊的消息

    //拦截后要返回
    return config
  }, err => {
    // console.log(err);
  });

  //2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    // console.log(err);
  })

  //3.发送真正的网络请求
  //返回一个Promise
  return instance(config)
}