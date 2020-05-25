<template>
  <div id="app">
    <div class="page-container">
      <div class="page-parent">
        <Tips></Tips>
        <!-- <Loading></Loading> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Tips from "@/components/common/tips";
import Loading from "@/components/common/loading";
export default {
  name: "App",
  components: { Tips, Loading }
};
</script>

<style lang="scss">
@import "~@/style/common.scss";

#app {
  width: 100%;
}
.page-container {
  min-height: 70%;
  height: 100%;
  width: 100vw;
  .page-parent {
    height: 100%;
  }
}
body{
  overflow-x: hidden;
}
@media screen and (max-width: 1200px){
  body{
    overflow-x: auto;
  }
}
</style>
