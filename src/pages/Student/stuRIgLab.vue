/**

* Created by wangxin

* @date 2019/8/26 9:02

*/
<template>
  <div class="right">
    <div class="group-box user-box" @click="groupSet">
      <i class="add"></i><span>群成员</span>
    </div>
  </div>
</template>

<script>
  import {Component, Vue, Emit, Prop} from "vue-property-decorator";

  @Component({
    name: "stuRigLab",
    components: {}
  })
  export default class StuRigLab extends Vue {
    show=true;

    @Emit getInfo(){
      this.show=false
    }

    //群设置点击事件
    @Emit groupSet(){
      this.$router.push({
        path:'/student/studentList/stuInfo'
      });
    }
  }
</script>

<style lang="scss" scoped>
  @mixin bgm($url) {
    background: url($url) no-repeat;
    background-size: 100% auto;
  }
  @mixin fontSet($s,$c,$w){
    font-size: $s;
    color:$c;
    font-weight: $w;
  }

  .right {
    float: right;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    i {
      display: inline-block;
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    .user-box {
      position: relative;
      display: inline-block;
      .add {
        @include bgm('../../assets/student/icon-group.svg');
      }
    }
  }
  .group-box{
    display: inline-block;
  }
</style>
