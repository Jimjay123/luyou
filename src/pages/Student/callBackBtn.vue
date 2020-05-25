/**

* Created by wangxin

* @date 2019/11/7 10:42

*/
<template>
  <div class="box clearfix">
    <!-- <a href="javascript:history.back(-1)" @click="btnClickFun">返回</a> -->
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

  btnClickFun() {
    console.log(1111);
    let groupId = this.$route.query.groupId;
    let coursePlanId = this.$route.query.coursePlanId;
    let coursePlanType = this.$route.query.coursePlanType;
    console.log(groupId, coursePlanId, coursePlanType);
    this.$router.push({
      path: "StudentChannel",
      query: {
        groupId,
        coursePlanId,
        coursePlanType
      }
    });
    // if (typeof this.callBack === "function") {
    //   this.callBack();
    // }
  }
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
  z-index: 999;
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
