import {tools} from '@/utils/tools.js';
import url from './url'

//登录接口
export const login = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['login'],
    data,
  }
  return tools.ajax(cfg);
}

//登录接口
export const wechatAppInfo = (data) => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['wechatAppInfo'],
    data,
  }
  return tools.ajax(cfg);
}
