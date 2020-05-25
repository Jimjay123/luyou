/**

* Created by wangxin

* @date 2019/9/18 13:30

*/
<template>
  <ul :class="className">
    <li v-for="(item,index) in list" :key="index" @click="tabClick(item)">
      {{item}}
      <span v-if="item===tabVal" class="line"></span>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "RightNavTab"
})
export default class RightNavTab extends Vue {
  @Prop({
    default: () => {
      return ["文字", "背景"];
    },
    required: false
  })
  list;

  @Prop({
    required: false,
    default: "文字"
  })
  tabVal;

  @Prop({
    required: false,
    default: null
  })
  tabValCb;

  get className() {
    if (this.list.length > 1) {
      return "tab clearfix";
    } else {
      return "tab clearfix w100";
    }
  }

  //文字点击事件
  @Emit tabClick(val) {
    if (typeof this.tabValCb === "function") {
      this.tabValCb(val);
    }
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.tab {
  border-bottom: 1px solid #f0f0f0;
  li {
    float: left;
    width: 50%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #333;
    font-weight: 400;
    position: relative;
    cursor: pointer;
    .line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
      width: 19px;
      height: 2px;
      background: rgba(254, 120, 101, 1);
      border-radius: 3px;
    }
  }
}
.w100 {
  li {
    width: 100%;
  }
}
</style>
