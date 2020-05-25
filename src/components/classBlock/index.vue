<template>
  <div class="classBlock">
    <p class="block">
      <span>{{config.title}}</span>{{config.desc}}
    </p>
    <section class="block">
      <Card v-for="index in  cardList" :key="index"/>
    </section>
  </div>
</template>
<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";
import Card from "@/components/card";

@Component({
  name: "mainPage",
  components: { Layout, Card }
})
export default class MainPage extends Vue {
  @Prop() config;
  cardList = []; //for test
  created() {
   this.cardList = Array.from({length:this.config.length || 4}) 
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.classBlock {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow: auto;
  }
  p.block span{
      font-size: 1.5em;
  }
}
</style>

