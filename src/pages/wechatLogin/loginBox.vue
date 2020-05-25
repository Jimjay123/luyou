<template>
  <div class="dialog-bg" v-show="loginBoxShow" @click="bgClick">
    <div class="dialog-box" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import LoginTab from "./loginTab";
import LoginThree from "./loginThree";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { fail } from "assert";
const UseInfMod = namespace("userinfo");

@Component({
  name: "LoginBox",
  components: {
    LoginTab,
    LoginThree
  }
})
export default class LoginBox extends Vue {
  @Prop(Boolean) showc; //弹框显示隐藏
  loginBoxShow = this.showc || true;
  @UseInfMod.State("ajaxStatus") ajaxStatus; //全局ajax加载中状态

  @Emit bgClick() {
    console.log(1);
    this.loginBoxShow = this.showc || false;
  }
  @Emit close() {}
}
</script>

<style lang="scss" scoped>
@mixin posAbs {
  position: absolute;
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
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.dialog-box {
  @include posAbs;
  background: #fff;
  padding: 0 34px;
  border-radius: 13px;
  width: 440px;
  /*height:462px;*/
}
</style>
