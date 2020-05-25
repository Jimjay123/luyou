<template>
  <div class="pptPreview">
    <div class="rightPage">
      <div class="main">
        <div id="pptBox">
          <PptPreTemplate>
            <!--标题画板 start-->
            <ShowTitleSket v-if="type==='title'" :index="editIndex" />
            <!--标题画板 end-->

            <!-- 图+文 start -->
            <ShowPictureUpload v-if="type==='imageText'" :index="editIndex" />
            <!-- 图+文 end -->

            <!-- 文档编辑 start-->
            <ShowTextIntroduce v-else-if="type==='text'" :index="editIndex" />
            <!-- 文档编辑 end-->

            <!--选择题画板 start-->
            <ShowChoiceQuestionSket v-else-if="type==='choiceQuestion'" :index="editIndex" />
            <!--选择题画板 end-->

            <!-- 文档上传 start -->
            <ShowDocUpload v-else-if="type==='file'" />
            <!-- 文档上传 end -->

            <!-- 视频上传 start-->
            <ShowVideoUpload v-else-if="type==='video'" :index="editIndex" />
            <!-- 视频上传 end-->

            <!-- 图片上传 end-->
            <ShowImageUpload v-else-if="type==='image'" :index="editIndex" />
            <!-- 图片上传 end-->
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

import PptPreTemplate from "./PreTemplate";

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
import { memberidentifyRoleType } from "../../../service/groupApi";
import { Action, State, namespace } from "vuex-class";
import { cloneObj, tipsMsg, tipsFail } from "../../../utils/utils";
import store from "../../../store";
const EditMod = namespace("edit");
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "pptPreview",
  directives: {
    Clickoutside
  },
  components: {
    PptPreTemplate,
    // new
    ShowTitleSket,
    ShowPictureUpload,
    ShowTextIntroduce,
    ShowVideoUpload,
    ShowDocUpload,
    ShowImageUpload,
    ShowChoiceQuestionSket
  }
})
export default class PptPreview extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  @EditMod.State("courseLearningStateId") courseLearningStateId; //编辑文档数据
  @EditMod.Action("courseLearningStateIdHandle") courseLearningStateIdHandle; //编辑文档数据  action

  @EditMod.State("planLearningStateId") planLearningStateId; //编辑文档数据
  @EditMod.Action("planLearningStateIdHandle") planLearningStateIdHandle; //编辑文档数据  action

  @EditMod.State("courseInfo") courseInfo; //当前课程基本信息
  @EditMod.Action("courseInfoHandle") courseInfoHandle; //当前课程基本信息  action

  @EditMod.State("startTime") startTime; //npe预览页开始时间
  @EditMod.Action("startTimeHandle") startTimeHandle; //npe预览页开始时间  action

  @EditMod.State("endTime") endTime; //npe预览页结束时间
  @EditMod.Action("endTimeHandle") endTimeHandle; //npe预览页结束时间  action

  @SandTableMod.State("refId") refId; //当前编辑模块的下标
  @SandTableMod.Action("refIdHandle") refIdHandle; //当前编辑模块的下标  action

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  //课程名称
  get courseName() {
    return this.courseInfo.courseName || "";
  }
  get type() {
    // this.editIndexHandle({
    //   editIndex: this.Index
    // });

    let editIndex = this.editIndex;

    return this.previewEditList[editIndex].type;
  }
  get editListLength() {
    return this.previewEditList.length;
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
  indx = 0; //课程的多少

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

  @Emit dealData(res) {
    // let newData = res.data.npeCourseData;
    let newData = res.data.npeCoursePageContentList;
    let list = newData;
    let previewEditList = cloneObj(listMap(list));
    let editIndex = store.state.edit.editIndex;
    if (editIndex >= previewEditList.length) {
      editIndex = previewEditList.length - 1;
    }
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
    this.previewEditListHandle({
      previewEditList
    });
    this.indx = previewEditList.length;
  }

  created() {
    this.preWord = this.$route.query.preview;
    this.showPrompt = this.editIndex === this.editListLength - 1 ? 1 : 0;
    this.editIndexHandle({
      editIndex: 0
    });

    let previewEditList = cloneObj(this.previewEditList);
    this.previewEditListHandle({
      previewEditList
    });

    this.computedScreen();

    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          this.wrz = res.identifiedRoleType;
          let wrz = res.identifiedRoleType;
          if (wrz == 3) {
            let courseId =
              this.refId == "" ? this.$route.query.refId : this.refId;
            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.courId;
            let data = {
              courseId,
              groupId,
              coursePlanId
            };
            npeCourseData(data)
              .then(res => {
                if (res.code === 0) {
                  let result = res;
                  this.dealData(result);
                  console.log(this.editIndex);
                } else {
                  tipsFail(res.msg);
                }
              })
              .catch(err => {
                tipsFail(err);
              });
          } else {
            let courseId =
              this.refId == ""
                ? this.$route.query.refId
                : this.$route.query.courseId;

            let groupId = this.$route.query.groupId;
            let coursePlanId = this.$route.query.courId;
            let data = {
              courseId,
              groupId,
              coursePlanId
            };
            npeCourseData(data)
              .then(res => {
                if (res.code === 0) {
                  let result = res;
                  let courseLearningStateId = res.data.courseLearningStateId;
                  this.courseLearningStateIdHandle({
                    courseLearningStateId
                  });
                  let planLearningStateId = res.data.planLearningStateId;
                  this.planLearningStateIdHandle({
                    planLearningStateId
                  });
                  this.dealData(result);
                } else {
                  tipsFail(res.msg);
                }
              })
              .catch(err => {
                tipsFail(err);
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
</script>>

<style lang="scss" scoped>
.pptPreview {
  width: 100%;
  height: 100%;
  .rightPage {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
  }
  #pptBox {
    width: 100%;
    height: 100%;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .PptPreTemplate {
    width: 100%;
    height: 100%;
    .scale {
      background: rgb(51, 51, 51);
      position: absolute;
      top: 0;
      left: 0;
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
    position: relative;
    // right: 20px;
    // bottom: 40px;
    z-index: 200;
    // background-color: blue;
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
}
</style>
