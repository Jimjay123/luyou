/**

* Created by wangxin

* @date 2019/8/4 13:39

*/
<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
  import Header from '../../pages/index/header';

  @Component({
    name: 'teacher',
    components: {
      Header
    }
  })
  export default class Teacher extends Vue {
    //支付宝Icon点击事件
    @Emit alipayClick(){
      this.jumpAlipay();
    }

    @Emit jumpAlipay(){
      let app_id='';
      let scope='';
      let redirect_uri=encodeURIComponent(window.location.href);
      let url="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+app_id+"&scope="+scope+"&redirect_uri="+redirect_uri;
      window.open(url);//跳转到支付宝授权页
    }

    //微信 icon 点击事件
    @Emit wechatClick(){
      this.$router.push({
        path: '/main/wechatLogin',
      })
    }

  }
</script>

<style scoped>

</style>
