/**

* Created by wangxin

* @date 2019/8/19 11:47

*/
<template>
  <div class="dialog-bg" v-show="show" @click="bgClick">
    <div class="dialog-box" :style="{'width':width+'px'}" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  import {State, Getter, Action, Mutation, namespace} from 'vuex-class';
  const UseInfMod = namespace('userinfo');

  @Component({
    name: 'teaDiaBox',
    components: {}
  })
  export default class TeaDiaBox extends Vue {
    @Prop(Boolean) show;//弹框显示隐藏
    @UseInfMod.State('ajaxStatus') ajaxStatus;//全局ajax加载中状态

    @Prop({
      default:null,
      required:false,
    }) callback;

    @Prop({
      default:440,
      required:false,
    }) width;

    @Emit bgClick(){
      this.callback();
    }
  }
</script>

<style lang="scss" scoped>
  @mixin posAbs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .dialog-box {
    @include posAbs;
    background: #fff;
    padding: 0 34px;
    border-radius: 5px;
    width: 440px;
    /*height:462px;*/
  }
</style>

