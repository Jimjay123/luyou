<template>
  <div class="content">
    <Layout>
      <div slot="topLeft">
        <h2>内容管理-人力资源</h2>
      </div>
      <div slot="topRight">
        <el-button>创作者审核</el-button>
      </div>
      <section slot="center" class="users">
        <el-row v-for="(list,index) in contents" :key="index">
          <el-col v-for="(item,index1) in list" :key="'' + (index+index1)" :span="4">{{item.label}}</el-col>
        </el-row>
      </section>
    </Layout>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "contentManagement",
  components: {
    Layout
  }
})
export default class ContentManagement extends Vue {
  contents = [
    [
      { label: "敏捷新实训" },
      { label: "标准课" },
      { label: "课程频道" },
      { label: "沙盘" }
    ],
    [{ label: "敏捷新实践" }, { label: "辅导流程" }, { label: "辅导频道" }]
  ];
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";

.content {
  @include relative();
  width: 100%;

  .el-row{
      margin:20px 0;
  }

  .el-col {
    @include flex(1, row);
    color: #ff0000;
    &:first-child {
      color: black;
    }
  }
}
</style>
