<template>
  <section class="recommend-section">
    <div class="section-header">{{title}}</div>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "recommendSection"
})
export default class RecommendSection extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
</style>