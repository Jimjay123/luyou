//放置接口别名和接口地址对应关系  方便统一管理
export default {
  login: '/login.json',

  getMobileCpaCode: '/mobileCaptcha/sendCaptcha', //获取验证码
  getMemLogMobCap: '/memberLogin/mobileCaptcha', //验证码登录
  putMemMobPassword: '/memberLogin/mobilePassword', //密码登陆接口
  resetPasswordMemberInfo: '/memberInfo/resetPassword', //重置密码接口
  aliAppInfAppInfo: '/alipayAppInfo/appInfo', //支付宝第三方登录 获取 公参接口
  wechatAppInfo: '/wechatAppInfo/appInfo', //微信第三方登录 获取 公参接口

  captchabindMobile: '/mobileCaptcha/bindMobile', //第三方登录，绑定手机号接口


  changeToAuthorRoleType: '/memberIdentify/changeToAuthorRoleType', //全局（老师端学生端）-信息认证
  memberidentifyRoleType: '/memberIdentify/identifyRoleType', //全局（老师端学生端）-信息认证
  couAppNewestCourses: '/courseApprove/newestCourses', //老师端-最新课程
  courseRecommendList: '/courseRecommend/list', //老师端-热门课程/同行在教/可能喜欢/推荐课程计划
  courseCoursePlanTotal: '/coursePlan/ownCoursePlanTotal', //老师端-拥有的课程计划数量
  groupownGroupTotal: '/groupInfo/ownGroupTotal', //老师端-拥有的群组数量
  universityceCount: '/universityPurchaseCourse/resourceCount', //老师端-拥有的资源库数量
  subjectMajormaTagList: '/subjectMajor/majorWithTagList', //老师端-资源库标签
  getSubMajorList: '/subjectMajor/majorList', //老师端-获取学院可选项
  getUniversityList: '/universityCustomer/universityList', //老师端-获取大学可选项

  coursestudentCourseTotal: '/coursePlan/studentCoursePlanTotal', //学生端-拥有的课程计划数量
  groupstudentJoinedTotal: '/groupMember/studentJoinedGroupTotal', //学生端-拥有的群组数量

  courseCoursePlanList: '/coursePlan/homeCoursePlanList', //老师端-展示的课程计划
  coursedeleteCoursePlan: '/coursePlan/deleteGroupsCoursePlan', //老师端-删除课程计划
  unAvailCourseList: '/universityPurchaseCourse/availCourseList', //老师端-创建课程计划展示
  unAvailresourceList: '/universityPurchaseCourse/resourceList', //老师端-创建课程计划展示

  courseownPlanList: '/coursePlan/ownCoursePlanList', //老师端-我的课程计划展示
  coursecourseDetail: '/coursePlan/planDetail', //老师端-标准课详情页
  courseplanDetail: '/coursePlan/planDetail', //老师端-课程频道详情页

  courseChannelDetail: '/courseChannel/channelDetail', //老师端-推荐频道/课程频道详情页
  courPlanDetail: '/courseInfo/courseDetail', //老师端-推荐标准课/标准课详情页

  ChannelDetail: '/coursePlan/planDetail', //老师端-推荐课程计划/课程频道详情页
  courseDetail: '/coursePlan/planDetail', //老师端-推荐课程计划/标准课详情页

  memberInfoTeacher: '/memberInfo/memberTeacher', //老师端-发布课程/基本设置调取三条数据

  memberheaderMemberInfo: '/memberInfo/headerMemberInfo', //老师端-头部用户信息
  systemheaderNoticeList: '/systemNotice/headerNoticeList', //老师端-头部系统消息
  memberIteacherIdentity: '/memberIdentify/teacherIdentity', //老师端-认证消息提交
  memberIidentifyInfo: '/memberIdentify/identifyInfo', //老师端-获取认证中的消息
  coursepartnerList: '/coursePartner/partnerList', //老师端-详情页师资介绍

  membermemberTeacher: '/memberInfo/memberTeacher', //老师端-个人中心-获取老师的信息
  memberTeacher: '/memberInfo/memberTeacher', //老师端-个人中心-修改老师的信息
  memberpassExistCheck: '/memberInfo/passwordExistCheck', //老师端-个人中心-获取用户是否有密码
  memberresetPassword: '/memberInfo/resetPassword', //老师端-个人中心-获取用户是否有密码
  mobileresetPassword: '/mobileCaptcha/resetPassword', //老师端-个人中心-密码重置
  memberInfobindInfo: '/memberInfo/bindInfo', //老师端-个人中心-用户绑定信息取得
  memberInfounbind: '/memberInfo/unbind', //老师端-个人中心-用户绑定信息取得
  courseStudentList: '/coursePlan/homeStudentCoursePlanList', //学生端-首页-课程计划
  studentCourseList: '/coursePlan/studentCoursePlanList', //学生端-首页-课程列表页
  planLearningDetail: '/planLearningState/planLearningDetail', //学生端-首页-课程列表页
  studentCenterInfo: '/studentCenter/studentInfo', //学生端-个人中心-基本信息修改
  studentInfo: '/studentCenter/studentInfo', //学生端-个人中心-基本信息获取
  studentchangeMobile: '/studentCenter/changeMobile', //学生端-个人中心-修改手机号码

  studentFeedbackWord: '/studentReport/feedback', //学生端-标准课/课程频道 反馈语接口
  planLearnStandard: '/studentCenter/studentInfo', //学生端-统计中心 -基本信息接口
  studentCoursePlan: '/studentReport/planBaseInfo', //学生端-标准课-基本课信息
  planLearnCurric: '/studentCenter/planLearningStateList', //学生端 -统计中心 -基本信息表格分页接口
  studentFeedback: '/studentCenter/feedbackData', //学生端-课程计划反馈
  studentCoursestatistics: '/studentReport/planLearningStatistic', // 学生端 -我的课程-课程计划统计数量信息
  studentCourseStep: '/studentReport/lessonChartVoList', //学生端-我的课程-标准课课程计划图表信息
  studentCurriculum: '/studentReport/courseChartVoList', // 学生端-我的课程-课程频道 课程计划图标
  studentStepSwitching: '/studentReport/lessonChartVoList', // 学生端-我的课程-课程频道 图表切换

  memInfoGetMobile: '/memberInfo/getMobile', //老师端认证--基本信息页--获取老师绑定手机号接口
  mobCapCheCaptcha: '/mobileCaptcha/checkCaptcha', //老师端认证--基本信息页--绑定手机花提交接口

  groInfOwnGroupList: '/groupInfo/ownGroupList', //老师端--获取所有群组接口
  groCouPlaCoursePlanList: '/groupCoursePlan/coursePlanList', //老师端--获取单个群课程计划接口
  groCouPlaCouPlaCouPlaSta: '/groupCoursePlan/coursePlanStatistics', //老师端--群课程计划统计
  plaStuStaPlanStuList: '/planLearningState/planStudentList', //老师端 群统计分析--获取学生课程完成情况接口
  groCouPlaCouPlaBasInfo: '/groupCoursePlan/coursePlanBaseInfo', //老师端 群统计分析--群课程计划基本信息
  groStaScoreRanges: '/groupStatistic/scoreRanges', //老师端 群统计分析--获取echarts 课程频道--成绩区间统计
  groStaScoSort: '/groupStatistic/scoreSort', //老师端 群统计分析--echarts 获取课程频道成绩排名接口
  groStaCouScoSort: '/groupStatistic/courseScoreSort', //老师端 群统计分析--echarts 获取图表标准课成绩排名
  groStaFeeBackData: '/groupStatistic/feedbackData', //老师端 群统计分析--反馈语接口
  groStaQuiScoChaData: '/groupStatistic/quizScoreChartData', //老师端 群统计分析--获取各步骤平均分接口
  groStaCouScoChaData: '/groupStatistic/courseScoreChartData', //老师端 群统计分析--各课程平均分接口
  groStaCouPlaScoAvg: '/groupStatistic/coursePlanScoreAvg', //老师端 群统计分析--课程频道平均分
  groStaCouScoAvg: '/groupStatistic/courseScoreAvg', //老师端 群统计分析--标准课平均分
  groStaCouPlaCouList: '/groupStatistic/coursePlanCourseList', //老师端 获取课程计划所有课程接口
  groStaCouScoRange: '/groupStatistic/courseScoreRange', //老师端 群统计分析--标准课成绩区间统计

  groupInfoAdd: '/groupInfo/', //老师端--新建群组接口

  groInfInv: '/groupInfo/invitationUrl', //老师端--邀请群成员接口

  // groMemGroMem: '/groupMember/groupMember', //老师端--获取所有群成员接口
  groMemGroMemList: '/groupMember/groupMemberList', //老师端--获取所有群成员接口

  groupInfo: '/groupInfo', //老师端--群组管理--提交修改群信息接口

  groJoinInvitationGroup: '/groupInfo/joinInvitationGroup', //链接进入- 加入群信息
  groQueryInvitationGroup: '/groupInfo/queryInvitationGroup', //链接进入- 获取群信息

  groMemRemMem: '/groupMember/removeMember', //老师端--群组管理--移除群成员接口
  groInfDisGro: '/groupInfo/dismissGroup', //老师端--群组管理--解散群组接口
  groMemCanRemove: '/groupMember/cancelRemove', //老师端--群组管理--移除学生撤回
  groMemApplyList: '/groupMember/applyList', //老师端--获取入群申请列表
  groMemApproveSingle: '/groupMember/approveSingle', //老师端--单个审批入群
  groMemApproveBatch: '/groupMember/approveBatch', //老师端--批量审批入群

  putFileAvatarUpload: '/file/avatarUpload', //老师端--认证信息--头像上传
  fileupdateFileInfo: '/file/updateFileInfo', //npe--视频回调
  putFileCourseImageUpload: '/coursePageMedia/imageUpload', //npe编辑器--图片上传
  PageMediavideoUpload: '/coursePageMedia/videoUpload', //npe编辑器--视频上传
  ImageDeleteCourseImages: '/coursePageMedia/logicDeleteImage', //npe编辑器--图片删除
  PageMedialogicDeleteVideo: '/coursePageMedia/logicDeleteVideo', //npe编辑器--视频删除
  memIdeIdeInfo: '/memberIdentify/identifyInfo', //老师端--获取认证信息

  putTeachersMessage: '/memberIdentify/teacherIdentity', //教师端认证信息--提交接口
  studentIdentity: '/memberIdentify/studentIdentity', //学生端认证信息
  groupInfoList: '/groupInfo/ownGroupList', //老师拥有的群

  couChaChaRef: '/courseChannel/channelRef', //编辑课程--获取课程频道模板信息--接口
  courPlaCouPlaDetail: '/coursePlan/coursePlanDetail', //编辑课程--获取课程频道模板信息--接口
  couPlaSavForCouChannel: '/coursePlan/saveFromCourseChannel', //编辑课程--保存编辑课程
  uniPurAvaCouList: '/universityPurchaseCourse/availCourseList', //添加课程--获取课程列表
  couPlaPlaBasInfo: '/coursePlan/planBaseInfo', //创建课程计划--基础信息--保存或发布
  getCouPlaPlaBasInfo: '/coursePlan/planBaseInfo', //创建课程计划--基础信息--获取群组基本信息设置
  couPlaSavForCourse: '/coursePlan/saveFromCourse', //创建课程计划--基础信息--单一标准课保存 发布
  couBunUpdBunCou: '/courseBundle/updBundleCourse', //编辑课程频道--新增课程接口
  couBunUpdBunBundle: '/courseBundle/updCourseBundle', //编辑课程频道--新建竖版接口
  couPlanUpdCouPlan: '/coursePlan/updateCoursePlan', //编辑课程频道--编辑课程频道提交

  systemNotice: '/systemNotice/noticeList', //系统消息列表
  recentSystemNotice: '/systemNotice/headerNoticeList', //导航栏上的系统消息列表

  //老师端  个人中心
  getGroStaTeaDetail: '/groupStatistic/headerTeacherDetail', //老师端个人中心 获取基本信息接口
  groStaGroInfVoList: '/groupStatistic/groupInfoVoList', //老师端个人中心 获取课程完成情况列表数据
  groStaGroFeeBack: '/groupStatistic/groupFeedback', //老师端个人中心 获取反馈语接口

  //学生端--群组接口
  stuGroJoinGroList: '/studentGroup/joinedGroupList', //获取学生加入的群列表
  stuGroSeaGroup: '/studentGroup/searchGroup', //学生端--搜索群
  stuGroJoinGroup: '/studentGroup/joinGroup', //学生端--加群接口
  stuGroPlaLeaStaList: '/studentGroup/planLearningStateList', //学生端--群课程计划列表
  stuGroPlaTotStatistic: '/studentGroup/planTotalStatistic', //学生端--获取学生课程计划数量
  groInfoInvUrl: '/groupInfo/invitationUrl', //学生端--获取邀请成员链接
  groMemQuiGroup: '/groupMember/quitGroup', //学生端--退出群组接口

  memIdeStuIdentity: '/memberIdentify/studentIdentity', //学生端认证提交接口

  putStudentCreaterReport: '/courseLearningState/learningStop', //学生学习页--生成报告接口
  getStudentDetails: '/courseLearningState/learningState', //学生学习页--获取学生报告详情接口 //首页

  /*创作者端*/
  uploadFileSpeed: '/file/courseUpload', //首页上传文件接口
  getCourAndChaAmount: '/courseInfo/ownCourseAndChannelAmount', //创作者端首页 获取用户课程统计数据
  editCouOrChaName: '/courseInfo/editCourseOrChannelName', //创作者端首页 修改课程名称
  delCouLogDel: '/courseInfo/logicDelete', //创作者端首页 删除课程
  systemNoticeTotal: '/systemNotice/noticeTotal', //创作者端首页 用户系统消息提醒
  copyCouInfoFroOther: '/courseInfo/copyFromOther', //创作者端首页 复制课程或课程计划

  // 创作者端 创建课程频道
  creatorMajorList: '/subjectMajor/majorList', //编辑课程频道--编辑课程频道提交
  courseListForChannel: '/courseInfo/courseListForChannel', //添加课程--获取课程列表
  creatorCourseChannelDetail: '/courseChannel/courseChannelDetail', //查看课程频道详情
  saveCourseChannel: '/courseChannel/saveCourseChannel', //创建新的课程频道-保存
  updateCourseChannel: '/courseChannel/updateCourseChannel', //创建新的课程频道-更新
  ownCourseAndChannelList: '/courseInfo/ownCourseAndChannelList', //创建新的课程频道
  physicalDelete: '/courseInfo/physicalDelete', //回收站彻底删除课程
  recovery: '/courseInfo/recovery', //回收站恢复课程
  ownCourseAndChannelTotal: '/courseInfo/ownCourseAndChannelTotal', //回收站--获取全部

  ownRecentRevisionList: '/courseInfo/ownRecentRevisionList', //最近修改页面数据
  ownRecentRevisionAmount: '/courseInfo/ownRecentRevisionAmount', //最近修改页面tab显示数据

  //创作者端基础信息设置页
  popFileImageUpload: '/file/popularizeImageUpload', //创作者端基础信息设置--推广图片上传
  memTeaSelIntro: '/memberTeacher/selfIntro', //创作者端基础信息设置--讲师简介
  subMajorList: '/subjectMajor/majorList', //创作者端基础信息设置--获取专业列表
  creatorBaseTagList: '/subjectMajor/majorTagRelList', //创作者端基础信息设置--获取标签列表
  getCouBaseInfo: '/courseInfo/courseBaseInfo', //创作者端基础信息设置--获取基本信息
  getCouChaBaseInfo: '/courseChannel/courseChannelBaseInfo', //创作者端基础信息设置--课程频道--获取基本信息
  getParPartnerList: '/partner/partnerList', //创作者端基础信息设置--标准课--获取可选老师列表
  productPublish: '/product/publish ', //创作者端基础信息设置--标准课--获取可选老师列表

  memberTeacherAuthorList: '/memberTeacher/authorList', //创作者端基础信息设置--转审获取转审人信息
  courseExpressCourseList: '/courseExpress/courseList', //创作者端首页转审课程页面信息接口
  courseExpressModifyExpress: '/courseExpress/modifyExpress', //创作者端转审课程页面转审课程接口
  productExpress: '/product/express', //创作者端首页转审课程接口
  productCheckProductComplete: '/product/checkProductComplete', //创作者端首页转审课程页面发布按钮接口
  courseExpressProductAmount: '/courseExpress/productAmount', //创作者端转审课程页面筛选类型接口

  //编辑器--背景图片上传获取
  editorResImaUpload: '/resourceLibrary/imageUpload', //背景图片上传
  getEditResBackImg: '/resourceLibrary/backgroundImageList', //获取背景图片数据
  delEditResBackImg: '/resourceLibrary/logicDeleteImage', //删除背景图接口
  editorResDefImg: '/resourceLibrary/defaultImageList', //配图查询接口

  buildNewNpeCourse: '/courseOperate/newNpeCourse', //新建npe课程

  changeNpeCouName: '/coursePageContent/updateCourseName', //npe课程名称修改
  editAddNewPage: '/coursePageContent/newPage', //编辑器新增画板

  getAllPageInfoList: '/courseOperate/getNpeCourseData', //编辑器所有画板信息查询接口

  attachUpload: '/coursePageMedia/attachUpload', //编辑器--文档上传

  changeCouUpdPageContent: '/courseOperate/npeCourseNewOperate', //编辑器画板信息修改

  logicDeleteAttach: '/coursePageMedia/logicDeleteAttach', //编辑器--文档上传--删除文件接口
  delCouConLogPage: '/coursePageContent/logicDeletePage', //编辑器----删除画板
  copyEditFormPage: '/coursePageContent/copyFromPage', //编辑器----复制
  updateRadioPageMedia: '/coursePageMedia/radioUpload', //录音文件上传
  delPageMediaRadio: '/coursePageMedia/logicDeleteRadio', //删除录音

  preNpeCouOperate: '/courseOperate/previousNpeCourseOperate',
  nextNpeCouOperate: '/courseOperate/nextNpeCourseOperate',
  confirmNpeCourseData: '/courseOperate/confirmNpeCourseData', //npe 去发布接口
  previewNpeCourseData: '/npeCourse/previewNpeCourseData', //npe预览页 创作者端-接口
  npeCourseData: '/npeCourse/npeCourseData', //npe预览页 老师端-预览接口/学生端-预览接口
  npeCourseLearningState: '/npeCourseLearning/npeCourseLearningState', //npe预览页 学生端-学习接口



  // 沙盘接口
  universityAvailCourseList: '/courseInfo/courseListForChannel', //添加课程--获取课程列表
  // universityAvailCourseList:
  //   '/universityPurchaseCourse/availCourseListForSandTable', //添加课程--获取课程列表
  OperatenewStCourse: '/stCourseOperate/newStCourse', //创建沙盘标准课接口
  OperatenewbindStandard: '/stCourseOperate/bindStandardCourse', //沙盘标准课内容数据
  OperateNewOperate: '/stCourseOperate/stCourseNewOperate', //沙盘标准课内容数据
  OperateStCourseData: '/stCourseOperate/getStCourseData', //沙盘标准课获取保存后的数据
  nextStCourseOperate: '/stCourseOperate/nextStCourseOperate', //沙盘标准课重做
  previousStCourseOperate: '/stCourseOperate/previousStCourseOperate', //沙盘标准课撤销
  OperateconfirmData: '/stCourseOperate/confirmStCourseData', //沙盘标准课发布
  stCoursestCourseData: '/stCourse/stCourseData', //沙盘课程预览 老师端和学生端
  CoursepreviewStCourse: '/stCourse/previewStCourseData', //沙盘课程预览 创作者端

  newStChannel: '/stChannelOperate/newStChannel', //创建沙盘课程频道接口-默认
  stChannelSceneUpload: '/file/stChannelSceneUpload', //创建沙盘课程频道接口-上传背景
  stCourseSceneUpload: '/file/stCourseSceneUpload', //创建沙盘课程频道接口-上传背景
  stChannelNewOperate: '/stChannelOperate/stChannelNewOperate', //创建沙盘课程频道接口-新增操作步骤   POST

  nextStChannelOperate: '/stChannelOperate/nextStChannelOperate', //创建沙盘课程频道接口-下一步   put
  previousStChannelOperate: '/stChannelOperate/previousStChannelOperate', //创建沙盘课程频道接口-上一步   put
  getStChannelData: '/stChannelOperate/getStChannelData', //创建沙盘课程频道接口-刷新   get
  confirmStChannelData: '/stChannelOperate/confirmStChannelData', //创建沙盘课程频道接口-去发布   post
  previewStChannelData: '/stChannel/previewStChannelData', //创建沙盘课程频道接口-去预览   get
  stChannelData: '/stChannel/stChannelData', //沙盘课程频道接口-学生端去预览   get

  sandTablePlanLearningState: '/sandTablePlanLearning/sandTablePlanLearningState', //沙盘课程频道接口-学生端去学习  get
  stCourseBaseInfo: '/studentReport/courseBaseInfo', //学生端--标准课报告详情页  get
  courseLearningState: '/planLearningState/courseLearningState', //学生端--课程计划中某个课程的学习 情况  get
}
