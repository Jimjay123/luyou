/**

* Created by wangxin

* @date 2019/9/3 17:29 支付宝登录成功中转页

*/
<template>

</template>

<script>
  import {Component,Emit,Vue,Prop} from 'vue-property-decorator';
  import {tipsFail,loginSuccess,tokenFun} from "../../utils/utils";
  @Component({
    name:'LoginSuccess'
  })
  export default class LoginSuccess extends Vue{
    created(){
      tokenFun(this.$route.query.token);
      loginSuccess(this.$route.query.identifiedRoleType*1,this);
    }
  }
</script>

<style lang="scss" scoped>

</style>
