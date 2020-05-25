<template>
  <div class="homePage">
    <section class="rollingPics block">轮播图</section>
    <section class="rollingPics block">模块1</section>
    <section class="rollingPics block">模块2</section>
    <PageFoot />
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import PageFoot from "@/pages/index/footer";
import {login} from '@/service/index';

@Component({
  name: "home",
  components: { PageFoot }
})
export default class Home extends Vue {
  created(){
    login({a:123}).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.homePage {
  @include relative();
  width: 100vw;

  .block {
    margin:20px auto;
    @include setMargin();
    @include relative();

  }
  .rollingPics {
    height: 400px;
    background: #eee;
    text-align: center;
    line-height: 400px;
    font-size: 1.5rem;
  }
}
</style>

