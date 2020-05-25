<template>
  <div class="timetable">
    <h2 class="block">数字营销管理实践课程 · 6</h2>
    <section class="clearfix block">
        <el-card v-for="(item,index) in demoList" :key="index" class="card">
            <h3>卡片标题</h3>

            <p>建议时长：15分钟</p>
            <p>学习次数：0次（需联系老师分配）</p>
        </el-card>
    </section>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "timetable",
  components: { Layout}
})
export default class Timetable extends Vue {
    demoList = Array.from({length:6});
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.timetable {
  @include relative();
  width: 100%;
  .block {
    @include setMargin();
    overflow:auto;
  }
  p{
      margin:4px;
  }
  .card{
      width:15vw;
      float:left;
      margin:20px;
  }
}
</style>

