<template>
  <div class="leftMain">
    <div class="dragIframe">
      <iframe :src="bgImg" frameborder="0"></iframe>
    </div>
    <div :class="['currIframe',tpeIframeShow?'tpeIframeShow':'tpeIframeHide']" v-if="classType===3">
      <div class="btn-tpe" @click="btnTpeClick">
        <i :class="tpeIframeShow?'icon-show':'icon-hide'"></i>
      </div>
      <iframe :src="succIframe" frameborder="0"></iframe>
      <div class="but">
        <div class="right" v-if="editIndex + 1 != length" @click="rightFun('下一页')">
          <span>下一页</span>
          <img src="../../../assets/creator/sandTablestandard/icon-bottom.svg" alt/>
        </div>
        <div class="rightW" v-if="editIndex + 1 == length && wrz != 2" @click="rightFun('完成')">
          <span>完成</span>
        </div>
        <div class="rightT" v-if="editIndex + 1 == length && wrz == 2" @click="rightFun('提交')">
          <span>提交</span>
        </div>
        <div class="left" v-if="editIndex != 0" @click="leftFun">
          <img src="../../../assets/creator/sandTablestandard/icon-top.svg" alt/>
        </div>
      </div>
    </div>

    <div :class="['npeIframe',tpeIframeShow?'tpeIframeShow':'tpeIframeHide']" v-if="classType===4">
      <div class="btn-tpe" @click="btnTpeClick">
        <i :class="tpeIframeShow?'icon-show':'icon-hide'"></i>
      </div>
      <NpePreview style="overflow: hidden;border-radius:12px;"/>
      <!-- <iframe :src="succIframe" frameborder="0"></iframe> -->
      <div class="right" v-if="editIndex + 1 != length" @click="rightFun('下一页')">
        <span>下一页</span>
        <img src="../../../assets/creator/sandTablestandard/icon-bottom2.svg" alt/>
      </div>
      <div class="rightW" v-if="editIndex + 1 == length && wrz != 2" @click="rightFun('完成')">
        <span>完成</span>
      </div>
      <div class="rightT" v-if="editIndex + 1 == length && wrz == 2" @click="rightFun('提交')">
        <span>提交</span>
      </div>
      <div class="left" v-if="editIndex != 0" @click="leftFun">
        <img src="../../../assets/creator/sandTablestandard/icon-top2.svg" alt/>
      </div>
    </div>

    <CallBackBtn v-if="displayR"></CallBackBtn>
    <TitlePlugin></TitlePlugin>

    <!-- 提示 start-->

    <div class="modal" v-if="sout" @click="out"></div>
    <div class="signout" v-if="display == true" v-Clickoutside="()=>{out()}">
      <div class="tc">
        <img
          class="im"
          src="../../../assets/creator/sandTablestandard/icon-close.svg"
          alt
          @click="out"
        />
        <img class="img" src="../../../assets/creator/sandTablestandard/icon-w.svg" alt/>
        <div class="main">您已经浏览完该课程，快去发布吧～</div>
        <div class="footer">
          <el-button :class="['el-utb',wrz == 2?'el-ut':'']" @click="confirm">返回频道</el-button>
          <el-button v-if="wrz == 2" class="el-but" @click="Viewreport">查看报告</el-button>
        </div>
      </div>
    </div>
    <!-- end  -->

    <!-- 查看报告按钮 start-->
    <sandTableReport v-if="report == true"></sandTableReport>
    <!-- end -->
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from "vue-property-decorator";
  import Clickoutside from "element-ui/src/utils/clickoutside";
  import {State, Action, namespace} from "vuex-class";
  import {cloneObj} from "../../../utils/utils";
  import {
    CoursepreviewStCourse,
    stCoursestCourseData
  } from "../../../service/sandTableApi";
  import {listMap} from "../../../service/editor/editorAction";
  import {memberidentifyRoleType} from "../../../service/groupApi";
  import {npeCourseLearningState} from "../../../service/editor/editorApi";
  import {putStudentCreaterReport} from "../../../service/ortherApi";
  import CallBackBtn from "./callBackBtn";
  import TitlePlugin from "./titlePlugin";
  import sandTableReport from "../sandTableReport/sandTableReport";
  import NpePreview from "../editor/npePreview";
  import VueDragResize from "vue-drag-resize";

  const EditMod = namespace("edit");
  const SandTableMod = namespace("sandTablestandard");
  @Component({
    name: "LeftMain",
    components: {
      VueDragResize,
      CallBackBtn,
      TitlePlugin,
      NpePreview,
      sandTableReport
    },
    directives: {
      Clickoutside
    }
  })
  export default class LeftMain extends Vue {
    @EditMod.State("startTime") startTime; //npe预览页开始时间
    @EditMod.Action("startTimeHandle") startTimeHandle; //npe预览页开始时间  action

    @EditMod.State("endTime") endTime; //npe预览页结束时间
    @EditMod.Action("endTimeHandle") endTimeHandle; //npe预览页结束时间  action

    @EditMod.State("lastIndex") lastIndex; //获取上一次点击index
    @EditMod.Action("lastIndexHandle") lastIndexHandle; //获取上一次点击index  action

    @EditMod.State("previewEditList") previewEditList; //编辑文档数据
    @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

    @EditMod.State("courseLearningStateId") courseLearningStateId; //编辑文档数据
    @EditMod.Action("courseLearningStateIdHandle") courseLearningStateIdHandle; //编辑文档数据  action

    @EditMod.State("planLearningStateId") planLearningStateId; //编辑文档数据
    @EditMod.Action("planLearningStateIdHandle") planLearningStateIdHandle; //编辑文档数据  action

    @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
    @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

    @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
    @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

    @SandTableMod.State("PrimaryShow") PrimaryShow; //当前编辑模块的下标
    @SandTableMod.Action("PrimaryShowHandle") PrimaryShowHandle; //当前编辑模块的下标  action

    @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
    @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

    @SandTableMod.State("succIframe") succIframe; //当前编辑模块的下标
    @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前编辑模块的下标  action

    @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
    @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

    @SandTableMod.State("courseName") courseName; //当前编辑模块的下标
    @SandTableMod.Action("courseNameHandle") courseNameHandle; //当前编辑模块的下标  action

    @SandTableMod.State("classType") classType; //新建竖版列表
    @SandTableMod.Action("classTypeHandle") classTypeHandle; //新建竖版列表  action修改方法

    @SandTableMod.State("indx") indx; //新建竖版列表
    @SandTableMod.Action("indxHandle") indxHandle; //新建竖版列表  action修改方法

    @SandTableMod.State("courseInfo") courseInfo; //当前编辑模块的下标
    @SandTableMod.Action("courseInfoHandle") courseInfoHandle; //当前编辑模块的下标  action

    @SandTableMod.State("refId") refId; //当前编辑模块的下标
    @SandTableMod.Action("refIdHandle") refIdHandle; //当前编辑模块的下标  action

    @SandTableMod.State("report") report; //当前编辑模块的下标
    @SandTableMod.Action("reportHandle") reportHandle; //当前编辑模块的下标  action

    tpeIframeShow=true;//tpe iframe 显示隐藏控制 true 显示 默认显示  false 隐藏

    list = "下一页";
    wrz = ""; //身份识别
    length = ""; // 总页数

    display = false;
    displayR = "";
    sout = false;

    // 关闭弹框
    @Emit out() {
      this.sout = false;
      this.display = false;
    }

    // 查看报告
    @Emit Viewreport() {
      this.sout = false;
      this.display = false;
      let report = true;
      this.reportHandle({
        report
      });
    }

    // 返回原页面
    @Emit confirm() {
      let d = sessionStorage.getItem("router");
      let router = JSON.parse(d);
      let route = this.$route.query.address;
      this.$router.push({
        path: route,
        query: router
      });
    }

    // 上一页
    @Emit leftFun() {
      let i = this.editIndex - 1;
      this.editIndexHandle({
        editIndex: i
      });

      let courseList = this.courseList;
      let bgImg = courseList[i].lessonSceneUrl;

      this.bgImgHandle({
        bgImg: bgImg
      });

      let bgImgStatus = this.bgImgStatus;
      this.bgImgStatusHandle({
        bgImgStatus: bgImgStatus
      });

      if (this.wrz == 2 && this.classType == 3) {
        let token = sessionStorage.getItem("assent_token");
        let group = this.$route.query.groupId;
        let cour = this.$route.query.courId;
        let ref = this.$route.query.refId;
        let baseUrl = window.location.href.split("#")[0] + "";

        let succIframe = courseList[i].lessonServerUrl;
        succIframe += "";
        let succ = succIframe.split("#")[0];
        let su = succIframe.split("#")[1];

        let newUrl =
          succ +
          '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
          baseUrl +
          "api/learningRecordStore/&token=" +
          token +
          "&content_token=" +
          group +
          "-" +
          cour +
          "-" +
          ref;

        this.succIframeHandle({
          succIframe: newUrl + "&btnContext=" + false + "/#" + su
        });
      } else if (this.wrz == 2 && this.classType == 4) {
        let index = i + 1;
        let time = new Date().getTime();
        this.endTimeHandle({
          endTime: time
        });
        let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
        timeDiff = timeDiff > 1 ? timeDiff : 1;
        // 将时间差存到数据中
        let dataList = cloneObj(this.previewEditList);
        let oldTime = dataList[index].cumulativeTime || 0;
        let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
        dataList[index].cumulativeTime = resultTime;
        dataList[index].finishFlag = true;
        dataList[index].finishPercent = 100;
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

        let courseId = this.$route.query.courseId;
        let groupId = this.$route.query.groupId;
        let coursePlanId = this.$route.query.courId;
        let coursePlanType = this.$route.query.coursePlanType;
        let previewEditList = this.previewEditList;
        let courseLearningStateId = this.courseLearningStateId;
        let planLearningStateId = this.planLearningStateId;

        let dataSend = {
          courseId,
          groupId,
          coursePlanId,
          coursePlanType,
          courseLearningStateId,
          planLearningStateId,
          // courseLearningStateId,
          npeCoursePageContentList: previewEditList
        };
        this.npeCourseLearningStateFun(dataSend);
      } else {
        let succIframe = courseList[i].lessonServerUrl;
        this.succIframeHandle({
          succIframe: succIframe
        });
      }
    }

    // 下一页
    @Emit rightFun(val) {
      if (val == "下一页") {
        let i = this.editIndex + 1;

        this.editIndexHandle({
          editIndex: i
        });

        let courseList = this.courseList;
        let bgImg = courseList[i].lessonSceneUrl;

        this.bgImgHandle({
          bgImg: bgImg
        });

        let bgImgStatus = this.bgImgStatus;
        this.bgImgStatusHandle({
          bgImgStatus: bgImgStatus
        });

        if (this.wrz == 2 && this.classType == 3) {
          let token = sessionStorage.getItem("assent_token");
          let group = this.$route.query.groupId;
          let cour = this.$route.query.courId;
          let ref = this.$route.query.refId;
          let baseUrl = window.location.href.split("#")[0] + "";

          let succIframe = courseList[i].lessonServerUrl;
          succIframe += "";
          let succ = succIframe.split("#")[0];
          let su = succIframe.split("#")[1];

          let newUrl =
            succ +
            '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
            baseUrl +
            "api/learningRecordStore/&token=" +
            token +
            "&content_token=" +
            group +
            "-" +
            cour +
            "-" +
            ref;

          this.succIframeHandle({
            succIframe: newUrl + "&btnContext=" + false + "/#" + su
          });
        } else if (this.wrz == 2 && this.classType == 4) {
          // endTime
          let index = i - 1;
          let time = new Date().getTime();
          this.endTimeHandle({
            endTime: time
          });
          let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
          timeDiff = timeDiff > 1 ? timeDiff : 1;

          // 将时间差存到数据中
          let dataList = cloneObj(this.previewEditList);
          let oldTime = dataList[index].cumulativeTime || 0;
          let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
          dataList[index].cumulativeTime = resultTime;
          dataList[index].finishFlag = true;
          dataList[index].finishPercent = 100;
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

          let courseId = this.$route.query.courseId;
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.courId;
          let coursePlanType = this.$route.query.coursePlanType;
          let previewEditList = this.previewEditList;
          let courseLearningStateId = this.courseLearningStateId;
          let planLearningStateId = this.planLearningStateId;

          let dataSend = {
            courseId,
            groupId,
            coursePlanId,
            coursePlanType,
            courseLearningStateId,
            planLearningStateId,
            // courseLearningStateId,
            npeCoursePageContentList: previewEditList
          };
          this.npeCourseLearningStateFun(dataSend);
        } else {
          let succIframe = courseList[i].lessonServerUrl;
          this.succIframeHandle({
            succIframe: succIframe
          });
        }
      } else if (val == "完成") {
        console.log(this.editIndex);
        this.sout = true;
        this.display = true;
      } else if (val == "提交") {
        this.sout = true;
        this.display = true;
        // 缺少生成报告功能
        if (this.classType == 4) {
          let index = this.editIndex;
          let time = new Date().getTime();
          this.endTimeHandle({
            endTime: time
          });
          let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
          timeDiff = timeDiff > 1 ? timeDiff : 1;

          // 将时间差存到数据中
          let dataList = cloneObj(this.previewEditList);
          let oldTime = dataList[index].cumulativeTime || 0;
          let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
          dataList[index].cumulativeTime = resultTime;
          dataList[index].finishFlag = true;
          dataList[index].finishPercent = 100;
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

          let courseId = this.$route.query.courseId;
          let groupId = this.$route.query.groupId;
          let coursePlanId = this.$route.query.courId;
          let coursePlanType = this.$route.query.coursePlanType;
          let previewEditList = this.previewEditList;
          let courseLearningStateId = this.courseLearningStateId;
          let planLearningStateId = this.planLearningStateId;

          let dataSend = {
            courseId,
            groupId,
            coursePlanId,
            coursePlanType,
            courseLearningStateId,
            planLearningStateId,
            // courseLearningStateId,
            npeCoursePageContentList: previewEditList
          };
          this.npeCourseLearningStateFun(dataSend);
        }
        let groupId = this.$route.query.groupId + "";
        let coursePlanId = this.$route.query.courId + "";
        let courseId = this.$route.query.courseId + "";

        let list = {
          groupId,
          coursePlanId,
          courseId
        };

        putStudentCreaterReport(list).then(res => {
          if (res.code === 0) {
          } else {
            tipsFail(res.msg);
          }
        });
      }
    }

    @Emit npeCourseLearningStateFun(data) {
      npeCourseLearningState(data)
        .then(res => {
          if (res.code === 0) {
            let list = res.data.npeCourseLearningStateVo.npeCoursePageContentList;
            let previewEditList = cloneObj(listMap(list));
            this.previewEditListHandle({
              previewEditList
            });
            let courseLearningStateId =
              res.data.npeCourseLearningStateVo.courseLearningStateId;
            this.courseLearningStateIdHandle({
              courseLearningStateId: courseLearningStateId
            });

            let planLearningStateId =
              res.data.npeCourseLearningStateVo.planLearningStateId;
            this.planLearningStateIdHandle({
              planLearningStateId: planLearningStateId
            });
            // this.previewEditListHandle({
            //   previewEditList: dataList
            // });
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    }

    //TPE显示隐藏点击按钮
    btnTpeClick(){
      this.tpeIframeShow=!this.tpeIframeShow;
    }

    created() {
      let time = new Date().getTime();
      this.startTimeHandle({
        startTime: time
      });

      this.displayR = this.$route.query.displayR;
      let couId = this.$route.query.courseId;

      memberidentifyRoleType({})
        .then(res => {
          if (res.code == "0") {
            this.wrz = res.identifiedRoleType;
            let wrz = res.identifiedRoleType;
            if (wrz == 3) {
              CoursepreviewStCourse({courseId: couId}).then(res => {
                if (res.code === 0) {
                  let courseList = res.data.stCourseData.stLessonList;

                  this.courseListHandle({
                    courseList: courseList
                  });

                  this.length = courseList.length;

                  let classType = res.data.stCourseData.courseType;

                  this.classTypeHandle({
                    classType: classType
                  });

                  let refId = res.data.stCourseData.refCourseId;

                  this.refIdHandle({
                    refId: refId
                  });

                  if (courseList == "") {
                    let bgImg =
                      "https://cloud.luyouor.com/scene/course/0/defaultScene/";
                    this.bgImgHandle({
                      bgImg: bgImg
                    });
                    let courseId = res.data.stCourseData.courseId;
                    this.courseIdHandle({
                      courseId: courseId
                    });
                  } else {
                    let i = this.editIndex;
                    let bgImg = courseList[i].lessonSceneUrl;

                    this.bgImgHandle({
                      bgImg: bgImg
                    });

                    let bgImgStatus = res.data.stCourseData.bgImgStatus;
                    this.bgImgStatusHandle({
                      bgImgStatus: bgImgStatus
                    });

                    let succIframe = courseList[i].lessonServerUrl;

                    this.succIframeHandle({
                      succIframe: succIframe
                    });

                    let courseName = courseList[i].courseName;

                    this.courseNameHandle({
                      courseName: courseName
                    });
                  }
                } else {
                  tipsFail(res.msg);
                }
              });
            } else {
              stCoursestCourseData({courseId: couId}).then(res => {
                if (res.code === 0) {
                  let courseList = res.data.stCourseData.stLessonList;

                  this.courseListHandle({
                    courseList: courseList
                  });

                  this.length = courseList.length;

                  let classType = res.data.stCourseData.courseType;

                  this.classTypeHandle({
                    classType: classType
                  });

                  let refId = res.data.stCourseData.refCourseId;

                  this.refIdHandle({
                    refId: refId
                  });

                  if (courseList == "") {
                    let bgImg =
                      "https://cloud.luyouor.com/scene/course/0/defaultScene/";
                    this.bgImgHandle({
                      bgImg: bgImg
                    });
                    let courseId = res.data.stCourseData.courseId;
                    this.courseIdHandle({
                      courseId: courseId
                    });
                  } else {
                    let i = this.editIndex;
                    let bgImg = courseList[i].lessonSceneUrl;

                    this.bgImgHandle({
                      bgImg: bgImg
                    });

                    let bgImgStatus = res.data.stCourseData.bgImgStatus;
                    this.bgImgStatusHandle({
                      bgImgStatus: bgImgStatus
                    });

                    if (wrz == 2) {
                      let token = sessionStorage.getItem("assent_token");
                      let group = this.$route.query.groupId;
                      let cour = this.$route.query.courId;
                      let ref = this.$route.query.refId;
                      let baseUrl = window.location.href.split("#")[0] + "";

                      let succIframe = courseList[i].lessonServerUrl;
                      succIframe += "";
                      let succ = succIframe.split("#")[0];
                      let su = succIframe.split("#")[1];

                      let newUrl =
                        succ +
                        '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
                        baseUrl +
                        "api/learningRecordStore/&token=" +
                        token +
                        "&content_token=" +
                        group +
                        "-" +
                        cour +
                        "-" +
                        ref;

                      this.succIframeHandle({
                        succIframe: newUrl + "&btnContext=" + false + "/#" + su
                      });
                    } else {
                      let succIframe = courseList[i].lessonServerUrl;

                      this.succIframeHandle({
                        succIframe: succIframe
                      });
                    }

                    let courseName = courseList[i].courseName;

                    this.courseNameHandle({
                      courseName: courseName
                    });
                  }
                } else {
                  tipsFail(res.msg);
                }
              });
            }
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style lang="scss" scoped>
  body {
    background: #fff;
  }

  .leftMain {
    width: 100%;
    height: 100%;
    // min-width: 1245px;
    // min-height: 683px;
    background-size: cover;
    position: relative;
    overflow:hidden;
  }

  .dragIframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    iframe {
      width: 100%;
      height: 100%;
    }
  }

  .currIframe {
    width: 50%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 11;
    iframe {
      float: right;
      width: 100%;
      height: 100%;
    }
  }

  .npeIframe {
    width: 59.72%;
    height: 67.88%;
    position: absolute;
    top: 11.62%;
    right: 2.08%;
    border-radius: 12px;
    iframe {
      float: right;
      width: 100%;
      height: 100%;
    }
    .left {
      position: absolute;
      right: 111px;
      bottom: 26px;
      width: 26px;
      height: 26px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 14px;
      float: right;
      cursor: pointer;
      text-align: center;
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .rightW {
      position: absolute;
      right: 26px;
      bottom: 26px;
      width: 73px;
      height: 26px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      // margin-left: 12px;
      cursor: pointer;
      text-align: center;
      // line-height: 38px;
      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .rightT {
      position: absolute;
      right: 26px;
      bottom: 26px;
      width: 73px;
      height: 26px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      // margin-left: 12px;
      cursor: pointer;
      text-align: center;
      // line-height: 38px;
      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .right {
      position: absolute;
      right: 26px;
      bottom: 26px;
      width: 73px;
      height: 26px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      margin-left: 12px;
      cursor: pointer;
      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        display: block;
        margin-top: 5px;
        margin-left: 11px;
        float: left;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .but {
    position: absolute;
    right: 26px;
    bottom: 26px;
    width: 20%;
    height: 38px;
    z-index: 13;
    text-align: center;
    .left {
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      cursor: pointer;
      img {
        margin-top: 6px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .rightW {
      width: 106px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      margin-left: 12px;
      cursor: pointer;
      text-align: center;
      line-height: 38px;
      span {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .rightT {
      width: 106px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      margin-left: 12px;
      cursor: pointer;
      text-align: center;
      line-height: 38px;
      span {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
    .right {
      width: 106px;
      height: 38px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      float: right;
      margin-left: 12px;
      cursor: pointer;
      img {
        margin-top: 6px;
      }
      span {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        display: block;
        margin-top: 7px;
        margin-left: 16px;
        float: left;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .signout {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2020;
    .tc {
      width: 380px;
      height: 282px;
      background: rgba(255, 255, 255, 1);
      border-radius: 16px;
      padding: 0 62px;
      text-align: center;
      .im {
        width: 36px;
        height: 36px;
        position: absolute;
        right: 0;
        cursor: pointer;
      }
      .img {
        margin-top: 67px;
        width: 44px;
        height: 44px;
      }
      .main {
        margin-top: 22px;
        margin-bottom: 52px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(77, 77, 77, 1);
      }
      .footer {
        margin: 0 auto;
        .el-utb {
          width: 110px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
          background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          border: none;
          line-height: 11px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
          &:focus {
            color: rgba(255, 255, 255, 1);
          }
        }
        .el-but {
          width: 110px;
          height: 36px;
          background: linear-gradient(
              90deg,
              rgba(255, 176, 158, 1) 0%,
              rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          border: none;
          line-height: 11px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          margin-left: 30px;
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
          &:focus {
            color: rgba(255, 255, 255, 1);
          }
        }
        .el-ut {
          width: 110px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 1);
          border-radius: 18px;
          border: none;
          line-height: 11px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          &:hover {
            color: rgba(254, 120, 101, 1);
          }
          &:focus {
            color: rgba(254, 120, 101, 1);
          }
        }
      }
    }
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2019;
  }

  /*********右侧收起显示样式********/
  .btn-tpe{
    position: absolute;
    top:50%;
    left:-20px;
    transform: translateY(-50%);
    width:20px;
    height:60px;
    background:rgba(255,255,255,1);
    border-radius:6px 0px 0px 6px;
    border:1px solid rgba(240,240,240,1);
    display: flex;
    align-items: center;
    justify-content: center;
    i{
      width:12px;
      height:12px;
    }
    .icon-show{
      background: url('../../../assets/creator/SandTablestandard/icon-show.svg') no-repeat;
      background-size: 100% 100%;
    }
    .icon-hide{
      background: url('../../../assets/creator/SandTablestandard/icon-hide.svg') no-repeat;
      background-size: 100% 100%;
    }
  }

  @keyframes showIframe {
    0%{
      transform: translateX(100%);
    }
    100%{
      transform: translateX(0);
    }
  }

  @keyframes hideIframe {
    0%{
      transform: translateX(0);
    }
    100%{
      transform: translateX(100%);
    }
  }

  .tpeIframeShow{
    animation: showIframe 300ms;
    transition-property:transform;
    animation-fill-mode: forwards;
  }
  .tpeIframeHide{
    animation: hideIframe 300ms;
    transition-property:transform;
    animation-fill-mode: forwards;
  }

</style>
