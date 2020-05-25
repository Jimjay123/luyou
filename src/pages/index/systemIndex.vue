<template>
  <div>
    <div class="system">
      <section class="left" :style="leftStyle">
        <slot name="nav"/>
      </section>
      <section class="right" :style="rightStyle">
        <router-view/>
      </section>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/pages/index/footer";
import {State,Action,namespace} from 'vuex-class';
const CreatorMod=namespace('creator');

@Component({
  name: "system",
  components: { Footer }
})
export default class System extends Vue {
  @CreatorMod.State('systemIndex') systemIndex;

  get leftStyle(){
    console.log(this.systemIndex);
    if(this.systemIndex==='show'){
      return {}
    }else{
      return {
        width:0,
      }
    }
  }

  get rightStyle(){
    if(this.systemIndex==='show'){
      return {}
    }else{
      return {
        'padding-left':0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style/setting.scss";
.system {
  @include relative();
  //@include setPadding();
  width: 100%;
  min-width: 1200px;
  @include flex(1, row);
  .left {
    @include flex(0 0 240px, column, flex-start, flex-start);
    align-self: start;
    height:100vh;
    width:240px;
    position: fixed;
    top:0;
    left:0;
    z-index: 30;
  }
  .right {
    @include flex(1, column, flex-start, flex-start);
    align-self: start;
    height:100vh;
    padding-left:240px;
  }
}
</style>

