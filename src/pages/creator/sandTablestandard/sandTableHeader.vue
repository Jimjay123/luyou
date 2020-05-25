
<template>
  <div class="editor-header">
    <div class="editor-box clearfix">
      <div class="left">
        <img class="logo" :src="require('../../../assets/home/logo-bg.svg')" alt @click="exit" />
        <div
          v-for="(item,index) in headIconList"
          class="preview icon-item"
          @click="quickFun(item)"
          :key="index+item.tips"
        >
          <img class="i-item icon-cancel" :src="handleUrl(item)" />
          <div class="tips">
            {{item.tips}}
            <i class="icon-triangle"></i>
          </div>
        </div>

        <span class="text" v-if="modifyDatetime===''">自动保存</span>
        <span class="text" v-else>今天 {{modifyDatetime}} 自动保存</span>
        <!--<span class="text ft16">未命名课程</span>-->
        <input
          class="courseName text ft16"
          maxlength="24"
          type="text"
          :value="channelName"
          placeholder="未命名课程"
          @input="inputChangeFun"
        />
      </div>
      <div class="right">
        <div class="preview" @click="previewFun">
          <span></span>预览
        </div>
        <a class="btn" href="javascript:;" @click="toPublish">去发布</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import {
  changeCouUpdPageContentFun,
  preNpeCouOperateFun,
  nextNpeCouOperateFun
} from "../../../service/editor/editorAction";
import {
  nextStCourseOperate,
  previousStCourseOperate,
  getStChannelData,
  stChannelNewOperate,
  OperateconfirmData
} from "../../../service/sandTableApi";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsFail } from "../../../utils/utils";
const EditMod = namespace("edit");
const UserInfoMod = namespace("userinfo");
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "SandTableHeader"
})
export default class SandTableHeader extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  // @EditMod.State("courseInfo") courseInfo; //当前课程基本信息
  // @EditMod.Action("courseInfoHandle") courseInfoHandle; //当前课程基本信息  action

  // @EditMod.State("modifyDatetime") modifyDatetime; //最新更新时间

  // @EditMod.State("headIconList") headIconList; //接口加载中状态

  @SandTableMod.State("courseInfo") courseInfo; //沙盘课程频道-添加课程
  @SandTableMod.Action("courseInfoHandle") courseInfoHandle; //沙盘课程频道-添加课程

  @SandTableMod.State("headIconList") headIconList; //沙盘课程频道-添加课程
  @SandTableMod.Action("headIconListHandle") headIconListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前编辑模块的下标
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("creList") creList; //新建竖版列表
  @SandTableMod.Action("creListHandle") creListHandle; //新建竖版列表  action修改方法

  @SandTableMod.State("bgImg") bgImg; //当前编辑模块的下标
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前编辑模块的下标  action

  @SandTableMod.State("editIndex") editIndex; //当前编辑模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @SandTableMod.State("succIframe") succIframe; //当前编辑模块的下标
  @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前编辑模块的下标  action

  // previousOperate
  get previousOperate() {
    return this.courseInfo.previousOperate || null;
  }

  //下一步
  get nextOperate() {
    return this.courseInfo.nextOperate || null;
  }

  //课程名称
  get channelName() {
    return this.courseInfo.courseName || "未命名沙盘标准课";
  }
  //自动保存时间
  get modifyDatetime() {
    let modify = this.courseInfo.currentStCourseData || "";
    let time = modify.modifyDatetime || "";
    time = time.slice(11, 16);
    return time;
  }

  list = [
    {
      src: require("../../../assets/creator/editor/pre.svg"),
      disabledSrc: require("../../../assets/creator/editor/pre-disabled.svg"),
      isUse: "normal", //是否可用 normal可用  done 不可用
      tips: "撤销"
    },
    {
      src: require("../../../assets/creator/editor/next.svg"),
      disabledSrc: require("../../../assets/creator/editor/next-disabled.svg"),
      isUse: "normal", //是否可用 normal可用  done 不可用
      tips: "重做"
    },
    {
      src: require("../../../assets/creator/editor/save-normal.svg"),
      doingSrc: require("../../../assets/creator/editor/save-doing.svg"),
      disabledSrc: require("../../../assets/creator/editor/save-done.svg"),
      isUse: "normal", //normal  doing  done
      tips: "保存"
    }
  ];

  timer = null; //定时器

  // 退出沙盘课程
  @Emit exit() {
    this.$router.push({
      path: "/creator/home"
    });
  }

  //操作url计算
  handleUrl(item) {
    // console.log(item);
    if (item.tips === "重做") {
      return !this.nextOperate ? item.disabledSrc : item.src;
    } else if (item.tips === "撤销") {
      return !this.previousOperate ? item.disabledSrc : item.src;
    } else {
      return item.isUse === "normal"
        ? item.src
        : item.isUse === "done"
        ? item.disabledSrc
        : item.doingSrc;
    }
  }

  //快捷操作点击事件
  quickFun(obj) {
    let item = obj.tips;
    if (item === "撤销") {
      //上一步
      let operateId = this.courseInfo.previousOperate.id || null;
      let courseId = this.$route.query.courseId;
      previousStCourseOperate({
        operateId,
        courseId
      })
        .then(res => {
          if (res.code == 0) {
            let bgImgStatus = res.data.currentStCourseData.bgImgStatus || 0;
            this.bgImgStatusHandle({
              bgImgStatus: bgImgStatus
            });

            let courseInfo = cloneObj(this.courseInfo);
            courseInfo = res.data;
            this.courseInfoHandle({
              courseInfo: courseInfo
            });

            let courseList = this.courseList;
            courseList = res.data.currentStCourseData.stLessonList;
            this.courseListHandle({
              courseList: courseList
            });

            let subscript = res.data.currentStCourseData.editIndex;
            if (courseList == "") {
              let bgImg =
                "https://cloud.luyouor.com/scene/course/0/defaultScene/";
              this.bgImgHandle({
                bgImg: bgImg
              });
              let creList = this.creList;
              this.creListHandle({
                creList: creList
              });
              this.$router.replace({
                path: this.$route.path,
                query: {
                  courseId: this.courseId
                }
              });
            } else {
              let bgImg = courseList[subscript].lessonSceneUrl;
              this.bgImgHandle({
                bgImg: bgImg
              });
              let succIframe = courseList[subscript].lessonServerUrl;

              this.succIframeHandle({
                succIframe: succIframe
              });

              let editIndex = subscript;
              this.editIndexHandle({
                editIndex: editIndex
              });
            }
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    } else if (item === "重做") {
      //下一步
      let operateId = this.courseInfo.nextOperate.id || null;
      let courseId = this.$route.query.courseId;
      nextStCourseOperate({
        operateId,
        courseId
      })
        .then(res => {
          if (res.code == 0) {
            let courseInfo = cloneObj(this.courseInfo);
            courseInfo = res.data;
            this.courseInfoHandle({
              courseInfo: courseInfo
            });
            let bgImgStatus = courseInfo.currentStCourseData.bgImgStatus || 0;
            this.bgImgStatusHandle({
              bgImgStatus: bgImgStatus
            });
            let courseList = this.courseList;
            courseList = courseInfo.currentStCourseData.stLessonList;
            this.courseListHandle({
              courseList: courseList
            });
            let subscript = res.data.currentStCourseData.editIndex;
            if (courseList == "") {
              let bgImg =
                "https://cloud.luyouor.com/scene/course/0/defaultScene/";
              this.bgImgHandle({
                bgImg: bgImg
              });
            } else {
              let bgImg = courseList[subscript].lessonSceneUrl;
              this.bgImgHandle({
                bgImg: bgImg
              });
              let succIframe = courseList[subscript].lessonServerUrl;

              this.succIframeHandle({
                succIframe: succIframe
              });

              let editIndex = subscript;
              this.editIndexHandle({
                editIndex: editIndex
              });
            }
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    } else if (item === "保存") {
      let data = this.courseInfo;
      stChannelNewOperate(data)
        .then(res => {
          if (res.code == 0) {
            let courseInfo = cloneObj(this.courseInfo);
            courseInfo = res.data;
            // courseInfo.previousOperate = res.data.previousOperate;
            this.courseInfoHandle({
              courseInfo: courseInfo
            });

            let headIconList = cloneObj(this.headIconList);

            headIconList[2].isUse = "done";
            this.headIconListHandle({
              headIconList: headIconList
            });
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    }
  }

  //输入框改变事件
  inputChangeFun() {
    let val = event.target.value;
    let courseId = this.$route.query.courseId;
    let courseInfo = cloneObj(this.courseInfo);
    courseInfo.courseName = val;
    courseInfo.courseId = courseId;
    this.courseInfoHandle({
      courseInfo: courseInfo
    });
    clearTimeout(this.timer);
    //输入框改变延迟300ms后向后台发送数据
    this.timer = setTimeout(() => {
      let data = cloneObj(this.courseInfo);
      stChannelNewOperate(data)
        .then(res => {
          if (res.code == 0) {
            let courseInfo = cloneObj(this.courseInfo);
            this.courseInfoHandle({
              courseInfo: courseInfo
            });
            let headIconList = cloneObj(this.headIconList);
            headIconList[2].isUse = "done";
            this.headIconListHandle({
              headIconList: headIconList
            });
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          tipsFail(err);
        });
    }, 300);
  }

  //预览点击事件
  @Emit previewFun() {
    // let refId = this.courseInfo.currentStCourseData.refCourseId;
    console.log(this.$route)
    let address = this.$route.name;
    console.log(address);
    this.$router.push({
      path: "/previewMain",
      query: {
        courseId: this.$route.query.courseId,
        preview: 1,
        address: address,
        displayR: true
      }
    });
  }

  //去发布跳转
  toPublish() {
    let data = cloneObj(this.courseInfo.currentStCourseData);
    OperateconfirmData(data)
      .then(res => {
        if (res.code == 0) {
          let courseId = res.data.courseId;
          this.$router.push({
            path: "/classCourseInfo",
            query: {
              courseId: courseId
            }
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        tipsFail(err);
      });
  }
  created() {}
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.editor-header {
  height: 60px;
  width: 100%;
  //padding-right:17px;
}
.editor-box {
  position: fixed;
  width: 100%;
  min-width: 1200px;
  z-index: 99;
  box-shadow: 0px 1px 2px 0px rgba(237, 237, 237, 1);
  background: #fff;
  z-index: 299;
}
.left {
  float: left;
  height: 60px;
  img {
    height: 28px;
    width: auto;
  }
  .logo {
    margin-left: 24px;
    margin-right: 40px;
    cursor: pointer;
  }
  .icon-item {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    width: 44px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
    .i-item {
      display: inline-block;
      width: 24px;
      height: 24px;
    }
    .tips {
      display: none;
      position: absolute;
      top: 51px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      border-radius: 3px;
      background: rgba(51, 51, 51, 0.6);
      @include fontSet(12px, #fff, 400);
      .icon-triangle {
        position: absolute;
        top: -8px;
        left: 17px;
        border-width: 4px;
        border-style: solid;
        border-color: transparent transparent rgba(51, 51, 51, 0.6) transparent;
      }
    }
  }
  .icon-item:hover {
    .tips {
      display: block;
    }
  }
  .text {
    display: inline-block;
    @include fontSet(12px, rgba(153, 153, 153, 1), 400);
    width: 180px;
    vertical-align: middle;
  }
  .courseName {
    border: none;
    width: 384px;
    height: 24px;
    & input::placeholder {
      color: #999;
    }
  }
  .ft16 {
    font-size: 16px;
  }
}
.right {
  float: right;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  .btn {
    cursor: pointer;
    display: inline-block;
    width: 88px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 18px;
    @include fontSet(16px, #fff, 500);
    margin-left: 24px;
  }
  .preview {
    display: inline-block;
    @include fontSet(16px, #666, 500);
    cursor: pointer;
    span {
      display: inline-block;
      width: 32px;
      height: 32px;
      vertical-align: middle;
      @include bg("../../../assets/creator/preview.svg");
    }
  }
}
</style>
