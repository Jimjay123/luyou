<template>
  <div class="approve">
    <Layout>
      <div slot="topLeft">
        <h2>管理员及教师认证申请详情</h2>
      </div>
      <div slot="topRight">
        <el-button-group>
          <el-button>返回</el-button>
          <el-button type="danger">保存</el-button>
        </el-button-group>
      </div>
      <section slot="center">
        <h3 class="title">基本信息</h3>
        <div class="view"></div>
        <h3 class="title">申请信息</h3>
        <div class="view"></div>
      </section>
    </Layout>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "CustomApprove",
  components: { Layout }
})
export default class CustomApprove extends Vue {
  
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.approve {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow: auto;
  }
  .block0 {
    @include setPadding();
  }
  h3.title {
    border-bottom: 1px solid #333;
    text-indent: 30px;
  }
  .view {
    width: 100%;
    height: 300px;
    background: #ccc;
    margin:20px 0;
  }
}
</style>

