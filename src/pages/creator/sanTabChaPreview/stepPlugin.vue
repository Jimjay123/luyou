/**

* Created by wangxin

* @date 2019/11/7 16:19

*/
<template>
  <div :class="['stepPlugin',stepPlugin?'stepPluginHeight':'']" ref="stepPlugin">
    <Vuescroll :ops="ops" @handle-resize="handleResize" >
      <ul ref="vuescroll" class="clearfix">
        <li
          v-for="(item,index) in list"
          :class="item.look?'':'normal-bg'"
          :key="index"
          @click="numberClick(index,item)"
        >{{index+1}}</li>
      </ul>
    </Vuescroll>
  </div>
</template>

<script>
  import {Component,Vue,Prop} from 'vue-property-decorator';
  import Vuescroll from 'vuescroll';

  @Component({
    name:'StepPlugin',
    components:{
      Vuescroll
    }
  })
  export default class StepPlugin extends Vue{
    @Prop({
      default:()=>{
        return [];
      },
      required:false,
    }) list;//步骤数据列表

    @Prop({
      required:false,
      default:null
    }) callback;//回调函数

    ops = {
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: true,
        background: "#00000033",
        //opacity: 0,
        hoverStyle: true,
        specifyBorderRadius: false,
        minSize: false,
        size: "7px",
        disable: false
      },
      scrollPanel: {
        scrollingX: true,
      }
    }; //滚动条设置

    stepPlugin=false;//true 内容大于壳  出现滚动条   false  内容小于滚动条  没有滚动条

    //滚动条内容尺寸变化
    handleResize(vertical, horizontal, nativeEvent){
      this.stepPlugin=$('.hasHBar').length>0?true:false;
      console.log(this.stepPlugin);
    }

    timer=null;
    created(){
      this.timer=setInterval(()=>{
        if($('.hasHBar').length>0){
          this.handleResize();
          clearInterval(this.timer);
        }
      },300);
    }

    //步骤点击事件
    numberClick(index,item){
      if(typeof this.callback==='function'){
        this.callback(index,item);
      }
    }
  }
</script>

<style lang="scss" scoped>

  .stepPlugin{
    position: absolute;
    bottom:24px;
    left:30px;
    right:30px;
    white-space:nowrap;
    background:rgba(255,255,255,.3);
    border-radius:12px;
    height:68px;
    padding: 0 10px;
    ul{
      display: flex;
      border-radius: 24px;
      padding:10px 0;
    }
    li{
      width:48px;
      height:48px;
      background: url('../../../assets/creator/sanTabChaPreview/num-bg.svg') no-repeat;
      background-size: 100% auto;
      font-size:26px;
      font-family:GalanoGrotesqueDEMO-Bold,GalanoGrotesqueDEMO;
      font-weight:bold;
      color:rgba(255,255,255,1);
      display: flex;
      flex-shrink:0;
      align-items: center;
      justify-content: center;
      margin-right:18px;
      cursor: pointer;
    }
    .normal-bg{
      background: url('../../../assets/creator/sanTabChaPreview/normal-bg.svg') no-repeat;
      background-size: 100% auto;
    }
  }

  .stepPluginHeight{
    height:82px;
    padding-bottom: 8px;
  }

  .stepPlugin /deep/ {
    .__bar-is-horizontal{
      background: url('../../../assets/creator/sanTabChaPreview/positioning.svg') no-repeat;
      background-size:100% 100%;
    }
  }
</style>
