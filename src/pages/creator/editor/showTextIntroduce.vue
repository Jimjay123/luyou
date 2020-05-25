<template>
  <div
    class="textIntroduce"
    :style="[{'backgroundColor':bgColor||''},{backgroundImage:'url('+ bgImg.src || '' +')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover' }]"
  >
    <div :class="['word-box',selPositionVal.type==undefined?'middle-center':selPositionVal.type]">
      <div
        :class="['text-word',selPositionVal.type==undefined?'middle-center':selPositionVal.type]"
        :style="{...fontStyle,...alianStyle}"
      >
        <pre>{{textarea||'点击输入文本'}}</pre>
      </div>
      <!-- <ResizeTextarea
        :class="['text-word',selPositionVal.type==undefined?'middle-center':selPositionVal.type]"
        type="textarea"
        :style-obj="{...fontStyle,...alianStyle}"
        placeholder="点击输入文本"
        @input="inputFun"
        :value="textarea"
        :autosize="{ minRows: 1, maxRows: 14}"
      ></ResizeTextarea>-->
    </div>
  </div>
</template>




<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";
import ResizeTextarea from "../component/resizeTextarea";
import { State, Action, namespace } from "vuex-class";
// import { changeCouUpdPageContent } from "../../../service/editor/editorApi";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
const EditMod = namespace("edit");
@Component({
  name: "ShowTextIntroduce",
  components: {
    ResizeTextarea
  },
  directives: {}
})
export default class ShowTextIntroduce extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("previewEditList") previewEditList; //编辑文档数据
  @EditMod.Action("previewEditListHandle") previewEditListHandle; //编辑文档数据  action

  @Prop({
    require: false,
    default: null
  })
  index;

  get ShowIndex() {
    return this.index !== null ? this.index : this.editIndex;
  }

  get textarea() {
    return this.previewEditList[this.ShowIndex].leftSket.title;
  }
  //文字 背景
  get rightType() {
    return this.previewEditList[this.ShowIndex].rightNav.rightType;
  }

  colorList = ["#333", "#666", "#999", "#E6E6E6", "#F2F2F2", "#F7F7F7", "#FFF"];

  //文字颜色
  get fontColor() {
    return this.previewEditList[this.ShowIndex].rightNav.fontColor;
  }

  // 背景颜色
  get bgColor() {
    return this.previewEditList[this.ShowIndex].rightNav.bgColor;
  }

  //背景图片数据
  get bgImgList() {
    return this.previewEditList[this.ShowIndex].rightNav.bgImgList;
  }

  //背景图片选中项
  get bgImg() {
    return this.previewEditList[this.ShowIndex].rightNav.bgImg;
  }

  //对齐方式
  get selAlignVal() {
    return this.previewEditList[this.ShowIndex].rightNav.selAlignVal;
  }

  get selPositionVal() {
    return this.previewEditList[this.ShowIndex].rightNav.selPositionVal;
  }
  //熊vuex
  @EditMod.State("positionVal") positionVal; //文本对齐位置
  @EditMod.Action("positionValHandle") positionValHandle; //文本对齐位置  action修改方法

  @EditMod.State("alignVal") alignVal; //对齐方式
  @EditMod.Action("alignValHandle") alignValHandle; //对齐方式  action修改方法

  @EditMod.State("textMsg") textMsg; //输入文本
  @EditMod.Action("textMsgHandle") textMsgHandle; //输入文本  action修改方法

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

  get alianStyle() {
    let {
      selPositionVal: { type }
    } = this.previewEditList[this.ShowIndex].rightNav;
    if (!type) {
      return;
    }
    let obj = {};
    if (type) {
      let typeStyle = type.split("-")[1];
      obj["text-align"] = typeStyle;
    }
    return obj;
  }

  created() {}
  updated() {}
}
</script>

<style lang="scss" scoped>
.textIntroduce {
  width: 100%;
  height: 100%;
  padding: 64px;
  background: no-repeat;
  .word-box {
    height: 100%;
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 24px;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
    line-height: 32px;
    overflow: hidden;
    .text-word {
      // overflow: hidden;
      cursor: pointer;
      border: none;
      // min-width: 100px !important;
      min-height: auto !important;
      max-width: 868px;
      max-height: 442px;
      height: auto;
      overflow-x: visible;
    }
  }
  .text-word /deep/ {
    textarea {
      overflow: hidden;
      min-width: 108px;
      min-height: auto !important;
      max-width: 868px;
      max-height: 443px !important;
      // width: auto;
      height: auto;
      font-size: 18px;
      border: none;
      background: none;
      resize: none;
      overflow: hidden;
      padding: 0;
      text-align: center;
      overflow-x: visible;
    }
    textarea::placeholder {
      font-size: 18px;
      color: #4d4d4d;
    }
  }
  .top-left {
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
  .top-center {
    justify-content: center;
    align-items: flex-start;
    text-align: center;
  }
  .top-right {
    justify-content: flex-end;
    align-items: flex-start;
    text-align: right;
  }

  .middle-left {
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }
  .middle-center {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .middle-right {
    justify-content: flex-end;
    align-items: center;
    text-align: right;
  }

  .bottom-left {
    justify-content: flex-start;
    align-items: flex-end;
    text-align: left;
  }
  .bottom-center {
    justify-content: center;
    align-items: flex-end;
  }
  .bottom-right {
    justify-content: flex-end;
    align-items: flex-end;
  }
  .center {
    text-align: center;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}
</style>
