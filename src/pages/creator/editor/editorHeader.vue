/**

* Created by wangxin

* @date 2019/9/18 9:34

*/
<template>
  <div class="editor-header">
    <div class="editor-box clearfix">
      <div class="left">
        <img
          class="logo"
          @click="()=>{this.$router.push('/creator/home')}"
          :src="require('../../../assets/home/logo-bg.svg')"
          alt
        />
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

        <span class="text">{{modifyDatetime}} 自动保存</span>
        <!--<span class="text ft16">未命名课程</span>-->
        <input
          class="courseName text ft16"
          maxlength="24"
          type="text"
          :value="courseName"
          placeholder="点击设置课程标题"
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
import { confirmNpeCourseData } from "../../../service/editor/editorApi";
import { State, Action, namespace } from "vuex-class";
import { cloneObj, tipsFail } from "../../../utils/utils";
const EditMod = namespace("edit");
const UserInfoMod = namespace("userinfo");
@Component({
  name: "EditorHeader"
})
export default class EditorHeader extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("courseInfo") courseInfo; //当前课程基本信息
  @EditMod.Action("courseInfoHandle") courseInfoHandle; //当前课程基本信息  action

  //@EditMod.State("modifyDatetime") modifyDatetime; //最新更新时间

  @EditMod.State("headIconList") headIconList; //接口加载中状态

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

  //上一步
  get previouseOperate() {
    return this.courseInfo.previouseOperate || null;
  }

  //下一步
  get nextOperate() {
    return this.courseInfo.nextOperate || null;
  }

  //课程名称
  get courseName() {
    return this.courseInfo.courseName || "";
  }

  get modifyDatetime() {
    return this.courseInfo.modifyDatetime || "";
  }

  //操作url计算
  handleUrl(item) {
    if (item.tips === "重做") {
      return !this.nextOperate ? item.disabledSrc : item.src;
    } else if (item.tips === "撤销") {
      return !this.previouseOperate ? item.disabledSrc : item.src;
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
      preNpeCouOperateFun();
    } else if (item === "重做") {
      //下一步
      nextNpeCouOperateFun();
    } else if (item === "保存") {
    }
  }

  //输入框改变事件
  inputChangeFun() {
    let val = event.target.value;
    let editList = cloneObj(this.editList);
    let courseInfo = this.courseInfo;
    courseInfo.courseName = val;
    this.courseInfoHandle({ courseInfo });
    clearTimeout(this.timer);
    //输入框改变延迟300ms后向后台发送数据
    this.timer = setTimeout(() => {
      changeCouUpdPageContentFun({
        courseId: this.$route.query.courseId,
        courseName: val,
        pageList: editList
      });
    }, 300);
  }

  //预览点击事件
  @Emit previewFun() {
    this.$router.push({
      path: "/pptPreview",
      query: {
        courseId: this.$route.query.courseId,
        preview: 1
      }
    });
  }

  //去发布跳转
  toPublish() {
    console.log(this.editList);
    console.log(this.courseInfo);
    let pageList = {};
    pageList.courseId = this.courseInfo.courseId;
    pageList.courseName = this.courseInfo.courseName;
    pageList.pageList = cloneObj(this.editList);
    console.log(pageList);
    confirmNpeCourseData(pageList)
      .then(res => {
        console.log(res);
        if (res.code === 0) {
          let courseId = res.data.courseId;
          let type = res.data.courseType;
          this.$router.push({
            path: "/classCourseInfo",
            query: {
              courseId: courseId,
              courseType: type
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
