/**

* Created by wangxin

* @date 2019/8/1 10:58

*/
<template>
  <div class="footer">
    <span></span>
    <div>
      <i :class="iconClass"></i>扫码登录
    </div>
    <span></span>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "logThrFooter",
  components: {}
})
export default class LogThrFooter extends Vue {
  show = true; //弹框显示隐藏  true显示  false隐藏
  @Prop(String) type;

  get iconClass() {
    if (this.type == "wechat") {
      return "wechat";
    } else {
      return "alipay";
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin setFlex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin bacImg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.footer {
  @include setFlex;
  margin-top: 49px;
  margin-bottom: 31px;
  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999;
    margin: 0 10px;
    height: 20px;
    line-height: 20px;
    i {
      display: inline-block;
      width: 20px;
      height: 18px;
      margin-right: 2px;
    }
  }
  span {
    display: inline-block;
    width: 129px;
    height: 1.1px;
    background: #dbdbdb;
  }
  .wechat {
    @include bacImg("../../assets/home/wechat.png");
  }
  .alipay {
    @include bacImg("../../assets/home/alipay.png");
  }
}
</style>
