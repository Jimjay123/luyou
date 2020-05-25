<!--
 * @Descripttion:
 * @version:
 * @Author: pengwanchong
 * @Date: 2019-11-07 10:17:40
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-12 10:13:39
 -->

<template>
  <div class="previewMain">
    <!--顶部header  start-->
    <Header v-if="wrz != 3" />
    <!--顶部header  end-->

    <!--左侧主板 start-->
    <div :class="['main', wrz != 3 ?'main-box':'']">
      <PptPreview />
      <PreviewThum />
    </div>

    <!--左侧主板 end-->
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";
import Vuescroll from "vuescroll";
import { memberidentifyRoleType } from "../../../service/groupApi";
import Clickoutside from "element-ui/src/utils/clickoutside";
import { State, Action, namespace } from "vuex-class";
import Header from "../../Header/header";
import PptPreview from "./pptPreview";
import PreviewThum from "./previewThum";

@Component({
  name: "previewMain",
  directives: {
    Clickoutside
  },
  components: {
    Vuescroll,
    Header,
    PptPreview,
    PreviewThum
  },
  beforeRouteEnter(to, from, next) {
    if (from.name != null) {
      let query = JSON.stringify(from.query);
      sessionStorage.setItem("router", query); //重点在这里
      // next();
    }
    next();
  }
})
export default class SandTable extends Vue {
  wrz = ""; //身份识别
  created() {
    memberidentifyRoleType({})
      .then(res => {
        if (res.code == "0") {
          this.wrz = res.identifiedRoleType;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: absolute;
}
.main-box {
  width: 100%;
  height: calc(100% - 60px);
  position: absolute;
}
</style>
