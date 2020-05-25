/**

* Created by wangxin

* @date 2019/9/9 10:56

*/
<template>
  <GroupDiaBox :width="410" :cbFun="cbFun">
    <div class="add">
      <p class="p1">是否确认生成报告？</p>
      <p>
        生成的反馈报告将以
        <span class="name">当前进度</span>为准，确认后不可更改
      </p>
      <div class="btn">
        <a
          @click="()=>diaCbFun('hide')"
          href="javascript:;"
          style="border:2px solid rgba(254,120,101,0.4);"
        >取消</a>
        <a @click="()=>diaCbFun('commit')" class="submit" href="javascript:;">确定</a>
      </div>
    </div>
  </GroupDiaBox>
</template>

<script>
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import GroupDiaBox from "../group/groupDiaBox";
@Component({
  name: "confirmDialog",
  components: {
    GroupDiaBox
  }
})
export default class ConfirmDialog extends Vue {
  @Prop({
    default: null,
    required: false
  })
  diaCbFun; //弹框回调方法

  // 弹框回调
  @Emit cbFun() {
    this.diaCbFun("hide");
  }

  created() {}
}
</script>

<style lang="scss" scoped>
@mixin fontSet($s, $c, $w) {
  font-size: $s;
  color: $c;
  font-weight: $w;
}
.add {
  padding-top: 26px;
  padding-bottom: 20px;
}
p {
  // display: flex;
  align-items: center;
  line-height: 22px;
  @include fontSet(16px, #999, 400);
  span {
    @include fontSet(16px, #fe7865, 400);
    margin-right: 8px;
  }
  margin-bottom: 31px;
  .name {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
}
.p1 {
  @include fontSet(20px, #333, 500);
  margin-bottom: 15px;
  line-height: 28px;
}
input {
  width: 100%;
}
.btn {
  text-align: right;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 36px;
    font-size: 16px;
    font-weight: 500;
    color: #fe7865;
    border: 2px solid rgba(254, 120, 101, 1);
    border-radius: 18px;
  }
  .submit {
    background: linear-gradient(
      90deg,
      rgba(255, 176, 158, 1) 0%,
      rgba(254, 120, 101, 1) 100%
    );
    border: none;
    color: #fff;
    margin-left: 24px;
  }
}
</style>
