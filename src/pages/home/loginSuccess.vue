/**

* Created by wangxin

* @date 2019/9/3 17:29 支付宝登录成功中转页

*/
<template>
<div>dddaga</div>
</template>

<script>
import { Component, Emit, Vue, Prop } from "vue-property-decorator";
import {
  tipsFail,
  loginSuccess,
  tokenFun,
  memberidFun,
  stateInterception
} from "../../utils/utils";
@Component({
  name: "LoginSuccess"
})
export default class LoginSuccess extends Vue {
  created() {
    tokenFun(this.$route.query.token);
    memberidFun(this.$route.query.memberId); //设置token缓存
    let loginType = this.$route.query.loginType;
    sessionStorage.setItem("loginType", loginType);
    let code = this.$route.query.code;
    let msg = this.$route.query.msg;
    if (code == 0) {
      loginSuccess(this.$route.query.identifiedRoleType * 1, this);
    } else {
      stateInterception(code, msg, this);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
