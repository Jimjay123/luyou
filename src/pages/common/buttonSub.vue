/**

* Created by wangxin

* @date 2019/9/9 9:24

*/
<template>
  <a href="javascript:;" @click="btnClick">{{content}}</a>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  @Component({
    name:'buttonSub'
  })
  export default class ButtonSub extends Vue{
    @Prop({
      default:'确定',
      required:false,
    }) content;

    @Prop({
      default:null,
      required:false,
    }) btnCbFun;

    @Emit btnClick(){
      if(typeof this.btnCbFun==='function'){
        this.btnCbFun();
      }
    }
  }
</script>

<style lang="scss" scoped>
  a{
    display: inline-block;
    width:111px;
    height:36px;
    text-align: center;
    line-height:36px;
    background:linear-gradient(90deg,rgba(255,176,158,1) 0%,rgba(254,120,101,1) 100%);
    box-shadow:0px 2px 4px 0px rgba(254,120,101,0.4);
    border-radius:18px;
    font-size:16px;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
</style>
