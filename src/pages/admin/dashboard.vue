<template>
  <div class="dashboard">
    <h1 class="block">工作台</h1>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "dashboard",
  components: { Layout}
})
export default class Dashboard extends Vue {
  
  cardConfigs = [
      {title:'热门课程',desc:'*基于陆由Starry core 大数据统计，别的老师都在教什么？',cards:[]},
      {title:'同行在教',desc:'*基于您的身份特征推荐',cards:[]},
      {title:'个人喜好推荐',desc:'*因为教了&&&&课程/偏好设置',cards:[]},
  ]
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.detdashboardail {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow:auto;
  }
  .block0{
      @include setPadding();
  }
}
</style>

