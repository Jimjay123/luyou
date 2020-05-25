/**

* Created by wangxin

* @date 2019/11/7 13:07

*/
<template>
  <div :class="['courseInfo',courseRetract?'courseRetract':'']">
    <div class="title" @click="titleClick">
      <div class="flexItem">课程完成情况：<span>{{data.speed}}</span></div>
      <div class="info">详情<i :class="courseRetract?'icon-down':''"></i></div>
    </div>
    <div class="course">
      <div class="box">
        <Vuescroll :ops="ops">
          <ul class="course-list">
            <li v-for="(item,index) in data.list" :key="index">
              <div :class="{'opa6':item.speed>=100?true:false}">
                <i>{{index}}</i>
                <p>{{item.title}}</p>
              </div>
              <div class="progress" v-if="item.speed<100">
                {{item.speed}}<span>%</span>
              </div>
              <div class="complete" v-else></div>
            </li>
          </ul>
        </Vuescroll>
      </div>
      <div class="bottom">
        <div class="btn" @click="lookInfoFun(btnContext)">
          <a href="javascript:;">{{btnContext}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import Vuescroll from 'vuescroll'

  @Component({
    name: 'CourseInfo',
    components:{
      Vuescroll
    }
  })
  export default class CourseInfo extends Vue {
    @Prop({
      default:()=>{
        return {
          speed:0,
          list:[]
        }
      }
    }) data;

    @Prop({
      default:null,
      required:false,
    }) callback;

    get btnContext(){
      let btn='查看报告';
      this.data.list.map((item)=>{
        if(item.speed<100){
          btn='查看详情'
        }
      });
      return btn;
    }

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
        initialScrollY: 0
      }
    }; //滚动条设置

    courseRetract=true;//当前是否收起  true收起 false 展开

    titleClick(){
      this.courseRetract=!this.courseRetract;
    }

    //查看点击事件
    lookInfoFun(val){
      if(typeof this.callback==='function'){
        this.callback(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .courseInfo{
    position: absolute;
    top:84px;
    right:28px;
    .title{
      position: absolute;
      top:0;
      left:17px;
      width:266px;
      height:40px;
      border-radius:8px;
      font-size:14px;
      font-family:SourceHanSansCN-Bold,SourceHanSansCN;
      font-weight:bold;
      color:rgba(102,102,102,1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 13px;
      background: #fff;
      z-index: 10;
      cursor: pointer;
      span{
        font-size:24px;
        font-weight:800;
        color:rgba(102,102,102,1);
        vertical-align: middle;
        margin-left:6px;
      }
      .info{
        display: flex;
        align-items: center;
        font-size:12px;
        font-weight:400;
        color:rgba(77,77,77,1);
      }
      i{
        display: inline-block;
        width:15px;
        height:15px;
        background: url('../../../assets/creator/sanTabChaPreview/icon-up.svg') no-repeat;
        background-size: 100% auto;
      }
      .icon-down{
        background: url('../../../assets/creator/sanTabChaPreview/icon-down.svg') no-repeat;
        background-size: 100% auto;
      }
    }
    .flexItem{
      display: flex;
      align-items: center;
    }
  }
  .courseRetract{
    width: 300px;
    height: 40px;
    .title{
      background:rgba(255,255,255,0.7);
    }
    .course{
      display: none;
    }
  }
  .course{
    width:300px;
    background:rgba(255,255,255,.75);
    border-radius:10px;
    padding:44px 4px 11px 12px;
    margin-top:20px;
  }
  .box{
    height:349px;
  }
  .course-list{
    padding-right:26px;
    width:100%;
    li{
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
      i{
        float:left;
        width:26px;
        height:26px;
        background: url('../../../assets/creator/sanTabChaPreview/positioning.svg') no-repeat;
        background-size: 26px 26px;
        text-align: center;
        line-height: 26px;
        font-size:12px;
        font-family:GalanoGrotesqueDEMO-Bold,GalanoGrotesqueDEMO;
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
      p{
        width:173px;
        margin-left:34px;
        font-size:16px;
        font-weight:400;
        line-height: 22px;
        color:rgba(77,77,77,1);
      }
      .complete{
        width:22px;
        height:22px;
        background: url('../../../assets/creator/sanTabChaPreview/complete.svg') no-repeat;
        background-size: 22px 22px;
      }
      .progress{
        color:#FE7865FF;
        font-size:16px;
        font-family:SourceHanSansCN-Heavy,SourceHanSansCN;
        font-weight:800;
        span{
          font-size: 12px;
        }
      }
    }
  }
  .bottom{
    margin-top:17px;
    text-align: center;
  }
  .btn{
    display: inline-block;
    height:30px;
    background:rgba(255,197,61,1);
    border-radius:8px;
    a{
      display: inline-block;
      width:80px;
      height:26px;
      padding:0 10px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      line-height: 26px;
      text-align: center;
      font-size:14px;
      font-family:SourceHanSansCN-Bold,SourceHanSansCN;
      font-weight:bold;
      color:rgba(254,120,101,1);
    }
  }

  .opa6{
    opacity: .6;
  }
</style>
