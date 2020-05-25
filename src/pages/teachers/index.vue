<template>
  <div>
    <TopHeader></TopHeader>
    <router-view />
  </div>
</template>
<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import TopHeader from "./../Header/header";
import { State, Action, namespace } from "vuex-class";
const GroupMod = namespace("group");

@Component({
  name: "teachers",
  components: {
    TopHeader
  }
})
export default class Teachers extends Vue {
  @GroupMod.State("selGroup") selGroup; //当前选择的群组 默认第一个群组

  @GroupMod.State("delStuId") delStuId; //已删除学生 缓存信息
  @GroupMod.Action("delStuIdHandle") delStuIdHandle; //已删除学生 缓存信息  action修改方法
}
</script>
<style lang="scss" scoped>
</style>
