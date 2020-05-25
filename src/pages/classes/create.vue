<template>
  <div class="group pages">
    <h1 class="block">创建我的课程计划</h1>
    <router-view/>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ClassMain"
})
export default class ClassMain extends Vue {}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.group {
  @include relative();
  width: 100%;
  .block{
      @include setPadding();
  }
}
</style>

