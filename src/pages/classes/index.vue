<template>
  <div class="group pages">
    <router-view/>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ClassMain"
})
export default class ClassMain extends Vue {

}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.group {
  @include relative();
  width: 100%;
}
</style>

