<template>
  <div class="tableTriditionLayout">
    <section style="overflow:auto">
      <div class="topLeft">
        <slot name="topLeft"></slot>
      </div>
      <div class="topRight">
          <slot name="topRight"></slot>
      </div>
    </section>
    <section class="center">
        <slot name="center"></slot>
    </section>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "tableTriditionLayout"
})
export default class TableTriditionLayout extends Vue {
  name = "Terry";
  role;
  created() {
    this.role = !!Math.round(Math.random()) ? "teacher" : "student";
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.tableTriditionLayout {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow:auto;
  }
  .topLeft{
      float:left;
  }
  .topRight{
      float:right;
  }
  .center{
      width:100%;
  }
}
</style>

