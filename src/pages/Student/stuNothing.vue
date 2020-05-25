/**

* Created by wangxin

* @date 2019/8/27 14:25

*/
<template>
  <div class="nothing" v-if="">
    <img :src="require('../../assets/student/no-course.svg')" alt="">
    <p class="p1">你还没有加入任何群组呢～</p>
    <p class="p2">快去搜索群号，或者让老师分享链接加入吧</p>
  </div>
</template>

<script>
  import {Component, Vue, Emit} from "vue-property-decorator";
  @Component({
    name: 'stuNothing',
    components:{

    }
  })
  export default class StuNothing extends Vue {

  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }
  .nothing {
    text-align: center;
    margin-top: 42px;
    .p1 {
      @include fontSet(18px, #4D4D4D, 500);
      margin-top: 10px;
    }
    .p2 {
      @include fontSet(14px, #999, 400);
      margin-top: 6px;
    }
  }
</style>
