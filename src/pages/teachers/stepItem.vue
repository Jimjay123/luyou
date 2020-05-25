/**

* Created by wangxin

* @date 2019/8/15 18:47
  步骤-组件
*/
<template>
  <div class="step-item">
    <div class="top">
      <span class="h-line"></span>
      <span class="title">身份认证</span>
    </div>
    <div v-if="type">
      <div class="item active mr">
        <span class="icon"></span>
        <span>基础信息</span>
      </div>

      <span v-if="step>=2" class="line line-color"></span>
      <span v-else class="line"></span>

      <div class="item active" v-if="step>=2">
        <span class="icon"></span>
        <span>认证信息</span>
      </div>

      <div class="item" v-else>
        <span class="icon"></span>
        <span>认证信息</span>
      </div>

      <span class="line line-color" v-if="step>=3"></span>
      <span class="line" v-else></span>

      <div class="item active" v-if="step>=3">
        <span class="icon"></span>
        <span>提交成功</span>
      </div>

      <div class="item" v-else>
        <span class="icon"></span>
        <span>提交成功</span>
      </div>
    </div>

  </div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  @Component({
    name: 'stepItem',
    components: {}
  })
  export default class StepItem extends Vue {
    @Prop({default:'1',required:false}) step;
    @Prop({default:true,required:false}) type;//type true 显示 步骤 false 不显示步骤
  }
</script>

<style lang="scss" scoped>
  .step-item{
    display: flex;
    width:100%;
    align-items: center;
    font-size:14px;
    font-weight:500;
    color:rgba(153,153,153,1);
    margin-top:22px;
    margin-bottom: 33px;
    .top{
      .h-line{
        display: inline-block;
        width:6px;
        height:23px;
        background:rgba(254,120,101,1);
        border-radius:3px;
        position: relative;
        top:4px;
      }
      .title{
        font-size:22px;
        font-weight:600;
        color:rgba(0,0,0,1);
        margin-left:12px;
      }
    }
    .item{
      display: inline-block;
      .icon{
        display: inline-block;
        width:12px;
        height:12px;
        border:1px solid rgba(160,162,173,1);
        border-radius: 50%;
        margin-right:4px;
      }
    }
    .mr{
      margin-left:114px;
    }
    .line{
      display: inline-block;
      width:242px;
      height:1px;
      background: #D9D9D9;
      vertical-align: middle;
      margin:0 6px;
    }
    .line-color{
      background: #FE7865;
    }
    .active{
      color:#FE7865;
      .icon{
        background:rgba(254,120,101,1);
        border: none;
      }
    }
  }
</style>
