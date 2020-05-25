/**

* Created by wangxin

* @date 2019/11/7 10:09

*/
<template>
    <div class="preview">
      <!--返回按钮 start-->
      <CallBackBtn />
      <!--返回按钮 end-->

      <!--标题 start-->
      <TitlePlugin :title="'《自治的萌芽：从集体行动到业委会成立二十四二十四字》'" />
      <!--标题 end-->

      <!--课程完成度 start-->
      <CourseInfo
        :data="data"
        :callback="speedFun"
      />
      <!--课程完成度 end-->

      <!--步骤 start-->
      <StepPlugin
        style="width:50%"
        :list="list"
        :callback="stepPluginCB"
      />
      <!--步骤 end-->

      <!--下一步按钮 start-->
      <NextBtn
        class="posClass"
        :stepIndex="-1"
        :type="'TPE'"
        :lastBtnText="'提交'"
        :btnText="'下一步'"
        :callback="nextBtnCB"
      />

      <NextBtn
        :stepIndex="-1"
        :type="'NPE'"
        :lastBtnText="'生成报告'"
        :btnText="'下一步'"
        :callback="nextBtnCB"
      />
      <!--下一步按钮 end-->

      <!--成功弹框 start-->
      <SuccessDialog
        :callback="dialogCB"
      />
      <!--成功弹框 end-->

      <a href="javascript:;" @click="lookReportFun">查看报告</a>
      <!--子路由 start-->
      <router-view />
      <!--子路由 end-->
    </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  import CallBackBtn from './callBackBtn';
  import TitlePlugin from './titlePlugin';
  import CourseInfo from './courseInfo';
  import StepPlugin from './stepPlugin';
  import NextBtn from './nextBtn';
  import SuccessDialog from './successDialog';
  import {cloneObj} from "../../../utils/utils";

  @Component({
    name:'SanTabChaPreview',
    components:{
      CallBackBtn,
      TitlePlugin,
      CourseInfo,
      StepPlugin,
      NextBtn,
      SuccessDialog,
    }
  })
  export default class SanTabChaPreview extends Vue{
    data={
      speed:'50%',
      list:[
        {
          title:'业主缘何群起维权？',
          speed:'100'
        },
        {
          title:'业主缘何群起维权？',
          speed:'20'
        },
        {
          title:'业主缘何群起维权？',
          speed:'40'
        },
        {
          title:'自治的萌芽：从集体行动到业委会成立？',
          speed:'60'
        },
        {
          title:'业主缘何群起维权？',
          speed:'100'
        },
        {
          title:'业主缘何群起维权？',
          speed:'100'
        },
        {
          title:'业主缘何群起维权？',
          speed:'100'
        },
        {
          title:'业主缘何群起维权？',
          speed:'20'
        },
        {
          title:'业主缘何群起维权？',
          speed:'40'
        },
        {
          title:'自治的萌芽：从集体行动到业委会成立？',
          speed:'60'
        },
        {
          title:'业主缘何群起维权？',
          speed:'100'
        },
        {
          title:'业主缘何群起维权？',
          speed:'100'
        }
      ]
    };//进度完成情况

    list=[
      {look:false},
      {look:false},
      {look:false},
      {look:true},
      {look:true},
      {look:false},
      {look:false},
      /*{look:false},
      {look:true},
      {look:true},
      {look:false},
      {look:false},
      {look:false},
      {look:true},
      {look:true},
      {look:false},
      {look:false},
      {look:false},
      {look:true},
      {look:true},*/
    ];

    //查看报告
    lookReportFun(){
      this.$router.replace({
        path:'/sanTabChaPreview/report',
        query:{
          name:'123'
        }
      })
    }

    //课程完成度回调方法
    speedFun(val){
      console.log(val)
    }

    //步骤回调方法
    stepPluginCB(index,item){
      let list=cloneObj(this.list);
      list[index].look=true;
      this.list=cloneObj(list);
    }

    //下一步按钮回调方法
    nextBtnCB(type){
      console.log(type);
    }

    //成功弹框回调方法
    dialogCB(type){
      console.log(type);
    }

  }
</script>

<style lang="scss" scoped>
  .preview{
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,0.3);
  }
  .posClass{
    position: absolute;
    bottom:94px;
    right:12px;
  }
</style>
