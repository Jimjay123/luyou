<template>
  <!-- 王黎芳 8.3创建 -->
  <div>
    <h4>老师端统计中心</h4>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "teacherIndex"
})
export default class teacherIndex extends Vue {}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
header {
  width: 1440px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
}
.header-content {
  height: 60px;
  width: 90%;
  margin: 0 auto;
}
.header-content img {
  margin-top: 10px;
  float: left;
}
.header-content ul {
  float: left;
  margin-left: 252px;
  height: 60px;
}
.header-content ul li {
  margin-top: 12px;
  height: 60px;
  margin-right: 80px;
  float: left;
}
.header-content ul li a {
  color: rgba(102, 102, 102, 1);
  display: block;
}
.header-content div {
  width: 60px;
  height: 48px;
  background: rgba(255, 255, 255, 0.01);
  float: left;
}
.header-content div img {
  margin-left: 40px;
  width: 36px;
  height: 30px;
  background: rgba(255, 255, 255, 0.01);
}
</style>
