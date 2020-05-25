/**

* Created by wangxin

* @date 2019/9/16 17:49

*/
<template>
  <div class="select-tem">
    <div class="content">
      <h3><span>上传课程文件</span>请上传 xAPI、PPT、HTML格式的文件</h3>
      <ul class="clearfix">
        <li>
          <img src="" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Component,Vue,Emit,Prop} from 'vue-property-decorator';
  @Component({
    name:'SelectTem'
  })
  export default class SelectTem extends Vue{

  }
</script>

<style lang="scss" scoped>
  @mixin fontSet($s,$c,$w){
    font-size:$s;
    color:$c;
    font-weight:$w;
  }

  @mixin bg($url){
    background: url($url) no-repeat;
    background-size: 100% auto;
  }

  .select-tem{
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.1);
    z-index:99;
  }
  .content{
    width:642px;
    height:324px;
    background:rgba(255,255,255,1);
    border-radius:13px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:28px 24px;
    h3{
      margin-bottom: 22px;
      @include fontSet(14px,#999,400);
      line-height: normal;
      span{
        @include fontSet(22px,#333,600);
        margin-right: 12px;
      }
    }
  }
</style>
