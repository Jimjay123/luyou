<template>
  <section class="result-section">
    <div class="section-header">
      <div class="title">{{title}}</div>
      <div class="link-more" @click="handleClick">查看所有 ></div>
    </div>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "resultSection"
})
export default class ResultSection extends Vue {
  @Prop(String) title;
  @Prop(String) type;
  @Prop(Function) handleLink;

  @Emit handleClick() {
    this.handleLink(this.type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.result-section {
  max-width: 1200px;
  margin: 0 auto;
  .section-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 14px;
    line-height: 20px;
    .title {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }
    .link-more {
      color: #fe7865;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>