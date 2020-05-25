/**

* Created by wangxin

* @date 2019/9/4 16:16

*/
<template>
  <ul class="tab-list clearfix">
    <li
      v-for="(item,index) in list"
      :key="index"
      :class="{'active':item===tab}"
      @click="tabClick(item)"
    >{{item+" "+'(' + (censusCount[index]||0) + ')'}}</li>
  </ul>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component({
  name: "TabList"
})
export default class TabList extends Vue {
  @Prop({
    required: false,
    default: () => {
      return ["全部", "编辑中", "审核中", "已发布", "已转审"];
    }
  })
  list;

  @Prop({
    required: false,
    default: () => {
      return [0, 0, 0, 0];
    }
  })
  censusCount;

  @Prop({
    default: null,
    required: false
  })
  tabCb;

  @Prop({
    default: "",
    required: false
  })
  tab;

  @Emit tabClick(val) {
    if (typeof this.tabCb === "function") {
      this.tabCb(val);
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
.tab-list {
  display: inline-block;
  vertical-align: middle;
}
li {
  float: left;
  @include fontSet(14px, #666, 500);
  padding: 11px 12px 0;
  margin-right: 12px;
  cursor: pointer;
}
.active,
li:hover {
  // background: rgba(254, 243, 241, 1);
  border-radius: 6px;
  color: #fe7865;
  font-weight: 400;
}
</style>
