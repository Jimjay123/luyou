<template>
  <div class="mainPage">
    <h2 class="block">我的资源库</h2>
    <Layout class="block">
        <div slot="topLeft">
            <el-checkbox>只看已购买</el-checkbox>
            <el-checkbox>只看资源库</el-checkbox>
        </div>
    </Layout>
    <ClassBlock :config="{length:16}"/>

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
  name: "mainPage",
  components: { Layout, Card, foot, ClassBlock }
})
export default class MainPage extends Vue {
  
  cardList = Array.from({length:16})//for test
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.mainPage {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow:auto;
  }
}
</style>

