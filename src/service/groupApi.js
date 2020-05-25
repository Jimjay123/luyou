import {
  tools
} from '@/utils/tools'
import url from './url'

//老师端--新建群组提交接口
export const groupInfoSave = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['groupInfoSave'],
    data
  }
  return tools.ajax(cfg)
}
//老师端-认证中
export const memberidentifyRoleType = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberidentifyRoleType'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-改变身份
export const changeToAuthorRoleType = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['changeToAuthorRoleType'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-最新课程
export const couAppNewestCourses = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['couAppNewestCourses'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-热门课程/同行在教/可能喜欢/推荐课程计划
export const courseRecommendList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseRecommendList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-拥有的课程计划数量
export const courseCoursePlanTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseCoursePlanTotal'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-拥有的群组数量
export const groupownGroupTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groupownGroupTotal'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-拥有的课程计划数量
export const coursestudentCourseTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['coursestudentCourseTotal'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-拥有的资源库数量
export const universityceCount = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['universityceCount'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-拥有的资源库标签
export const subjectMajormaTagList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['subjectMajormaTagList'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-拥有的群组数量
export const groupstudentJoinedTotal = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groupstudentJoinedTotal'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-展示的课程计划
export const courseCoursePlanList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseCoursePlanList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-展示的课程计划
export const coursedeleteCoursePlan = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['coursedeleteCoursePlan'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-创建课程计划展示
export const unAvailCourseList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    timeout: 4000,
    url: url['unAvailCourseList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-创建课程计划展示
export const unAvailresourceList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    timeout: 4000,
    url: url['unAvailresourceList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-我的课程计划展示
export const courseownPlanList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseownPlanList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-标准课详情页
export const coursecourseDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['coursecourseDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-详情页师资介绍
export const coursepartnerList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['coursepartnerList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-详情页师资介绍
export const memberRecommenList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberRecommenList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-课程频道详情页
export const courseplanDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseplanDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-推荐频道/课程频道详情页
export const courseChannelDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseChannelDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-推荐频道/标准课详情页
export const courPlanDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courPlanDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-推荐课程计划/课程频道详情页
export const ChannelDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['ChannelDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-推荐课程计划/标准课详情页
export const courseDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-推荐课程计划/标准课详情页
export const memberInfoTeacher = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberInfoTeacher'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-头部用户信息
export const memberheaderMemberInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberheaderMemberInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-认证消息提交
export const memberIteacherIdentity = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberIteacherIdentity'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-获取认证中的消息
export const memberIidentifyInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberIidentifyInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-获取老师的信息
export const membermemberTeacher = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['membermemberTeacher'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-修改老师的信息
export const memberTeacher = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['memberTeacher'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-获取用户是否有密码
export const memberpassExistCheck = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberpassExistCheck'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-添加密码
export const memberresetPassword = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['memberresetPassword'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-重置密码
export const mobileresetPassword = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['mobileresetPassword'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-用户绑定信息取得
export const memberInfobindInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memberInfobindInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-个人中心-微信支付宝解绑
export const memberInfounbind = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['memberInfounbind'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-首页-课程计划
export const courseStudentList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseStudentList'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-首页-课程计划列表页
export const studentCourseList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCourseList'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-首页-标准课详情页
export const planLearningDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['planLearningDetail'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-个人中心-基本信息获取
export const studentCenterInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCenterInfo'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-个人中心-基本信息修改
export const studentInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['studentInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-头部系统消息
export const systemheaderNoticeList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['systemheaderNoticeList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--认证信息--头像上传
export const putFileAvatarUpload = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    url: url['putFileAvatarUpload'],
    data
  }
  return tools.ajax(cfg)
}


//老师端--认证信息
export const putTeachersMessage = data => {
  let cfg = {
    method: 'post',
    url: url['putTeachersMessage'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--群组管理--移除学生接口
export const groMemRemMem = data => {
  let cfg = {
    method: 'put',
    url: url['groMemRemMem'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--认证信息
export const studentIdentity = data => {
  let cfg = {
    method: 'post',
    url: url['studentIdentity'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--群组管理--解散群组接口
export const groInfDisGro = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['groInfDisGro'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--群组管理--提交修改群信息接口
export const groupInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['groupInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--获取所有群组接口
export const groInfOwnGroupList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groInfOwnGroupList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--获取单个群课程计划接口
export const groCouPlaCoursePlanList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groCouPlaCoursePlanList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--群课程计划统计
export const groCouPlaCouPlaCouPlaSta = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groCouPlaCouPlaCouPlaSta'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--新建群组接口
export const groupInfoAdd = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['groupInfoAdd'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--邀请群成员接口
export const groInfInv = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groInfInv'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--获取所有群成员接口
export const groMemGroMemList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groMemGroMemList'],
    data
  }
  return tools.ajax(cfg)
}

//老师拥有的群
export const groupInfoList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groupInfoList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--移除学生撤回接口
export const groMemCanRemove = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['groMemCanRemove'],
    data
  }
  return tools.ajax(cfg)
}

//老师获取入群申请列表
export const groMemApplyList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groMemApplyList'],
    data
  }
  return tools.ajax(cfg)
}

//老师单个审批入群
export const groMemApproveSingle = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['groMemApproveSingle'],
    data
  }
  return tools.ajax(cfg)
}

//老师批量审批入群
export const groMemApproveBatch = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['groMemApproveBatch'],
    data
  }
  return tools.ajax(cfg)
}

// 链接进入-获取加入群组信息
export const groJoinInvitationGroup = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['groJoinInvitationGroup'],
    data
  }
  return tools.ajax(cfg)
}
// 链接进入-获取分享群组信息
export const groQueryInvitationGroup = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groQueryInvitationGroup'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端-统计中心-基本信息
export const planLearnStandard = data => {
  // 接口公参添加
  let cfg = {
    method: 'get',
    url: url['planLearnStandard'],
    data
  }
  return tools.ajax(cfg)
}

//学生端 -统计中心 -基本信息表格分页
export const planLearnCurric = data => {
  // 接口公参添加
  let cfg = {
    method: 'get',
    url: url['planLearnCurric'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-课程计划反馈
export const studentFeedback = data => {
  // 接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentFeedback'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-标准课-基本课信息
export const studentCoursePlan = data => {
  // 接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCoursePlan'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端 -我的课程-课程计划统计数量信息
export const studentCoursestatistics = data => {
  // 接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCoursestatistics'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-我的课程-标准课课程计划图表信息
export const studentCourseStep = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCourseStep'],
    data
  }
  return tools.ajax(cfg)
}

//学生端-我的课程-课程频道 课程计划图标
export const studentCurriculum = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentCurriculum'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端-我的课程-课程频道 图表切换
export const studentStepSwitching = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentStepSwitching'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端-标准课/课程频道 反馈语接口
export const studentFeedbackWord = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['studentFeedbackWord'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端-标准课/课程频道 反馈语接口
export const captchabindMobile = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['captchabindMobile'],
    data
  }
  return tools.ajax(cfg)
}

// 学生端-课程计划中某个课程的学习
export const courseLearningState = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseLearningState'],
    data
  }
  return tools.ajax(cfg)
}
