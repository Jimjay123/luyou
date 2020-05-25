<template>
  <TopHeader class="clearfix"></TopHeader>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import TopHeader from "../Header/header";

@Component({
  name: "mainHead",
  components: {
    TopHeader: TopHeader //注册该组件
  }
})
export default class MainHead extends Vue {
  show = false;

  @Emit scrollFun(e) {
    if (!$(".product")[0] || !$(".product")[0].getBoundingClientRect()) {
      return;
    }
    let h = $(".product")[0].getBoundingClientRect().top;
    if (h <= 0) {
      !this.show ? (this.show = true) : "";
    } else {
      this.show ? (this.show = false) : "";
    }
  }

  @Emit toLogin() {
    this.$router.push({
      path: "/main/login"
    });
  }

  mounted() {
    window.onscroll = this.scrollFun;
  }
  destroyed() {
    window.onscroll = null;
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";

@keyframes moveShow {
  from {
    top: -60px;
  }
  to {
    top: 0;
  }
}

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 199;
  //@include setPadding();
  width: 100vw;
  height: $headerHeight;
  line-height: 60px;
  //background: $headerColor;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(237, 237, 237, 1);
  .site-logo {
    float: left;
    margin-left: 40px;
  }
  .site-nav {
    float: right;
    line-height: 40px;
    max-width: 27%;
    color: rgba(254, 120, 101, 1);
    margin-right: 40px;
    border-radius: 20px;
    opacity: 0.4;
    border: 2px solid rgba(254, 120, 101, 1);
    padding: 0 15px;
    margin-top: 7px;
    i {
      opacity: 0.69;
      color: rgba(254, 120, 101, 1);
      font-size: 22px;
      font-weight: bold;
      margin-right: 5px;
    }
    a {
      font-size: 18px;
      font-weight: 600;
      color: rgba(254, 120, 101, 1);
    }
  }
}

.show-header {
  display: block;
}
</style>

