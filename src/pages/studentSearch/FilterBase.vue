<template>
  <div class="filter-base">
    <div class="view-underline"></div>
    <div class="filter-base-menu">
      <el-button
        v-for="item in types"
        :key="item.type"
        :class="['menu-item',{active:type === item.type}]"
        @click="select(item.type)"
        type="primary"
      >{{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "filterBase"
})
export default class FilterBase extends Vue {
  @Prop({ default: "all" }) type;
  @Prop(Function) handleSelect;
  types = [
    { name: "全部结果", type: "all" },
    { name: "我的课程", type: "my" },
    { name: "课程", type: "course" },
    { name: "课程计划", type: "plan" }
  ];
  @Emit select(type) {
    this.handleSelect && this.handleSelect(type);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.filter-base {
  position: relative;
  height: 56px;
  .view-underline {
    @include absolute(27px, 0, auto, 0);
    height: 1px;
    background: #f5f5f5;
    z-index: -1;
  }
  .filter-base-menu {
    display: flex;
    justify-content: center;
    .menu-item {
      width: 150px;
      height: 56px;
      margin: 0 12px;
      box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
      border-radius: 8px;
      background: #ffffff;
      color: #666666;
      font-weight: 500;
      font-size: 18px;
      border: none;
      &.active {
        box-shadow: none;
        color: #fe7865;
        background: #fef3f1;
      }
    }
  }
}
</style>