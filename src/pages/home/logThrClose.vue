/**

* Created by wangxin

* @date 2019/8/1 11:43

*/
<template>
  <i @click="close" class="close"></i>
</template>

<script>
  import {Component,Vue,Emit} from 'vue-property-decorator';
  @Component({
    name:'logThrClose',
  })
  export default class LogThrClose extends Vue{
    //点击X号回到 验证码登录
    @Emit close(){
      this.$router.push({
        path:'/main/login'
      })
    }
  }
</script>

<style scoped>
  .close{
    position:absolute;
    top:0;right:0;
    width:44px;
    height:44px;
    background: url('../../assets/home/close.png') no-repeat;
    background-size: 100% auto;
    cursor: pointer;
  }
</style>
