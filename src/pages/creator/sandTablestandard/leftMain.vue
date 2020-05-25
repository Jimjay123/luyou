<template>
  <div class="leftMain">
    <!-- 默认的场景 -->
    <div class="dragIframe" v-if="bgImgStatus===0">
      <iframe :src="bgImg" frameborder="0"></iframe>
    </div>

    <!-- 未上传图片 start -->
    <div class="btn" v-if="bgImgStatus===0">
      <a href="javascript:;" @click.stop="clickFun">选择课程</a>
    </div>
    <!-- 未上传图片按钮 end -->

    <!-- 上传后的场景 start-->
    <div class="dragIframe" v-if="bgImgStatus===1 || bgImgStatus===2">
      <iframe :src="bgImg" frameborder="0"></iframe>
    </div>
    <!-- 上传后的场景 end -->

    <!--tpe课程 -->
    <div class="currIframe" v-if="classType===3">
      <iframe :src="succIframe" frameborder="0"></iframe>
      <div class="right" v-if="editIndex + 1 != indx" @click="rightFun('下一页')">
        <span>下一页</span>
        <img src="../../../assets/creator/sandTablestandard/icon-bottom.svg" alt />
      </div>
      <div class="rightW" v-if="editIndex + 1 == indx" @click="rightFun('完成')">
        <span>完成</span>
      </div>
      <div class="left" v-if="editIndex != 0" @click="leftFun">
        <img src="../../../assets/creator/sandTablestandard/icon-top.svg" alt />
      </div>
    </div>

    <!-- npe课程 -->
    <div class="npeIframe" v-if="classType===4">
      <NpePreview />
      <!-- <iframe :src="succIframe" frameborder="0"></iframe> -->
      <div class="right" v-if="editIndex + 1 != indx" @click="rightFun('下一页')">
        <span>下一页</span>
        <img src="../../../assets/creator/sandTablestandard/icon-bottom2.svg" alt />
      </div>
      <div class="rightW" v-if="editIndex + 1 == indx" @click="rightFun('完成')">
        <span>完成</span>
      </div>
      <div class="left" v-if="editIndex != 0" @click="leftFun">
        <img src="../../../assets/creator/sandTablestandard/icon-top2.svg" alt />
      </div>
    </div>

    <!-- 选择课程组件 -->
    <Primary v-if="PrimaryShow != false" />

    <!-- 已上传图片 end -->
    <input id="filElem" ref="filElem" type="file" @change="uploadFiles" hidden />

    <!-- exit start -->
    <div class="exit" @click="exit">退出</div>
    <!-- exit end -->

    <!-- change start -->
    <div
      :class="['changeStatus', classType == 4 ?'scene':'']"
      v-if="bgImgStatus===1"
      @click.stop="clickBtn"
    >上传场景</div>
    <!-- change end -->

    <!-- change start -->
    <div
      :class="['changeBtn', classType == 4 ?'scene':'']"
      v-if="bgImgStatus===2"
      @click.stop="clickBtn"
    >替换场景</div>
    <!-- change end -->

    <!-- 应用所有场景 start-->
    <div class="signout" v-if="licationShow == false">
      <div class="tc">
        <div class="header">确认应用到所有？</div>
        <div class="main">此操作将把该场景应用到所有步骤，是否确认？</div>
        <div class="footer">
          <div :class="['wrap' , checkedShow == false ?'active':'']" @click="wrap">
            <input id="check" type="checkbox" checked="checkedShow" />
            <span>不再提醒</span>
          </div>
          <el-button class="el-but" @click="out">取消</el-button>
          <el-button class="el-utb" @click="confirm">确认</el-button>
        </div>
      </div>
    </div>
    <!-- end  -->

    <!-- 提示弹框 -->
    <div class="modal" v-if="sout" @click="classBox"></div>
    <div class="confirm" v-if="display == true" v-Clickoutside="()=>{classBox()}">
      <div class="tc">
        <img
          class="im"
          src="../../../assets/creator/sandTablestandard/icon-close.svg"
          alt
          @click="classBox"
        />
        <img class="img" src="../../../assets/creator/sandTablestandard/icon-w.svg" alt />
        <div class="main">您已经浏览完全部课程，快去发布吧～</div>
        <div class="footer">
          <el-button class="el-utb" @click="classBox">确认</el-button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
import { putFileCourseImageUpload } from "../../../service/creatorApi";
import {
  OperatenewStCourse,
  stCourseSceneUpload,
  OperateNewOperate,
  OperateStCourseData
} from "../../../service/sandTableApi";
import Primary from "./primary";
import NpePreview from "../editor/npePreview";
import VueDragResize from "vue-drag-resize";
const SandTableMod = namespace("sandTablestandard");
const EditMod = namespace("edit");
@Component({
  name: "LeftMain",
  components: {
    VueDragResize,
    Primary,
    NpePreview
  },
  directives: {
    Clickoutside
  }
})
export default class LeftMain extends Vue {
  // @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  // @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  @SandTableMod.State("bgImg") bgImg; //当前模块的场景
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前模块的场景  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前模块的状态
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前模块的状态  action

  @SandTableMod.State("PrimaryShow") PrimaryShow; //当前选择课程组件的显示隐藏
  @SandTableMod.Action("PrimaryShowHandle") PrimaryShowHandle; //当前选择课程组件的显示隐藏  action

  @SandTableMod.State("maxH") maxH; //当前模块的上传右边栏状态
  @SandTableMod.Action("maxHHandle") maxHHandle; //当前模块的上传右边栏状态  action

  @SandTableMod.State("licationShow") licationShow; //当前模块应用场景的显示隐藏
  @SandTableMod.Action("licationShowHandle") licationShowHandle; //当前模块应用场景的显示隐藏  action

  @SandTableMod.State("checkedShow") checkedShow; //当前模块应用场景的类名判断
  @SandTableMod.Action("checkedShowHandle") checkedShowHandle; //当前模块应用场景的类名判断  action

  @SandTableMod.State("courseId") courseId; //当前编辑模块的Id
  @SandTableMod.Action("courseIdHandle") courseIdHandle; //当前编辑模块的Id  action

  @SandTableMod.State("courseList") courseList; //当前模块的数据
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前模块的数据  action

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @SandTableMod.State("succIframe") succIframe; //当前模块的第三方课程
  @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前模块的第三方课程  action

  @SandTableMod.State("couType") couType; //当前编辑模块的courseType
  @SandTableMod.Action("couTypeHandle") couTypeHandle; //当前编辑模块的courseType  action

  @SandTableMod.State("refId") refId; //当前编辑模块的refId
  @SandTableMod.Action("refIdHandle") refIdHandle; //当前编辑模块的refId  action

  @SandTableMod.State("sceneThumbnailUrl") sceneThumbnailUrl; //当前编辑模块的缩略图
  @SandTableMod.Action("sceneThumbnailUrlHandle") sceneThumbnailUrlHandle; //当前编辑模块的缩略图

  @SandTableMod.State("courseInfo") courseInfo; //当前编辑模块的下标
  @SandTableMod.Action("courseInfoHandle") courseInfoHandle; //当前编辑模块的下标  action

  @SandTableMod.State("creList") creList; //新建竖版列表
  @SandTableMod.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  @SandTableMod.State("classType") classType; //新建竖版列表
  @SandTableMod.Action("classTypeHandle") classTypeHandle; //新建竖版列表  action修改方法

  @SandTableMod.State("indx") indx; //新建竖版列表
  @SandTableMod.Action("indxHandle") indxHandle; //新建竖版列表  action修改方法

  sout = false;
  display = false;

  // 关闭弹框
  classBox() {
    this.sout = false;
    this.display = false;
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

    let succIframe = courseList[i].lessonServerUrl;

    this.succIframeHandle({
      succIframe: succIframe
    });
  }

  // TPE下一页
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

      let succIframe = courseList[i].lessonServerUrl;

      this.succIframeHandle({
        succIframe: succIframe
      });
    }
    if (val == "完成") {
      this.sout = true;
      this.display = true;
    }
  }
  // NPE下一页
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

      let succIframe = courseList[i].lessonServerUrl;

      this.succIframeHandle({
        succIframe: succIframe
      });
    }
    if (val == "完成") {
      this.sout = true;
      this.display = true;
    }
  }
  // 应用全部场景选择是否不再显示
  @Emit wrap() {
    let checkedShow = !this.checkedShow;
    this.checkedShowHandle({
      checkedShow: checkedShow
    });
    if (this.checkedShow == false) {
      let licationShow = this.checkedShow;

      this.licationShowHandle({
        licationShow: licationShow
      });
    } else {
      return;
    }
  }

  // 取消应用所有弹框
  @Emit out() {
    if (this.checkedShow == false) {
      let licationShow = true;
      this.licationShowHandle({
        licationShow: licationShow
      });
    } else {
      return;
    }
  }
  // 确定应用所有
  @Emit confirm() {
    let editIndex = this.editIndex;
    let cour = this.courseList;
    let courseList = [];
    cour.map(item => {
      courseList.push({
        isOpen: false, //当前模块是否展开 true展开 false 不展开
        isUse: true, //当前模块是否可用
        courseId: item.courseId, //课程id
        lessonName: item.lessonName, //课程名称
        lessonSceneUrl: cour[editIndex].lessonSceneUrl, //选择课程后的场景
        lessonServerUrl: item.lessonServerUrl, //选择课程后的第三方课程
        sceneThumbnailUrl: cour[editIndex].sceneThumbnailUrl, //选择课程后的缩略图
        courseName: item.courseName //课程名称
      });
    });

    this.courseListHandle({
      courseList: courseList
    });

    let list = {
      courseId: this.courseId,
      courseType: this.courseInfo.currentStCourseData.courseType,
      refCourseId: this.refId,
      stLessonList: courseList,
      bgImgStatus: this.bgImgStatus,
      courseServerUrl: courseList[editIndex].lessonServerUrl,
      sceneThumbnailUrl: courseList[editIndex].sceneThumbnailUrl,
      editIndex: this.editIndex,
      remindApplyAllFlag: false //应用所有场景
    };
    OperateNewOperate(list).then(res => {
      if (res.code === 0) {
        let courseInfo = res.data;

        this.courseInfoHandle({
          courseInfo: courseInfo
        });

        let licationShow = true;

        this.licationShowHandle({
          licationShow: licationShow
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  // 退出沙盘课程
  @Emit exit() {
    this.$router.push({
      path: "/creator/home"
    });
  }

  //上传场景
  @Emit clickBtn() {
    this.uploadStart = true;
    this.$refs.filElem.click();
  }
  //上传右边栏状态
  @Emit clickFun() {
    let pageHeight = document.querySelector(".leftMain");
    let maxH = pageHeight.offsetHeight - 250;
    this.maxHHandle({
      maxH: maxH
    });
    let PrimaryShow = true;
    this.PrimaryShowHandle({
      PrimaryShow: PrimaryShow
    });
  }

  //上传文件点击事件
  @Emit uploadFiles() {
    let files = this.$refs.filElem.files[0];
    this.$refs.filElem.value = "";
    if (files) {
      this.setUpFiles(files);
    }
  }

  //发送文件
  @Emit setUpFiles(file) {
    let typeList = file.name.split(".");
    let type = typeList[typeList.length - 1];
    if (!(type === "zip")) {
      tipsMsg("上传文件格式错误");
      return;
    }
    let data = new FormData();
    data.append("file", file);
    data.append("courseId", this.courseId);
    //调用上传文件接口
    stCourseSceneUpload(data).then(res => {
      if (res.code === 0) {
        let bgImgStatus = 2;
        this.bgImgStatusHandle({
          bgImgStatus: bgImgStatus
        });

        let bgImg = res.data.lessonSceneUrl;
        this.bgImgHandle({
          bgImg: bgImg
        });

        let i = this.editIndex;
        this.courseList[i].lessonSceneUrl = res.data.lessonSceneUrl;
        this.courseList[i].sceneThumbnailUrl = res.data.lessonSceneThumbnailUrl;
        this.courseListHandle({
          courseList: this.courseList
        });

        let courseList = this.courseList;
        let list = {
          courseId: this.courseId,
          courseType: this.classType,
          refCourseId: this.refId,
          stLessonList: courseList,
          bgImgStatus: this.bgImgStatus,
          editIndex: this.editIndex
        };
        console.log(list);

        OperateNewOperate(list).then(res => {
          if (res.code === 0) {
            let courseInfo = res.data;

            this.courseInfoHandle({
              courseInfo: courseInfo
            });
            console.log(this.courseInfo);
          } else {
            tipsFail(res.msg);
          }
        });
      } else {
        tipsFail(res.msg);
      }
    });
  }

  created() {
    let couId = this.$route.query.courseId;
    if (couId == undefined) {
      //获取场景
      OperatenewStCourse().then(res => {
        if (res.code === 0) {
          let courseInfo = res.stCourseData;

          this.courseInfoHandle({
            courseInfo: courseInfo
          });

          this.$router.replace({
            path: this.$route.path,
            query: {
              courseId: res.stCourseData.courseId
            }
          });

          let bgImg = res.stCourseData.defaultSceneUrl;
          this.bgImgHandle({
            bgImg: bgImg
          });

          let courseId = res.stCourseData.courseId;
          this.courseIdHandle({
            courseId: courseId
          });

          let bgImgStatus = 0;

          this.bgImgStatusHandle({
            bgImgStatus: bgImgStatus
          });

          let editIndex = 0;

          this.editIndexHandle({
            editIndex: editIndex
          });

          let classType = 0;

          this.classTypeHandle({
            classType: classType
          });

          this.refIdHandle({
            refId: ""
          });
        } else {
          tipsFail(res.msg);
        }
      });
    } else {
      // 获取保存后的数据;
      OperateStCourseData({ courseId: couId }).then(res => {
        if (res.code === 0) {
          let courseInfo = res.data;

          this.courseInfoHandle({
            courseInfo: courseInfo
          });

          let checkedShow = courseInfo.currentStCourseData.remindApplyAllFlag;
          this.checkedShowHandle({
            checkedShow: checkedShow
          });

          let classType = courseInfo.currentStCourseData.courseType;

          this.classTypeHandle({
            classType: classType
          });

          let indx = courseInfo.currentStCourseData.stLessonList.length;

          this.indxHandle({
            indx: indx
          });

          let courseList = res.data.currentStCourseData.stLessonList;

          this.courseListHandle({
            courseList: courseList
          });

          let refCourseId = courseInfo.currentStCourseData.refCourseId;
          this.refIdHandle({
            refId: refCourseId
          });

          if (courseList == "") {
            let bgImg =
              "https://cloud.luyouor.com/scene/course/0/defaultScene/";
            this.bgImgHandle({
              bgImg: bgImg
            });

            let courseId = res.data.currentStCourseData.courseId;
            this.courseIdHandle({
              courseId: courseId
            });
          } else {
            let Status = res.data.currentStCourseData.bgImgStatus;

            if (Status == undefined) {
              let bgImgStatus = 1;

              this.bgImgStatusHandle({
                bgImgStatus: bgImgStatus
              });
            } else {
              let bgImgStatus = res.data.currentStCourseData.bgImgStatus;

              this.bgImgStatusHandle({
                bgImgStatus: bgImgStatus
              });
            }

            let i = this.editIndex;

            let bgImg = courseList[i].lessonSceneUrl;

            this.bgImgHandle({
              bgImg: bgImg
            });

            let succIframe = courseList[i].lessonServerUrl;

            this.succIframeHandle({
              succIframe: succIframe
            });

            let courseId = res.data.currentStCourseData.courseId;
            this.courseIdHandle({
              courseId: courseId
            });
          }
        } else {
          tipsFail(res.msg);
        }
      });
    }
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
  min-width: 1245px;
  min-height: 683px;
  background-size: cover;
  position: relative;
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  a {
    display: block;
    width: 134px;
    height: 44px;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    box-shadow: 0px 2px 4px 0px rgba(254, 120, 101, 0.4);
    border-radius: 22px;
    cursor: pointer;
    //修改字样式
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    letter-spacing: 1px;
  }
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
  position: absolute;
  // top: 0;
  right: 0;
  bottom: 90px;
  z-index: 201;
  iframe {
    float: right;
    width: 100%;
    height: 100%;
  }
  .left {
    position: absolute;
    right: 146px;
    bottom: 26px;
    width: 38px;
    height: 38px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    float: right;
    cursor: pointer;
    text-align: center;
    img {
      margin-top: 6px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .rightW {
    position: absolute;
    right: 26px;
    bottom: 26px;
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
    position: absolute;
    right: 26px;
    bottom: 26px;
    // width: 73px;
    // height: 26px;
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
// .npeIframe /deep/ .rightPage {
//   position: absolute;
//   top: 0;
//   width: 100%;
//   height: 100%;
// }

.npeIframe {
  width: 61.8%;
  height: 60.58%;
  position: absolute;
  top: 11.62%;
  right: 0;
  overflow: hidden;
  z-index: 201;
  // .pptPreview .rightPage {
  //   position: absolute;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  // }

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

.exit {
  position: absolute;
  left: 24px;
  top: 16px;
  width: 52px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.changeBtn {
  position: absolute;
  right: calc(50% + 24px);
  top: 16px;
  width: 62px;
  height: 24px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
.changeStatus {
  position: absolute;
  right: calc(50% + 24px);
  top: 16px;
  padding: 3px 7px;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 158, 1) 0%,
    rgba(254, 120, 101, 1) 100%
  );
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
.scene {
  right: calc(0% + 24px);
}
.signout {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2020;
  .tc {
    width: 410px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 13px;
    padding: 26px 32px 20px 32px;
    .header {
      position: absolute;
      left: 32px;
      // width: 100px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      height: 28px;
      line-height: 28px;
    }
    .main {
      margin-top: 43px;
      margin-bottom: 15px;
      width: 339px;
      height: 60px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .footer {
      position: absolute;
      .wrap {
        width: 176px;
        position: relative;
        float: left;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        input {
          position: absolute;
          top: 11px;
          border: 1px solid #dcdfe6;
          border-radius: 100%;
          width: 14px;
          height: 14px;
          background-color: #fff;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          line-height: 36px;
        }
        span {
          position: absolute;
          top: 0;
          left: 24px;
          width: 70px;
          display: inline-block;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(96, 98, 102, 1);
        }
      }
      .active {
        input {
          border: 5px solid #fe7865;
        }
      }

      .el-but {
        width: 78px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
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

      .el-utb {
        width: 78px;
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
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
        &:focus {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}

.confirm {
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
    padding: 0 54px;
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
</style>
