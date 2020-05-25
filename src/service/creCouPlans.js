import {tools} from '@/utils/tools';
import url from './url'

export const couChaChaRef = (data) => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['couChaChaRef'],
    data,
  };
  return tools.ajax(cfg);
};

export const couPlaSavForCouChannel = (data) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['couPlaSavForCouChannel'],
    data,
  };
  return tools.ajax(cfg);
};

//编辑课程计划--获取课程计划信息接口
export const courPlaCouPlaDetail = (data) => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courPlaCouPlaDetail'],
    data,
  };
  return tools.ajax(cfg);
};

//编辑课程计划--获取课程计划信息接口
export const putCouPlaPlaBasInfo = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['couPlaPlaBasInfo'],
    data,
  };
  return tools.ajax(cfg);
};

//编辑课程计划--新增课程
export const couBunUpdBunCou = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['couBunUpdBunCou'],
    data,
  };
  return tools.ajax(cfg);
};

//编辑课程计划--新增课程
export const couPlanUpdCouPlan = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['couPlanUpdCouPlan'],
    data,
  };
  return tools.ajax(cfg);
};
