/**

* Created by wangxin

* @date 2019/8/5 13:12

*/
<template>
  <div class="percentage" :style="boxStyle">
    <div :style="styleDiv"></div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component({
  name: "progressItem"
})
export default class ProgressItem extends Vue {
  @Prop() options;

  get optionsData() {
    let options = {
      width: "224",
      height: "4",
      percentage: "100"
    };
    return { ...options, ...this.options };
  }

  get boxStyle() {
    return {
      width: this.optionsData.width + "px",
      height: this.optionsData.height + "px"
    };
  }

  get styleDiv() {
    return "width:" + this.optionsData.percentage + "%";
  }
}
</script>

<style lang="scss" scoped>
.percentage {
  width: 100%;
  height: 100%;
  div {
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border-radius: 2px;
  }
}
</style>
