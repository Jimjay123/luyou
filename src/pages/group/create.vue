<template>
  <div class="create pages">
    <h1 v-if="showTitle">创建群</h1>
    <section class="contianer">
      <el-row>
        <el-input placeholder="群名称"></el-input>
      </el-row>
      <el-row>
        <el-input placeholder="群介绍，允许为空。" type="textarea"></el-input>
      </el-row>
      <el-row>
        入群方式：
        <el-checkbox v-model="checked">需要审批</el-checkbox>
      </el-row>
      <el-row>
        小组模式：
        <el-checkbox v-model="checked">开启支持</el-checkbox>
      </el-row>
      <el-row>
        <el-button>提交</el-button>
      </el-row>
    </section>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "create"
})
export default class Create extends Vue {
  checked = false;
  showTitle = true
  created() {
      /edit/.test(location.href) && (this.showTitle = false);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.create {
  @include relative();
  width: 100%;

  .contianer {
    .el-row {
      margin: 20px 0;
    }
  }
}
</style>
