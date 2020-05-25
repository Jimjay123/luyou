<template>
  <div class="btn-box">
    <a @click="signClickFun" href="javascript:;" :class="capInputClass">{{btnText}}</a>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
const UseInfMod = namespace("userinfo");

@Component({
  name: "modifyBox",
  components: {}
})
export default class BtnBox extends Vue {
  @Prop(Boolean) signBtn; //登陆按钮点击事件  true 可点击  false 不可点击
  @Prop(Function) signClick; //必传
  @Prop({
    default: function() {
      return "确认";
    }
  })
  btnText;
  @UseInfMod.State("ajaxStatus") ajaxStatus; //全局ajax加载中状态 true加载中 false加载完成

  //登录按钮样式 class样式
  get capInputClass() {
    if (this.signBtn) {
      return "btn submit";
    } else {
      return "btn disabled";
    }
  }

  @Emit signClickFun() {
    if (this.signBtn) {
      this.signClick(); //回调外层提交方法
    }
  }
  created() {}
}
</script>

<style lang="scss" scoped>
.btn-box {
  margin-top: 50px;
  text-align: center;
  margin-bottom: 10px;
  .btn {
    display: inline-block;
    width: 291px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    font-size: 24px;
    border-radius: 26px;
    position: relative;
    i {
      position: absolute;
      top: 15px;
      right: 30px;
      width: 22px;
      height: 22px;
      background: url("../../assets/loading.png") no-repeat;
      background-size: 100% auto;
    }
  }
  .disabled {
    background: rgba(0, 0, 0, 0.1);
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
  }
}
</style>
