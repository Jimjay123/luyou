<template>
  <div class="step1">
    <Layout class="block0">
        <div slot="topLeft">
            <el-checkbox>只看已购买</el-checkbox>
            <el-checkbox>只看资源库</el-checkbox>
        </div>
        <div slot="topRight" style="display:flex;">
            <el-input placeholder="search"></el-input>
            <el-button type="primary"><i class="el-icon-search"></i></el-button>
        </div>
    </Layout>
    <ClassBlock v-for="(item,index) in cardConfigs" :key="index" :config="item"/>

    <foot />
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";
import Card from '@/components/card';
import foot from '@/pages/index/footer';
import ClassBlock from '@/components/classBlock';

@Component({
  name: "step1",
  components: { Layout, Card, foot, ClassBlock }
})
export default class Step1 extends Vue {
  
  cardConfigs = [
      {title:'热门课程',desc:'*基于陆由Starry core 大数据统计，别的老师都在教什么？',cards:[]},
      {title:'同行在教',desc:'*基于您的身份特征推荐',cards:[]},
      {title:'个人喜好推荐',desc:'*因为教了&&&&课程/偏好设置',cards:[]},
  ]
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.step1 {
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

