/**

* Created by wangxin

* @date 2019/11/7 11:19

*/
<template>
  <div class="titlePlugin">
    <p>{{stChannelList.channelName}}</p>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
const StudentMod = namespace("student");

@Component({
  name: "TitlePlugin"
})
export default class TitlePlugin extends Vue {
  @StudentMod.State("stChannelList") stChannelList; //沙盘课程频道-添加课程

  @Prop({
    required: false,
    default: ""
  })
  title;
}
</script>

<style lang="scss" scoped>
.titlePlugin {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  height: 68px;
  width: 432px;
  background: url("../../assets/creator/sanTabChaPreview/title-bg.svg")
    no-repeat;
  background-repeat: cover;
  background-size: 100% 100%;
  z-index: 998;
  p {
    padding: 0 13px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
    font-weight: 800;
    color: rgba(102, 102, 102, 1);
    margin-top: 32px;
    text-align: center;
  }
}
</style>
