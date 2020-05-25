/**

* Created by wangxin

* @date 2019/11/8 16:54

*/
<template>
  <div class="dialog">
    <div class="box">
      <img
        class="icon-hide"
        src="../../../assets/creator/sanTabChaPreview/icon-hide.svg"
        @click="hideFun"
      />
      <div class="content">
        <img src="../../../assets/notice/success.svg" alt="">
        <p>太棒了！你已经顺利学完了该课程 快去学习其他课程吧～</p>
      </div>
      <footer>
        <a
          @click="returnFun"
          class="btn1"
          href="javascript:;"
        >返回频道</a>
        <a
          @click="lookReport"
          class="btn2"
          href="javascript:;"
        >查看报告</a>
      </footer>
    </div>
  </div>
</template>

<script>
  import {Component,Vue,Prop} from 'vue-property-decorator';
  @Component({
    name:'SuccessDialog'
  })
  export default class SuccessDialog extends Vue{
    @Prop({
      required:false,
      default:null,
    }) callback;

    //关闭点击事件
    hideFun(){
      this.callback('hideFun');
    }

    //返回频道
    returnFun(){
      this.callback('returnFun');
    }

    //查看报告
    lookReport(){
      this.callback('lookReport');
    }

    cbFun(type){
      if(typeof this.callback === 'function'){
        this.callback(type);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .dialog{
    position: fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
    z-index:220;
    width:100%;
    height:100%;
  }
  .box{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:380px;
    height:282px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    text-align: center;
    padding-bottom:35px;
  }
  .icon-hide{
    position: absolute;
    top:0;
    right:0;
    width:36px;
    height:36px;
    cursor: pointer;
  }
  .content{
    text-align: center;
    img{
      width:44px;
      height:44px;
      margin-top:67px;
    }
    p{
      width:240px;
      margin:0 auto;
      margin-top:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(77,77,77,1);
      line-height: 26px;
    }
  }
  footer{
    margin-top:26px;
    display: inline-flex;
    justify-content: space-between;
    a{
      width:110px;
      height:36px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:16px;
      font-weight:500;
      color:rgba(254,120,101,1);
      border-radius:18px;
    }
    .btn1{
      box-shadow:0px 0px 0px 1px rgba(254,120,101,1);
      opacity:0.4;
      border:1px solid rgba(254,120,101,1);
      margin-right:37px;
    }
    .btn2{
      color:#fff;
      background:linear-gradient(90deg,rgba(255,176,158,1) 0%,rgba(254,120,101,1) 100%);
    }
  }
</style>
