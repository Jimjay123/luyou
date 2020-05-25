<template>
  <div class="draft">
    <Layout class="block0">
        <div slot="topRight">
            <el-button type="primary" style="margin:20px 0">修改课程计划</el-button>
        </div>
        <div slot="center">
            <div class="view"></div>
        </div>
    </Layout>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "draft",
  components: { Layout }
})
export default class ClassDraft extends Vue {
  
  cardConfigs = [
      {title:'热门课程',desc:'*基于陆由Starry core 大数据统计，别的老师都在教什么？',cards:[]},
      {title:'同行在教',desc:'*基于您的身份特征推荐',cards:[]},
      {title:'个人喜好推荐',desc:'*因为教了&&&&课程/偏好设置',cards:[]},
  ]
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.draft {
  @include relative();
  width: 100%;
  .view {
    width:100%;
    height:400px;
    background:#ccc;
  }
  .block0{
      @include setPadding();
  }
}
</style>

