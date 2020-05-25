import {
  tools
} from '@/utils/tools';
import url from './url'

//主页获取用户信息接口
export const getUseInfo = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['login'],
    data,
  };
  return tools.ajax(cfg);
};

//获取验证码接口
export const getMobileCpaCode = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['getMobileCpaCode'],
    data,
  };
  return tools.ajax(cfg);
};

//获取验证码接口
export const studentchangeMobile = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['studentchangeMobile'],
    data,
  };
  return tools.ajax(cfg);
};

//验证码登录接口
export const getMemLogMobCap = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['getMemLogMobCap'],
    data,
  };
  return tools.ajax(cfg);
};

//密码登陆接口登录接口
export const putMemMobPassword = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['putMemMobPassword'],
    data,
  };
  return tools.ajax(cfg);
};
//重置密码接口
export const resetPasswordMemberInfo = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['resetPasswordMemberInfo'],
    data,
  };
  return tools.ajax(cfg);
};
//支付宝第三方登录 获取 公参接口
export const aliAppInfAppInfo = (data) => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['aliAppInfAppInfo'],
    data,
  };
  return tools.ajax(cfg);
};
