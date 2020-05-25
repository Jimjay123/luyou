/**

* Created by wangxin

* @date 2019/8/1 10:52

*/
<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  @Component({
    name:'logThrTitle',
    components:{

    }
  })
  export default class LogThrTitle extends Vue {
    show=true;//弹框显示隐藏  true显示  false隐藏
    @Prop(String) title;
  }
</script>

<style lang="scss" scoped>
  .title{
    color:#333;
    font-size: 22px;
    font-weight:600;
    text-align: center;
    margin:35px 0 17px 0;
  }
</style>
