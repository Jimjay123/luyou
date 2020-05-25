/**

* Created by wangxin

* @date 2019/11/7 10:42

*/
<template>
  <div class="box clearfix">
    <a href="javascript:;" @click="btnClickFun">返回</a>
  </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  @Component({
    name:'CallBackBtn',
  })
  export default class CallBackBtn extends Vue{
    @Prop({
      default:null,
      require:false,
    }) callBack;

    btnClickFun(){
      if(typeof this.callBack==='function'){
        this.callBack();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box{
    position: absolute;
    top:84px;
    left:35px;
    height:44px;
    background: #FFC53DFF;
    border-radius:8px;
    a{
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      width:59px;
      height:40px;
      border-radius:8px;
      background: #FEF7E6FF;
      font-size:16px;
      font-family:SourceHanSansCN-Heavy,SourceHanSansCN;
      font-weight:800;
      color:rgba(102,102,102,1);
    }
  }
</style>
