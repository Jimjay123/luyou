<template>
  <div class="group pages">
    <Header></Header>
    <router-view/>
    <Recall v-show="delStuId.show"></Recall>
  </div>
</template>
<script>
import { Component, Vue ,Watch} from "vue-property-decorator";
import Recall from './recall';
import {State, Action, namespace} from 'vuex-class';
const GroupMod = namespace('group');

@Component({
  name: "groupList",
  components:{
    Recall
  }
})
export default class GroupList extends Vue {
  @GroupMod.State('selGroup') selGroup;//当前选择的群组 默认第一个群组

  @GroupMod.State('delStuId') delStuId;//已删除学生 缓存信息
  @GroupMod.Action('delStuIdHandle') delStuIdHandle;//已删除学生 缓存信息  action修改方法
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.group {
  @include relative();
  width: 100%;
}
</style>

