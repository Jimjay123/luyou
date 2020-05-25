<template>
  <div :class="{button:true,right: right !== void 0,border:border !== void 0}">{{label||'返回'}}</div>
</template>
<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "baseButton"
})
export default class BaseButton extends Vue {
  @Prop() label;
  @Prop() border;
  @Prop() right;

  mounted() {
    console.log(this.right);
  }
}
</script>
<style lang="scss" scoped>
.button {
  width: 78px;
  height: 36px;
  background: linear-gradient(
    270deg,
    rgba(254, 120, 101, 1) 0%,
    rgba(255, 176, 158, 1) 100%
  );
  border-radius: 6px;
  line-height: 34px;
  text-align: center;
  color: white;
  cursor: pointer;
  &.right {
    float: right;
    margin: 8px 10px;
  }
  &.border {
    color: rgba(254, 120, 101, 1);
  }
}
</style>


