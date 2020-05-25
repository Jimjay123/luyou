/**

* Created by wangxin

* @date 2019/10/10 9:37

*/
<template>
  <div class="title-sket" :style="bgStyle">
    <div class="quest">
      <img class="q-icon" :src="require('../../../assets/creator/editor/q-icon.svg')" alt="">
      <div class="title">
        <ResizeTextarea
          class="textarea"
          type="textarea"
          :autosize="autosize"
          resize="none"
          max="2"
          placeholder="点击输入选择题标题"
          @input="inputFun"
          :value="title"
        />
      </div>

      <ul class="options-box clearfix">
        <li v-for="(item,index) in answer" :key="index" :class="{'selected':item.select?true:false,'bg':true}">
          <div class="q-con">
            <span class="label">{{name[index]}}</span>
            <ResizeTextarea
              class="options"
              type="textarea"
              :autosize="autosize"
              resize="none"
              placeholder="点击输入问题答案"
              @input="()=>answerInputFun(index)"
              :value="item.answer"
            />
          </div>
          <div class="s-box">
            <div class="s-ans" @click="answerSelFun(index,item)">
              <span class="icon-s" v-if="item.select"></span>
              <span class="icon-n" v-else></span>
              <span class="text">正确答案</span>
            </div>
            <span @click="delFun(index)" v-if="index>=2" class="del"></span>
          </div>
        </li>
        <li class="add" v-if="answer.length<=3" @click="addAnswer">
          <img :src="require('../../../assets/creator/editor/img-add.svg')" alt="">
          <br/>
          <p>新增一个答案</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop, Watch} from 'vue-property-decorator';
  import {changeCouUpdPageContentFun} from '../../../service/editor/editorAction';
  import {State, Action, namespace} from 'vuex-class';

  const EditMod = namespace('edit');
  import ResizeTextarea from '../component/resizeTextarea';
  import {cloneObj} from "../../../utils/utils";

  @Component({
    name: 'ChoiceQuestionSket',
    components: {
      ResizeTextarea
    }
  })
  export default class ChoiceQuestionSket extends Vue {
    @EditMod.State('editIndex') editIndex;//当前编辑模块的下标
    @EditMod.Action('editIndexHandle') editIndexHandle;//当前编辑模块的下标  action

    @EditMod.State('editList') editList;//编辑文档数据
    @EditMod.Action('editListHandle') editListHandle;//编辑文档数据  action

    @Prop({
      require:false,
      default:null,
    }) index;

    get ShowIndex(){
      return this.index!==null?this.index:this.editIndex
    }

    //选择题标题
    get title() {
      return this.editList[this.ShowIndex].leftSket.title
    }

    //选择题答案数据
    get answer(){
      return this.editList[this.ShowIndex].leftSket.answer
    }

    autosize={ minRows: 1, maxRows: 3 };

    //背景计算属性
    get bgStyle() {
      let {
        bgColor,//背景颜色
        bgImg,//背景图片
      } = this.editList[this.ShowIndex].rightNav;
      let obj={};
      if (bgColor&&!bgImg) {
        obj={
          'background':bgColor,
        }
      }else if(!bgColor&&bgImg){
        obj={
          'background-image': 'url("'+bgImg.src+'")',
          'background-repeat': 'no-repeat',
          'background-position': 'center center',
          'background-size': 'cover',
        }
      }
      return obj
    }

    name=['A','B','C','D'];
    timer=null;

    //答案输入
    answerInputFun(index){
      let answer=cloneObj(this.answer);
      answer[index].answer=event.target.value;
      let editList = cloneObj(this.editList);
      editList[this.editIndex].leftSket.answer =answer;
      this.editListHandle({
        editList
      });

      clearTimeout(this.timer);
      //输入框改变延迟300ms后向后台发送数据
      this.timer=setTimeout(()=>{
        this.callInter(editList);
      },300)
    }

    //答案选择
    answerSelFun(index,item){
      let answer=cloneObj(this.answer);
      if(answer[index].select){
        return;
      }
      answer.map((d)=>{
        d.select=false;
      });
      answer[index].select=true;
      let editList = cloneObj(this.editList);
      editList[this.editIndex].leftSket.answer =answer;
      this.editListHandle({
        editList
      });
      this.callInter(editList);
    }

    //处理数据调用接口
    callInter(editList,type=null){
      let data=editList[this.editIndex];
      let courseQuizChoicesList=[];
      data.leftSket.answer.map(item=>{
        courseQuizChoicesList.push({
          ...item,choice:item.answer,correctFlag:item.select
        })
      });
      editList[this.editIndex].courseQuizQuestion.courseQuizChoicesList=courseQuizChoicesList;
      editList[this.editIndex].courseQuizQuestion.question=data.leftSket.title;
      changeCouUpdPageContentFun({
       pageList:editList
      });
    }

    //新增可选答案
    addAnswer(){
      let answer=cloneObj(this.answer);
      let obj=this.editList[this.editIndex];
      answer.push({
        answer:'',//选项内容
        select:false,//当前项是否是正确答案
      });
      let editList = cloneObj(this.editList);
      editList[this.editIndex].leftSket.answer =answer;
      this.editListHandle({
        editList
      });
      this.callInter(editList,'add');
    }

    //删除可选答案
    delFun(index){
      let answer=cloneObj(this.answer);
      answer.splice(index,1);
      //answer[index].delFlag=true;
      let editList = cloneObj(this.editList);
      editList[this.editIndex].leftSket.answer =answer;
      this.editListHandle({
        editList
      });
      this.callInter(editList,'add');
    }

    //输入框改变事件
    inputFun() {
      let editList = cloneObj(this.editList);
      let val=event.target.value;
      editList[this.editIndex].leftSket.title = val;
      if(!editList[this.editIndex].courseQuizQuestion){
        editList[this.editIndex].courseQuizQuestion ={
          question:val
        };
      }else{
        editList[this.editIndex].courseQuizQuestion.question = val;
      }
      this.editListHandle({
        editList
      });
      clearTimeout(this.timer);
      //输入框改变延迟300ms后向后台发送数据
      this.timer=setTimeout(()=>{
        changeCouUpdPageContentFun({
          pageList:editList,
        });
      },300)
    }
  }
</script>

<style lang="scss" scoped>
  @mixin bg($url) {
    background: url($url) no-repeat;
    background-size: 100% auto;
  }

  @mixin bgW($url) {
    background: url($url) 100% 50% no-repeat;
    background-size:49px 53px;
  }

  .q-icon{
    position: absolute;
    top:22px;
    left:44px;
    width:57px;
    height:66px;
  }

  .title-sket {
    position: relative;
    padding:64px;
    width:100%;
    height:100%;
  }
  .quest{
    position: relative;
    padding:44px;
    padding-top:26px;
    width:868px;
    height:442px;
    margin: auto;
    background: #fff;
    box-shadow:0px 0px 6px 0px rgba(0,0,0,0.2);
    border-radius:8px;
  }

  .textarea {
    height:95px;
    display: flex;
    align-items: flex-end;
  }
  .textarea /deep/ {
    textarea {
      overflow: hidden;
      height: 60px;
      font-size: 18px;
      color:#666;
      border: none;
      border-bottom: 1px dashed #ccc;
      background: none;
      padding-top:16px;
      padding-bottom:16px;
    }
    textarea::placeholder {
      font-size: 18px;
      color: #999;
    }
  }

  .options-box{
    margin-top:26px;
    li{
      float:left;
      width:calc(50% - 13px);
      border-radius:8px;
      border:1px solid rgba(245,245,245,1);
      padding:6px;
      padding-right:13px;
      cursor: pointer;
      height:118px;
      position: relative;
    }
    li:hover{
      border:1px solid rgba(254,120,101,0.2);
    }
    li:nth-child(2n+1){
      margin-right:26px;
    }
    li:nth-child(n+3){
      margin-top:20px;
    }
    .selected{
      border:1px solid rgba(254,120,101,0.2);
      .s-ans{
        .text{
          color:#FE7865;
        }
      }
    }
    .add{
      text-align: center;
      font-size: 16px;
      color:#B3B3B3;
      img{
        width:34px;
        height:34px;
        margin-top:18px;
        margin-bottom:12px;
      }
    }
    .q-con{
      padding-left:28px;
      position: relative;
    }
    .label{
      position: absolute;
      top:0;
      left:0;
      height:66px;
      line-height: 66px;
      width:28px;
      text-align: center;
      font-size:16px;
      font-family:AlibabaPuHuiTiB;
      color:rgba(102,102,102,1);
    }
  }
  .options{
    height:66px;
    display: flex;
    align-items: center;
  }
  .options /deep/{
    textarea {
      overflow: hidden;
      height: 67px;
      line-height: 22px;
      font-size: 14px;
      color:#666;
      font-weight: 400;
      border: none;
      border-bottom: 1px dashed #ccc;
      background: none;
      padding:0;
    }
    textarea::placeholder {
      font-size: 14px;
      color: #999;
    }
  }
  .s-ans{
    margin-top:16px;
    display: inline-block;
    span{
      vertical-align: middle;
    }
    .icon-n,.icon-s{
      display: inline-block;
      width:14px;
      height:14px;
      margin-right: 6px;
      margin-left:8px;
      font-size: 14px;
      font-weight: 400;
    }
    .icon-n{
      background: url('../../../assets/creator/editor/icon-n.svg') no-repeat;
      background-size: 100% auto;
    }
    .icon-s{
      background: url('../../../assets/creator/editor/icon-s.svg') no-repeat;
      background-size: 100% auto;
    }
    .text{
      color:#999;
      font-size: 14px;
    }
  }
  .s-box{
    position: relative;
    .del{
      position: absolute;
      right:0;
      bottom:0;
      width:20px;
      height:20px;
      background: url('../../../assets/creator/q-del.svg') no-repeat;
      background-size:100% auto;
    }
  }
  .bg:nth-child(1){
    @include bgW('../../../assets/creator/editor/A.svg');
  }
  .bg:nth-child(2){
    @include bgW('../../../assets/creator/editor/B.svg');
  }
  .bg:nth-child(3){
    @include bgW('../../../assets/creator/editor/C.svg');
  }
  .bg:nth-child(4){
    @include bgW('../../../assets/creator/editor/D.svg');
  }

</style>

