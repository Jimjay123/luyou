/**

* Created by wangxin

* @date 2019/9/4 14:32

*/
<template>
  <div class="folder-box">
    <img :src="getSrc" alt="">{{options.title}}
  </div>
</template>

<script>
  import {Component,Emit,Prop,Vue} from 'vue-property-decorator';
  @Component({
    name:'FolderItem',
  })
  export default class FolderItem extends Vue{
    @Prop({
      required:false,
      default:()=>{
        return {
          id:'',
          title:'',
        }
      }
    }) options;

    get getSrc(){
      return this.options.id!==''?
        require('../../assets/creator/folder.svg'):
        require('../../assets/creator/add-folder.png');
    }

  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }
  .folder-box{
    float:left;
    padding: 9px 14px;
    @include fontSet(16px,#4D4D4D,500);
    background:rgba(247,247,247,1);
    border-radius:8px;
    margin-right:29px;
    img{
      margin-right:12px;
      width:38px;
      height:35px;
    }
    .add{
      margin:0;
    }
  }
</style>
