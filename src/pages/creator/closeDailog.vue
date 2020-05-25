/**

* Created by wangxin

* @date 2019/8/13 8:49

*

*/
<template>
  <div
    class="dialog-bg"
    @click="bgClick"
    v-show="show"
    v-if="loadingStatus===2 ||loadingStatus===3"
  >
    <div class="dialog-box" @click.stop>
      <p class="title">确认取消上传？</p>
      <div class="content" v-if="loadingStatus===2 ||loadingStatus===3">系统不会保存上传的文件哦，是否确认取消上传</div>
      <div class="btn">
        <a href="javascript:;" @click="bgClick('cancel')" class="cancel">取消</a>
        <a href="javascript:;" @click="bgClick('confirm')" class="confirm">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { cloneObj } from "../../utils/utils";
@Component({
  name: "CloseDailog",
  components: {}
})
export default class DelCouConfirm extends Vue {
  @Prop({
    required: true,
    default: null
  })
  cbFun;

  @Prop({
    required: true,
    default: false
  })
  show; //弹框显示隐藏

  @Prop({
    required: true,
    default: false
  })
  loadingStatus;
  // loadingStatus

  //弹框背景点击事件
  @Emit bgClick(type) {
    this.cbFun(type);
  }
}
</script>

<style lang="scss" scoped>
@mixin posAbs {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
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
  border-radius: 13px;
  width: 410px;
  /*height:462px;*/
  padding: 26px 32px 20px;
}
.title {
  @include fontSet(20px, #333, 500);
  margin-bottom: 15px;
}
.content {
  @include fontSet(16px, #999, 400);
  span {
    color: #fe7865;
  }
}
.btn {
  text-align: right;
  margin-top: 28px;
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 36px;
  }
}
.cancel {
  border-radius: 18px;
  // opacity:0.4;
  border: 2px solid rgba(254, 120, 101, 0.4);
  @include fontSet(16px, #fe7865, 500);
}
.confirm {
  background: linear-gradient(
    90deg,
    rgba(255, 176, 158, 1) 0%,
    rgba(254, 120, 101, 1) 100%
  );
  border-radius: 18px;
  @include fontSet(16px, #fff, 500);
  margin-left: 23px;
}
</style>
