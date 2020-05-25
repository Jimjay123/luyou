/**

* Created by wangxin

* @date 2019/8/7 15:11

*/
<template>
  <ul class="clearfix">
    <li
      v-for="item in list"
      :class="item.val==value.val?'active':''"
      :key="item.val"
      @click="liClick(item)"
    >
      <i></i>
      {{item.label}}
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "checkBox",
  components: {}
})
export default class CheckBox extends Vue {
  @Prop(String) placeHolder;
  @Prop({ required: false, default: [] }) list; //当前可选项 数组
  @Prop({ required: false, default: {} }) value; //当前输入框值
  @Prop({ required: false, default: null }) input; //当前输入框值

  @Emit liClick(item) {
    if (item.val != this.value.val) {
      if (typeof this.input == "function") {
        this.input(item);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
@mixin bgImg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
ul {
  li {
    float: left;
    cursor: pointer;
    @include fontSet(12px, #606266, 400);
    display: flex;
    align-items: center;
    // margin-right: 38px;
    i {
      display: inline-block;
      width: 14px;
      height: 14px;
      @include bgImg("../../assets/group/radio_unchecked.svg");
      margin-right: 6px;
      vertical-align: middle;
    }
  }
  li:last-child {
    float: right;
    margin-right: 0;
  }
  .active {
    color: rgba(254, 120, 101, 1);
    i {
      @include bgImg("../../assets/group/radio_checked1.svg");
    }
  }
}
</style>

