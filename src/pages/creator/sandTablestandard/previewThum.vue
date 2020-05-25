
<template>
  <div
    :class="['page-thum', classType == 4 ?'page-type':'']"
    ref="stepPlugin"
    v-if="bgImgStatus == 1 || bgImgStatus == 2"
  >
    <!-- <Vuescroll :ops="ops" @handle-resize="handleResize"> -->
    <ul id="thumBox" class="ul-box clearfix" ref="vuescroll">
      <li
        :class="{item:true,'active':editIndex===index?true:false}"
        v-for="(item,index) in courseList"
        :key="index"
        @click="selectSketFun(index)"
        style="overflow: hidden;"
      >
        <!--标题画板 start-->
        <span class="sp">{{index+1}}</span>
        <!--标题画板 end-->
      </li>
    </ul>
    <!-- </Vuescroll> -->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { Action, State, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
import { OperateStCourseData } from "../../../service/sandTableApi";
import { listMap } from "../../../service/editor/editorAction";
import { npeCourseLearningState } from "../../../service/editor/editorApi";
import Vuescroll from "vuescroll";
const EditMod = namespace("edit");
import { memberidentifyRoleType } from "../../../service/groupApi";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "BottomThum",
  components: {
    // Vuescroll
  }
})
export default class BottomThum extends Vue {
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

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgPicture") bgPicture; //当前编辑模块的下标
  @SandTableMod.Action("bgPictureHandle") bgPictureHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("succIframe") succIframe; //当前编辑模块的下标
  @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前编辑模块的下标  action

  @SandTableMod.State("classType") classType; //新建竖版列表
  @SandTableMod.Action("classTypeHandle") classTypeHandle; //新建竖版列表  action修改方法
  wrz = ""; //身份识别
  //选中画板
  @Emit selectSketFun(index) {
    let courseList = this.courseList;

    let bgImg = courseList[index].lessonSceneUrl;

    this.bgImgHandle({
      bgImg: bgImg
    });

    if (this.wrz == 2 && this.classType == 3) {
      this.editIndexHandle({
        editIndex: index
      });
      let token = sessionStorage.getItem("assent_token");
      let group = this.$route.query.groupId;
      let cour = this.$route.query.courId;
      let ref = this.$route.query.refId;
      let baseUrl = window.location.href.split("#")[0] + "";

      let succIframe = courseList[index].lessonServerUrl;
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
      // let index = i + 1;
      let i = this.editIndex;
      let indexOf = i != 0 ? i : 0;

      let time = new Date().getTime();
      this.endTimeHandle({
        endTime: time
      });
      let timeDiff = parseInt((this.endTime - this.startTime) / 1000 / 60); //时间戳
      timeDiff = timeDiff > 1 ? timeDiff : 1;
      // 将时间差存到数据中
      let dataList = cloneObj(this.previewEditList);
      let oldTime = dataList[indexOf].cumulativeTime || 0;
      let resultTime = timeDiff > oldTime ? timeDiff : oldTime;
      dataList[indexOf].cumulativeTime = resultTime;
      dataList[indexOf].finishFlag = true;
      dataList[indexOf].finishPercent = 100;
      this.previewEditListHandle({
        previewEditList: dataList
      });

      // 将结束时间保存为开始时间
      let startTime = cloneObj(this.endTime);
      this.startTimeHandle({
        startTime
      });

      // 记录当前点击的lastIndex
      let lastIndex = indexOf;
      this.lastIndexHandle({
        lastIndex
      });

      this.editIndexHandle({
        editIndex: index
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
      this.editIndexHandle({
        editIndex: index
      });
      let succIframe = courseList[index].lessonServerUrl;

      this.succIframeHandle({
        succIframe: succIframe
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
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }

  created() {
    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          this.wrz = res.identifiedRoleType;
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
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.page-thum {
  max-width: 47.15%;
  min-height: 68px;
  max-height: 12.43%;
  background: rgba(255, 255, 255, 0.3);
  position: fixed;
  bottom: 3.38%;
  left: 2.08%;
  padding: 10px 10px 0 10px;
  z-index: 200;
  border-radius: 12px;
  ul.ul-box {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 4px;
  }
  div.add-btn {
    vertical-align: top;
    margin-right: 0;
    margin-top: 4px;
    box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7);
    border-radius: 4px;
  }
  .item {
    display: inline-block;
    width: 48px;
    height: 49px;
    box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 1);
    border-radius: 100%;
    background: #fff;
    margin-right: 10px;
    position: relative;
    vertical-align: middle;
    background-image: url(../../../assets/creator/sandTablestandard/pptInd.svg);
    margin-bottom: 10px;
    cursor: pointer;
    .sp {
      position: absolute;
      top: 47%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 26px;
      font-family: GalanoGrotesqueDEMO-Bold, GalanoGrotesqueDEMO;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  .active,
  .active:focus {
    background-image: url(../../../assets/creator/sandTablestandard/pptIndex.svg);
  }
}
.page-type {
  max-width: 95.83%;
  width: 95.83%;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 96px;
  height: 10px;
  background-color: #fff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 4px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
