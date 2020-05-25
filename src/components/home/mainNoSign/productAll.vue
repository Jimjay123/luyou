<template>
  <ul class="product-all clearfix">
    <li :class="leftClass" @mouseover="mouseOverFun('left')" @mouseleave="mouseLeaveFun">
      <div class="card-box">
        <p class="p-icon-clo">
          <i></i>
        </p>
        <b>方法应用软件系列</b>
        <p class="p-info clearfix">
          <span>个案云</span>
          <span>小组云</span>
          <span>社区云</span>
          <!-- <span @click="jumpFun('http://www.luyouor.com/dproduct/1')">个案云</span>
          <span @click="jumpFun('http://www.luyouor.com/dproduct/2')">小组云</span>
          <span @click="jumpFun('http://www.luyouor.com/dproduct/8')">社区云</span>-->
        </p>
      </div>
      <div>
        <div class="t-cir"></div>
        <div class="b-cir"></div>
      </div>
    </li>
    <li :class="centerClass" @mouseover="mouseOverFun('center')" @mouseleave="mouseLeaveFun">
      <div class="card-box">
        <p class="p-icon-vir">
          <i></i>
        </p>
        <b>PGC专家内容系列</b>
        <p class="p-info clearfix">
          <span>实习督导</span>
          <span>老年实务</span>
          <span>社区矫正</span>
          <span>临终关怀</span>
          <span>老年领域</span>
          <span>灾害社工</span>
          <span>青少年社工</span>
          <span>禁毒社工</span>
          <!-- <span @click="jumpInfoFun(1,'123')">实习督导</span>
          <span @click="jumpInfoFun(1,'123')">老年实务</span>
          <span @click="jumpInfoFun(1,'123')">社区矫正</span>
          <span @click="jumpInfoFun(1,'123')">临终关怀</span>
          <span @click="jumpInfoFun(1,'123')">老年领域</span>
          <span @click="jumpInfoFun(1,'123')">灾害社工</span>
          <span @click="jumpInfoFun(1,'112')">青少年社工</span>
          <span @click="jumpInfoFun(2,'112')">禁毒社工</span>-->
        </p>
      </div>
      <div>
        <div class="t-cir"></div>
        <div class="b-cir"></div>
      </div>
    </li>
    <li :class="rightClass" @mouseover="mouseOverFun('right')" @mouseleave="mouseLeaveFun">
      <div class="card-box">
        <p class="p-icon-ser">
          <i></i>
        </p>
        <b>资源工具软件系列</b>
        <p class="p-info clearfix">
          <span>教学资源云</span>
          <span>专业考试云</span>
          <!-- <span @click="jumpFun('http://www.luyouor.com/dproduct/7')">教学资源云</span>
          <span @click="jumpFun('http://www.luyouor.com/dproduct/6')">专业考试云</span>-->
          <span>智能直录播</span>
          <span>国际社工词典</span>
        </p>
        <!--<p class="p-info clearfix">
          <span>智能直录播</span>
          <span>国际社工词典</span>
        </p>-->
      </div>
      <div>
        <div class="t-cir"></div>
        <div class="b-cir"></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "productAll",
  components: {}
})
export default class ProductAll extends Vue {
  jumpFun(url) {
    window.open(url);
  }

  tab = "center"; //

  get leftClass() {
    return this.tab === "left" ? "left active" : "left";
  }

  get centerClass() {
    return this.tab === "center" ? "center active" : "center";
  }

  get rightClass() {
    return this.tab === "right" ? "right active" : "right";
  }

  //鼠标悬浮事件
  mouseOverFun(type) {
    this.tab = type;
  }

  //鼠标离开事件
  mouseLeaveFun() {
    this.tab = "center";
  }

  //详情页路由跳转
  jumpInfoFun(type, courseId) {
    let url =
      type === 1
        ? "#/notLoggedChannel?courseChannelId=" + courseId
        : "#/notLoggedStandard?courseId=" + courseId; //未登录课程频道
    window.open(url);
    //window.location.href=url;
    /*window.location.href.split("#")[0] +
      "#/orther?url=" +
      encodeURIComponent(newUrl)*/
  }
}
</script>

<style lang="scss" scoped>
@mixin bImg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
@mixin doSca($sca) {
  -webkit-transform: scale($sca);
  -moz-transform: scale($sca);
  -o-transform: scale($sca);
}
@mixin carBox {
  z-index: 6;
  animation: setScale 200ms;
  animation-fill-mode: forwards;
  b {
    font-size: 25px;
    margin-bottom: 53px;
  }
  .p-info {
    font-size: 16px;
  }
}
@keyframes setScale {
  from {
    @include doSca(1);
  }
  to {
    @include doSca(1.05);
    top: -3px;
    left: -3px;
  }
}
/* @keyframes setScale {
     from {width:360px;height:427px;top:0;left:0}
     to {width:400px;height:475px;top:-20px;left:-24px;}
   }*/
@keyframes moveLeft {
  0% {
    transform: translateX(200px);
  }
  90% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes moveRight {
  0% {
    transform: translateX(-200px);
  }
  90% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes move {
  0% {
    transform: translateX(-200px);
  }
  90% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes moveCenterR {
  0% {
    transform: translateX(200px);
  }
  90% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

.product-all {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center;
  height: 475px;
  li {
    float: left;
    width: 360px;
    height: 427px;
    margin-right: 35px;
    position: relative;
  }
  li:last-child {
    margin-right: 0;
  }
  .card-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 360px;
    height: 427px;
    border-radius: 26px;
    background: #fff;
    //box-shadow: 0px 30px 50px 0px rgba(207, 192, 190, 0.5);
  }
  b {
    font-weight: normal;
  }
  .t-cir {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    background: rgba(48, 238, 224, 1);
    border-radius: 200px;
    filter: blur(31px);
    z-index: 4;
    display: none;
  }
  .b-cir {
    position: absolute;
    bottom: -70px;
    left: -62px;
    width: 100px;
    height: 100px;
    background: rgba(254, 98, 76, 1);
    border-radius: 100px;
    filter: blur(10px);
    z-index: 8;
    display: none;
  }
  /*li.center:hover,*/
  .active.center {
    .card-box {
      @include carBox;
      box-shadow: 0px 30px 50px 0px rgba(207, 192, 190, 0.5);
    }
    .t-cir,
    .b-cir {
      display: block;
      animation: move 300ms;
      animation-fill-mode: forwards;
    }
  }
  /*li.left:hover,*/
  .active.left {
    .card-box {
      @include carBox;
      box-shadow: 0px 30px 50px 0px rgba(207, 192, 190, 0.5);
    }
    .t-cir,
    .b-cir {
      display: block;
      animation: moveLeft 300ms;
      animation-fill-mode: forwards;
    }
  }
  /*li.right:hover,*/
  .active.right {
    .card-box {
      @include carBox;
      box-shadow: 0px 30px 50px 0px rgba(207, 192, 190, 0.5);
    }
    .t-cir,
    .b-cir {
      display: block;
      animation: moveRight 300ms;
      animation-fill-mode: forwards;
    }
  }
  i {
    display: inline-block;
    width: 110px;
    height: 109px;
    margin-top: 63px;
    @include bImg("../../../assets/mainNoSign/p-icon-clo.png");
  }
  .p-icon-vir {
    i {
      @include bImg("../../../assets/mainNoSign/p-icon-vir.png");
    }
  }
  .p-icon-ser {
    i {
      @include bImg("../../../assets/mainNoSign/p-icon-ser.png");
    }
  }
  b {
    display: inline-block;
    font-size: 25px;
    color: #333;
    font-weight: 500;
    margin-bottom: 42px;
  }
  .p-info {
    font-size: 16px;
    color: #666;
    margin-bottom: 25px;
    span {
      float: left;
      width: 50%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 16px;
    }
    span:hover {
      color: #fe7865;
    }
  }
  .center {
    .p-info {
      display: flex;
      flex-flow: wrap;
      padding: 0 29px;
      span {
        width: 100px;
      }
    }
  }
}
</style>
