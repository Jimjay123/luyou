/**

* Created by wangxin

* @date 2019/9/18 14:00

*/
<template>
  <ul class="block-box clearfix">
    <li :key="'select'" class="select">
      <div class="icon-box icon-color" v-if="color===null"></div>
      <div class="icon-box icon-add" v-else :style="{'background-color':color}"></div>
      <el-color-picker
        class="select-color"
        :value="selColVal"
        show-alpha
        size="medium"
        @change="colorChange"
      />
    </li>
    <li
      v-for="(item,index) in colorList"
      :key="index"
      :style="{'background':item}"
      @click="colorClick(item,'tab')"
    ></li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "BlockBox"
})
export default class BlockBox extends Vue {
  color = "";
  @Prop({
    default: () => {
      return ["#333", "#666", "#999", "#E6E6E6", "#F2F2F2", "#F7F7F7", "#FFF"];
    },
    required: false
  })
  colorList;

  @Prop({
    required: false,
    default: null
  })
  selColValCb;

  @Prop({
    required: false,
    default: null
  })
  selColVal;

  colorClick(val, type) {
    // console.log(val, type);
    if (typeof this.selColValCb === "function") {
      this.selColValCb(val);
    }
    if (type === "tab") {
      //表示点击tab选择颜色
      this.color = null;
    }
  }

  //颜色选择器颜色改变事件
  colorChange(val) {
    console.log(val);
    this.colorClick(val);
  }

  updated() {
    this.color = this.selColVal;
  }
  created() {
    this.color = this.selColVal;
  }
}
</script>

<style lang="scss" scoped>
.block-box {
  width: 100%;
  margin-top: 14px;
  li {
    float: left;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }
  .select-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    opacity: 0;
  }
  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  .icon-add {
    background-image: url("../../../assets/creator/editor/icon-add.svg");
    background-size: 32px 100%;
  }
  .icon-color {
    background-image: url("../../../assets/creator/editor/icon-color.png");
    background-size: 32px 100%;
  }
  li:hover {
    box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.4);
  }
  li:last-child {
    box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.5);
  }
  li:nth-child(4n) {
    margin-right: 0;
  }
  .select /deep/ {
    .el-color-picker {
      width: 32px;
      height: 32px;
      .el-color-picker__trigger {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 0;
        .el-color-picker__color {
          border: none;
          background-image: url("../../../assets/creator/editor/icon-color.png");
          background-size: 32px auto;
        }
        .el-color-picker__color-inner {
          border-radius: 4px;
        }
        .el-color-picker__icon,
        .el-color-picker__empty {
          display: none;
        }
      }
    }
  }
}
</style>
