<template>
  <div class="footer-all">
    <div class="footer">
      <span></span>
      <div>扫码登录</div>
      <span></span>
    </div>
    <div class="three-party">
      <div @click="wechatClick"></div>
      <div @click="alipayClick"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import {aliAppInfAppInfo} from '../../service/mainApi';
import {tipsFail} from "../../utils/utils";
@Component({
  name: "LoginBox",
  components: {}
})
export default class LoginBox extends Vue {
  //支付宝Icon点击事件
  @Emit alipayClick() {
    this.jumpAlipay();
  }
  app_id='';
  scope='';
  redirect_uri='';

  @Emit jumpAlipay() {
    aliAppInfAppInfo().then(res=>{
      if(res.code==0){
        let data=res.data;
        this.app_id=data.appId;
        this.scope=data.scope;
        this.redirect_uri=data.redirectUrl+'?state=login';
        let url =
          "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" +
          this.app_id +
          "&scope=" +
          this.scope +
          //"&state=login" +
          "&redirect_uri=" +
          this.redirect_uri;
        window.location.href=url; //跳转到支付宝授权页
      }else{
        tipsFail(res.msg);
      }
    })
  }

  //微信 icon 点击事件
  @Emit wechatClick() {
    this.$router.push({
      path: "/main/wechatLogin"
    });
  }

  //获取支付宝公参接口
  @Emit aliAppInfAppInfoFun(){
    aliAppInfAppInfo().then(res=>{
      if(res.code==0){
        let data=res.data;
        this.app_id=data.appId;
        this.scope=data.scope;
        this.redirect_uri=data.redirectUrl;
      }else{
        tipsFail(res.msg);
      }
    })
  }

  created(){
    //this.aliAppInfAppInfoFun();
  }
}
</script>

<style lang="scss" scoped>
@mixin setFlex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin bacImg($url) {
  background: url($url) no-repeat;
  background-size: 100% auto;
}
.footer-all {
  position: relative;
  height: 74px;
  .footer {
    @include setFlex;
    // margin-top: 10px;
    div {
      width: 58px;
      font-size: 14px;
      color: #999;
      margin: 0 10px;
    }
    span {
      width: 129px;
      height: 1px;
      background: #dbdbdb;
    }
  }

  .three-party {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 64px;
    width: 100%;
    @include setFlex;
    div {
      width: 107px;
      height: 64px;
      cursor: pointer;
      @include bacImg("../../assets/home/wx_icon.svg");
    }
    div:hover {
      @include bacImg("../../assets/home/wechat_hover.svg");
    }
    div:last-child {
      @include bacImg("../../assets/home/zfb_icon.svg");
    }
    div:last-child:hover {
      @include bacImg("../../assets/home/Alipay_hover.svg");
    }
  }
}
</style>
