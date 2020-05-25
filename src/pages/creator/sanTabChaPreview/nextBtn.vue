/**

* Created by wangxin

* @date 2019/11/8 11:27

*/
<template>
  <div class="nextBtn clearfix">
    <div class="npe" v-if="type==='TPE'">
      <a v-if="stepIndex!==0" class="pre" @click="preClick" href="javascript:;"><i></i></a>
      <a class="n-btn" href="javascript:;" v-if="stepIndex!==-1" @click="nextClick" >{{btnText}} <i class="next"></i></a>
      <a class="n-btn" href="javascript:;" v-else @click="submitClick">{{lastBtnText}}</a>
    </div>

    <div class="npe tpe" v-else>
      <a v-if="stepIndex!==0" class="pre" @click="preClick" href="javascript:;"><i></i></a>
      <a class="n-btn" href="javascript:;" v-if="stepIndex!==-1" @click="nextClick" >{{btnText}} <i class="next"></i></a>
      <a class="n-btn" href="javascript:;" v-else @click="submitClick">{{lastBtnText}}</a>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component({
    name: 'NextBtn',
  })
  export default class NextBtn extends Vue {
    @Prop({
      default: 'NPE',
      required: false,
    }) type;//按钮类型  TPE  NPE  默认 TPE

    @Prop({
      default: '下一步',
      required: false,
    }) btnText;//按钮文字

    @Prop({
      default: '提交',
      required: false,
    }) lastBtnText;

    @Prop({
      default:0,
      required:false,
    }) stepIndex;//0 第一步 -1 最后一步

    @Prop({
      default: null,
      required: false,
    }) callback;// 回调方法

    //上一步点击事件
    preClick(){
      this.cbFun('pre');
    }

    //下一步点击事件
    nextClick(){
      this.cbFun('next');
    }

    //提交点击事件
    submitClick(){
      this.cbFun('submit');
    }

    //回调方法
    cbFun(type){
      if(typeof this.callback === 'function'){
        this.callback(type);
      }
    }

  }
</script>

<style lang="scss" scoped>
  @mixin bg() {
    background: url('../../../assets/creator/sanTabChaPreview/next.svg') no-repeat;
  }

  .nextBtn {
    a {
      float: left;
      font-weight: 600;
      color: #fff;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a:hover{
      background:rgba(0,0,0,0.6);
    }
  }

  .npe {
    .pre {
      width:26px;
      height: 26px;
      padding:0;
      margin-right:8px;
      border-radius:14px;
      i {
        display: inline-block;
        width: 17px;
        height: 17px;
        background: url('../../../assets/creator/sanTabChaPreview/pre.svg') no-repeat;
        background-size: 17px 17px;
      }
    }
    .n-btn {
      min-width: 73px;
      height: 26px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 14px;
      font-size: 12px;
      padding:0 11px;
      .next{
        display: inline-block;
        width: 17px;
        height: 17px;
        @include bg;
        background-size: 17px 17px;
        margin-left: 4px;
      }
    }
  }

  .tpe{
    .pre {
      width:38px;
      height: 38px;
      margin-right:12px;
      border-radius:20px;
      i {
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
      }
    }
    .n-btn {
      min-width:106px;
      padding:0 16px;
      height: 38px;
      font-size: 18px;
      border-radius:20px;
      .next{
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
      }
    }
  }
</style>
