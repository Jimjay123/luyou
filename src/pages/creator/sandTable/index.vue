/**

* Created by wangxin

* @date 2019/9/18 9:30  编辑器首页

*/
<template>
  <div class="sandTable">
    <!--顶部header  start-->
    <SandTableHeader />
    <!--顶部header  end-->

    <!--右侧选择栏 start-->
    <RightNav />
    <!--右侧选择栏 end-->

    <!--左侧主板 start-->
    <div class="main">
      <LeftMain />
    </div>
    <!--左侧主板 end-->
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";
import Vuescroll from "vuescroll";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import SandTableHeader from "./sandTableHeader";
import RightNav from "./rightNav";
import LeftMain from "./leftMain";
import SandTableReport from "./../sandTableReport/sandTableReport";

@Component({
  name: "SandTable",
  directives: {
    Clickoutside
  },
  components: {
    Vuescroll,
    SandTableHeader,
    RightNav,
    LeftMain,
    SandTableReport
  }
})
export default class SandTable extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  width: calc(100% - 198px);
  height: calc(100% - 60px);
  position: absolute;
  // overflow: auto;
}
</style>
