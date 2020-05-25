<template>
  <div class="sectionCard">
    <article :class="{title:true,miniTitle:miniTitle !== void 0}">
        {{title}}
        <span class="litTitle" v-if="litTitle">{{litTitle}}</span>
    </article>

    <slot></slot>
  </div>
</template>
<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "sectionCard"
})
export default class SectionCard extends Vue {
  @Prop() title;
  @Prop() miniTitle;
  @Prop() litTitle;
}
</script>
<style lang="scss" scoped>
.sectionCard {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  overflow: auto;
  .title{
      width:100%;
      font-size:22px;
      padding:20px 34px 14px 34px;
      box-sizing: border-box;
      border-bottom:solid 1px #f1f1f1;
      &.miniTitle{
          font-size:16px;
          border-bottom:none;
      }
  }
  .litTitle{
      color:#ccc;
      font-size:14px;
      display: inline-block;
      margin-left:32px;
  }
}
</style>


