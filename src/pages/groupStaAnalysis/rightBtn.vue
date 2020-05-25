/**

* Created by wangxin

* @date 2019/8/20 8:47

*/
<template>
  <div class="right-btn">
    <div class="count">
      已完成
      <span class="c1">{{data.finishStudentCount}}</span>
      <span>/{{data.totalStudentCount}}</span>人
    </div>
    <div class="btn">
      <a href="javascript:;" class="info" @click="clickFunDetails('info')">课程详情</a>
      <a href="javascript:;" class="report" @click="clickFun('download')">
        <i class="icon-down"></i>下载报告
      </a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component({
  name: "RightBtn"
})
export default class RightBtn extends Vue {
  @Prop({
    required: false,
    default: () => {
      return {
        totalStudentCount: "",
        finishStudentCount: ""
      };
    }
  })
  data;

  @Prop({
    required: false,
    default: null
  })
  rbCbFun;

  @Emit clickFun(val) {
    this.rbCbFun(val);
  }
  @Emit clickFunDetails(val) {
    this.rbCbFun(val);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.right-btn {
  display: inline-block;
  .count {
    @include fontSet(18px, #666, 400);
    text-align: center;
    margin-bottom: 39px;
    span {
      @include fontSet(18px, #fe7865, normal);
    }
    .c1 {
      font-size: 33px;
    }
  }
  .btn {
    a {
      display: inline-block;
      width: 120px;
      height: 36px;
      border-radius: 6px;
      text-align: center;
    }
    .info {
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      @include fontSet(16px, #fff, 500);
      padding: 6px 18px;
    }
    .report {
      border: 1px solid rgba(254, 120, 101, 1);
      @include fontSet(14px, #fe7865, 500);
      margin-left: 9px;
      .icon-down {
        display: inline-block;
        width: 36px;
        height: 36px;
        background: url("../../assets/groupStaAnalysis/icon-d.svg") no-repeat;
        background-size: 100% auto;
        vertical-align: middle;
      }
    }
  }
}
</style>
