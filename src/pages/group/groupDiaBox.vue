/**

* Created by wangxin

* @date 2019/8/6 10:35

*/
<template>
  <div class="dialog-bg" @click="bgClick">
    <div class="dialog-box" :style="styleW" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "groupDiaBox",
  components: {}
})
export default class GroupDiaBox extends Vue {
  @Prop({ required: false, default: "440" }) width; //当前可选项 数组
  @Prop({ required: false, default: null }) cbFun; //当前可选项 数组
  get styleW() {
    return "width:" + this.width + "px";
  }
  @Emit bgClick() {
    if (typeof this.cbFun === "function") {
      this.cbFun(false);
    } else {
      let path = "/group/list";
      if (this.$route.query.callback) {
        path = this.$route.query.callback;
      }
      this.$router.push({
        path: path
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin posAbs {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dialog-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.dialog-box {
  @include posAbs;
  background: #fff;
  padding: 0 32px;
  border-radius: 13px;
  width: 440px;
  /*height:462px;*/
}
</style>
