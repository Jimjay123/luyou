/**

* Created by wangxin

* @date 2019/8/12 9:58

* 新增 icon 部分

*/
<template>
  <div class="add" @click="addBtn">
    <i class="add-icon"></i>
    添加标准课
  </div>
</template>

<script>
    import {Component, Vue,Prop,Emit} from "vue-property-decorator";
    import {State,Action,namespace} from 'vuex-class';
    const EditCouPlansStore=namespace('editCouPlans');

    @Component({
      name: "newAdd",
      components: {

      }
    })
    export default class NewAdd extends Vue {
      @EditCouPlansStore.State('templateList') templateList;//当前选择的群组 默认第一个群组
      @EditCouPlansStore.Action('templateListHandle') templateListHandle;//当前选择的群组  action修改方法

      @Prop({
        required:false,
      }) index;//当前数据的下标

      @Prop({
        required:false,
        default:null
      }) cbFun;

      //点击新增跳转到新页面选择课程
      @Emit addBtn(){
        this.cbFun();
      }
    }
</script>

<style lang="scss" scoped>
  .add{
    display: flex;
    align-items: center;
    justify-content:center;
    width:322px;
    height:82px;
    border-radius:8px;
    border:1px dashed rgba(0,0,0,0.2);
    font-size:18px;
    font-weight:500;
    color:rgba(153,153,153,0.4);
    margin:0 auto;
    margin-bottom: 20px;
    cursor: pointer;
    .add-icon{
      display: inline-block;
      width:25px;
      height:25px;
      background: url('../../assets/group/add.png') no-repeat;
      background-size: 100% auto;
      margin-right:9px;
    }
  }
</style>
