<template>
  <div class="dialog" v-show="dialog.show">
    <div :class="[dialog.hasMask?'dialog-bg':'']"></div>
    <!--loading  start-->
    <div class="dialog-loading" v-if="dialog.type==='loading'">
      <i></i>
    </div>
    <!--loading  end-->

    <!--确认弹框  start-->
    <div class="dialog-box confirm" v-if="dialog.type==='confirm'">
      <p>
        提示
        <i></i>
      </p>
      <div class="dialog-content" v-html="dialog.content">{{dialog.content}}</div>
      <div class="dialog-footer">
        <a href="javascript:;" @click="btn1Click">{{dialog.btnText1?dialog.btnText1:'取消'}}</a>
        <a href="javascript:;" @click="btn2Click">{{dialog.btnText2?dialog.btnText2:'确定'}}</a>
      </div>
    </div>
    <!--确认弹框  end-->

    <!--fail start-->
    <div class="dialog-box fail" v-else-if="dialog.type==='fail'">
      <i class="el-icon-circle-close"></i>
      {{dialog.content}}
    </div>
    <!--fail end-->

    <!--success start-->
    <div class="dialog-loading success" v-else-if="dialog.type==='success'">
      <i></i>
      <span>{{dialog.content}}</span>
    </div>
    <!--success end-->

    <!--warning start-->
    <div class="dialog-loading tips warning" v-else-if="dialog.type==='warning'">
      <i></i>
      <span>{{dialog.content}}</span>
    </div>
    <!--warning end-->

    <!--message start-->
    <div class="dialog-loading message" v-else>
      <span>{{dialog.content}}</span>
    </div>
    <!--message end-->
  </div>
</template>

<script>
/*
 *
 * 全局loading公用方法 store中loading字段控制显示隐藏 true false
 *
 * */
import { Component, Vue, Emit } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
const UseInfMod = namespace("userinfo");
@Component({
  name: "tips"
})
export default class Tips extends Vue {
  @UseInfMod.State("dialog") dialog; //全局loading状态
  @UseInfMod.Action("dialogHandle") dialogHandle; //action 公共参数修改方法
  timer = null; //定时器
  timeCount = 0;

  @Emit hide() {
    //弹框隐藏方法
    this.dialogHandle({
      show: false
    });
  }

  //关闭按钮点击事件
  @Emit close() {
    this.hide();
  }

  //按钮1 点击事件 回调函数return true关闭弹窗 否者不关闭
  @Emit btn1Click() {
    this.cbFun(this.dialog.btn1Cb);
  }

  //按钮2 点击事件 回调函数return true关闭弹窗 否者不关闭
  @Emit btn2Click() {
    this.cbFun(this.dialog.btn2Cb);
  }

  @Emit cbFun(cb) {
    if (typeof cb === "function") {
      cb() && this.hide();
    } else {
      this.hide();
    }
  }

  //定时器加载方法
  @Emit setInt() {
    if (this.timeCount <= 100) {
      clearInterval(this.timer);
      this.hide();
    } else {
      this.timeCount -= 100;
    }
  }

  //更新完成后
  updated() {
    clearInterval(this.timer);
    this.timeCount = this.dialog.time;
    if (this.dialog.time !== null) {
      this.timer = setInterval(this.setInt, 100);
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
@mixin texCen {
  text-align: center;
}

@keyframes rotateFun {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.dialog {
}
.dialog-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.1);
}
.dialog-loading {
  @include posAbs;
  z-index: 9999;
  i {
    display: inline-block;
    width: 52px;
    height: 52px;
    background: url("../../assets/loading.svg") no-repeat;
    background-size: 100% 100%;
    /*animation: rotateFun 2s infinite;
      animation-timing-function:linear;*/
  }
}
.dialog-box {
  @include posAbs;
  min-width: 200px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  p {
    @include texCen;
    position: relative;
    i {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .dialog-content {
    @include texCen;
    padding: 10px;
  }

  .dialog-footer {
    padding: 5px 10px;
    text-align: center;
    a {
      padding: 2px 10px;
      background: #999;
      color: #fff;
      margin-right: 20px;
    }
    a:last-child {
      margin-right: 0;
    }
  }
}

.fail {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 9px 13px;
  i {
    color: #fe7865;
    margin-right: 5px;
  }
}

.success,
.tips {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  padding: 9px 16px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  top: auto;
  bottom: 10%;
  span {
    vertical-align: middle;
  }
  i {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url("../../assets/common/success.svg");
    background-size: 100% auto;
    margin-right: 8px;
  }
}
.warning {
  i {
    background: url("../../assets/common/warning.svg");
    background-size: 100% auto;
  }
}
.message {
  background: rgba(51, 51, 51, 0.44);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding: 3px 10px;
  top: 15%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
