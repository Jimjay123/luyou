/**

* Created by wangxin

* @date 2019/11/7 11:19

*/
<template>
    <div class="titlePlugin">
      <p>{{title}}</p>
    </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  @Component({
    name:'TitlePlugin'
  })
  export default class TitlePlugin extends Vue{
    @Prop({
      required:false,
      default:'',
    }) title;
  }
</script>

<style lang="scss" scoped>
  .titlePlugin{
    position: absolute;
    top:60px;
    left:50%;
    transform: translateX(-50%);
    height:68px;
    background: url('../../../assets/creator/sanTabChaPreview/title-bg.svg') no-repeat;
    background-repeat: cover;
    background-size:100% 100%;
    p{
      padding:0 13px;
      height:24px;
      line-height: 24px;
      font-size:16px;
      font-family:SourceHanSansCN-Heavy,SourceHanSansCN;
      font-weight:800;
      color:rgba(102,102,102,1);
      margin-top:36px;
    }
  }
</style>
