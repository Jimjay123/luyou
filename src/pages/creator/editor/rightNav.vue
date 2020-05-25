/**

* Created by wangxin

* @date 2019/9/18 11:31

*/
<template>
  <div class="right-nav">
    <!--标题页 start-->
    <TitleMenu v-if="menuType==='title'" />
    <!--标题页 end-->

    <!--文本 start-->
    <TextMenu v-else-if="menuType==='text'" />
    <!--文本 end-->

    <!--图文 start-->
    <ImageTextMenu v-else-if="menuType==='imageText'" />
    <!--图文 end-->

    <!--视频 start-->
    <VideoMenu v-else-if="menuType==='video'" />
    <!--视频 end-->

    <!--文档 start-->
    <FileMenu v-else-if="menuType==='file'" />
    <!--文档 end-->

    <!--选择题 start-->
    <ChoiceQuestionMenu v-else-if="menuType==='choiceQuestion'" />
    <!--选择题 end-->

    <!--图片 start-->
    <ImageMenu v-else-if="menuType==='image'" />
    <!--图片 end-->
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import TitleMenu from "./titleMenu";
import TextMenu from "./textMenu";
import ImageTextMenu from "./imageTextMenu";
import VideoMenu from "./videoMenu";
import FileMenu from "./fileMenu";
import ChoiceQuestionMenu from "./choiceQuestionMenu";
import ImageMenu from "./imageMenu";
import { State, Action, namespace } from "vuex-class";
const EditMod = namespace("edit");
@Component({
  name: "RightNav",
  components: {
    TextMenu,
    TitleMenu,
    ImageTextMenu,
    VideoMenu,
    FileMenu,
    ChoiceQuestionMenu,
    ImageMenu
  }
})
export default class RightNav extends Vue {
  @EditMod.State("editIndex") editIndex; //当前编辑模块的下标
  @EditMod.Action("editIndexHandle") editIndexHandle; //当前编辑模块的下标  action

  @EditMod.State("editList") editList; //编辑文档数据
  @EditMod.Action("editListHandle") editListHandle; //编辑文档数据  action

  // title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
  get menuType() {
    return this.editList[this.editIndex].type || "";
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.right-nav {
  position: fixed;
  top: 60px;
  right: 0;
  width: 198px;
  height: calc(100vh - 60px);
  background: rgba(255, 255, 255, 1);
  box-shadow: -2px 2px 4px 0px rgba(245, 245, 245, 1);
  z-index:10;
}
</style>
