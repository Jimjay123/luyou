/**

* Created by wangxin

* @date 2019/8/5 19:52  分页插件
*
*/
<template>
  <div class="pagination-item clearfix" v-show="this.options.total>this.options.limit">
    <span class="pre" @click="clickItem(options.page-1)">
      <i class="el-icon-arrow-left"></i>
    </span>
    <span
      :class="numClass(item,options.page)"
      v-for="item in list"
      :key="item"
      @click="clickItem(item)"
    >{{item}}</span>
    <span @click="clickItem(options.page+1)" class="next">
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component({
  name: "paginationItem",
  components: {}
})
export default class PaginationItem extends Vue {
  @Prop({
    default: {
      page: 1,
      limit: 6,
      total: 0,
      cb: null
    }
  })
  options;

  //总页数计算属性
  get count() {
    let num = 0;
    if (this.options.limit != 0) {
      return Math.ceil(this.options.total / this.options.limit);
    } else {
      return 0;
    }
  }

  //分页展示可点击页码
  get list() {
    let page = this.options.page;
    let count = this.count;
    let max = page;
    let min = page;

    max = page + 4 > count ? count : page + 4;
    min = page - 4 > 1 ? page - 4 : 1;
    if (max == count) {
      min = max - 9 > 0 ? max - 9 : 1;
    }

    if (min == 1) {
      max = min + 9 > max ? max : min + 9;
    }
    let list = [];
    if (max - min > 0) {
      for (let i = min; i <= max; i++) {
        list.push(i);
      }
      return list;
    } else {
      return [];
    }
  }

  //获取初始值方法
  @Emit getVal(val, def = 0) {
    if (this.options && this.options[val]) {
      console.log(val, this.options[val]);
      return this.options[val];
    }
    return def;
  }

  //页码 class 属性方法
  @Emit numClass(item, page) {
    if (item == page) {
      return "item active";
    } else {
      return "item";
    }
  }

  //分页点击事件
  @Emit clickItem(num) {
    if (num <= this.count && num > 0) {
      this.options.page = num;
      let cb = this.options.cb;
      if (typeof cb == "function") {
        cb(num, this.options.limit);
      }
    }
  }
  created() {}
}
</script>

<style lang="scss" scoped>
.pagination-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    float: left;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-left: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
  .active {
    background: rgba(254, 120, 101, 1);
    color: #fff;
  }
}
</style>
