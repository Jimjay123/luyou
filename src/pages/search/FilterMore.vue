<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-08-29 13:19:25
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-21 10:11:36
 -->
<template>
  <div class="filter-more">
    <el-select
      v-model="selectValue"
      placeholder="课程类型"
      class="filter-selector"
      size="small"
      @change="handleSelect"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="sort-by-time" v-if="!hideSort" @click="handleSort(1)">
      <img src="../../assets/search/time.svg" />
      <span>最新</span>
    </div>
    <div class="sort-by-hot" v-if="!hideSort" @click="handleSort(2)">
      <img src="../../assets/search/hot.svg" />
      <span>热度</span>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "filterMore"
})
export default class FilterMore extends Vue {
  @Prop(Boolean) hideSort;
  @Prop(Function) handleSort;
  @Prop(Function) handleSelect;
  @Prop({ default: "" }) courseType;
  selectValue = "";
  options = [
    {
      value: 1,
      label: "课程"
    },
    {
      value: 2,
      label: "课程频道"
    },
    {
      value: 3,
      label: "沙盘课程"
    }
  ];
  created() {
    console.log(this.courseType);
    this.selectValue =
      this.courseType == 1 ? "课程" : this.courseType == 2 ? "课程频道" : "";
  }
}
</script>
<style lang="scss">
.filter-selector .el-input__inner {
  font-size: 14px;
}
.el-select-dropdown__list .el-select-dropdown__item {
  color: #666;
  &.selected {
    color: #fe7865;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.filter-more {
  height: 32px;
  max-width: 1200px;
  margin: 14px auto;
  display: flex;
  align-items: center;
  .sort-by-time,
  .sort-by-hot {
    margin-left: 32px;
    cursor: pointer;
    img {
      width: 14px;
      margin-right: 11px;
    }
    span {
      font-size: 12px;
      line-height: 14px;
    }
  }
  .sort-by-time {
    color: #fe7865;
  }
  .sort-by-hot {
    color: rgba(0, 0, 0, 0.3);
  }
}
.filter-selector {
  width: 103px;
  height: 32px;
}
.el-select /deep/ input:focus {
  border-color: #dcdfe6 !important;
}
</style>