/**

* Created by wangxin

* @date 2019/8/30 10:45

*/
<template>
  <ul class="tab clearfix">
    <li
      v-for="(item,index) in list"
      :key="index"
      :class="{'tab-item':true,'active':tabType===item}"
      @click="tabClick(item)"
    >
      {{item}}
      <i class="line"></i>
    </li>
  </ul>
</template>

<script>
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "StuTabChange"
})
export default class StuTabChange extends Vue {
  @Prop({
    default: "1",
    required: false
  })
  tabType;

  @Prop({
    default: () => {
      return ["各步骤平均分", "成绩区间统计"];
    },
    required: false
  })
  list;

  @Prop({
    default: null,
    required: false
  })
  tabCbFun;

  //tab 切换
  @Emit tabClick(val) {
    this.tabCbFun(val);
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.tab {
  li {
    float: right;
    min-width: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
    font-weight: 400;
    margin-left: 56px;
    cursor: pointer;
  }
  .active {
    color: #333;
    .line {
      display: block;
      margin: 0 auto;
      height: 4px;
      background: rgba(254, 120, 101, 1);
      margin-top: 9px;
      margin: 8px 20px 0px 20px;
      border-radius: 4px;
      width: 28px;
    }
  }
}
</style>
