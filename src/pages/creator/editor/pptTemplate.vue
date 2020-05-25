<template>
  <div class="pptBox" :id="mouseWheelHas?'pptBox':''">
    <div class="pptTemplate">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Emit, Prop, Component, Vue } from "vue-property-decorator";
import { cloneObj } from "../../../utils/utils";
@Component({
  name: "PptTemplate"
})
export default class PptTemplate extends Vue {
  @Prop({
    default:false,
    required:false,
  }) mouseWheelHas;

  mounted(){
    if(this.mouseWheelHas){
      //window.addEventListener('mousewheel', this.handleScroll, true);
    }
  }

  handleScroll(){
    let space=30;
    let top=$('#pptBox').css('top').replace('px','');
    top=top*1;
    if(event.deltaY>0){
      $('#pptBox').css('top',(top+space)+'px')
    }else{
      $('#pptBox').css('top',(top-space)+'px')
    }
  }

  //组件销毁前事件
  beforeDestroy(){
    window.removeEventListener('mousewheel',this.handleScroll,true)
  }
}
</script>

<style lang="scss" scoped>
.pptBox {
  // padding: 17px 122px;
  /*position: fixed;
  top: 76px;
  left: 122px;*/
  width: 996px;
  height: 570px;
  box-sizing: border-box;
}
.pptTemplate {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(204, 204, 204, 1);
  // padding: 64px;
  width: 996px;
  height: 570px;
}
</style>
