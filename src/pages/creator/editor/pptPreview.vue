<template>
  <div class="pptPreview">
    <!-- topHeader start -->
    <div class="topHeader">
      <a href="javascript:;" @click="goExit">返回</a>
      <!-- <a href="javascript:history.back(-1)">退出</a> -->
      <p>{{courseName}}</p>
    </div>
    <!-- topHeader start -->

    <!-- leftNav start -->
    <div class="leftNav">
      <Vuescroll :ops="ops">
        <ul class="clearfix ulList">
          <li
            :class="[{item:true},{'active':editIndex===index?true:false}]"
            v-for="(item,index) in previewEditList"
            :key="index"
            @click="selectSketFun(item,index)"
          >
            <PptPreTemplate class="scale br64">
              <!--标题画板 start-->
              <ShowTitleSket class="br64" v-if="item.type==='title'" :index="index" />
              <!--标题画板 end-->

              <!-- 图+文 start -->
              <ShowPictureUpload class="br64" v-if="item.type==='imageText'" :index="index" />
              <!-- 图+文 end -->

              <!-- 文档编辑 start-->
              <ShowTextIntroduce class="br64" v-else-if="item.type==='text'" :index="index" />
              <!-- 文档编辑 end-->

              <!--选择题画板 start-->
              <ShowChoiceQuestionSket
                class="br64"
                v-else-if="item.type==='choiceQuestion'"
                :index="index"
              />
              <!--选择题画板 end-->

              <!-- 文档上传 start -->
              <ShowDocUpload class="br64" v-else-if="item.type==='file'" :index="index" />
              <!-- 文档上传 end -->

              <!-- 视频上传 start-->
              <ShowVideoUpload class="br64" v-else-if="item.type==='video'" :index="index" />
              <!-- 视频上传 end-->

              <!-- 图片 start -->
              <ShowImageUpload class="br64" v-else-if="item.type==='image'" :index="index" />
              <!-- 图片 end -->
              <div class="mask">
                <img
                  :src="require('../../../assets/creator/editor/hover-check.svg')"
                  alt
                  v-if="item.finishFlag===false"
                />
                <!--  v-if="item.look === false || finishFlag===false" -->
                <img
                  :src="require('../../../assets/creator/editor/click-check.svg')"
                  alt
                  v-else-if="item.finishFlag===true"
                />
              </div>
            </PptPreTemplate>
            <div class="pageNum">
              <p>{{index+1}}</p>
            </div>
          </li>
        </ul>
      </Vuescroll>
    </div>
    <!-- leftNav start -->

    <!-- rightPage start -->
    <div class="rightPage">
      <div class="progressBar">
        <div class="readed" :style="{width:(progress||0)+'%'}"></div>
      </div>
      <div class="main">
        <div id="pptBox">
          <PptPreTemplate :style="scaleFun">
            <!--标题画板 start-->
            <!-- <TitleSket v-if="type==='title'" /> -->
            <ShowTitleSket v-if="type==='title'" :index="editIndex" />
            <!--标题画板 end-->

            <!-- 图+文 start -->
            <!-- <PictureUpload v-else-if="type==='imageText'" /> -->
            <ShowPictureUpload v-if="type==='imageText'" :index="editIndex" />
            <!-- 图+文 end -->

            <!-- 文档编辑 start-->
            <!-- <TextIntroduce v-else-if="type==='text'" /> -->
            <ShowTextIntroduce v-else-if="type==='text'" :index="editIndex" />
            <!-- 文档编辑 end-->

            <!--选择题画板 start-->
            <!-- <ChoiceQuestionSket v-else-if="type==='choiceQuestion'" /> -->
            <ShowChoiceQuestionSket v-else-if="type==='choiceQuestion'" :index="editIndex" />
            <!--选择题画板 end-->

            <!-- 文档上传 start -->
            <!-- <DocUpload v-else-if="type==='file'"></DocUpload> -->
            <ShowDocUpload v-else-if="type==='file'" />
            <!-- 文档上传 end -->

            <!-- 视频上传 start-->
            <!-- <VideoUpload v-else-if="type==='video'" /> -->
            <ShowVideoUpload v-else-if="type==='video'" :index="editIndex" />
            <!-- 视频上传 end-->

            <!-- 图片上传 end-->
            <ShowImageUpload v-else-if="type==='image'" :index="editIndex" />
            <!-- 图片上传 end-->

            <!-- 音频播放 start-->
            <div class="audioBox" v-if="radioServerUrl">
              <img
                class="audioImg"
                :src="require('../../../assets/creator/editor/icon-audio.svg')"
                alt
              />
              <audio controlslist="nodownload" controls="controls" :src="radioServerUrl"></audio>
              <!-- <audio
                controlslist="nodownload"
                controls="controls"
                src="http://ting6.yymp3.net:86/new27/underlover/3.mp3"
              ></audio>-->
              <!-- src="http://ting6.yymp3.net:86/new27/underlover/3.mp3" -->
            </div>
            <!-- 音频播放 end -->

            <!-- arrow 下一页 -->
            <div class="arrow clearfix" v-if="preWord=='3'">
              <div class="left" @click="goFront(editIndex)" v-if="editIndex!==0">
                <img :src="require('../../../assets/creator/editor/left-arrow.svg')" alt />
              </div>
              <div class="right" v-if="showPrompt===0" @click="goNext(editIndex)">
                <p>下一页</p>
                <img :src="require('../../../assets/creator/editor/right-arrow.svg')" alt />
              </div>
              <div class="right" v-if="showPrompt===1" @click="clickPrompt(editIndex)">
                <p
                  style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);"
                >提交</p>
              </div>
            </div>
            <div class="arrow clearfix" v-else-if="preWord=='1'  || preWord=='2' ">
              <div class="left" @click="goFront(editIndex)" v-if="editIndex!==0&&showPrompt===0">
                <img :src="require('../../../assets/creator/editor/left-arrow.svg')" alt />
              </div>
              <div class="right" v-if="showPrompt===0" @click="goNext(editIndex)">
                <p>下一页</p>
                <img :src="require('../../../assets/creator/editor/right-arrow.svg')" alt />
              </div>
              <div class="right" v-if="showPrompt===1" @click="goFront(editIndex)">
                <p style="margin-left: 20px;">上一页</p>
                <img
                  style="left: 8px;"
                  :src="require('../../../assets/creator/editor/left-arrow.svg')"
                  alt
                />
              </div>
            </div>
            <!-- arrow 上一页 -->

            <!-- 弹框start -->
            <div v-if="showDailog===1">
              <div class="layer"></div>
              <div class="tipsDailog" v-Clickoutside="()=>{outsideClick()}">
                <img :src="require('../../../assets/creator/editor/correct.svg')" alt />
                <p class="p1">太棒了！你已经顺利学完了该课程</p>
                <a class="btn" href="javascript:;" @click="checkReport">查看报告</a>
              </div>
            </div>

            <!-- 弹框end -->
          </PptPreTemplate>
        </div>
      </div>
    </div>
    <!-- rightPage end -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import TitleSket from "./titleSket";
import ImageUpload from "./imageUpload";
import TextIntroduce from "./textIntroduce";
import PictureUpload from "./PictureUpload";
import PptPreTemplate from "./pptPreTemplate";
import DocUpload from "./docUpload";
import VideoUpload from "./videoUpload";
import ChoiceQuestionSket from "./choiceQuestionSket";

//new
import ShowTitleSket from "./showTitleSket";
import ShowPictureUpload from "./showPictureUpload";
import ShowTextIntroduce from "./showTextIntroduce";
import ShowVideoUpload from "./showVideoUpload";
import ShowDocUpload from "./showDocUpload";
import ShowImageUpload from "./showImageUpload";
import ShowChoiceQuestionSket from "./showChoiceQuestionSket";
import {
  changeCouUpdPageContentFun,
  listMap
} from "../../../service/editor/editorAction";
import {
  getAllPageInfoList,
  previewNpeCourseData,
  npeCourseData,
  npeCourseLearningState
} from "../../../service/editor/editorApi";
import { putStudentCreaterReport } from "../../../service/studentApi";
import { Action, State, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../../utils/utils";
import Vuescroll from "vuescroll";
import store from "../../../store";
const EditMod = namespace("edit");
@Component({
  name: "pptPreview",
  directives: {
    Clickoutside
  },
  components: {
    TitleSket,
    ImageUpload,
    TextIntroduce,
    PictureUpload,
    PptPreTemplate,
    DocUpload,
    VideoUpload,
    ChoiceQuestionSket,
    // new
    ShowTitleSket,
    ShowPictureUpload,
    ShowTextIntroduce,
    ShowVideoUpload,
    ShowDocUpload,
    ShowImageUpload,
    ShowChoiceQuestionSket,
    Vuescroll
  }
})
export default class PptPreview extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  @EditMod.State("courseInfo") courseInfo; //当前课程基本信息
  @EditMod.Action("courseInfoHandle") courseInfoHandle; //当前课程基本信息  action

  @EditMod.State("startTime") startTime; //npe预览页开始时间
  @EditMod.Action("startTimeHandle") startTimeHandle; //npe预览页开始时间  action

  @EditMod.State("endTime") endTime; //npe预览页结束时间
  @EditMod.Action("endTimeHandle") endTimeHandle; //npe预览页结束时间  action

  @EditMod.State("lastIndex") lastIndex; //获取上一次点击index
  @EditMod.Action("lastIndexHandle") lastIndexHandle; //获取上一次点击index  action

  @EditMod.State("courseName") courseName; //课程名称
  @EditMod.Action("courseNameHandle") courseNameHandle; //课程名称  action

  @EditMod.State("courseStateId") courseStateId; //课程学习id
  @EditMod.Action("courseStateIdHandle") courseStateIdHandle; //课程学习id  action

  @EditMod.State("planStateId") planStateId; //计划学习id
  @EditMod.Action("planStateIdHandle") planStateIdHandle; //计划学习id  action

  @EditMod.State("courseLearningStateId") courseLearningStateId; //学生端去学习id
  @EditMod.Action("courseLearningStateIdHandle") courseLearningStateIdHandle; //学生端去学习id  action

  //课程名称
  get courseName() {
    return this.courseInfo.courseName || "";
  }
  get type() {
    return this.previewEditList[this.editIndex].type;
  }
  get editListLength() {
    return this.previewEditList.length;
  }
  get isLook() {
    return this.previewEditList[this.editIndex].look;
  }

  //文件上传状态
  get uploadStatus() {
    return this.previewEditList[this.editIndex].leftSket.uploadStatus;
  }

  //音频文件地址
  get radioServerUrl() {
    return this.previewEditList[this.editIndex].rightNav.radioServerUrl || "";
  }

  get finishFlag() {
    return this.previewEditList[this.editIndex].finishFlag;
  }

  progress = 0;
  addShow = false;
  checkNum = 0; //1 未点击or未阅读 2 点击or已阅读
  showPrompt = 0; //0 显示下一步 1显示提交
  showDailog = 0; //0 不显示 1显示
  showList = []; //左侧边栏
  screenWidth = 0; //屏幕宽度
  screenHeight = 0; //屏幕高度
  realW = 0; //自适应宽
  realH = 0; //自适应高
  scaleW = 0; //自适应缩放宽度
  scaleH = 0; //自适应缩放高度
  preWord = 1; //是否预览
  proList = [0]; //进度条list
  ProIndex;
  count = 0; //判断是否是第一次点击

  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: true,
      background: "#00000033",
      //opacity: 0,
      hoverStyle: true,
      specifyBorderRadius: false,
      minSize: false,
      size: "7px",
      disable: false
    },
    scrollPanel: {
      scrollingX: true,
      initialScrollY: 0
    }
  }; //滚动条设置

  // 退出
  @Emit goExit() {
    console.log(this.$route.query);
    let url = this.$route.query.address;
    console.log(url);
    if (url) {
      this.$router.push({
        path: url,
        query: {
          addCourseType: this.$route.query.addCourseType,
          courseChannelId: this.$route.query.courseChannelId
        }
      });
    } else {
      this.$router.go(-1);
    }
  }

  //选中画板
  @Emit selectSketFun(item, index) {
    // 计算是否是第一次点击
    this.count++;
    // 当前item 开始时间
    // 1.点击结束时间,计算时间差 存进数组中
    let time = new Date().getTime();
    this.endTimeHandle({
      endTime: time
    });
    let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
    timeDiff = timeDiff > 1 ? timeDiff : 1;

    // 第一次点击 将时间添加到第一个模板中
    if (this.count === 1) {
      // 当第一次点击的时候 index固定是0
      let dataList = cloneObj(this.previewEditList);
      dataList[0].cumulativeTime = timeDiff;
      dataList[0].finishFlag = true;
      dataList[0].finishPercent = 100;
      this.previewEditListHandle({
        previewEditList: dataList
      });
    } else {
      // 非第一次点击
      let dataList1 = cloneObj(this.previewEditList);
      // 判断两次点击index是否相同
      let objResult = this.lastIndex === index ? true : false;
      if (objResult) {
        let oldTimeDiff1 = dataList1[this.lastIndex].cumulativeTime || 0;
        let resultTime = timeDiff > oldTimeDiff1 ? timeDiff : oldTimeDiff1;
        dataList1[this.lastIndex].cumulativeTime = resultTime;
        dataList1[this.lastIndex].finishFlag = true;
        dataList1[this.lastIndex].finishPercent = 100;
        this.previewEditListHandle({
          previewEditList: dataList1
        });
      } else {
        let oldTimeDiff2 = dataList1[this.lastIndex].cumulativeTime || 0;
        let resultTime = timeDiff > oldTimeDiff2 ? timeDiff : oldTimeDiff2;
        dataList1[this.lastIndex].cumulativeTime = resultTime;
        dataList1[this.lastIndex].finishFlag = true;
        dataList1[this.lastIndex].finishPercent = 100;
        this.previewEditListHandle({
          previewEditList: dataList1
        });
      }
    }
    // console.log(this.previewEditList);

    // 2.将结束时间保存为开始时间
    let startTime = cloneObj(this.endTime);
    this.startTimeHandle({
      startTime
    });

    this.editIndexHandle({
      editIndex: index
    });

    let result = this.proList.includes(index);
    if (result === false) {
      this.proList.push(index);
      this.ProIndex = this.proList.indexOf(index);
      this.progress = ((+this.ProIndex + 1) / this.editListLength) * 100;
    } else {
      this.progress = this.progress;
    }

    //判断显示前一步or提示
    this.showPrompt = index === this.editListLength - 1 ? 1 : 0;
    //判断未点击or点击
    let previewEditList = cloneObj(this.previewEditList);
    previewEditList[this.editIndex].look = true;
    // finishFlag
    previewEditList[this.editIndex].finishFlag = true;
    this.previewEditListHandle({
      previewEditList
    });

    // 将点击的index记录下来，保存为lastIndex
    let lastIndex = index;
    this.lastIndexHandle({
      lastIndex
    });

    // 调用学习接口
    let courseId = this.$route.query.courseId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseName = this.courseName;
    let courseLearningStateId = this.courseStateId;
    let planLearningStateId = this.planStateId;
    let list = cloneObj(this.previewEditList);
    let dataSend = {
      courseId,
      groupId,
      coursePlanId,
      courseName,
      coursePlanType,
      courseLearningStateId,
      planLearningStateId,
      // courseLearningStateId,
      npeCoursePageContentList: list
    };
    let previewNum = this.$route.query.preview;
    if (previewNum == 1 || previewNum == 2) {
      return;
    }
    this.npeCourseLearningStateFun(dataSend);
  }

  // 点击上一页
  @Emit goFront(i) {
    this.count++;
    let index = i != 0 ? i - 1 : 0;
    this.showPrompt = index === this.editListLength - 1 ? 1 : 0;
    this.editIndexHandle({
      editIndex: index
    });
    // endTime
    let time = new Date().getTime();
    this.endTimeHandle({
      endTime: time
    });
    let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
    timeDiff = timeDiff > 1 ? timeDiff : 1;
    // 将时间差存到数据中
    let dataList = cloneObj(this.previewEditList);
    let oldTime = dataList[i].cumulativeTime || 0;
    let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
    dataList[i].cumulativeTime = resultTime;
    dataList[i].finishFlag = true;
    dataList[i].finishPercent = 100;
    this.previewEditListHandle({
      previewEditList: dataList
    });

    // 将结束时间保存为开始时间
    let startTime = cloneObj(this.endTime);
    this.startTimeHandle({
      startTime
    });
    // 记录当前点击的lastIndex
    let lastIndex = index;
    this.lastIndexHandle({
      lastIndex
    });
    let goFrontI = i - 1;
    let result = this.proList.includes(goFrontI);
    if (result === false) {
      this.proList.push(goFrontI);
      this.ProIndex = this.proList.indexOf(goFrontI);
      this.progress = ((+this.ProIndex + 1) / this.editListLength) * 100;
    } else {
      this.progress = this.progress;
    }
    let previewEditList = cloneObj(this.previewEditList);
    previewEditList[this.editIndex].look = true;
    // finishFlag
    previewEditList[this.editIndex].finishFlag = true;
    this.previewEditListHandle({
      previewEditList
    });

    // 调用学习接口
    let courseId = this.$route.query.courseId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseName = this.courseName;
    let courseLearningStateId = this.courseStateId;
    let planLearningStateId = this.planStateId;
    // let courseLearningStateId = this.courseLearningStateId;
    let list = cloneObj(this.previewEditList);
    let dataSend = {
      courseId,
      groupId,
      coursePlanId,
      courseName,
      coursePlanType,
      courseLearningStateId,
      planLearningStateId,
      // courseLearningStateId,
      npeCoursePageContentList: list
    };
    let previewNum = this.$route.query.preview;
    if (previewNum == 1 || previewNum == 2) {
      return;
    }
    this.npeCourseLearningStateFun(dataSend);
  }

  // 点击下一页
  @Emit goNext(i) {
    this.count++;
    let index = i != this.editListLength - 1 ? i + 1 : this.editListLength - 1;
    this.showPrompt = index === this.editListLength - 1 ? 1 : 0;
    this.editIndexHandle({
      editIndex: index
    });
    // 获取的是当前模板的index
    // endTime
    let time = new Date().getTime();
    this.endTimeHandle({
      endTime: time
    });
    let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
    timeDiff = timeDiff > 1 ? timeDiff : 1;

    // 将时间差存到数据中
    let dataList = cloneObj(this.previewEditList);
    let oldTime = dataList[i].cumulativeTime || 0;
    let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
    dataList[i].cumulativeTime = resultTime;
    dataList[i].finishFlag = true;
    dataList[i].finishPercent = 100;
    this.previewEditListHandle({
      previewEditList: dataList
    });

    // 将结束时间保存为开始时间
    let startTime = cloneObj(this.endTime);
    this.startTimeHandle({
      startTime
    });

    // 记录当前点击的lastIndex
    let lastIndex = index;
    this.lastIndexHandle({
      lastIndex
    });
    // console.log(this.lastIndex);

    let goNextI = i + 1;
    let result = this.proList.includes(goNextI);
    if (result === false) {
      this.proList.push(goNextI);
      this.ProIndex = this.proList.indexOf(goNextI);
      this.progress = ((+this.ProIndex + 1) / this.editListLength) * 100;
    } else {
      this.progress = this.progress;
    }

    let previewEditList = cloneObj(this.previewEditList);
    previewEditList[this.editIndex].look = true;
    // finishFlag
    previewEditList[this.editIndex].finishFlag = true;
    this.previewEditListHandle({
      previewEditList
    });

    // 调用学习接口

    let courseId = this.$route.query.courseId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseName = this.courseName;
    let courseLearningStateId = this.courseStateId;
    let planLearningStateId = this.planStateId;
    // let courseLearningStateId = this.courseLearningStateId;
    let list = cloneObj(this.previewEditList);
    let dataSend = {
      courseId,
      groupId,
      coursePlanId,
      courseName,
      coursePlanType,
      courseLearningStateId,
      planLearningStateId,
      // courseLearningStateId,
      npeCoursePageContentList: list
    };
    // console.log(dataSend);
    let previewNum = this.$route.query.preview;
    // console.log(previewNum);
    if (previewNum == 1 || previewNum == 2) {
      return;
    }
    this.npeCourseLearningStateFun(dataSend);
  }

  // 点击提示事件 提交按钮
  @Emit clickPrompt(i) {
    // endTime
    let time = new Date().getTime();
    this.endTimeHandle({
      endTime: time
    });
    let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
    timeDiff = timeDiff > 1 ? timeDiff : 1;
    // 将时间差存到数据中
    let dataList = cloneObj(this.previewEditList);
    let oldTime = dataList[i].cumulativeTime || 0;
    let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
    dataList[i].cumulativeTime = resultTime;
    dataList[i].finishFlag = true;
    dataList[i].finishPercent = 100;
    this.previewEditListHandle({
      previewEditList: dataList
    });

    // 将结束时间保存为开始时间
    let startTime = cloneObj(this.endTime);
    this.startTimeHandle({
      startTime
    });

    // 记录当前点击的lastIndex
    let lastIndex = i;
    this.lastIndexHandle({
      lastIndex
    });

    //
    this.showDailog = 1;

    // 调用学习接口

    let courseId = this.$route.query.courseId;
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseName = this.courseName;
    let courseLearningStateId = this.courseStateId;
    let planLearningStateId = this.planStateId;
    // let courseLearningStateId = this.courseLearningStateId;
    let list = cloneObj(this.previewEditList);
    let dataSend = {
      courseId,
      groupId,
      coursePlanId,
      courseName,
      coursePlanType,
      courseLearningStateId,
      planLearningStateId,
      // courseLearningStateId,
      npeCoursePageContentList: list
    };
    // console.log(dataSend);
    this.npeCourseLearningStateFun(dataSend);
  }

  // npeCourseLearningState
  @Emit npeCourseLearningStateFun(data) {
    npeCourseLearningState(data)
      .then(res => {
        // console.log(res);
        if (res.code === 0) {
          // console.log(this.editIndex);
          let courseName = res.data.npeCourseLearningStateVo.courseName;
          let courseLearningStateId =
            res.data.npeCourseLearningStateVo.courseLearningStateId;
          let planLearningStateId =
            res.data.npeCourseLearningStateVo.planLearningStateId;
          let list = res.data.npeCourseLearningStateVo.npeCoursePageContentList;
          let previewEditList = cloneObj(listMap(list));
          // previewEditList[this.editIndex].look = true;

          this.courseNameHandle({
            courseName
          });
          // this.courseLearningStateIdHandle({
          //   courseLearningStateId
          // });
          this.courseStateIdHandle({
            courseStateId: courseLearningStateId
          });
          this.planStateIdHandle({
            planStateId: planLearningStateId
          });
          this.previewEditListHandle({
            previewEditList
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }

  //点击区域外隐藏弹框
  @Emit outsideClick() {
    this.showDailog = 0;
  }

  // 计算屏幕宽度
  @Emit computedScreen() {
    this.screenWidth =
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) - 159;
    this.screenHeight =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 120;
    //
    let sketWidth = 996; //图片宽
    let sketHeight = 570; //图片高
    let aspectRatio = sketWidth / sketHeight; //图片宽高比
    let screenRatio = this.screenWidth / this.screenHeight; //屏幕宽高比
    let maxHeight = this.screenWidth / aspectRatio;
    let maxWidth = this.screenHeight * aspectRatio;

    // if (maxHeight <= this.screenHeight) {
    //   this.realW = this.screenWidth;
    //   this.realH = maxHeight; //
    //   // this.realH = this.realW / aspectRatio;
    //   this.scaleW = this.realW / sketWidth;
    //   this.scaleH = this.realH / sketHeight;
    // }

    // if (maxWidth <= this.screenWidth) {
    //   this.realW = maxWidth;
    //   this.realH = this.screenHeight;
    //   this.scaleW = this.realW / sketWidth;
    //   this.scaleH = this.realH / sketHeight;
    // }

    //修改版
    if (maxHeight <= this.screenHeight) {
      this.realW = maxHeight * aspectRatio;
      this.realH = maxHeight; //

      this.scaleW = this.realW / sketWidth;
      this.scaleH = this.realH / sketHeight;
    }

    if (maxWidth <= this.screenWidth) {
      this.realW = maxWidth;
      this.realH = maxWidth / aspectRatio;
      this.scaleW = this.realW / sketWidth;
      this.scaleH = this.realH / sketHeight;
    }
  }

  get scaleFun() {
    return `transform:scale(${this.scaleW},${this.scaleH});`;
  }

  //计算画板自适应宽高
  countSket() {
    let clientWidth = $(".rightPage").width();
    let clientHeight = $(".rightPage").height();
    let ratio = 996 / 570;

    let maxSketWidth = clientWidth;
    let maxSketHeight = clientHeight;

    /*if(this.type==='file'&&this.uploadStatus===3){
      $("#docLook").width(maxSketWidth);
      $("#docLook").height(maxSketHeight);
    }else{
      maxSketWidth = ratio * clientHeight;
      maxSketHeight = clientWidth / ratio;

      if (maxSketWidth < clientWidth) {
        maxSketHeight = clientHeight;
      } else if (maxSketHeight < clientHeight) {
        maxSketWidth = clientWidth;
      }
      // console.log("maxSketWidth", maxSketWidth);
      // console.log("maxSketHeight", maxSketHeight);
      // console.log("maxScale", maxSketWidth / 996);
      let p = maxSketWidth / 996;
      this.scaleW = p;
      this.scaleH = p;

    }*/

    maxSketWidth = ratio * clientHeight;
    maxSketHeight = clientWidth / ratio;

    if (maxSketWidth < clientWidth) {
      maxSketHeight = clientHeight;
    } else if (maxSketHeight < clientHeight) {
      maxSketWidth = clientWidth;
    }
    // console.log("maxSketWidth", maxSketWidth);
    // console.log("maxSketHeight", maxSketHeight);
    // console.log("maxScale", maxSketWidth / 996);
    let p = maxSketWidth / 996;
    this.scaleW = p;
    this.scaleH = p;

    $("#pptBox").width(maxSketWidth);
    $("#pptBox").height(maxSketHeight);
  }

  created() {
    console.log(this.$route.query);
    let time = new Date().getTime();
    this.startTimeHandle({
      startTime: time
    });

    this.preWord = this.$route.query.preview;
    this.showPrompt = this.editIndex === this.editListLength - 1 ? 1 : 0;
    this.editIndexHandle({
      editIndex: 0
    });

    let previewEditList = cloneObj(this.previewEditList);
    previewEditList[this.editIndex].look = true;
    // finishFlag
    previewEditList[this.editIndex].finishFlag = true;
    this.previewEditListHandle({
      previewEditList
    });

    this.computedScreen();

    let courseId = this.$route.query.courseId;
    let data = {
      courseId
    };
    if (this.preWord == 1) {
      //创作者端预览
      previewNpeCourseData(data).then(res => {
        if (res.code == 0) {
          // 课程名称
          let courseName = res.data.npeCourseData.courseName;
          this.courseNameHandle({
            courseName
          });

          let newData = res.data.npeCourseData;
          let list = newData.pageList;
          let previewEditList = cloneObj(listMap(list));
          let editIndex = store.state.edit.editIndex;
          if (editIndex >= previewEditList.length) {
            editIndex = previewEditList.length - 1;
          }
          previewEditList[0]&&previewEditList[0].leftSket&&(previewEditList[0].leftSket.title=courseName);
          store.dispatch("edit/editIndexHandle", {
            editIndex: editIndex
          });
          store.dispatch("edit/previewEditListHandle", {
            previewEditList: previewEditList
          });
          store.dispatch("edit/courseInfoHandle", {
            courseInfo: {
              courseId: newData.courseId,
              courseName: newData.courseName,
              modifyDatetime: newData.modifyDatetime,
              operateList: res.data.operateList
            }
          });
          this.editIndexHandle({
            editIndex: 0
          });
          previewEditList[this.editIndex].look = true;
          // finishFlag
          previewEditList[this.editIndex].finishFlag = true;
          this.previewEditListHandle({
            previewEditList
          });
          this.progress = ((+this.editIndex + 1) / this.editListLength) * 100;
          if (this.editListLength > 1) {
            this.showPrompt =
              this.editIndex === this.editListLength - 1 ? 1 : 0;
          } else {
            this.showPrompt = 0;
          }
        } else {
          tipsFail(res.msg);
        }
      });
    } else if (this.preWord == 2) {
      //老师端预览
      npeCourseData(data)
        .then(res => {
          if (res.code === 0) {
            // let result = res.data.npeCourseData;
            let result = res;
            this.dealData(result);
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    } else {
      // 学生端预览
      let groupId = this.$route.query.groupId;
      let coursePlanId = this.$route.query.coursePlanId;
      data.groupId = groupId;
      data.coursePlanId = coursePlanId;
      npeCourseData(data)
        .then(res => {
          if (res.code === 0) {
            // let result = res.data.npeCourseData;
            let result = res;
            this.dealData(result);
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    }
  }

  @Emit dealData(res) {
    let courseName = res.data.courseName;
    this.courseNameHandle({
      courseName
    });
    let courseStateId = res.data.courseLearningStateId;
    this.courseStateIdHandle({
      courseStateId
    });
    let planStateId = res.data.planLearningStateId;
    this.planStateIdHandle({
      planStateId
    });
    let newData = res.data.npeCoursePageContentList || [];
    let list = newData;
    let previewEditList = cloneObj(listMap(list));
    let editIndex = store.state.edit.editIndex;
    if (editIndex >= previewEditList.length) {
      editIndex = previewEditList.length - 1;
    }
    previewEditList[0]&&previewEditList[0].leftSket&&(previewEditList[0].leftSket.title=courseName);
    store.dispatch("edit/previewEditListHandle", {
      previewEditList: previewEditList
    });
    store.dispatch("edit/editIndexHandle", {
      editIndex: editIndex
    });
    store.dispatch("edit/courseInfoHandle", {
      courseInfo: {
        courseId: newData.courseId,
        courseName: newData.courseName,
        modifyDatetime: newData.modifyDatetime,
        operateList: res.data.operateList
      }
    });
    this.editIndexHandle({
      editIndex: 0
    });
    previewEditList[this.editIndex].look = true;
    // finishFlag
    previewEditList[this.editIndex].finishFlag = true;
    this.previewEditListHandle({
      previewEditList
    });
    this.progress = ((+this.editIndex + 1) / this.editListLength) * 100;
    if (this.editListLength > 1) {
      this.showPrompt = this.editIndex === this.editListLength - 1 ? 1 : 0;
    } else {
      this.showPrompt = 0;
    }
  }

  // 点击查看报告
  @Emit checkReport() {
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    let courseId = this.$route.query.courseId;

    let channel = this.$route.query.channel;
    console.log(channel);
    // 调用生成报告接口，停止学习

    putStudentCreaterReport({
      groupId,
      coursePlanId,
      courseId
    })
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          if (channel) {
            //返回课程频道报告页
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            this.$router.push({
              path: "/StudentReportsChannel",
              query: {
                groupId,
                coursePlanId,
                coursePlanType
              }
            });
          } else {
            //返回标准课程报告页
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.coursePlanId;
            let coursePlanType = this.$route.query.coursePlanType;
            let courseId = this.$route.query.courseId;

            this.$router.push({
              path: "/StudentReports",
              query: {
                groupId,
                coursePlanId,
                coursePlanType,
                courseId
              }
            });
          }
        } else {
          console.log(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });

    // this.$router.push({
    //   path: "/StudentReports",
    //   query: {
    //     groupId,
    //     coursePlanId,
    //     coursePlanType,
    //     courseId
    //   }
    // });
  }
  mounted() {
    this.countSket();
  }

  updated() {
    this.countSket();
  }
}
</script>

<style lang="scss" scoped>
.pptPreview {
  .topHeader {
    min-width: 1200px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 2px 0px rgba(237, 237, 237, 1);
    position: relative;
    z-index: 9;
    a {
      display: inline-block;
      width: 52px;
      height: 24px;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      position: fixed;
      top: 18px;
      left: 24px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }
    }
    p {
      display: inline-block;
      font-size: 20px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      position: fixed;
      top: 16px;
      left: 100px;
    }
  }
  .leftNav {
    position: fixed;
    left: 0;
    top: 60px;
    width: 159px;
    height: 100%;
    background: rgba(240, 240, 240, 1);
    padding: 26px 0px 60px 20px;
    overflow: auto;
    .ulList {
      padding: 2px 0px 0px 2px;
    }
    .item {
      // float: left;
      width: 120px;
      height: 68px;
      box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 1);
      border-radius: 4px;
      background: #fff;
      margin-bottom: 19px;
      position: relative;
      padding: 11.2%;
      &:hover {
        box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.4);
      }
    }
    .item .scale {
      transform: scale(0.12);
      width: 996px;
      height: 570px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 43px;
      overflow: hidden;
    }
    .item .br64 {
      border-radius: 43px;
    }
    .scale /deep/ {
      .pptPreTemplate {
        border-radius: 43px;
      }
    }
    .br64 {
      line-height: 68px;
      margin: auto;
    }
    .active,
    .active:hover {
      box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7),
        0px 0px 0px 2px rgba(254, 120, 101, 1);
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 199;
      cursor: pointer;
      &:hover {
        display: block;
      }
      img {
        position: absolute;
        top: 50px;
        right: 50px;
        width: 151px;
        height: 151px;
        border-radius: 50%;
        background: transparent;
        z-index: 200;
      }
      .checked {
        background: url("../../../assets/creator/editor/click-check.svg");
      }
      .noChecked {
        background: url("../../../assets/creator/editor/hover-check.svg");
      }
    }

    .pageNum {
      position: absolute;
      right: 3px;
      bottom: 2px;
      padding: 1px 6px 1px 2px;
      p {
        font-size: 15px;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 15px;
      }
    }
  }
  //right主板 start
  .rightPage {
    position: fixed;
    right: 0;
    top: 60px;
    width: calc(100% - 159px);
    height: calc(100% - 66px);
    background: rgba(255, 255, 255, 1);
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progressBar {
    width: 100%;
    height: 6px;
    background: rgba(0, 0, 0, 0.1);
  }
  .readed {
    width: 50%;
    height: 6px;
    background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
    border-radius: 0px 5px 5px 0px;
    opacity: 1;
  }
  .PptPreTemplate {
    width: 100%;
    height: 100%;
    .scale {
      background: rgb(51, 51, 51);
      position: absolute;
      top: 66px;
      left: 200px;
    }
    .scale /deep/ {
      .pptPreTemplate {
      }
    }
  }
  .layer {
    width: calc(100vw);
    height: calc(100vh);
    background-color: transparent;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
  }
  .tipsDailog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 282px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px 0px rgba(204, 204, 204, 1);
    border-radius: 16px;
    text-align: center;
    z-index: 201;
    img {
      margin-top: 67px;
      width: 44px;
      height: 44px;
    }
    .p1 {
      margin-top: 24px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(77, 77, 77, 1);
      line-height: 22px;
    }
    .btn {
      display: inline-block;
      width: 134px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 22px;
      font-size: 16px;
      color: #fff;
      font-weight: 500;
      margin-top: 54px;
      // margin-bottom: 55px;
    }
  }
  .audioBox {
    audio {
      display: none;
    }
    .audioImg {
      position: absolute;
      left: 20px;
      bottom: 40px;
      width: 38px;
      height: 38px;
      opacity: 1;
      cursor: pointer;
    }
  }
  .audioBox:hover audio {
    display: block;
  }
  audio {
    position: absolute;
    left: 19px;
    bottom: 40px;
    z-index: 200;
    height: 38px;
  }

  .arrow {
    position: absolute;
    right: 20px;
    bottom: 40px;
    z-index: 200;
    // background-color: blue;
    .left {
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      margin-right: 12px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .right {
      width: 106px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
      p {
        position: absolute;
        top: 10px;
        left: 16px;
        font-size: 18px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      img {
        position: absolute;
        top: 7px;
        right: 8px;
      }
    }
    .rightPrompt {
      width: 106px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      display: inline-block;
      position: relative;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
      p {
        position: relative;
        text-align: center;
        line-height: 38px;
      }
    }
  }
}
</style>
