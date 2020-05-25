import {
  tools
} from '@/utils/tools.js'
import url from './url'
import axios from 'axios'

//上传文件接口
export const uploadFileSpeed = (data, onUploadProgress, cancelToken) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['uploadFileSpeed'],
    //headers: { "Content-Type": "multipart/form-data" },
    'Content-Type': 'multipart/form-data',
    onUploadProgress: progressEvent => {
      onUploadProgress(progressEvent)
    },
    cancelToken: new axios.CancelToken(cancel => {
      cancelToken(cancel)
    }),
    data,
    timeout: 0
  }
  return tools.ajax(cfg)
}

//上传视频接口
export const PageMediavideoUpload = (data, onUploadProgress, cancelToken) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['PageMediavideoUpload'],
    //headers: { "Content-Type": "multipart/form-data" },
    'Content-Type': 'multipart/form-data',
    onUploadProgress: progressEvent => {
      onUploadProgress(progressEvent)
    },
    cancelToken: new axios.CancelToken(cancel => {
      cancelToken(cancel)
    }),
    data,
    timeout: 0
  }
  return tools.ajax(cfg)
}

//上传图片接口
export const putFileCourseImageUpload = (data, onUploadProgress, cancelToken) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['putFileCourseImageUpload'],
    //headers: { "Content-Type": "multipart/form-data" },
    'Content-Type': 'multipart/form-data',
    onUploadProgress: progressEvent => {
      onUploadProgress(progressEvent)
    },
    cancelToken: new axios.CancelToken(cancel => {
      cancelToken(cancel)
    }),
    data,
    timeout: 0
  }
  return tools.ajax(cfg)
}

//npe编辑器--图片删除
export const ImageDeleteCourseImages = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    'Content-Type': 'multipart/form-data',
    url: url['ImageDeleteCourseImages'],
    data
  }
  return tools.ajax(cfg)
}

//npe编辑器--视频删除
export const PageMedialogicDeleteVideo = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    'Content-Type': 'multipart/form-data',
    url: url['PageMedialogicDeleteVideo'],
    data
  }
  return tools.ajax(cfg)
}

export const memberheaderMemberInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberheaderMemberInfo'],
    data
  }
  return tools.ajax(cfg)
}

// 首页/最近修改/回收站 查询课程
export const ownCourseAndChannelList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['ownCourseAndChannelList'],
    data
  }
  return tools.ajax(cfg)
}

// 首页查询课程频道
export const courseChannelDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseChannelDetail'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页 获取用户课程统计数据
export const getCourAndChaAmount = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getCourAndChaAmount'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页 编辑课程名称
export const editCouOrChaName = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['editCouOrChaName'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页 删除课程
export const delCouLogDel = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['delCouLogDel'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端回收站彻底删除课程
export const physicalDelete = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['physicalDelete'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端回收站彻底删除课程
export const recovery = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['recovery'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页 用户系统消息提醒
export const systemNoticeTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['systemNoticeTotal'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页 复制课程或课程计划
export const copyCouInfoFroOther = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['copyCouInfoFroOther'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--修改
export const popFileImageUpload = data => {
  //接口公参添加
  let cfg = {
    url: url['popFileImageUpload'],
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data,
    timeout: 0
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--讲师简介
export const memTeaSelIntro = data => {
  //接口公参添加
  let cfg = {
    url: url['memTeaSelIntro'],
    method: 'get',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--获取专业列表
export const subMajorList = data => {
  //接口公参添加
  let cfg = {
    url: url['subMajorList'],
    method: 'get',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--获取标签列表
export const creatorBaseTagList = data => {
  //接口公参添加
  let cfg = {
    url: url['creatorBaseTagList'],
    method: 'get',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--标准课--获取基础信息
export const getCouBaseInfo = data => {
  //接口公参添加
  let cfg = {
    url: url['getCouBaseInfo'],
    method: 'get',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--标准课--提交基本信息接口
export const putCouBaseInfo = data => {
  //接口公参添加
  let cfg = {
    url: url['getCouBaseInfo'],
    method: 'put',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--课程频道--获取基础信息
export const getCouChaBaseInfo = data => {
  //接口公参添加
  let cfg = {
    url: url['getCouChaBaseInfo'],
    method: 'get',
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--课程频道--提交基本信息接口
export const putCouChaBaseInfo = data => {
  //接口公参添加
  let cfg = {
    url: url['getCouChaBaseInfo'],
    method: 'put',
    data
  }
  return tools.ajax(cfg)
}

//最近修改页面tab显示数据
export const ownRecentRevisionAmount = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['ownRecentRevisionAmount'],
    data
  }
  return tools.ajax(cfg)
}

//最近修改页面tab显示数据
export const ownRecentRevisionList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['ownRecentRevisionList'],
    data
  }
  return tools.ajax(cfg)
}

//回收站 全部信息
export const ownCourseAndChannelTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['ownCourseAndChannelTotal'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--标准课--获取可选老师列表
export const getParPartnerList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getParPartnerList'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端基础信息设置--转审获取转审人信息
export const memberTeacherAuthorList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberTeacherAuthorList'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页转审课程页面信息接口
export const courseExpressCourseList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseExpressCourseList'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页转审课程接口
export const courseExpressModifyExpress = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['courseExpressModifyExpress'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端转审课程页面转审课程接口
export const productPublish = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['productPublish'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页转审课程接口
export const productExpress = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['productExpress'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端首页转审课程页面发布按钮接口
export const productCheckProductComplete = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['productCheckProductComplete'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端转审课程页面筛选类型接口
export const courseExpressProductAmount = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseExpressProductAmount'],
    data
  }
  return tools.ajax(cfg)
}
