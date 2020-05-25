<template>
  <div>
    <TopHeaderp></TopHeaderp>
    <div class="main-content clearfix">
      <!--完成步骤开始 start-->
      <StepItem :step="3"></StepItem>
      <!--完成步骤开始 end-->

      <div class="box">
        <img :src="require('../../assets/teachers/success.svg')" alt />
        <h3>提交成功，等待审核</h3>
        <p>
          平台会在1个工作日内完成审核，请耐心等待，可在“
          <span>个人中心</span>”查看进度
        </p>
        <div class="btn-box">
          <a href="javascript:;" class="submit" @click="couPlaBasPlaInfo">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import StepItem from "./stepItem";
import TopHeaderp from "../Header/headers";

@Component({
  name: "teacherIndex",
  components: {
    StepItem,
    TopHeaderp: TopHeaderp //注册该组件
  }
})
export default class teacherIndex extends Vue {
  //返回首页跳转方法
  @Emit couPlaBasPlaInfo() {
    this.$router.push({
      path: "/Uncertified"
    });
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.main-content {
  width: 1200px;
  margin: 0 auto;
}
.box {
  text-align: center;
  width: 952px;
  height: 454px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 0 auto;
  img {
    margin-top: 49px;
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-top: 7px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 8px;
  }
  .btn-box {
    text-align: center;
    margin-top: 28px;
    a {
      width: 109px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
    }
    .submit {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      @include fontSet(16px, #fff, 500);
    }
  }
}
</style>
