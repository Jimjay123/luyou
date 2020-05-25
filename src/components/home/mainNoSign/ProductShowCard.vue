<template>
  <div class="product-row clearfix" v-view-lazy @model="handleModel">
    <div class="flx-box" v-if="options.type==='left'">
      <div class="move-box r-l">
        <div :class="className">
          <img class="clo-img" :src="options.imgBig" alt="">
          <img :style="{top:options.top+'px',left:options.left+'px'}" :class="smallClass" :src="options.imgSmall" alt="">
        </div>
      </div>

      <div class="right product-info">
        <p class="p-t">{{options.title}}</p>
        <!--<p class="p-icon"></p>-->
        <p class="p-con">{{options.info}}</p>
      </div>
    </div>

    <div class="flx-box" v-else>
      <div class="r-l product-info">
        <p class="p-t">{{options.title}}</p>
        <!--<p class="p-icon"></p>-->
        <p class="p-con">{{options.info}}</p>
      </div>
      <div class="r-r move-box">
        <div :class="className">
          <img class="clo-img" :src="options.imgBig" alt="">
          <img :style="{top:options.top+'px',left:options.left+'px'}" :class="smallClass" :src="options.imgSmall" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Component, Vue,Emit,Prop} from 'vue-property-decorator';

  @Component({
    name: 'ProductShowCard'
  })
  export default class ProductShowCard extends Vue {

    @Prop(Object) options;

    moveClass=false;
    topClass=false;

    @Emit handleModel(){
      console.log('出现了');
      this.moveClass=true;
      this.topClass=true;
    }

    get className(){
      let type=this.options.type==='left'?'left':'right';
      let move=this.options.type==='left'?'move-left':'move-right';
      if(!this.moveClass){
        return type
      }else{
        return type+' '+move;
      }
    }
    get smallClass(){
      if(!this.topClass){
        return 'clo-img-s';
      }else{
        return 'clo-img-s topClass'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin proInfo(){
    width:443px;
    .p-t{
      height:42px;
      font-size:32px;
      font-weight:600;
      color:rgba(11,22,43,1);
      line-height:42px;
      margin-bottom:20px;
    }
    .p-icon{
      width:33px;
      height:6px;
      background:rgba(254,120,101,1);
      border-radius:5px;
      margin-bottom:45px;
    }
    .p-con{
      width:443px;
      min-height:45px;
      font-size:17px;
      color:#4B4B4B;
      line-height:26px;
      font-family:AlibabaPuHuiTiR;
    }
  }
  @keyframes moveLeft {
    0% {
      //opacity: 0;
      transform: translateX(-900px)
    }
    100% {
      //opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes moveRight {
    0% {
      //opacity: 0;
      transform: translateX(900px)
    }
    100% {
      //opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes moveTop {
    0% {
      opacity: 0;
    }
    60%{
      opacity: 0;
      transform: translateY(-100px)
    }
    100% {
      opacity: 1;
      transform:translateY(0);
    }
  }
  .flx-box{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width:1200px;
    margin: 0 auto;
  }
  .product-row {
    .move-box{
      width: 390px;
      height: 302px;
      position: relative;
    }
    .r-l{
      float:left;
      position: relative;
      margin-right:161px;
    }
    .r-right{
      float:right;
      position: relative;
    }
    .left{
      width: 390px;
      height: 302px;
      position: absolute;
      top:0;left:0;
    }
    .clo-img {
      width: 390px;
      height: 302px;
    }
    .clo-img-s {
      position: absolute;
      top: 0;
      left: 0;
    }
    /*小图动画class*/
    .topClass{
      animation: moveTop 1000ms;
      transition-property:transform
    }
    .move-left{
      animation: moveLeft 1000ms;
      transition-property:transform
    }
    .move-right{
      animation: moveRight 1000ms;
      transition-property:transform
    }
    .right {
      float: right;
      position: relative;
    }
    .product-info {
      @include proInfo;
    }
  }
</style>
