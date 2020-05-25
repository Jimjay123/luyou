<template>
  <h1 class="blockTitle">课程设置</h1>
</template>
<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "blockTitle"
})
export default class BlockTitle extends Vue {}
</script>
<style lang="scss" scoped>
.blockTitle {
  font-size: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top:0;
  float:left;
  &::before {
    content: " ";
    display: inline-block;
    height: 26px;
    width: 6px;
    margin-right: 12px;
    border-radius: 3px;
    background: #fe7865;
  }
}
</style>


