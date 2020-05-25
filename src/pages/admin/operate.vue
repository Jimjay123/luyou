<template>
  <div class="operate">
    <h1 class="block">运营</h1>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "operate",
  components: { Layout}
})
export default class Operate extends Vue {
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.operate {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow:auto;
  }
  .block0{
      @include setPadding();
  }
}
</style>

