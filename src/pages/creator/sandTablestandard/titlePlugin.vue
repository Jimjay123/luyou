<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-11-11 15:26:45
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-11 15:34:16
 -->

<template>
  <div :class="['titlePlugin', classType == 4 ?'title-type':'']">
    <p>{{courseName || '未设置课程'}}</p>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { Action, State, namespace } from "vuex-class";
const SandTableMod = namespace("sandTablestandard");
@Component({
  name: "TitlePlugin"
})
export default class TitlePlugin extends Vue {
  @SandTableMod.State("courseName") courseName; //当前编辑模块的下标
  @SandTableMod.Action("courseNameHandle") courseNameHandle; //当前编辑模块的下标  action

  @SandTableMod.State("courseList") courseList; //当前编辑模块的下标
  @SandTableMod.Action("courseListHandle") courseListHandle; //当前编辑模块的下标  action

  @SandTableMod.State("classType") classType; //新建竖版列表
  @SandTableMod.Action("classTypeHandle") classTypeHandle; //新建竖版列表  action修改方法

  created() {}
}
</script>

<style lang="scss" scoped>
.titlePlugin {
  position: absolute;
  top: 0;
  left: 25%;
  transform: translateX(-50%);
  height: 68px;
  width: 100%;
  background: url("../../../assets/creator/sanTabChaPreview/title-bg.svg")
    no-repeat center;
  text-align: center;
  p {
    padding: 0 13px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
    font-weight: 800;
    color: rgba(102, 102, 102, 1);
    margin-top: 36px;
  }
}
.title-type {
  position: absolute;
  left: 50%;
}
</style>
