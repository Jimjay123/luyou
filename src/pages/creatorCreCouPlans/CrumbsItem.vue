/**

* Created by wangxin

* @date 2019/8/12 8:51

* 面包屑

*/
<template>
  <div class="crumbs-item clearfix">
    <div class="top">
      <div>
        <!--<img src="../../assets/img/fanh.svg" alt class="line" @click="backHistory" />-->
        <span class="line-color"></span>
        创建课程计划
      </div>
    </div>
    <a
      href="javascript:;"
      v-for="(item,index) in list"
      @click="jumpFun(item)"
      :key="index"
      :class="item.type?'item':''"
    >
      <span class="gt" v-if="index!==0">&gt;</span>
      {{item.name}}
    </a>
    <div class="btn-box" v-if="btn!==false">
      <a class="pre" @click="preFun" href="javascript:;">上一步</a>
      <a class="next" @click="nextFun" href="javascript:;">下一步</a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component({
  name: "CrumbsItem"
})
export default class CrumbsItem extends Vue {
  @Prop(Array) list;

  @Prop({
    default: false,
    required: false
  })
  btn;

  @Prop({
    default: null,
    required: false
  })
  cbFun;

  //上一步按钮
  @Emit preFun() {
    this.cbFun("pre");
  }

  //下一步点击按钮
  @Emit nextFun() {
    this.cbFun("next");
  }

  @Emit jumpFun(item) {
    if(this.$route.path!==item.path){
      this.$router.push({
        path: item.path,
        query: {
          ...item.query
        }
      });
    }
  }

  //返回上一层
  @Emit backHistory() {
    console.log(this.$route);
    this.$router.go(-1); //返回上一层
  }
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.top {
  display: inline-block;
  @include fontSet(18px, #000, 600);
  margin-right: 29px;
  .line {
    width: 26px;
    height: 20px;
    margin-bottom: 5px;
  }
  .line:hover {
    cursor: pointer;
  }
  .line-color{
    display: inline-block;
    width:6px;
    height:18px;
    background: #FE7865;
    border-radius:3px;
    position: relative;
    top:3px;
    margin-right:10px;
  }
}
.crumbs-item {
  a {
    @include fontSet(12px, #ccc, normal);
    .gt {
      margin: 0 16px;
    }
  }
  .item {
    @include fontSet(12px, #666, normal);
  }
}
.btn-box {
  float: right;
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 36px;
    border-radius: 18px;
    @include fontSet(16px, #fe7865, 500);
  }
  .pre {
    border: 2px solid rgba(254, 120, 101, 1);
    margin-right: 21px;
  }
  .next {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    color: #fff;
  }
}
</style>
