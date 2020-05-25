import {tools} from '@/utils/tools';
import url from './url'

//去学习页--查询学生学习情况
export const getStudentDetails = (data) => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getStudentDetails'],
    data,
  };
  return tools.ajax(cfg);
};

//去学习页--生成学习报告
export const putStudentCreaterReport = (data) => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['putStudentCreaterReport'],
    data,
  };
  return tools.ajax(cfg);
};
