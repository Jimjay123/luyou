/**

* Created by wangxin

* @date 2019/8/20 17:10

*/
<template>
  <ul class="tab-box clearfix">
    <li :class="getClass('全部')" @click="clickFun('全部')">全部</li>
    <li :class="getClass('已完成')" @click="clickFun('已完成')">已完成</li>
    <li :class="getClass('未完成')" @click="clickFun('未完成')">未完成</li>
  </ul>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "TabChange"
})
export default class TabChange extends Vue {
  @Prop({
    default: "",
    required: false
  })
  tableTab;

  @Prop({
    default: null,
    required: false
  })
  TabChangeFun;

  @Emit getClass(val) {
    if (this.tableTab === val) {
      return "active";
    } else {
      return "";
    }
  }

  //点击事件
  @Emit clickFun(val) {
    if (this.tableTab === val) {
      return;
    }
    this.TabChangeFun(val);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}

.tab-box {
  display: block;
  border-collapse: collapse;
  // vertical-align: middle;
  float: left;
  li {
    float: left;
    @include fontSet(14px, rgba(0, 0, 0, 0.65), 400);
    border: 1px solid rgba(217, 217, 217, 1);
    padding: 5px 16px;
    cursor: pointer;
    border-left: 0;
  }
  li:first-child {
    border-radius: 4px 0px 0px 4px;
    border-left: 1px solid rgba(217, 217, 217, 1);
  }
  li:last-child {
    border-radius: 0px 4px 4px 0px;
  }
  li.active {
    color: #fe7865;
    border: 1px solid rgba(254, 120, 101, 1);
  }
}
</style>
