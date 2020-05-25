/**

* Created by wangxin

* @date 2019/10/8 17:27

*/
<template>
  <div class="text">
    <RightNavTab
      :list="['背景']"
      :tabVal="'背景'"
      :tabValCb="()=>{}"
    />

    <!--背景 start-->
    <div class="item-box">
      <div class="item">
        <h3>背景颜色</h3>
        <BlockBox
          :colorList="colorList"
          :selColVal="bgColor"
          :selColValCb="bgColorCb"
        />
      </div>
      <div class="item mr14">
        <h3>背景图片</h3>
        <ImageBox
          :imageList="bgImgList"
          :selImgVal="bgImg"
          :selImgValCb="selImgValCb"
        />
      </div>
    </div>
    <!--背景 end-->
  </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  import RightNavTab from './rightNavTab';
  import BlockBox from './blockBox';
  import ImageBox from './imageBox';
  import {changeCouUpdPageContentFun} from '../../../service/editor/editorAction';
  import { State, Action, namespace } from "vuex-class";
  import {cloneObj} from "../../../utils/utils";
  const EditMod = namespace("edit");
  @Component({
    name:'ChoiceQuestionMenu',
    components:{
      RightNavTab,BlockBox,ImageBox
    }
  })
  export default class ChoiceQuestionMenu extends Vue {
    @EditMod.State('editIndex') editIndex;//当前编辑模块的下标
    @EditMod.Action('editIndexHandle') editIndexHandle;//当前编辑模块的下标  action

    @EditMod.State('editList') editList;//编辑文档数据
    @EditMod.Action('editListHandle') editListHandle;//编辑文档数据  action

    @EditMod.State("bgImgList") bgImgList; //编辑文档数据
    @EditMod.Action("bgImgListHandle") bgImgListHandle; //编辑文档数据  action

    // 背景颜色
    get bgColor(){
      return this.editList[this.editIndex].rightNav.bgColor;
    }

    //背景图片选中项
    get bgImg(){
      return this.editList[this.editIndex].rightNav.bgImg;
    }
    colorList=['#333','#666','#999','#E6E6E6','#F2F2F2','#F7F7F7','#FFF'];

    //背景颜色回调
    bgColorCb(val){
      let editList=cloneObj(this.setEditList('bgColor',val));
      changeCouUpdPageContentFun({
        pageList:editList
      });
    }

    //图片选择回调
    @Emit selImgValCb(val,type) {
      if(!type){
        let editList=cloneObj(this.setEditList('bgImg',val));
        changeCouUpdPageContentFun({
          pageList:editList
        });
      }else if(type==='del'){//删除背景图片

      }else if(type==='add'){//新增背景图片

      }
    }

    setEditList(name,val){
      let editList=cloneObj(this.editList);
      editList[this.editIndex].rightNav[name]=val;
      if(name==='bgColor'){
        editList[this.editIndex].backgroundColor=val;
        if(val){
          editList[this.editIndex].rightNav.bgImg='';
          editList[this.editIndex].backgroundImageServerUrl='';
        }
      }else if(name==='bgImg'){
        editList[this.editIndex].rightNav.bgColor=null;
        editList[this.editIndex].backgroundColor=null;

        editList[this.editIndex].backgroundImageServerUrl=val.src;
      }else if(name==='fontColor'){
        editList[this.editIndex].textFontColor=val;
      }
      this.editListHandle({
        editList
      });
      return editList;
    }
  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }

  .item-box{
    padding:20px;
  }

  .item{
    h3{
      @include fontSet(12px,#333,500);
      line-height: normal;
    }
  }
  .mr14{
    margin-top:14px;
  }
</style>
