<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-08-29 13:19:25
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-10-28 13:31:41
 -->
<template>
  <div class="search-container">
    <el-input
      v-model="inputValue"
      placeholder="请输入您要查找的内容"
      class="search-box"
      @blur="blur"
      @focus="focus"
      @keyup.enter.native="search"
    >
      <img slot="prefix" class="icon-search" src="../../assets/search/search.svg" @click="search" />
      <span
        v-if="inputValue.length > 0 && showClear"
        slot="suffix"
        class="icon-clear"
        @click="clear"
      >×</span>
    </el-input>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "searchBox"
})
export default class SearchBox extends Vue {
  @Prop({ default: "" }) defaultValue;
  @Prop(Function) handleSearch;
  inputValue = "";
  showClear = false;

  @Emit search() {
    this.handleSearch && this.handleSearch(this.inputValue);
  }

  @Emit clear() {
    this.inputValue = "";
  }

  @Emit focus() {
    this.showClear = true;
  }

  @Emit blur() {
    this.showClear = false;
  }

  created() {
    console.log(this.$route.query.studentSearch);
    this.inputValue = this.defaultValue || "";
  }
  updated() {
    console.log(this.$route.query.studentSearch);
  }
}
</script>

<style lang="scss">
.search-box {
  .el-input__inner {
    border: none !important;
    padding-right: 0;
    &::placeholder {
      font-size: 22px;
    }
  }
  .icon-search {
    position: relative;
    left: -15px;
  }
  .icon-clear {
    position: relative;
    color: #cccccc;
    font-size: 26px;
    right: -15px;
    top: 1px;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
.search-container {
  display: flex;
  align-items: center;
  height: 138px;
}
.search-box {
  width: 260px;
  font-size: 22px;
  margin: 0 auto;
  color: #333333;
}
.search-box /deep/ .el-input__inner:focus {
  box-shadow: none !important;
}
</style>