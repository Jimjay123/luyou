/**

* Created by wangxin

* @date 2019/8/1 11:17

*/
<template>
  <div>{{explain}}</div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  @Component({
    name:'logThrExplain',
    components:{

    }
  })
  export default class LogThrExplain extends Vue {
    show=true;//弹框显示隐藏  true显示  false隐藏
    @Prop(String) explain;
  }
</script>

<style scoped>
  div{
    font-size: 14px;
    color:#999;
    margin-top:9px;
    text-align: center;
    position: relative;
  }
</style>
