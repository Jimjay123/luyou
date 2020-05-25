/**

* Created by wangxin 标题画板

* @date 2019/10/9 9:06

*/
<template>
  <div class="title-sket" :style="bgStyle">
    <div :class="wMark"></div>
    <ResizeTextarea
      class="textarea"
      type="textarea"
      autosize
      :style-obj="fontStyle"
      resize="none"
      max="2"
      placeholder="点击设置课程标题"
      maxlength="24"
      @input="inputFun"
      :value="textarea"
    />
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
const EditMod = namespace("edit");
import ResizeTextarea from "../component/resizeTextarea";
import { cloneObj } from "../../../utils/utils";

@Component({
  name: "TitleSket",
  components: {
    ResizeTextarea
  }
})
export default class TitleSket extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("courseInfo") courseInfo; //编辑文档数据
  @EditMod.Action("courseInfoHandle") courseInfoHandle; //编辑文档数据  action

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }

  get textarea() {
    //return this.editList[this.ShowIndex].leftSket.title;
    return this.courseInfo.courseName||'';
  }

  get wMark() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.editList[this.ShowIndex].rightNav;
    if (!bgColor || !bgImg) {
      return "water-mark";
    }
    return "water-mark white-mark";
  }

  //背景计算属性
  get bgStyle() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.editList[this.ShowIndex].rightNav;
    let obj = {};
    if (bgColor && !bgImg) {
      obj = {
        background: bgColor
      };
    } else if (!bgColor && bgImg) {
      obj = {
        "background-image": 'url("' + bgImg.src + '")',
        "background-repeat": "no-repeat",
        "background-position": "center center",
        "background-size": "cover"
      };
    }
    return obj;
  }

  //文字计算属性
  get fontStyle() {
    let {
      fontColor //文字颜色
    } = this.editList[this.ShowIndex].rightNav;
    let obj = {};
    if (fontColor) {
      obj["color"] = fontColor;
    }
    return obj;
  }

  timer = null; //定时器
  //输入框改变事件
  inputFun() {
    let val=event.target.value;
    let editList=cloneObj(this.editList);
    let courseInfo=this.courseInfo;
    courseInfo.courseName=val;
    this.courseInfoHandle({courseInfo});
    clearTimeout(this.timer);
    //输入框改变延迟300ms后向后台发送数据
    this.timer=setTimeout(()=>{
      changeCouUpdPageContentFun({
        courseId:this.$route.query.courseId,
        courseName:val,
        pageList:editList
      });
    },300)
  }
}
</script>

<style lang="scss" scoped>
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}

.title-sket {
  position: relative;
  padding: 64px;
  width: 100%;
  height: 100%;
}

.water-mark {
  width: 639px;
  height: 92px;
  @include bg("../../../assets/creator/editor/w-m-block.svg");
  margin: 0 auto;
  margin-top: 109px;
}

.white-mark {
  @include bg("../../../assets/creator/editor/w-m-w.svg");
}

.textarea {
  position: absolute;
  top: 187px;
  left: 107px;
  width: 482px;
}

.textarea /deep/ {
  textarea {
    overflow: hidden;
    width: 482px;
    height: 50px;
    font-size: 32px;
    border: none;
    border-bottom: 1px dashed #ccc;
    background: none;
  }
  textarea::placeholder {
    font-size: 32px;
    color: #fff;
  }
}
</style>
