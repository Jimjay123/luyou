/**

* Created by wangxin

* @date 2019/8/21 11:07

*/
<template>
  <div class="w1200">
    <TopHeader></TopHeader>
    <router-view/>
  </div>
</template>
<script>
  import { Component, Vue ,Watch} from "vue-property-decorator";
  import TopHeader from './../Header/headerp';
  import {State, Action, namespace} from 'vuex-class';
  const GroupMod = namespace('group');

  @Component({
    name: "teachers",
    components:{
      TopHeader
    }
  })
  export default class Teachers extends Vue {
    @GroupMod.State('selGroup') selGroup;//当前选择的群组 默认第一个群组

    @GroupMod.State('delStuId') delStuId;//已删除学生 缓存信息
    @GroupMod.Action('delStuIdHandle') delStuIdHandle;//已删除学生 缓存信息  action修改方法
  }
</script>
<style lang="scss" scoped>
  .w1200{
    min-width:1200px;
    margin:0 auto;
  }
</style>
