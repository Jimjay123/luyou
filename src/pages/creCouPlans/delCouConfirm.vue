/**

* Created by wangxin

* @date 2019/8/13 8:49

*

*/
<template>
  <div class="dialog-bg" @click="bgClick" v-show="show">
    <div class="dialog-box" @click.stop>
      <p class="title">确认删除</p>
      <div class="content">确认删除{{courseType}}<span>{{course.title||''}}</span>该操作不可逆，请谨慎操作</div>
      <div class="btn">
        <a href="javascript:;" @click="bgClick('cancel')" class="cancel">取消</a>
        <a href="javascript:;" @click="bgClick('confirm')" class="confirm">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  @Component({
    name:'DelCouConfirm',
    components:{

    }
  })
  export default class DelCouConfirm extends Vue{
    @Prop({
      required:true,
      default:null
    }) cbFun;

    //课程名称
    @Prop({
      required:true,
      default:()=>{
        return {
          title:''
        }
      }
    }) course;

    @Prop({
      required:true,
      default:false
    }) show;//弹框显示隐藏

    //当前删除的课程类型
    get courseType(){
      if(this.course.level==='chapter'){
        return '课程频道'
      }else{
        return '标准课'
      }
    }


    //弹框背景点击事件
    @Emit bgClick(type){
      this.cbFun(type);
    }
  }
</script>

<style lang="scss" scoped>
  @mixin posAbs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }
  .dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .dialog-box {
    @include posAbs;
    background: #fff;
    border-radius: 13px;
    width: 410px;
    /*height:462px;*/
    padding: 20px;
  }
  .title{
    @include fontSet(20px,#333,500);
    margin-bottom:15px;
  }
  .content{
    @include fontSet(16px,#999,400);
    span{
      color:#FE7865;
    }
  }
  .btn{
    text-align: right;
    margin-top:28px;
    a{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width:110px;
      height:36px;
    }
  }
  .cancel{
    border-radius:18px;
    opacity:0.4;
    border:2px solid rgba(254,120,101,1);
    @include fontSet(16px,#FE7865,500);
  }
  .confirm{
    background:linear-gradient(90deg,rgba(255,176,158,1) 0%,rgba(254,120,101,1) 100%);
    border-radius:18px;
    @include fontSet(16px,#fff,500);
    margin-left:23px;
  }
</style>
