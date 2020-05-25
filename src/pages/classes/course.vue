<template>
  <div class="course">
    <img :src="require('@/assets/light.jpeg')" alt="">
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/components/tableTriditionLayout";

@Component({
  name: "course",
  components: { Layout}
})
export default class ClassCourse extends Vue {
  
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.course {
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

