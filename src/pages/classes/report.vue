<template>
  <div class="report">
    <div class="view">这里是图表</div>
    <Layout class="block0">
      <div slot="topLeft">这里一大段话</div>
      <div slot="topRight">
        <el-button  v-if="role == 'teacher'">查看班级详细统计</el-button>
      </div>
    </Layout>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "report",
  components: { Layout }
})
export default class ClassReport extends Vue {
  role = "";
  cardConfigs = [
    {
      title: "热门课程",
      desc: "*基于陆由Starry core 大数据统计，别的老师都在教什么？",
      cards: []
    },
    { title: "同行在教", desc: "*基于您的身份特征推荐", cards: [] },
    { title: "个人喜好推荐", desc: "*因为教了&&&&课程/偏好设置", cards: [] }
  ];
  created() {
    this.role = !!Math.round(Math.random()) ? "teacher" : "student";
    console.log(role);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.report {
  @include relative();
  width: 100%;
  .view {
    height: 400px;
    background: #ccc;
    margin: 20px 0;
    line-height: 400px;
    text-align: center;
    font-size: 2rem;
    @include setMargin();
  }
  .block0 {
    @include setPadding();
  }
}
</style>

