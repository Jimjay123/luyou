<template>
  <div class="page-thum" v-if="bgImgStatus == 1 || bgImgStatus == 2">
    <ul id="thumBox" class="ul-box clearfix">
      <li
        :class="{item:true,'active':editIndex == index ? true:false}"
        v-for="(item,index) in courseList"
        :key="index"
        @click="selectSketFun(index)"
        style="overflow: hidden;"
      >
        <!--标题画板 start-->
        <img :src="item.sceneThumbnailUrl" :index="index" />
        <!--标题画板 end-->
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { Action, State, namespace } from "vuex-class";
import { cloneObj } from "../../../utils/utils";

const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "BottomThum",
  directives: {
    Clickoutside
  },
  components: {}
})
export default class BottomThum extends Vue {
  @SandTableMod.State("editIndex") editIndex; //当前模块的下标
  @SandTableMod.Action("editIndexHandle") editIndexHandle; //当前模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前模块的数据
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前模块的数据  action

  @SandTableMod.State("bgImgStatus") bgImgStatus; //当前模块的状态
  @SandTableMod.Action("bgImgStatusHandle") bgImgStatusHandle; //当前模块的状态  action

  // @SandTableMod.State("bgPicture") bgPicture; //当前编辑模块的下标
  // @SandTableMod.Action("bgPictureHandle") bgPictureHandle; //当前编辑模块的下标  action

  @SandTableMod.State("succIframe") succIframe; //当前模块的第三方课程
  @SandTableMod.Action("succIframeHandle") succIframeHandle; //当前模块的第三方课程  action

  @SandTableMod.State("bgImg") bgImg; //当前模块的场景
  @SandTableMod.Action("bgImgHandle") bgImgHandle; //当前模块的场景  action

  //选中画板
  @Emit selectSketFun(index) {
    // 下标
    this.editIndexHandle({
      editIndex: index
    });
    // 场景
    let bgImg = this.courseList[index].lessonSceneUrl;
    this.bgImgHandle({
      bgImg: bgImg
    });
    // 第三方课程
    let editIndex = this.editIndex;
    let succIframe = this.courseList[editIndex].lessonServerUrl;
    this.succIframeHandle({
      succIframe: succIframe
    });
  }

  created() {}
}
</script>

<style lang="scss" scoped>
@mixin bg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.item .scale {
  transform: scale(0.0924);
  background: rgb(51, 51, 51);
  width: 996px;
  height: 570px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 43px;
}
.item .br64 {
  border-radius: 43px;
}
.scale /deep/ {
  .pptTemplate {
    border-radius: 43px;
  }
}
.page-thum {
  width: calc(100% - 198px);
  height: 90px;
  background: #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 12px 24px;
  z-index: 200;
  ul.ul-box {
    display: inline-block;
    vertical-align: middle;
    max-width: calc(100% - 103px);
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
    width: 92px;
    height: 53px;
    box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 1);
    border-radius: 4px;
    background: #fff;
    margin-right: 10px;
    position: relative;
    vertical-align: middle;
    &:hover {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7),
        0px 0px 0px 2px rgba(254, 120, 101, 1);
      border-radius: 4px;
    }
    img {
      width: 92px;
      height: 53px;
    }
  }
  .active,
  .active:hover {
    box-shadow: 0px 2px 10px 0px rgba(254, 120, 101, 0.7),
      0px 0px 0px 2px rgba(254, 120, 101, 1);
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:hover {
      .copy,
      .del {
        display: block;
      }
    }
  }
  .copy,
  .del {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 4px;
    width: 20px;
    height: 20px;
  }
  .copy {
    left: 4px;
    @include bg("../../../assets/creator/editor/thum-copy.svg");
    &:hover {
      .tips {
        display: block;
      }
    }
  }
  .del {
    right: 4px;
    @include bg("../../../assets/creator/editor/thum-del.svg");
    &:hover {
      .tips {
        display: block;
      }
    }
  }
  .tips {
    display: none;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2px 8px;
    font-size: 12px;
    color: #fff;
    background: rgba(51, 51, 51, 0.6);
    min-width: 40px;
    border-radius: 4px;
    .line {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translate(-50%, -50%);
      border-width: 4px;
      border-style: solid;
      border-color: rgba(51, 51, 51, 0.6) transparent transparent transparent;
    }
  }
  .add {
    text-align: center;
    cursor: pointer;
    img {
      margin-top: 15px;
    }
    &:hover {
      .tips {
        min-width: 78px;
        display: block;
      }
    }
  }
}
.add-type {
  position: absolute;
  top: -89px;
  left: -25px;
  transform: translate(0, -50%);
  width: 238px;
  height: 156px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  padding: 13px 17px;
  border-radius: 6px;
  .line {
    position: absolute;
    bottom: -16px;
    left: 63px;
    border-width: 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
}
.add-type .add-new {
  li {
    float: left;
    margin-right: 12px;
    img {
      width: 60px;
      height: 40px;
      margin-top: 0;
    }
    p {
      font-size: 12px;
      color: #666;
      font-weight: 500;
      text-align: center;
    }
    .hover {
      display: none;
    }
    &:hover {
      .normal {
        display: none;
      }
      .hover {
        display: block;
      }
    }
  }
  li:nth-child(3n) {
    margin-right: 0;
  }
  li:nth-child(n + 4) {
    margin-top: 10px;
  }
}
</style>
