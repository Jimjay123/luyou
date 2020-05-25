<template>
  <div class="form">
    <section class="elements">
      <div class="label ness">课程标题</div>
      <FormInput
        style="width:300px;height:40px;"
        :value="title"
        :tips="titleTips"
        :maxLength="24"
        :maxLengthShow="true"
        :placeHolder="'请输入您的课程标题'"
        :input="(e,type)=>inputChange(e,type,'title')"
      />
    </section>
    <section class="elements">
      <div class="label ness">专业学科</div>
      <div class="label1Cont" style="position: relative">
        <div class="labelBox">
          <div :class="{labels:true,label1:true,active:major.id === item.id}" v-for="(item,index) in majorList"
               :key="index" @click="changeMain(item)">{{item.name}}
          </div>
        </div>
      </div>
      <div class="error" v-show="majorTips.show">
        <p>{{majorTips.content}}</p>
      </div>
    </section>
    <section class="elements">

      <div class="label1Cont">
        <div :class="{labels:true,label2:true,active:item.select}"
             v-for="(item,index) in tagList" :key="index" @click="chosenItem(item,index)">
          {{item.tagName}}
        </div>
      </div>
    </section>
    <section class="elements">
      <div class="label ness">建议时长</div>
      <FormInput
        style="width:100px;height:40px;display: inline-block"
        :value="duration"
        :tips="durationTips"
        :maxLength="4"
        :input="(e,type)=>inputChange(e,type,'duration')"
      />
      <span>分钟</span>
    </section>
    <section class="elements">
      <div class="label ness">课程简介</div>
      <TextareaBox
        style="width:950px;height:112px;"
        :value="selfIntro"
        :tips="selfIntroTips"
        :maxLength="300"
        :limit="true"
        :placeHolder="'概述一下自己耕耘的领域，我们会展示在讲师介绍里，便于老师学生了解到您。'"
        :input="(e,type)=>inputChange(e,type,'selfIntro')"
      />
    </section>
  </div>
</template>
<script>
  import {Input} from 'element-ui';
  import FormInput from './formInput'
  import TextareaBox from "../../../teachers/textareaBox";
  import {Component, Emit, Vue, Prop} from 'vue-property-decorator';
  import {State, Action, namespace} from "vuex-class";
  import {tipsFail} from "../../../../utils/utils";

  const CreBaseInfoMod = namespace("creatorBaseInfo");
  import {
    popFileImageUpload,
    memTeaSelIntro,
    subMajorList,
    creatorBaseTagList,
    getCouBaseInfo,
    putCouBaseInfo
  } from '../../../../service/creatorApi';

  @Component({
    name: 'baseForm',
    components: {
      Input,
      FormInput,
      TextareaBox
    }
  })
  export default class BaseForm extends Vue {
    @CreBaseInfoMod.State("title") title; //课程标题
    @CreBaseInfoMod.Action("titleHandle") titleHandle; //课程标题  action修改方法

    @CreBaseInfoMod.State("titleTips") titleTips; //课程标题必填提示框
    @CreBaseInfoMod.Action("titleTipsHandle") titleTipsHandle; //课程标题必填提示框  action修改方法

    @CreBaseInfoMod.State("duration") duration; //建议时长
    @CreBaseInfoMod.Action("durationHandle") durationHandle; //建议时长  action修改方法

    @CreBaseInfoMod.State("durationTips") durationTips; //建议时长提示信息
    @CreBaseInfoMod.Action("durationTipsHandle") durationTipsHandle; //建议时长提示信息  action修改方法

    @CreBaseInfoMod.State("majorList") majorList; //专业学科可选项列表
    @CreBaseInfoMod.Action("majorListHandle") majorListHandle; //专业学科可选项列表  action修改方法

    @CreBaseInfoMod.State("major") major; //专业学科选中项
    @CreBaseInfoMod.Action("majorHandle") majorHandle; //专业学科选中项  action修改方法

    @CreBaseInfoMod.State("majorTips") majorTips; //专业学科选中项
    @CreBaseInfoMod.Action("majorTipsHandle") majorTipsHandle; //专业学科选中项  action修改方法

    @CreBaseInfoMod.State("tagList") tagList; //标签可选列表
    @CreBaseInfoMod.Action("tagListHandle") tagListHandle; //标签可选列表  action修改方法

    @CreBaseInfoMod.State("tag") tag; //标签选中项
    @CreBaseInfoMod.Action("tagHandle") tagHandle; //标签选中项  action修改方法

    @CreBaseInfoMod.State("selfIntro") selfIntro; //课程简介
    @CreBaseInfoMod.Action("selfIntroHandle") selfIntroHandle; //课程简介  action修改方法

    @CreBaseInfoMod.State("selfIntroTips") selfIntroTips; //课程简介提示信息
    @CreBaseInfoMod.Action("selfIntroTipsHandle") selfIntroTipsHandle; //课程简介提示信息  action修改方法

    changeMain(item) {
      this.majorHandle({
        major: item
      });
      this.creatorBaseTagListFun(item.id);
      this.setTips('major');
    }

    chosenItem(item, i) {
      let tagList = this.tagList;
      if (tagList[i].select) {
        tagList[i].select = false;
        tagList[i].delFlag = true;
      } else {
        tagList[i].select = true;
        tagList[i].delFlag = false;
      }
      this.tagListHandle({
        tagList
      });
      let majorTips=this.majorTips;
      majorTips.show=false;
      this.majorTipsHandle({
        majorTips
      });
    }

    //设置tips false
    setTips(name) {
      let tips = this[name + 'Tips'];
      tips.show = false;
      let obj = {};
      obj[name + 'Tips'] = tips;
      this[name + 'TipsHandle'](obj);
    }

    //表单改变事件
    inputChange(e, type, name) {
      if (type === "input") {
        let obj = {};
        obj[name] = e.target.value;
        if (name === 'duration') {//时长限制输入数字
          obj[name] = obj[name].replace(/[^0-9]/g, '');
        }
        this[name + 'Handle'](obj);
        this.setTips(name);
      } else if (type === "del") {
        this[name] = "";
      } else if (type === "select") {
        this[name] = e;
        if (name === "universityName") {
          this.universityNameTips.show = false;
        } else if (name === "majorName") {
          this.majorNameTips.show = false;
        }
      }
    }

    //获取标签列表
    creatorBaseTagListFun(id) {
      creatorBaseTagList({
        majorId: id
      }).then(res => {
        if (res.code == 0) {
          this.tagListHandle({tagList: res.list});
        } else {
          tipsFail(res.msg)
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .form {
    width: 100%;
    overflow: auto;
  }
</style>
<style lang="scss" scoped>
  .elements {
    width: 100%;
    box-sizing: border-box;
    padding-left: 120px;
    margin: 20px 0;
    position: relative;
    min-height: 40px;
    span {
      line-height: 40px;
    }
    .label {
      position: absolute;
      line-height: 40px;
      left: 0;
      width: 120px;
      font-size: 16px;
      text-align: right;
      &.ness::before {
        content: ' ';
        width: 8px;
        height: 8px;
        margin-right: 10px;
        border-radius: 50%;
        background: #FE7865;
        display: inline-block;
      }
      &::after {
        content: ' ：'
      }
    }
    .label1Cont {
      overflow: auto;
      display: flex;
      align-items: center;
      min-height: 40px;
      flex-flow: wrap;
      .labelBox{
        display: inline-block;
        border-bottom:1px solid #DFDFDFFF;
        .label1:last-child{
          margin-right: 0;
        }
      }
      .labels {
        float: left;
        box-sizing: border-box;
        font-size: 14px;
        cursor: pointer;
      }
      .label1 {
        height: 34px;
        padding: 8px;
        //border-radius: 4px;
        line-height: 18px;
        margin-right: 20px;
        border-bottom: 1px solid transparent;
        &.active {
         /* background: #FEF3F1;
          color: #FE7865;*/
          border-bottom:1px solid #FE7865FF;
        }
      }
      .label2 {
        height: 30px;
        border-radius: 15px;
        padding: 4px 18px;
        line-height: 22px;
        border: solid 1px #f0f0f0;
        color: #999;
        margin-right: 20px;
        margin-bottom: 10px;
        &.active {
          border-color: #FE7865;
          color: #FE7865;
        }
      }
    }
    & /deep/ {
      textarea::placeholder{
        font-size: 16px;
      }
    }
  }

  .error {
    width: 100%;
    height: 0;
    position: relative;
    p {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      color: #fe7865;
    }
  }
</style>



