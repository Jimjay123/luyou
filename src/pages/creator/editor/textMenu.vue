/**

* Created by wangxin

* @date 2019/9/19 9:18  文本右侧功能面板

*/
<template>
  <div class="text">
    <RightNavTab :list="['文字','背景']" :tabVal="rightType" :tabValCb="tabValCb" />
    <div class="item-box" v-if="rightType==='文字'">
      <!--文字颜色 start-->
      <div class="item">
        <h3>文字颜色</h3>
        <BlockBox :colorList="colorList" :selColVal="fontColor" :selColValCb="selColValCb" />
      </div>
      <!--文字颜色 end-->

      <!--对齐方式 start-->
      <!--<div class="item mr14">
        <h3>对齐方式</h3>
        <AlignBox :alignList="alignList" :selAlignVal="selAlignVal" :selAlignValCb="selAlignValCb" />
      </div>-->
      <!--对齐方式 end-->

      <!--位置 start-->
      <div class="item mr14">
        <h3>位置</h3>
        <PositionBox
          :positionList="positionList"
          :selPositionVal="selPositionVal"
          :selPositionValCb="selPositionValCb"
        />
      </div>
      <!--位置 end-->

      <!--位置 start-->
      <div class="item mr14">
        <h3>本页旁白</h3>
        <SouRecBox />
      </div>
      <!--位置 end-->
    </div>

    <!--背景 start-->
    <div class="item-box" v-else>
      <div class="item">
        <h3>背景颜色</h3>
        <BlockBox :colorList="colorList" :selColVal="bgColor" :selColValCb="bgColorCb" />
      </div>
      <div class="item mr14">
        <h3>背景图片</h3>
        <ImageBox :imageList="bgImgList" :selImgVal="bgImg" :selImgValCb="selImgValCb" />
      </div>
    </div>
    <!--背景 end-->
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import RightNavTab from "./rightNavTab";
import BlockBox from "./blockBox";
import ImageBox from "./imageBox";
import AlignBox from "./alignBox";
import PositionBox from "./positionBox";
import SouRecBox from "./souRecBox";
import { State, Action, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";
import { changeCouUpdPageContentFun } from "../../../service/editor/editorAction";
const EditMod = namespace("edit");
@Component({
  name: "TextMenu",
  components: {
    RightNavTab,
    BlockBox,
    ImageBox,
    AlignBox,
    PositionBox,
    SouRecBox
  }
})
export default class TextMenu extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  @EditMod.State("bgImgList") bgImgList; //编辑文档数据
  @EditMod.Action("bgImgListHandle") bgImgListHandle; //编辑文档数据  action

  //文字 背景
  get rightType() {
    return this.editList[this.editIndex].rightType || "文字";
  }

  colorList = ["#333", "#666", "#999", "#E6E6E6", "#F2F2F2", "#F7F7F7", "#FFF"];

  //文字颜色
  get fontColor() {
    return this.editList[this.editIndex].rightNav.fontColor;
  }

  // 背景颜色
  get bgColor() {
    return this.editList[this.editIndex].rightNav.bgColor;
  }

  //背景图片选中项
  get bgImg() {
    return this.editList[this.editIndex].rightNav.bgImg;
  }

  // //对齐方式
  // alignList = [
  //   {
  //     src: require("../../../assets/creator/editor/left.svg"),
  //     type: "left"
  //   },
  //   {
  //     src: require("../../../assets/creator/editor/center.svg"),
  //     type: "center"
  //   },
  //   {
  //     src: require("../../../assets/creator/editor/right.svg"),
  //     type: "right"
  //   }
  // ];
  // get selAlignVal() {
  //   return this.editList[this.editIndex].rightNav.selAlignVal;
  // }

  //位置
  positionList = [
    {
      type: "top-left"
    },
    {
      type: "top-center"
    },
    {
      type: "top-right"
    },
    {
      type: "middle-left"
    },
    {
      type: "middle-center"
    },
    {
      type: "middle-right"
    },
    {
      type: "bottom-left"
    },
    {
      type: "bottom-center"
    },
    {
      type: "bottom-right"
    }
  ];
  get selPositionVal() {
    return this.editList[this.editIndex].rightNav.selPositionVal;
  }

  //tab切换回调方法
  @Emit tabValCb(val) {
    let editList = cloneObj(this.editList);
    editList[this.editIndex].rightType = val;
    this.editListHandle({
      editList
    });
  }

  //文字颜色选择回调
  @Emit selColValCb(val) {
    console.log(val);
    let editList = cloneObj(this.setEditList("fontColor", val));
    changeCouUpdPageContentFun({
      pageList: editList
    });
  }

  //背景颜色回调
  bgColorCb(val) {
    console.log(val);
    let editList = cloneObj(this.setEditList("bgColor", val));
    changeCouUpdPageContentFun({
      pageList: editList
    });
  }

  //图片选择回调
  @Emit selImgValCb(val, type) {
    console.log(val, type);
    if (!type) {
      let editList = cloneObj(this.setEditList("bgImg", val));
      changeCouUpdPageContentFun({
        pageList: editList
      });
    } else if (type === "del") {
      //删除背景图片
    } else if (type === "add") {
      //新增背景图片
      let value = {
        src: val
      };
      this.setEditList("bgImg", value);
    }
    if (this.bgColor) {
      this.setEditList("bgColor", "");
    }
  }

  //位置回调方法
  @Emit selPositionValCb(val) {
    console.log(val);
    let editList = cloneObj(this.setEditList("selPositionVal", val));
    console.log(editList);
    changeCouUpdPageContentFun({
      pageList: editList
    });
  }

  setEditList(name, val) {
    console.log(name, val);
    let editList = cloneObj(this.editList);
    editList[this.editIndex].rightNav[name] = val;
    if (name === "bgColor") {
      editList[this.editIndex].backgroundColor = val;
      if (val) {
        editList[this.editIndex].rightNav.bgImg = "";
        editList[this.editIndex].backgroundImageServerUrl = "";
      }
    } else if (name === "bgImg") {
      editList[this.editIndex].rightNav.bgColor = null;
      editList[this.editIndex].backgroundColor = null;

      editList[this.editIndex].backgroundImageServerUrl = val.src;
    } else if (name === "fontColor") {
      editList[this.editIndex].textFontColor = val;
    } else if (name === "selPositionVal") {
      editList[this.editIndex].position = val.type;
    }
    console.log(editList);
    this.editListHandle({
      editList
    });
    return editList;
  }
  created() {}

  updated() {}
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.item-box {
  padding: 20px;
}

.item {
  h3 {
    @include fontSet(12px, #333, 500);
    line-height: normal;
  }
}
.mr14 {
  margin-top: 14px;
}
</style>
