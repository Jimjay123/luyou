/**

* Created by wangxin

* @date 2019/8/27 20:59 loading

*/
<template>
  <div class="dialog" v-show="loading">
    <!--loading  start-->
    <div class="dialog-loading">
      <i></i>
    </div>
    <!--loading  end-->
  </div>
</template>

<script>
  /*
  *
  * 全局loading公用方法 store中loading字段控制显示隐藏 true false
  *
  * */
  import {Component,Vue,Emit} from 'vue-property-decorator';
  import {State,Action,namespace} from 'vuex-class';
  const UseInfMod=namespace('userinfo');
  @Component({
    name:'tips'
  })
  export default class Tips extends Vue {
    @UseInfMod.State('loading') loading;//全局loading状态
    @UseInfMod.Action('loadingHandle') loadingHandle;//action 公共参数修改方法

    //更新完成后
    updated(){

    }
  }
</script>

<style lang="scss" scoped>
  @mixin posAbs{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  @mixin texCen{
    text-align: center;
  }

  @keyframes rotateFun {
    0%{ transform: rotate(0)}
    100%{ transform: rotate(360deg)}
  }

  .dialog{
  }
  .dialog-bg{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 9998;
    background:rgba(0,0,0,0.1);
  }
  .dialog-loading{
    @include posAbs;
    z-index: 9999;
    i{
      display: inline-block;
      width:52px;
      height:52px;
      background: url('../../assets/loading.svg') no-repeat;
      background-size: 100% 100%;
      /*animation: rotateFun 2s infinite;
      animation-timing-function:linear;*/
    }
  }
  .dialog-box{
    @include posAbs;
    min-width:200px;
    background:#fff;
    padding:10px;
    border-radius: 5px;
    box-shadow:0px 0px 6px 0px rgba(0,0,0,0.25);
    z-index:9999;
    p{
      @include texCen;
      position:relative;
      i{
        position:absolute;
        top:0;right:0;
      }
    }
    .dialog-content{
      @include texCen;
      padding:10px;
    }


    .dialog-footer{
      padding:5px 10px;
      text-align: center;
      a{
        padding:2px 10px;
        background:#999;
        color:#fff;
        margin-right:20px;
      }
      a:last-child{
        margin-right:0;
      }
    }
  }

  .fail{
    color:rgba(0,0,0,0.65);
    font-size: 14px;
    padding:9px 13px;
    i{
      color:#FE7865;
      margin-right:5px;
    }
  }

  .success,.tips{
    font-size:14px;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    background-color: #fff;
    padding:9px 16px;
    box-shadow:0px 0px 12px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    display: flex;
    align-items: center;
    top:auto;
    bottom:10%;
    span{
      vertical-align: middle;
    }
    i{
      display: inline-block;
      width:14px;
      height:14px;
      background: url('../../assets/common/success.svg');
      background-size:100% auto;
      margin-right:8px;
    }
  }
  .warning{
    i{
      background: url('../../assets/common/warning.svg');
      background-size:100% auto;
    }
  }
</style>
