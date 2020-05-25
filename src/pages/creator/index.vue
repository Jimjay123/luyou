<template>
  <div class="creator">
    <System>
      <CreatorNav slot="nav"></CreatorNav>
    </System>
  </div>
</template>

<script>
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import System from "@/pages/index/systemIndex";
  import CreatorNav from './creatorNav'

  @Component({
    name: "creator",
    components: {
      System,CreatorNav
    }
  })
  export default class Creator extends Vue {
    navList = [
      {label: '课程中心'},
      {label: '问答消息'},
      {label: '业绩推广'},
      {label: '客服支持'}
    ]
    activeIndex = '1';

    select(...args) {
      console.log(args)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/style/setting.scss";

  .creator {
  }
</style>
