<template>
  <div class="pptBox clearfix">
    <div class="pptPreTemplate">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";

@Component({
  name: "PptPreTemplate"
})
export default class PptPreTemplate extends Vue {}
</script>

<style lang="scss" scoped>
.pptBox {
  width: 996px;
  height: 570px;
  box-sizing: border-box;
  z-index: inherit;
  transform-origin: 0 0;
}

.pptPreTemplate {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px 0px rgba(204, 204, 204, 1);
  width: 996px;
  height: 570px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
