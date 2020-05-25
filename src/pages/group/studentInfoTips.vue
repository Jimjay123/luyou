/**

* Created by wangxin

* @date 2019/8/8 10:21

*/
<template>
  <div class="tips" v-show="show" :style="styleObj">
    <div class="top">
      <img :src="info.avatar||(info.gender==1?require('../../assets/teachers/boy.svg'):require('../../assets/teachers/girls.svg'))" alt="">
      <div>
        <p class="p1"><span>{{info.memberName}}</span><i :class="header"></i><span>{{grade}}</span></p>
        <p class="p2"><span>学号：</span><span>{{info.studentNo}}</span></p>
      </div>
    </div>
    <p class="item"><span>学院</span>{{info.collegeName}}</p>
    <p class="item"><span>专业</span>{{info.majorName}}</p>
    <p class="item"><span>班级</span>{{info.clazz}}</p>
    <span class="horn"></span>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from "vue-property-decorator";
  import GroupDiaBox from './groupDiaBox';
  import InputBox from './inputBox';
  import CheckBox from './checkBox';
  import {cloneObj, tokenFun, tipsFail} from '../../utils/utils';
  import {putDismissGroup} from '../../service/groupApi';

  @Component({
    name: "add",
    components: {
      GroupDiaBox, InputBox, CheckBox
    }
  })
  export default class Add extends Vue {
    @Prop({
      default: false,
    }) show;
    @Prop({
      default: 0,
    }) top;
    @Prop({
      default: 0,
    }) left;
    @Prop({
      default: {
        avatar: "",// 群成员 头像
        collegeName: "",//群成员 学院
        gender: 0,//群成员 性别 1男  2女
        grade: 2,//群成员  年级
        majorName: "上海专业",//群成员 专业
        memberId: 7,//群成员  学生ID
        memberName: "赵同学",//群成员 名称
        studentNo: "12345445",//群成员 学号
        universityName: "上海大学",//群成员 学校
      },
    }) info;

    //性别class 计算属性
    get header(){
      let gender=this.info.gender;
      if(gender==2){
        return 'girl'
      }else{
        return 'boy';
      }
    }

    //年级--计算属性
    get grade(){
      let t='';
      let grade=this.info.grade;
      if(grade=='1'){
        t='一';
      }else if(grade=='2'){
        t='二'
      }else if(grade=='3'){
        t='三'
      }else if(grade=='4'){
        t='四'
      }
      return '大'+t;
    }

    get styleObj() {
      return 'top:' + this.top + 'px;left:' + this.left + 'px';
    }

    @Emit getInfo() {

    }
  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w) {
    font-size: $s;
    color: $c;
    font-weight: $w;
  }

  @mixin bgImg($url){
    background: url($url) no-repeat;
    background-size: 100% auto;
  }

  .tips {
    padding: 16px;
    width: 218px;
    height: auto;
    text-align: left;
    position: fixed;
    top: -135px;
    left: -50px;
    background: #fff;
    z-index: 10;
    box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    border-radius: 10px;
    .top{
      display: flex;
      margin-bottom:14px;
      .p1{
        span{
          @include fontSet(16px,#333,500)
        }
        span:last-child{
          width:32px;
          height:17px;
          border-radius:4px;
          opacity:0.4;
          border:1px solid rgba(254,120,101,1);
          @include fontSet(10px,#FE7865,500);
          padding: 0 6px;
        }
        i{
          display: inline-block;
          width:15px;
          height:16px;
          vertical-align: middle;
          margin:0 7px;
        }
        .girl{
          @include bgImg('../../assets/group/girl.svg');
        }
        .boy{
          @include bgImg('../../assets/group/boy.svg');
        }
      }
      .p2{
        @include fontSet(12px,#999,400);
      }
    }
    img {
      width: 42px;
      height: 42px;
      object-fit: cover;
      border-radius: 50%;
      margin-right:14px;
    }
    .item{
      @include fontSet(12px,#666,400);
      margin-bottom: 8px;
      span{
        @include fontSet(12px,#999,400);
        margin-right:14px;
      }
    }
    .horn {
      position: absolute;
      top:65px;
      right: -8px;
      width: 15px;
      height: 15px;
      background: #fff;
      transform: rotate(45deg);
      box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    }
  }
</style>
