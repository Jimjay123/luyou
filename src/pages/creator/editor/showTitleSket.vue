/**

* Created by wangxin 标题画板

* @date 2019/10/9 9:06

*/
<template>
  <div class="title-sket" :style="bgStyle">
    <div :class="wMark"></div>
    <div class="textarea" :style="fontStyle" maxlength="24" placeholder="点击设置课程标题">
      <pre>{{textarea}}</pre>
    </div>
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
  name: "ShowTitleSket",
  components: {
    ResizeTextarea
  }
})
export default class ShowTitleSket extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  @EditMod.State("courseInfo") courseInfo; //当前课程基本信息
  @EditMod.Action("courseInfoHandle") courseInfoHandle; //当前课程基本信息  action

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }

  get textarea() {
    // console.log(this.previewEditList);
    // console.log(this.courseInfo);
    return this.previewEditList[this.ShowIndex].leftSket.title;
    // return this.courseInfo.courseName||'';
  }

  get wMark() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.previewEditList[this.ShowIndex].rightNav;
    if (!bgColor && !bgImg) {
      return "water-mark";
    }
    return "water-mark white-mark";
  }

  //背景计算属性
  get bgStyle() {
    let {
      bgColor, //背景颜色
      bgImg //背景图片
    } = this.previewEditList[this.ShowIndex].rightNav;
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
    } = this.previewEditList[this.ShowIndex].rightNav;
    let obj = {};
    if (fontColor) {
      obj["color"] = fontColor;
    }
    return obj;
  }
  created() {}
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

  font-size: 32px;
  font-weight: 500;
  color: rgba(77, 77, 77, 1);
  line-height: 50px;
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
