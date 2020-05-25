<template>
  <div class="detail">
    <img :src="require('@/assets/classInfo.jpeg')" alt="">
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "detail",
  components: { Layout}
})
export default class ClassDetail extends Vue {
  
  cardConfigs = [
      {title:'热门课程',desc:'*基于陆由Starry core 大数据统计，别的老师都在教什么？',cards:[]},
      {title:'同行在教',desc:'*基于您的身份特征推荐',cards:[]},
      {title:'个人喜好推荐',desc:'*因为教了&&&&课程/偏好设置',cards:[]},
  ]
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.detail {
  @include relative();
  @include setPadding();
  width: 100%;
  img{
    width:100%;
  }
  .block {
    
    overflow:auto;
  }
  .block0{
      @include setPadding();
  }
}
</style>

