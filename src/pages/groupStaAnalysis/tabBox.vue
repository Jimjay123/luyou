/**

* Created by wangxin

* @date 2019/8/22 20:34

*/
<template>
  <div class="chart-tab clearfix">
    <div
      v-for="(item,index) in list"
      :key="index"
      :class="{'tab-item':true,'active':tabType===item}"
      @click="tabClick(item)"
    >{{item}}<span class="line"></span></div>
  </div>
</template>

<script>
  import {Component,Emit,Prop,Vue} from 'vue-property-decorator';

  @Component({
    name:'AnaCard'
  })
  export default class AnaCard extends Vue{
    @Prop({
      default:'1',
      required:false,
    }) tabType;

    @Prop({
      default:()=>{
        return ['各步骤平均分','成绩区间统计']
      },
      required:false,
    }) list;

    @Prop({
      default:null,
      required:false,
    }) tabCbFun;

    //tab 切换
    @Emit tabClick(val){
      this.tabCbFun(val)
    }
  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }
  .chart-tab {
    @include fontSet(16px, #999, 400);
    .tab-item {
      float: right;
      margin-left: 40px;
      cursor: pointer;
    }
    .active {
      position: relative;
      color: #333;
      .line {
        display: block;
        margin: 0 auto;
        width: 56px;
        height: 4px;
        background: rgba(254, 120, 101, 1);
        border-radius: 2px;
        margin-top: 9px;
      }
    }
  }
</style>
