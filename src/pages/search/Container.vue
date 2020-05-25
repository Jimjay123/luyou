<template>
  <Vuescroll :ops="ops">
    <slot></slot>
  </Vuescroll>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Vuescroll from "vuescroll";
@Component({
  name: "container",
  components: { Vuescroll }
})
export default class Container extends Vue {
  ops = {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: "#c1c1c1",
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: "6px",
      disable: false
    }
  }; //滚动条设置
}
</script>

<style lang="scss" scoped>
@import "~@/style/setting.scss";
</style>