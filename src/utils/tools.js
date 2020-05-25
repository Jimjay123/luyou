import axios from 'axios';
import {
  common,
  setAjax,
  tipsFail
} from './utils';
import store from '../store'

//添加请求拦截器， 在发送请求前 做些什么 例如添加接口公参，
axios.interceptors.request.use(
  (cfg) => {
    //显示加载中状态
    setAjax(true);
    cfg.href = location.href;
    cfg.headers.common.token = common() || '';
    cfg.headers['Content-Type'] = 'application/json'; //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    return cfg;
  },
  (err) => { //错误执行方法
    //添加网络异常提示框
    setAjax(false);
    tipsFail('网络异常，刷新页面试试呢');
    return Promise.reject(err)
  }
);

//添加接口响应拦截器
axios.interceptors.response.use(
  (res) => {
    console.log(res)
    //隐藏加载中状态
    setAjax(false);
    if (res.data.code == '401') {
      //未登录重定向到首页
      if (res.config.href === window.location.href) {
        sessionStorage.setItem('callBackUrl', res.config.href);
      }
      window.location.href = '/#/main/login'
    }

    return res.data;
  },
  (err) => { //错误处理
    //添加网络异常提示框
    setAjax(false);
    if (err.message.code != 200) { //表示主动取消接口 不触发公共 异常提示信息 会触发调用接口时的 catch方法
      tipsFail('网络异常，刷新页面试试呢');
    }
    return Promise.reject(err)
  }
);
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

//普通接口  注释：提交文件类不可用或要修改
export let tools = {
  async ajax(cfg) {
    cfg.url = '/api' + cfg.url;
    //cfg.url = 'https://cloud.luyouor.com/api' + cfg.url;
    if (cfg.method === 'get') {
      cfg.params = {
        ...cfg.data
      }
    }
    let res = await axios(cfg);
    return res;
  }
}

//export default Tools;
