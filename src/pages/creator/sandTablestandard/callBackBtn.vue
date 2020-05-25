<!--
 * @Descripttion: 
 * @version: 
 * @Author: pengwanchong
 * @Date: 2019-11-11 13:29:24
 * @LastEditors: pengwanchong
 * @LastEditTime: 2019-11-12 10:17:45
 -->

<template>
  <div class="box clearfix">
    <a href="javascript:;" @click="btnClickFun">返回</a>
  </div>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component({
  name: "CallBackBtn"
})
export default class CallBackBtn extends Vue {
  @Prop({
    default: null,
    require: false
  })
  callBack;
  // 返回上一个路由地址
  btnClickFun() {
    let d = sessionStorage.getItem("router");
    let router = JSON.parse(d);
    let route = this.$route.query.address;
    this.$router.push({
      path: route,
      query: router
    });
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 24px;
  left: 35px;
  height: 44px;
  background: #ffc53dff;
  border-radius: 8px;
  cursor: pointer;
  z-index: 12;
  a {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 59px;
    height: 40px;
    border-radius: 8px;
    background: #fef7e6ff;
    font-size: 16px;
    font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
    font-weight: 800;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
